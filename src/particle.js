import * as THREE from "./../libs/three.module.js";

function Particle() {
    // Position in the buffergeo attr.
    this.i = 0;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.mass = 0;
    this.alive = false;
    this.size = 0;
    this.color = 0;
    this.decay = 0; 
    this.life = 0;
    this.gravity = -9.82;

    // Function callbacks
    this.condition = 0;
    this.action = 0;
    this.effect = 0;

    Particle.prototype.Init = function(i) {
        this.color = new THREE.Color();
        this.i = i;
    };

    Particle.prototype.Update = function(dt, time) {
        this.life -= dt;
        this.size -= dt*this.decay;

        var Cd = 0.47; // Dimensionless
        var rho = 1.22; // kg / m^3
        var A = Math.PI / (10000);
        var Fx = -0.5 * Cd * A * rho * this.vx * this.vx * this.vx / Math.abs(this.vx);
        var Fz = -0.5 * Cd * A * rho * this.vz * this.vz * this.vz / Math.abs(this.vz);
        var Fy = -0.5 * Cd * A * rho * this.vy * this.vy * this.vy / Math.abs(this.vy);

        Fx = (isNaN(Fx) ? 0 : Fx);
        Fy = (isNaN(Fy) ? 0 : Fy);
        Fz = (isNaN(Fz) ? 0 : Fz);

        // Calculate acceleration ( F = ma )
        var ax = Fx / this.mass;
        var ay = this.gravity + (Fy / this.mass);
        var az = Fz / this.mass;

        // Integrate to get velocity
        this.vx += ax*dt;
        this.vy += ay*dt;
        this.vz += az*dt;


        // Integrate to get position
        this.x += this.vx*dt*100;
        this.z += this.vz*dt*100;
        this.y += this.vy*dt*100;

        if(this.condition(this, dt, time)) {
            this.action(this, dt, time);
            this.Reset();
        }

        this.effect(this, dt, time);

        if(this.life <= 0 || this.size <= 0) {
            this.Reset();
        }
    };

    Particle.prototype.Reset = function() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.mass = 0;
        this.alive = false;
        this.size = 0;
        this.decay = 0;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.life = 0;
        this.level = 0;
    };
}

export {Particle}
