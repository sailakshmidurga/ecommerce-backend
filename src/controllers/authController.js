import userService from "../services/userService.js";

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await userService.registerUser(name, email, password);
      res.status(201).json({ message: "User registered", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await userService.loginUser(email, password);
      res.json({ message: "Login successful", token, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new AuthController();
