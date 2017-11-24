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
    if (isArray(item)) return dynamofySet(item);
    if (isBuffer(item)) return dynamofyBuffer(item);

    if (typeof item === 'string') return dynamofyString(item);
    if (typeof item === 'object') return dynamofyMap(item, dynamofy, i);
    if (typeof item === 'number') return dynamofyNumber(item);
    if (typeof item === 'boolean') return dynamofyBool(item);
    if (item === null) return dynamofyNull(item);
};
