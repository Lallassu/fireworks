import * as THREE from "./../libs/three.module.js";

function Fireworks() {
    this.bomb = 0;
    this.flairEffect = 0;
    this.mortarEffect = 0;
    this.shellEffect = 0;
    this.explodeEffect = 0;
    this.crackleEffect = 0;
    this.maxSize = 10;

    Fireworks.prototype.FireRandom = function() {
        this.bomb();
    };


    Fireworks.prototype.Init = function(world, pp, sh, lights) {
        var self = this;

        // Mortar effects are for the mortar when shooting up the shell.
        this.mortarEffect = function(pos) {
            // Random mortar sound
            sh.PlayRandomMortar(1.0);
            // Mortar light color -> yellowish
            lights.NewLight(new THREE.Vector3(pos.x,30,pos.z), new THREE.Color(0.7, 0.3, 0), 10.0);

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
        };


        // Shell effects are effects for the shell itself while
        // in the air.
        this.shellEffect = function(particle, dt, time, seed) {
            var max = 1;
            var vx = 0;
            var vz = 0;
            switch(seed) {
            case 1:
                max = Math.random()*30;
                break;
            case 2:
                particle.x += Math.cos(Math.PI*2*time)*Math.random()*3;
                particle.z += Math.sin(Math.PI*2*time)*Math.random()*3;
                break;
            case 3:
                if(Math.random() > 0.5) {
                    particle.size = 150;
                } else {
                    particle.size = 10;
                }
                max = Math.random()*10;
                vx = 2-Math.random()*4;
                vz = 2-Math.random()*4;
                break;
            }
            for(var i = 0; i < max; i++) {
                pp.New({
                       x: particle.x,
                       y: particle.y,
                       z: particle.z,
                       mass: 0.002,
                       gravity: -0.2,
                       size: 20+Math.random()*40,
                       vx: vx,
                       vz: vz,
                       r: 1.0,
                       g: 0,
                       b: 0,
                       h: 1.0,
                       s: 0.5,
                       l: 0.0,
                       life: Math.random()*3,
                       decay: 50,
                });
            }
        };

        this.crackleEffect = function(particle, dt, time, seed, color) {
            var r = 0;
            var g = 0;
            var b = 0;
            var h = 1.0;
            var s = 1.0;
            var l = 1.0;
            switch(seed) {
            case 1:
                if(Math.random() < 0.2) {
                    sh.PlayRandomCrackle(0.1);
                }
                break;
            case 2:
                if(Math.random() < 0.2) {
                    sh.PlayRandomLightBoom(0.1);
                }
                break;
            case 3:
                if(Math.random() < 0.2) {
                    sh.PlayRandomHeavyBoom(0.1);
                }
                r = color.r*2;
                g = color.g*2;
                b = color.b;
                h = Math.random();
                s = Math.random();
                l = Math.random();
                break;
            }
            for (var i = 0; i < 10+Math.random()*150; i++) {
                var size = Math.random()*80;
                var gravity = -0.2;
                var vy = 1-Math.random()*2;
                var vx = 1-Math.random()*2;
                var vz = 1-Math.random()*2;
                var life = 0.1+Math.random()*2;
                if (Math.random()> 0.5 && seed == 2) {
                    r = color.r;
                    g = color.g;
                    b = color.b;
                    h = Math.random();
                    s = Math.random();
                    l = Math.random();
                }
                pp.New({
                       x: particle.x,
                       y: particle.y,
                       z: particle.z,
                       size: size,
                       mass: 0.02,
                       gravity: gravity,
                       r: r,
                       g: g,
                       b: b,
                       h: h,
                       s: s,
                       l: l,
                       vy: vy,
                       vx: vx,
                       vz: vz,
                       life: life,
                       decay: Math.random()*50,
                });
            }
        };

        this.explodeEffect = function(particle, dt, time, seed) {
            for (var i = 0; i < 100+Math.random()*200; i++) {
                var size = Math.random()*80;
                var gravity = -0.5;
                var vy = 1-Math.random()*2;
                var vx = 1-Math.random()*2;
                var vz = 1-Math.random()*2;
                var life = 0.1+Math.random();
                switch(seed) {
                case 1:
                case 2:
                case 3:
                }
                pp.New({
                       x: particle.x,
                       y: particle.y,
                       z: particle.z,
                       size: size,
                       mass: 0.5,
                       gravity: gravity,
                       vy: vy,
                       vx: vx,
                       vz: vz,
                       life: life,
                       decay: Math.random()*50,
                });
            }
        };

        // The flair effect for individual flairs.
        this.flairEffect = function(particle, dt, time, seed, color, size) {
            var r = 1.0;
            var g = 0;
            var b = 0;
            switch(seed) {
            case 1:
                if(Math.random() > 0.5) {
                    particle.size = 250;
                } else {
                    particle.size = 10;
                }
                break;
            case 2:
                if(particle.vy < 0) {
                    particle.x += Math.cos(Math.PI*2*time)*Math.random()*3;
                    particle.z += Math.sin(Math.PI*2*time)*Math.random()*3;
                }
                break;
            case 3:
                if(Math.random() > 0.5) {
                    particle.size = 150;
                } else {
                    particle.size = 10;
                }
                if(Math.random() > 0.5) {
                    r = color.r;
                    g = color.g;
                    b = color.b;
                }
                break;
            }

            if(size > 250 && particle.life < 1.0) {
                if(Math.random() < 0.05) {
                    this.crackleEffect(particle, dt, time, seed, color);
                    particle.Reset();
                }
            }

            pp.New({
                   x: particle.x,
                   y: particle.y,
                   z: particle.z,
                   mass: 0.002,
                   gravity: -0.2,
                   size: 20+Math.random()*40,
                   r: r,
                   g: g,
                   b: b,
                   h: 1.0,
                   s: 0.5,
                   l: 0.0,
                   life: Math.random()*3,
                   decay: 50,
            });
        };

        // The whole bomb
        this.bomb = function() {
            var pos = world.GetLaunchPosition();
            // Random mortar effect
            self.mortarEffect(pos);

            var seed = Math.random()*4 |0;

            // Colors of the bomb effect
            var color = new THREE.Color(Math.random(), Math.random(), Math.random());


            // Generate size of bomb
            var size = 20+Math.random()*Math.min(350, self.maxSize);
            self.maxSize += 20;

            pp.New({
                   effect: function(particle, dt, time) {
                       self.shellEffect(particle, dt, time, seed);
                   },
                   x: pos.x,
                   z: pos.z,
                   y: pos.y,
                   size: size,
                   mass: 0.5,
                   vz: 0,
                   vx: 0,
                   vy: 10+Math.min(size/30, 7),
                   h: 0.9,
                   s: 0.5,
                   l: 0.5,
                   r: color.r,
                   g: color.g,
                   b: color.b,
                   life: 20,
                   decay: 10+Math.random()*20,
                   condition: function(particle, dt, time) {
                       return particle.vy <= -Math.random()*20? true:false;
                   },
                   action: function(particle, dt, time) {
                       // Play random boom based on size
                       if (size > 200) {
                           sh.PlayRandomHeavyBoom(1.0);
                       } else {
                           sh.PlayRandomLightBoom(1.0);
                       }

                       // color hemilight after generated color and intensity after size
                       lights.SetHemi(size/100, color.r, color.g, color.b);

                       // Random explode effect
                       self.explodeEffect(particle, dt, time, seed);

                       // Random gravity for the flairs
                       var grav = -0.1-Math.random()*2;

                       // Max life of particles
                       var maxLife = 1+Math.random()*6;

                       var radius = 50+Math.random()*50;
                       var speed = 2+Math.random()*2;
                       var offset = 2/size;
                       var inc = Math.PI*(3.0 - Math.sqrt(5.0));
                       for (var i = 0; i < size; i++) {
                           // Spinning effect
                           var vx, vy, vz;
                           switch(seed) {
                           case 1:
                               vy = Math.abs(((i * offset) - 1) + (offset / 2));
                               var r = Math.sqrt(1 - Math.pow(vy,2));
                               var phi = ((i + 1.0) % size) * inc;
                               vx = Math.cos(phi) * r;
                               vz = Math.sin(phi) * r;
                               vx *= speed;
                               vy *= speed;
                               vz *= speed;
                               break;
                           case 2:
                               vy = 1+Math.random()*2;
                               vx = Math.sin(i*Math.PI*2*speed)*(2-Math.random()*4);
                               vz = Math.sin(i*Math.PI*2*speed)*(2-Math.random()*4);
                               break;
                           default:
                               vy = ((i * offset) - 1) + (offset / 2);
                               var r = Math.sqrt(1 - Math.pow(vy,2));
                               var phi = ((i + 1.0) % size) * inc;
                               vx = Math.cos(phi) * r;
                               vz = Math.sin(phi) * r;
                               vx *= speed;
                               vy *= speed;
                               vz *= speed;
                               break;
                           }

                           pp.New({
                                  effect: function(particle, dt, time) {
                                      self.flairEffect(particle, dt, time, seed, color, size);
                                  },
                                  x: particle.x,
                                  y: particle.y,
                                  z: particle.z,
                                  size: size,
                                  mass: 0.001,
                                  gravity: grav,
                                  vy: vy,
                                  vz: vz, 
                                  vx: vx, 
                                  r: color.r,
                                  g: color.g,
                                  b: color.b,
                                  h: Math.random(),
                                  s: Math.random(),
                                  l: Math.random(),
                                  life: 0.5+Math.random()*maxLife,
                                  decay: Math.random()*100,
                           });
                       }
                   }
            });
        };
    };
}

export {Fireworks}
