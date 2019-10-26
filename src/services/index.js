const MongoConnect = require('../lib/mongo')
const { ObjectId } = require('mongodb')

class ProductService {
  constructor(){
    this.collection = 'products'
    this.mongoDB = new MongoConnect()
  }

  async getProducts() {
    const query = {}
    const options = {}
    const products = await this.mongoDB.get(this.collection, query, options)
    return products || [];
  }

  async getOneProduct(productId) {
    const query = {_id: ObjectId(productId)}
    const options = {}
    const product = await this.mongoDB.getOne(this.collection, query, options)
    return product || {}
  }

  async updateProduct(productId, data) {
    const query = {_id: ObjectId(productId)}
    const updatedId = await this.mongoDB.update(this.collection, query, data)
    return updatedId
  }

  async deleteProduct(productId) {
    const query = {_id: ObjectId(productId)}
    const deletedProduct = await this.mongoDB.delete(this.collection, query)
    return deletedProduct
  }

  async createProduct(data){
    const createdId = await this.mongoDB.create(this.collection, data)
    return createdId
  }
}

module.exports = ProductService;
