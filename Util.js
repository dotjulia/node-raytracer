module.exports = {
    randomNumber(min, max) {
        if (min === undefined || max === undefined) {
            return Math.random();
        } else {
            return min + (max - min) * module.exports.randomNumber();
        }
    },
    clamp(x,min,max) {
        if (x < min) return min;
        if (x > max) return max;
        return x;
    }
};
