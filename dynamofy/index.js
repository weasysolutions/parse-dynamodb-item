const { isArray } = Array;
const { isBuffer } = Buffer;

const dynamofyString = require('./dynamo-string');
const dynamofyBuffer = require('./dynamo-buffer');
const dynamofyNumber = require('./dynamo-number');
const dynamofySet = require('./dynamo-set');
const dynamofyMap = require('./dynamo-map');
const dynamofyBool = require('./dynamo-bool');
const dynamofyNull = require('./dynamo-null');

const dynamofy = module.exports = function(item, i = 0) {
    const type = typeof item
    if (isArray(item)) return dynamofySet(item);
    if (isBuffer(item)) return dynamofyBuffer(item);

    if (type === 'string') return dynamofyString(item);
    if (type === 'object') return dynamofyMap(item, dynamofy, i);
    if (type === 'number') return dynamofyNumber(item);
    if (type === 'boolean') return dynamofyBool(item);
    if (item === null) return dynamofyNull(item);
};
