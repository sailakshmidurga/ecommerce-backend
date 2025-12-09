import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";

class OrderRepository {
  async createOrder(orderData, transaction) {
    return await Order.create(orderData, { transaction });
  }

  async createOrderItem(itemData, transaction) {
    return await OrderItem.create(itemData, { transaction });
  }

  async findProductById(id) {
    return await Product.findByPk(id);
  }

  async updateProduct(product, transaction) {
    return await product.save({ transaction });
  }
}

export default new OrderRepository();
