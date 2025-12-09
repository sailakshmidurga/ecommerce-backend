import Product from "../models/Product.js";

class ProductRepository {
  async create(data) {
    return await Product.create(data);
  }

  async findAll() {
    return await Product.findAll();
  }
}

export default new ProductRepository();
