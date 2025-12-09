import redisClient from "../config/redis.js";

class ProductCache {
  async getProducts() {
    const data = await redisClient.get("products");
    return data ? JSON.parse(data) : null;
  }

  async saveProducts(products) {
    await redisClient.set("products", JSON.stringify(products), {
      EX: 60, // cache for 60 sec
    });
  }

  async clearCache() {
    await redisClient.del("products");
  }
}

export default new ProductCache();
