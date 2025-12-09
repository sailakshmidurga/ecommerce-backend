import productRepository from "../repositories/productRepository.js";
import productCache from "../cache/productCache.js";

class ProductService {
  
  async createProduct(data) {
    const product = await productRepository.create(data);

    // Clear cache when new product is created
    await productCache.clearCache();
    console.log("Cache cleared because a new product was created");

    return product;
  }

  async getAllProducts() {
    // 1. Check Redis cache first
    const cached = await productCache.getProducts();

    if (cached) {
      console.log("Serving from REDIS CACHE");
      return cached;
    }

    // 2. Fetch from database
    console.log("Serving from DATABASE");
    const products = await productRepository.findAll();

    // 3. Save obtained result into Redis
    await productCache.saveProducts(products);
    console.log("Saved to Redis cache");

    return products;
  }
}

export default new ProductService();
