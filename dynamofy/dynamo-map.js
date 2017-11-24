module.exports = (map, parse, i) => !i ?
    Object.keys(map)
        .reduce((reduced, key) => {
            reduced[key] = parse(map[key], i + 1);
            return reduced;
        }, {}) :
    {
        M: Object.keys(map).reduce((reduced, key) => {
            reduced[key] = parse(map[key], i + 1);
            return reduced;
        }, {})
    };
