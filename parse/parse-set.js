module.exports = (list, parse) => {
    console.log('list ', list);
    console.log('parse  ', parse);
    return Array.from(list).map((item) => parse(item));
};
