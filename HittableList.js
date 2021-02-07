const Hittable = require('./Hittable');

module.exports = class HittableList extends Hittable{
    /**
     *
     * @param {Hittable} [object]
     */
    constructor(object) {
        super();
        this.objects = [];
        object && this.add(object);
    }

    /**
     * Adds an object to the list
     * @param {Hittable} object
     */
    add(object) {
        this.objects.push(object);
    }

    /**
     * removes all values
     */
    clear() {
        this.objects = [];
    }

    /**
     * Check if ray hits Hittable
     * @param ray - the ray to check
     * @param t_min
     * @param t_max
     * @returns {HitResult}
     */
    hit(ray, t_min, t_max) {
        let finalRec = { hit: false };
        let closest = t_max;

        for(const object of this.objects){
            const tmpRec = object.hit(ray, t_min, closest);
            if (tmpRec.hit /*&& closest > tmpRec.t*/) {
                closest = tmpRec.t;
                finalRec = tmpRec;
            }
        }
        return finalRec;
    }
};
