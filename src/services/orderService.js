import sequelize from "../config/db.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import orderQueue from "../jobs/queue.js";

class OrderService {
  async placeOrder(userId, items) {
    const transaction = await sequelize.transaction();

    try {
      let totalAmount = 0;

      const products = [];

      for (const item of items) {
        const product = await Product.findOne({
          where: { id: item.productId },
          transaction
        });

        if (!product) {
          throw new Error("Product not found");
        }

        if (product.stock < item.quantity) {
          throw new Error("Not enough stock");
        }

        const newStock = product.stock - item.quantity;

        await product.update(
          {
            stock: newStock
          },
          { transaction }
        );

        totalAmount += product.price * item.quantity;

        products.push({ product, quantity: item.quantity });
      }

      const order = await Order.create(
        {
          userId: userId,
          totalAmount: totalAmount
        },
        { transaction }
      );

      for (const p of products) {
        await OrderItem.create(
          {
            orderId: order.id,
            productId: p.product.id,
            quantity: p.quantity,
            price: p.product.price
          },
          { transaction }
        );
      }

      await transaction.commit();

      await orderQueue.add("sendEmail", {
        orderId: order.id,
        userId: order.userId
      });

      return order;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

export default new OrderService();
