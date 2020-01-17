import * as THREE from "./../libs/three.module.js";

function ParticlePool() {
    this.current = 0;
    this.particles = [];


    ParticlePool.prototype.New = function(prop) {
        this.current++;
        if(this.current == this.particles.length) {
            this.current = 0;
        }
        this.particles[this.current].alive = true;
        this.particles[this.current].x = prop.x;
        this.particles[this.current].y = prop.y;
        this.particles[this.current].z = prop.z;
        this.particles[this.current].vy = prop.vy || 0;
        this.particles[this.current].vz = prop.vz || 0;
        this.particles[this.current].vx = prop.vx || 0;
        this.particles[this.current].size = prop.size || 1;
        this.particles[this.current].life = prop.life || 1;
        this.particles[this.current].mass = prop.mass || 1;
        this.particles[this.current].decay = prop.decay || 10;
        this.particles[this.current].gravity = prop.gravity || -9.82;
        this.particles[this.current].color.setHSL(prop.h, prop.s, prop.l);
        this.particles[this.current].color.r = prop.r || 1.0;
        this.particles[this.current].color.g = prop.g || 1.0;
        this.particles[this.current].color.b = prop.b || 1.0;
        this.particles[this.current].condition = prop.condition || function(p,d,t) {};
        this.particles[this.current].action = prop.action || function(p,d,t) {};
        this.particles[this.current].effect = prop.effect || function(p,d,t) {};

        if (prop.onCreate != undefined) {
            prop.onCreate(this.particles[this.current]);
        }
    };
}

export {ParticlePool}
