const Hittable = require('./Hittable');
module.exports = class Sphere extends Hittable{
    /**
     * @param {Vector3} center
     * @param {number} radius
     * @param {Material} material
     */
    constructor(center, radius, material) {
        super();
        this.center = center;
        this.radius = radius;
        this.material = material;
    }

    /**
     * @override
     * @param ray - the ray to check
     * @param t_min
     * @param t_max
     * @returns {HitResult}
     */
    hit(ray, t_min, t_max) {
        //console.log('in sphere!');
        const oc = ray.origin.minus(this.center);
        const a = ray.direction.length_squared();
        const half_b = oc.dot(ray.direction);
        const c = oc.length_squared() - this.radius * this.radius;
        const discriminant = half_b * half_b - a * c;

        if (discriminant < 0) return { hit: false };

        const sqrtd = Math.sqrt(discriminant);

        let root = (-half_b - sqrtd) / a;
        if ( root < t_min || t_max < root) {
            root = (-half_b + sqrtd) / a;
            if (root < t_min || t_max < root) return { hit: false };
        }

        const outwardNormal = ray.at(root).minus(this.center).divN(this.radius);
        return this.setFaceNormal(ray, outwardNormal, {
            hit: true,
            point: ray.at(root),
            material: this.material,
            t: root,
        });
    }
    // hit(ray) {
    //     const oc = ray.origin.minus(this.center);
    //     const a = ray.direction.length_squared();
    //     const half_b = oc.dot(ray.direction);
    //     const c = oc.length_squared() - this.radius * this.radius;
    //     const discriminant = half_b * half_b - a * c;
    //     return (discriminant < 0) ?
    //         -1.0 :
    //         (-half_b - Math.sqrt(discriminant)) / a
    //     ;
    // }
};
