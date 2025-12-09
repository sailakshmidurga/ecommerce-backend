import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";

class UserService {
  async registerUser(name, email, password) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return newUser;
  }

  async loginUser(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { user, token };
  }
}

export default new UserService();
