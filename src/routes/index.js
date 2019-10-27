const express = require('express');
const path = require('path');
const ProductService = require('../services');
const receipt = '../assets/receipt.pdf'

const platziStore = (app) => {
  const router = express.Router();
  app.use('/api/', router);

  const productService = new ProductService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.get('/products', async (req, res, next) => {
    try{
      const storeProducts = await productService.getProducts()
      res.status(200).json({data: storeProducts, message: 'Products list'});
    }catch(err){
      console.log(err)
    }
  });

  router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params
    try{
      const product = await productService.getOneProduct(productId)
      res.status(200).json({data: product, message: 'product detail'})
    }catch(err){
      console.log(err)
    }
  })

  router.put('/:productId', async (req, res, next) => {
    const { productId } = req.params
    const { body: data } = req
    try{
      const updatedId = await productService.updateProduct(productId, data)
      res.status(200).json({data: updatedId, message: 'Product updated'})
    }catch(err){
      console.log(err)
    }
  })

  router.delete('/:productId', async (req, res, next) => {
    const { productId } = req.params
    try{
      const deletedId = await productService.deleteProduct(productId)
      res.status(200).json({data: deletedId, message: 'Product deleted'})
    }catch(err){
      console.log(err)
    }
  })

  router.post('/products', async (req, res, next) => {
    const { body: data } = req
    try{
      const createdId = await productService.createProduct(data)
      res.status(201).json({data: createdId, message: 'Product created'})
    }catch(err){
      console.log(err)
    }
  })

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = platziStore;