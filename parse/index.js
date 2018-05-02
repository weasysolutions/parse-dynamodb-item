const reductor = require('./reductor');

const parse = module.exports = (item) => Object
    .keys(item).reduce(reductor(item, parse), {});
