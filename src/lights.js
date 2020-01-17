import * as THREE from "./../libs/three.module.js";

function Lights() {
    this.lights = new Array();
    this.hemisphereLight = 0;
    this.ambientLight = 0;

    Lights.prototype.Init = function(numOfLights, scene) {
        this.ambientLight = new THREE.AmbientLight( 0x404040 );
        scene.add(this.ambientLight);
        this.hemisphereLight = new THREE.HemisphereLight( 0xAA6677, 0xAACC22, 0.5);
        scene.add(this.hemisphereLight);

        for (var i = 0; i < numOfLights; i++) {
            var light = new Light();
            light.Init(scene, 0, 0, 0);
            this.lights.push(light);
        }
    };

    Lights.prototype.SetHemi = function(intensity, r, g, b) {
        this.hemisphereLight.intensity = intensity;
        this.hemisphereLight.color.r = r;
        this.hemisphereLight.color.g = g;
        this.hemisphereLight.color.b = b;
    };

    Lights.prototype.NewLight = function(pos, color, intensity) {
        var use = 0;
        for (var i = 0; i < this.lights.length; i++) {
            if(!this.lights[i].alive) {
                use = i;
                break;
            }
        }
        this.lights[use].Set(pos, color, intensity);
    };

    Lights.prototype.Update = function(dt, time) {
        for(var i = 0; i < this.lights.length; i++) {
            if (this.lights[i].alive) {
                this.lights[i].Update(dt, time);
            }
        }

        if(this.hemisphereLight.intensity > 0.5) {
            this.hemisphereLight.intensity -= 0.1;
        } else {
            this.hemisphereLight.color.r = 0.66666;
            this.hemisphereLight.color.g = 0.4;
            this.hemisphereLight.color.b = 0.46666;
        }
    };
}

function Light() {
    this.light = 0;
    this.alive = false;

    Light.prototype.Init = function(scene) {
        this.light = new THREE.PointLight(0x332200, 0, 100);
        this.light.position.set(this.x, this.y, this.z);
        scene.add(this.light);
    };
    
    Light.prototype.Set = function(pos, color, intensity) {
        this.light.position.x = pos.x;
        this.light.position.y = pos.y;
        this.light.position.z = pos.z;
        this.light.intensity = intensity;
        this.light.color.r = color.r;
        this.light.color.g = color.g;
        this.light.color.b = color.b;
        this.alive = true;
    };

    Light.prototype.Update = function(dt, time) {
        if(this.light.intensity > 0) {
            this.light.intensity -= 1;
        } else {
            this.alive = false;
        }
    };
}

export {Lights}
