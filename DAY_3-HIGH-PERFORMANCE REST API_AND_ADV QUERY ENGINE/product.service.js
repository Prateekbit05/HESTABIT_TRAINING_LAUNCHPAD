import productRepository from '../repositories/product.repository.js';

class ProductService {
  async createProduct(data) {
    return productRepository.create(data);
  }
}

export default new ProductService();
