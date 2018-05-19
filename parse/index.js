const reductor = require('./reductor');

const parse = module.exports = (item) => {
    if (typeof item !== 'object') return item;
    return Object
        .keys(item)
        .reduce(reductor(item, parse), {});
}
;
