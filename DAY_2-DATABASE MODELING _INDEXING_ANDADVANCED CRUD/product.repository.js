import Product from '../models/product.model.js';

class ProductRepository {
  async create(data) {
    return Product.create(data);
  }

  async findBySlug(slug) {
    return Product.findOne({ slug });
  }
}

export default new ProductRepository();
