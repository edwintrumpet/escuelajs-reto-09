const { MongoClient } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoConnect {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoConnect.connection) {
      MongoConnect.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }
          console.log('Connected succesfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoConnect.connection;
  }

  get(collection, query, options){
    return this.connect().then(db => {
      return db.collection(collection).find(query, options).toArray()
    })
  }

  getOne(collection, query, options){
    return this.connect().then(db => {
      return db.collection(collection).findOne(query, options)
    })
  }

  update(collection, query, data){
    return this.connect().then(db => {
      return db.collection(collection).updateOne(query, {$set: data}, {upsert: true})
    }).then(result => result.insertedId || query)
  }

  delete(collection, query){
    return this.connect().then(db => {
      return db.collection(collection).deleteOne(query)
    }).then(() => query)
  }

  create(collection, data){
    return this.connect().then(db => {
      return db.collection(collection).insertOne(data)
    }).then(result => result.insertedId)
  }
}

module.exports = MongoConnect;
