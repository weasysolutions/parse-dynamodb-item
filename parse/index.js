const { isArray } = Array;
const { isBuffer } = Buffer;

const parseString = require('./parse-string');
const parseBuffer = require('./parse-buffer');
const parseNumber = require('./parse-number');
const parseSet = require('./parse-set');
const parseMap = require('./parse-map');
const parseBool = require('./parse-bool');
const parseNull = require('./parse-null');


const parse = module.exports = (item) => Object.keys(item).reduce((reduced, prop) => {
    if (!item.hasOwnProperty(prop)) return;
    else if (prop === 'L' || prop === 'SS' || prop === 'NS') return parseSet(item[prop]);
    else if (prop === 'B') return parseBuffer(item[prop]);
    else if (prop === 'S') return parseString(item[prop]);
    else if (prop === 'M') return parseMap(item[prop], parse);
    else if (prop === 'N') return parseNumber(item[prop]);
    else if (prop === 'BOOL') return parseBool(item[prop]);
    else if (prop === 'NULL') return parseNull(item[prop]);
    else if (item[prop].L || item[prop].SS || item[prop].NS) reduced[prop] = parseSet(item[prop].L);
    else if (item[prop].B) reduced[prop] = parseBuffer(item[prop].B);
    else if (item[prop].S) reduced[prop] = parseString(item[prop].S);
    else if (item[prop].M) reduced[prop] = parseMap(item[prop].M, parse);
    else if (item[prop].N) reduced[prop] = parseNumber(item[prop].N);
    else if (item[prop].BOOL) reduced[prop] = parseBool(item[prop].BOOL);
    else if (item[prop].NULL) reduced[prop] = parseNull(item[prop].NULL);
    return reduced;
}, {});
