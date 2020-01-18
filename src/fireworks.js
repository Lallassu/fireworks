import * as THREE from "./../libs/three.module.js";

function Fireworks() {
    this.bombs = {};
    this.bombArray = [];
    this.effects = {};

    Fireworks.prototype.FireRandom = function() {
        var f = Math.random()*this.bombArray.length | 0;      
        //this.bombs[this.bombArray[f]]();
        this.bombs["green_bomb"]();
    };


    Fireworks.prototype.Init = function(world, pp, sh, lights) {
        var self = this;

        this.effects["glitter1"] = function(particle, dt, time) {
            if (this.vy <= 0) {
                particle.x += Math.sin(Math.PI*2*time)*Math.random()*3;
                particle.z += Math.sin(Math.PI*2*time)*Math.random()*3;
            }
            if(Math.random() < 1/particle.life) {
                pp.New({
                       x: particle.x,
                       y: particle.y,
                       z: particle.z,
                       mass: 0.002,
                       gravity: -0.5,
                       size: 20+Math.random()*40,
                       h: 1.0,
                       s: Math.random(),
                       l: 1.0,
                       life: Math.random(),
                       decay: 50,
                });
            }
        }

        this.effects["shell_explode1"] = function(particle, dt, time) {
            for (var i = 0; i < 300; i++) {
                pp.New({
                       x: particle.x,
                       y: particle.y,
                       z: particle.z,
                       size: Math.random()*50,
                       mass: 0.5,
                       gravity: -0.5,
                       vy: 0.5-Math.random(),
                       vx: 0.5-Math.random(),
                       vz: 0.5-Math.random(),
                       h: 0.5,
                       s: 1.0,
                       l: 1.0,
                       r: 0.0,
                       g: 0.0,
                       b: 1.0,
                       life: 0.1+Math.random()*2.5,
                       decay: Math.random()*50,
                });
            }
        }

        this.effects["shell_effect1"] = function(particle, dt, time) {
            // Spin shell
            particle.x += Math.sin(dt*time)*2;
            pp.New({
                   x: particle.x,
                   y: particle.y,
                   z: particle.z,
                   mass: 0.002,
                   gravity: -0.5,
                   size: 20+Math.random()*40,
                   h: 1.0,
                   s: Math.random(),
                   l: 1.0,
                   life: Math.random()*2,
                   decay: 50,
            });
        }

        this.effects["mortar_smoke"] = function(pos) {
            for (var i = 0; i < 100; i++) {
                pp.New({
                       effect: function(particle, dt, time) {
                           particle.vz += Math.sin(time*Math.random())/50;
                           particle.vx += Math.sin(time*Math.random())/50;
                       },
                       x: pos.x + 10-Math.random()*20,
                       y: pos.y + 30 +Math.random()*5,
                       z: pos.z + 10-Math.random()*20,
                       mass: 0.002,
                       gravity: Math.random(),
                       size: 20+Math.random()*100,
                       h: 0.5,
                       s: 0.5,
                       l: 0.5,
                       r: 0.2,
                       g: 0.2,
                       b: 0.2,
                       life: Math.random()*5,
                       decay: 20+Math.random()*20,
                });
            }
        }

        this.bombs["blue_flower"] = function() {
            var pos = world.GetLaunchPosition();
            self.effects["mortar_smoke"](pos);
            sh.Play("up1", 1.0);
            lights.NewLight(new THREE.Vector3(pos.x,30,pos.z), new THREE.Color(0.7, 0.3, 0), 10.0);

            pp.New({
                   effect: function(particle, dt, time) {
                      self.effects["shell_effect1"](particle, dt, time);
                   },
                   x: pos.x,
                   z: pos.z,
                   y: pos.y,
                   size: 100,
                   mass: 0.5,
                   vz: 0,
                   vx: 0,
                   vy: 10+Math.random()*5,
                   h: 0.9,
                   s: 0.5,
                   l: 0.5,
                   life: 5+Math.random()*5,
                   decay: 10+Math.random()*20,
                   condition: function(particle, dt, time) {
                       return particle.vy <= -Math.random()*20? true:false;
                   },
                   action: function(particle, dt, time) {
                       sh.Play("boom1", 1.0, false);
                       lights.SetHemi(2.0, 1.0, 0.2, 0.2);

                       self.effects["shell_explode1"](particle, dt, time);
                       var grav = -1-Math.random()*2;
                       var radius = 100;
                       for (var i = 0; i < 300; i++) {
                           var mx = Math.sin((Math.PI*2) * (i/300))*5;
                           var mz = Math.cos((Math.PI*2) * (i/300))*5;
                           pp.New({
                                  effect: function(particle, dt, time) {
                                      self.effects["glitter1"](particle, dt, time);
                                  },
                                  x: particle.x,
                                  y: particle.y,
                                  z: particle.z,
                                  size: Math.random()*500,
                                  mass: 0.001,
                                  gravity: grav,
                                  vy: 10-Math.sin(Math.PI*2*i)*10, 
                                  vz: mz, 
                                  vx: mx, 
                                  r: 0.2,
                                  g: 0.1,
                                  b: Math.random(),
                                  h: 0.9,
                                  s: Math.random(),
                                  l: 0.5,
                                  life: 0.1+Math.random()*3.5,
                                  decay: Math.random()*100,
                           });
                       }
                   }
            });
        }

        this.bombs["red_flower"] = function() {
            var pos = world.GetLaunchPosition();
            self.effects["mortar_smoke"](pos);
            sh.Play("up1", 1.0);
            lights.NewLight(new THREE.Vector3(pos.x,30,pos.z), new THREE.Color(0.7, 0.3, 0), 10.0);

            pp.New({
                   effect: function(particle, dt, time) {
                      self.effects["shell_effect1"](particle, dt, time);
                   },
                   x: pos.x,
                   z: pos.z,
                   y: pos.y,
                   size: 100,
                   mass: 0.5,
                   vz: 0,
                   vx: 0,
                   vy: 10+Math.random()*5,
                   h: 0.9,
                   s: 0.5,
                   l: 0.5,
                   life: 5+Math.random()*5,
                   decay: 10+Math.random()*20,
                   condition: function(particle, dt, time) {
                       return particle.vy <= -Math.random()*20? true:false;
                   },
                   action: function(particle, dt, time) {
                       sh.Play("boom1", 1.0, false);
                       lights.SetHemi(2.0, 1.0, 0.2, 0.2);

                       self.effects["shell_explode1"](particle, dt, time);
                       var grav = -1-Math.random()*2;
                       var radius = 100;
                       for (var i = 0; i < 300; i++) {
                           var mx = Math.sin((Math.PI*2) * (i/300))*5;
                           var mz = Math.cos((Math.PI*2) * (i/300))*5;
                           pp.New({
                                  effect: function(particle, dt, time) {
                                      self.effects["glitter1"](particle, dt, time);
                                  },
                                  x: particle.x,
                                  y: particle.y,
                                  z: particle.z,
                                  size: Math.random()*500,
                                  mass: 0.001,
                                  gravity: grav,
                                  vy: 10-Math.sin(Math.PI*2*i)*10, 
                                  vz: mz, 
                                  vx: mx, 
                                  r: Math.random(),
                                  g: 0.1,
                                  b: 0.2,
                                  h: 0.9,
                                  s: Math.random(),
                                  l: 0.5,
                                  life: 0.1+Math.random()*3.5,
                                  decay: Math.random()*100,
                           });
                       }
                   }
            });
        }

        this.bombs["green_bomb"] = function() {
            var pos = world.GetLaunchPosition();
            self.effects["mortar_smoke"](pos);
            sh.Play("up2", 1.0);
            lights.NewLight(new THREE.Vector3(pos.x,30,pos.z), new THREE.Color(0.7, 0.3, 0), 10.0);

            pp.New({
                   effect: function(particle, dt, time) {
                      self.effects["shell_effect1"](particle, dt, time);
                   },
                   x: pos.x,
                   z: pos.z,
                   y: pos.y,
                   size: 100,
                   mass: 0.5,
                   vz: 0,
                   vx: 0,
                   vy: 10+Math.random()*5,
                   h: 0.9,
                   s: 0.5,
                   l: 0.5,
                   life: 5+Math.random()*5,
                   decay: 10+Math.random()*20,
                   condition: function(particle, dt, time) {
                       return particle.vy <= -Math.random()*20? true:false;
                   },
                   action: function(particle, dt, time) {
                       sh.Play("boom3", 1.0, false);
                       lights.SetHemi(2.0, 1.0, 0.2, 0.2);

                       self.effects["shell_explode1"](particle, dt, time);
                       var grav = -1-Math.random()*2;
                       var radius = 100;
                       for (var i = 0; i < 100; i++) {
                           pp.New({
                                  effect: function(particle, dt, time) {
                                      self.effects["glitter1"](particle, dt, time);
                                  },
                                  x: particle.x,
                                  y: particle.y,
                                  z: particle.z,
                                  size: Math.random()*500,
                                  mass: 0.001,
                                  gravity: grav,
                                  vy: 5-Math.random()*10,
                                  vz: 10-Math.random()*20, 
                                  vx: 10-Math.random()*20, 
                                  r: 0.2,
                                  g: Math.random(),
                                  b: 0.4,
                                  h: 0.9,
                                  s: Math.random(),
                                  l: 0.5,
                                  life: 0.1+Math.random()*3.5,
                                  decay: Math.random()*100,
                           });
                       }
                   }
            });
        }

        // Save all to array so we can easily use randomizer.
        for(var key in this.bombs){
            this.bombArray.push(key);
        }
    };
}

export {Fireworks}
