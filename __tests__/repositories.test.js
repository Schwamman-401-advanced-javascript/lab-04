const Categories = require('../categories/categories.js');
const Products = require('../categories/products.js');

function runTests(Constructor, testObj, updatedTestObj) {
  describe(`${Constructor.name} Model`, () => {

    let repository;
  
    beforeEach(() => {
      repository = new Constructor();
    });
  
    // How might we repeat this to check on types?
    it('sanitize() returns undefined with missing requirements', () => {
      const schema = repository.schema;
      var testRecord = {};
      for (var field in schema) {
        if (schema[field].required) {
          testRecord[field] = null;
        }
      }
      expect(repository.sanitize(testRecord)).toBeUndefined();
    });
  
    it('can create() a new category', () => {
      return repository.create(testObj)
        .then(record => {
          Object.keys(testObj).forEach(key => {
            expect(record[key]).toEqual(testObj[key]);
          });
        })
        .catch(e => console.error('ERR', e));
    });
  
    it('can get() a category', () => {
      return repository.create(testObj)
        .then(record => {
          return repository.get(record.id)
            .then(category => {
              Object.keys(testObj).forEach(key => {
                expect(category[0][key]).toEqual(testObj[key]);
              });
            });
        });
    });
  
    it('can delete() a category', () => {
      return repository.create(testObj)
        .then(record => {
          return repository.delete(record.id)
            .then(() => {
              return repository.get(record.id)
                .then(result => {
                  expect(result).toEqual([]);
                });
            });
        });
    });
  
    it('can update() a category', () => {
      return repository.create(testObj)
        .then(record => {
          updatedTestObj.id = record.id;
          return repository.update(record.id, updatedTestObj)
            .then(updatedRecord => {
              expect(updatedRecord).not.toEqual(record);
              expect(updatedRecord).toEqual(updatedTestObj);
            });
        });
    });
  
  });
}

runTests(Categories, { name: 'Test Category' }, { name: 'Updated'});
runTests(Products, { category_id: 1, price: 10.00, quantity_in_stock: 2 }, { category_id: 2, price: 8.00, quantity_in_stock: 8 });
