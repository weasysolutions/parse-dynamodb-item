const assert = require('assert');

const parse = require('../parse');

describe('test to parse', () => {
    it('should parse a string', () => {
        const parsed = parse({ S: 'string' });

        assert(parsed === 'string');
    });

    it('should parse a number', () => {
        const parsed = parse({ N: '1' });
        assert(parsed == 1);
    });

    it('should parse a buffer', () => {
        const parsed = parse({ B: Buffer('hola') });

        assert(Buffer.isBuffer(parsed));
    });

    it('should parse a boolean', () => {
        const parsed = parse({ BOOL: 0 });

        assert(parsed == false);
    });

    it('should parse a map', () => {
        const parsed = parse({ test:{
            M: {
                string:{ S:4 }
            }
        }
        });
        assert.deepEqual(parsed, { test: { string: '4' } });
    });

    it('should parse a map with string', () => {
        const parsed = parse({
            string:{ S:4 }
        });
        assert.deepEqual(parsed, { string: '4' });
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
        assert.deepEqual(parsed, {
            string: '4',
            number: 4,
            array: [ 1, 2, 3, 4 ],
            map:
         { string: '4',
             number: 4,
             array: [ 1, 2, 3, 4 ],
             map: { string: '2343' } } });
    });
});
