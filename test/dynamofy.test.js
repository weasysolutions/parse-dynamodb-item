const assert = require('assert');

const parse = require('../parse');
const dynamofy = require('../dynamofy');
describe('test to parse', () => {
    it('should parse a string', () => {
        const parsed = parse({ S: 'string' });
        const dynamofied = dynamofy(parsed);
        assert.deepEqual(dynamofied, { S: 'string' });
    });

    it('should parse a number', () => {
        const parsed = parse({ N: '1' });
        const dynamofied = dynamofy(parsed);
        assert.deepEqual(dynamofied, { N: 1 });
    });

    it('should parse a list of numbers', () => {
        const dynamofied = dynamofy([ 1, 2, 3, 4 ]);
        assert.deepEqual(dynamofied, { NS: [ 1, 2, 3, 4 ] });
    });


    it('should parse a list of string', () => {
        const dynamofied = dynamofy([ 's', '2', '' ]);
        assert.deepEqual(dynamofied, { SS: [ 's', '2', '' ] });
    });

    it('should parse a list', () => {
        const dynamofied = dynamofy([ 's', '2', 1 ]);
        assert.deepEqual(dynamofied, { L: [ 's', '2', 1 ] });
    });

    it('should parse a buffer', () => {
        const parsed = parse({ B: Buffer('hola') });

        const dynamofied = dynamofy(parsed);
        assert.deepEqual(dynamofied, { B: Buffer('hola') });
    });

    it('should parse a boolean', () => {
        const parsed = parse({ BOOL: 0 });
        const dynamofied = dynamofy(parsed);
        assert.deepEqual(dynamofied, { BOOL: false });
    });

    it('should parse a map', () => {
        const parsed = parse({ test:{
            M: {
                string:{ S:4 }
            }
        }
        });
        const dynamofied = dynamofy(parsed);
        assert.deepEqual(dynamofied, { test:{
            M: {
                string:{ S:4 }
            }
        }
        });
    });

    it('should parse a map with string', () => {
        const parsed = parse({
            string:{ S:4 }
        });
        const dynamofied = dynamofy(parsed);
        assert.deepEqual(dynamofied, {
            string:{ S:4 }
        });
    });

    it('should parse a map with string', () => {
        const parsed = parse({
            string:{ S:4 },
            number:{ N:'4' },
            array:{ L:[ 1, 2, 3, 4 ] },
            map:{ M:{
                string:{ S:4 },
                number:{ N:'4' },
                array:{ L:[ 1, 2, 3, 4 ] },
                map:{ M:{
                    string: {
                        S: 2343
                    }
                } },
            } },
        });
        const dynamofied = dynamofy(parsed);
        assert.deepEqual(dynamofied, {
            string:{ S:4 },
            number:{ N:'4' },
            array:{ NS:[ 1, 2, 3, 4 ] },
            map:{ M:{
                string:{ S:4 },
                number:{ N:'4' },
                array:{ NS:[ 1, 2, 3, 4 ] },
                map:{ M:{
                    string: {
                        S: 2343
                    }
                } },
            } },
        });
    });
});
