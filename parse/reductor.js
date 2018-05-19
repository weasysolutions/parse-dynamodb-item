const parseString = require('./parse-string');
const parseBuffer = require('./parse-buffer');
const parseNumber = require('./parse-number');
const parseSet = require('./parse-set');
const parseMap = require('./parse-map');
const parseBool = require('./parse-bool');
const parseNull = require('./parse-null');

module.exports = (item, parse) => (reduced, prop) => {
    console.log('reduces ', reduced);
    if (!item.hasOwnProperty(prop)) return;
    if (prop === 'L' || prop === 'SS' || prop === 'NS') return parseSet(item[prop], parse);
    if (prop === 'B') return parseBuffer(item[prop]);
    if (prop === 'S') return parseString(item[prop]);
    if (prop === 'M') return parseMap(item[prop], parse);
    if (prop === 'N') return parseNumber(item[prop]);
    if (prop === 'BOOL') return parseBool(item[prop]);
    if (prop === 'NULL') return parseNull(item[prop]);
    if (item[prop].L) reduced[prop] = parseSet(item[prop].L, parse);
    if (item[prop].SS) reduced[prop] = parseSet(item[prop].SS, parse);
    if (item[prop].NS) reduced[prop] = parseSet(item[prop].NS, parse);
    if (item[prop].B) reduced[prop] = parseBuffer(item[prop].B);
    if (item[prop].S) reduced[prop] = parseString(item[prop].S);
    if (item[prop].M) reduced[prop] = parseMap(item[prop].M, parse);
    if (item[prop].N) reduced[prop] = parseNumber(item[prop].N);
    if (item[prop].BOOL) reduced[prop] = parseBool(item[prop].BOOL);
    if (item[prop].NULL) reduced[prop] = parseNull(item[prop].NULL);
    return reduced;
};
