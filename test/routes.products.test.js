const assert = require('assert')
const proxyquire = require('proxyquire')

const { productsMock, ProductServiceMock } = require('../src/utils/mocks')
const testserver = require('../src/utils/testServer')

describe('routes - products', () => {
    const route = proxyquire('../src/routes', {
        '../services': ProductServiceMock
    })
    const request = testserver(route)
    describe('GET /products', () => {
        it('should respond with status 200', done => {
            request.get('/api/products').expect(200, done)
        })
        it('should respond with the list of products', done => {
            request.get('/api/products').end((err, res) => {
                assert.deepEqual(res.body, {
                    data: productsMock,
                    message: 'Products list'
                })
                done()
            })
        })
    })
})