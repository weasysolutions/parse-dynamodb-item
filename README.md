# parse-dynamodb-item
parse dynamodb items

# install

```bash

npm install parse-dynamodb-item
```
# API

The api export two methods, one to parse item from dynamodb and other to parse items to dynamodb.

# parse(dynamoDBItem) -> JsonItem

# dynamofy(JsonItem) ->  dynamoDBItem

# Usage
```js
const parse = require('parse-dynamodb-item/parse');
const dynamofy = require('parse-dynamodb-item/dynamofy');


const parsed = parse({ S: 'string' });
const dynamofied = dynamofy(parsed);
assert.deepEqual(dynamofied, { S: 'string' });

const parsed = parse({ N: '1' });
const dynamofied = dynamofy(parsed);
assert.deepEqual(dynamofied, { N: 1 });

const dynamofied = dynamofy([ 1, 2, 3, 4 ]);
assert.deepEqual(dynamofied, { NS: [ 1, 2, 3, 4 ] });

const dynamofied = dynamofy([ 's', '2', '' ]);
assert.deepEqual(dynamofied, { SS: [ 's', '2', '' ] });

const dynamofied = dynamofy([ 's', '2', 1 ]);
assert.deepEqual(dynamofied, { L: [ 's', '2', 1 ] });

const parsed = parse({ B: Buffer('hola') });

const dynamofied = dynamofy(parsed);
assert.deepEqual(dynamofied, { B: Buffer('hola') });

const parsed = parse({ BOOL: 0 });
const dynamofied = dynamofy(parsed);
assert.deepEqual(dynamofied, { BOOL: false });

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

const parsed = parse({
    string:{ S:4 }
});
const dynamofied = dynamofy(parsed);
assert.deepEqual(dynamofied, {
    string:{ S:4 }
});

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

```


