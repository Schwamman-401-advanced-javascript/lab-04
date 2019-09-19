const Products = require('../categories/products.js');

describe('Categories Model', () => {

  let products;

  beforeEach(() => {
    products = new Products();
  })

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = products.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(products.sanitize(testRecord)).toBeUndefined();
  });

  it('can create() a new product', () => {
    let obj = { category_id: 1, price: 10.00, quantity_in_stock: 2 };
    return products.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a category', () => {
    let obj = { category_id: 1, price: 10.00, quantity_in_stock: 2 };
    return products.create(obj)
      .then(record => {
        return products.get(record.id)
          .then(product => {
            Object.keys(obj).forEach(key => {
              expect(product[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can delete() a category', () => {
    let obj = { category_id: 1, price: 10.00, quantity_in_stock: 2 };
    return products.create(obj)
      .then(record => {
        return products.delete(record.id)
          .then(() => {
            return products.get(record.id)
              .then(result => {
                expect(result).toEqual([]);
              });
          });
      });
  });

  it('can update() a category', () => {
    let obj = { category_id: 1, price: 10.00, quantity_in_stock: 2 };
    return products.create(obj)
      .then(record => {
        return products.update(record.id, { category_id: 2, price: 8.00, quantity_in_stock: 8 })
          .then(updatedRecord => {
            expect(updatedRecord).not.toEqual(record);
            expect(updatedRecord).toEqual({ name: 'Updated', id: record.id});
          });
      });
  });

});