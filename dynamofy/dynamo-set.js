module.exports = (list) => {
    let type = null;
    let current = null;
    for (let i = 0; i < list.length; i++) {
        current = typeof list[i];
        type = type || current;
        if (type !== 'string' && type !== 'number') type = null;
        if (type !== current) return { L:list };
    }
    if (type === 'string') return { SS: list };
    if (type === 'number') return { NS: list };
};
