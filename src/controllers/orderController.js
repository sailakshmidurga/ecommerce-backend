import orderService from "../services/orderService.js";

class OrderController {
  async place(req, res) {
    try {
      const userId = req.user.id; // authenticated user
      const items = req.body.items;

      const order = await orderService.placeOrder(userId, items);

      res.json({
        message: "Order placed successfully",
        order,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new OrderController();
