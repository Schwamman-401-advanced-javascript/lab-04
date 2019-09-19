'use strict';

const uuid = require('uuid/v4');
const validator = require('./lib/validator');

class Model {

  constructor(schema) {
    this.database = [];
    this.schema = schema;
  }

  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  create(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  update(id, entry) {
    let record = this.sanitize(entry);
    console.log(record);
    if (id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  sanitize(entry) {
    return validator.isValid(this.schema, entry) ? entry : undefined;
  }

}

module.exports = Model;