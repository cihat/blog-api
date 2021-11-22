const mongosoe = require('mongoose');
const Schema = mongosoe.Schema;

const testSchema = new Schema({

})

module.exports = mongosoe.model('test', testSchema);