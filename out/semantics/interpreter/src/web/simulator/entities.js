import { Vector, Ray } from './utils.js';
export class Robot {
    constructor(pos, size, angle, speed, scene) {
        this.type = "Robot";
        this.pos = pos;
        this.size = size;
        this.rad = angle * Math.PI / 180;
        this.speed = speed;
        this.scene = scene;
    }
    intersect(ray) {
        return [];
    }
    turn(angle) {
        // To implement
    }
    move(dist) {
        // To implement
    }
    side(dist) {
        // To implement
    }
    getRay() {
        return new Ray(this.pos, Vector.fromAngle(this.rad, 10000).scale(-1));
    }
}
export class Timestamp extends Robot {
    constructor(time, robot) {
        super(robot.pos.scale(1), robot.size.scale(1), robot.rad, robot.speed, robot.scene);
        this.rad = robot.rad;
        this.time = time;
    }
}
export class Block {
    constructor(pos, size) {
        this.type = "Block";
        this.pos = pos;
        this.size = size;
    }
    intersect(ray) {
        let getPOI = ray.getPoiFinder();
        let pois = new Array(4);
        pois[0] = getPOI(this.pos, this.pos.plus(this.size.projX()));
        pois[1] = getPOI(this.pos, this.pos.plus(this.size.projY()));
        pois[2] = getPOI(this.pos.plus(this.size.projX()), this.pos.plus(this.size));
        pois[3] = getPOI(this.pos.plus(this.size.projY()), this.pos.plus(this.size));
        return pois.filter(x => x !== undefined);
    }
}
export class Wall {
    constructor(p1, p2) {
        this.type = "Wall";
        this.pos = p1;
        this.size = p2;
    }
    intersect(ray) {
        const poi = ray.getPoiFinder()(this.pos, this.size);
        return poi ? [poi] : [];
    }
}
//# sourceMappingURL=entities.js.map