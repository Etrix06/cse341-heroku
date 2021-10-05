const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db.collection('products')
      .insertOne(this)
      .then(result => {
        console.log('this is the results: ' , result);
      })
      .catch(err => {
        console.log(err);
      });
  }

}

//const fs = require('fs');
//const path = require('path');
//
//const Cart = require('./cart');
//
//const p = path.join(
//  path.dirname(process.mainModule.filename),
//  'data',
//  'products.json'
//);
//
//const getProductsFromFile = cb => {
//  fs.readFile(p, (err, fileContent) => {
//    if (err) {
//      cb([]);
//    } else {
//      cb(JSON.parse(fileContent));
//    }
//  });
//};
//
////module.exports = class Product {
////  constructor(id, title, imageUrl, description, price) {
////    this.id = id;
////    this.title = title;
////    this.imageUrl = imageUrl;
////    this.description = description;
////    this.price = price;
////  }
//
//  save() {
//    getProductsFromFile(products => {
//      if (this.id) {
//        const existingProductIndex = products.findIndex(
//          prod => prod.id === this.id
//        );
//        const updatedProducts = [...products];
//        updatedProducts[existingProductIndex] = this;   
//        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//          console.log(err);
//        });
//      } else {
//        this.id = Math.random().toString();  // this can generate a random number for a unique id
//        products.push(this);
//        fs.writeFile(p, JSON.stringify(products), err => {
//          console.log(err);
//        });
//      }
//    });
//  }
//
//  static deleteById(id) {
//    getProductsFromFile(products => {
//      const product = products.find(prod => prod.id === id);
//      const updatedProducts = products.filter(prod => prod.id !== id); // loops thorugh all products until it find product that exactly matches id.
//      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//        if (!err) {
//          Cart.deleteProduct(id, product.price);
//        }
//      });
//    });
//  }
//
//  static fetchAll(cb) {
//    getProductsFromFile(cb);
//  }
//
//
//  static findById(id, cb) {
//    getProductsFromFile(products => {
//      const product = products.find(p => p.id === id);  // shortcut arrow function if 1 line and returns line.
//      cb(product);
//    });
//  }
//
//};

module.exports = Product;