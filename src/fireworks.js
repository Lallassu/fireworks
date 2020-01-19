import * as THREE from "./../libs/three.module.js";

function Fireworks() {
    this.bombs = {};
    this.bombArray = [];
    this.effects = {};
    this.last = 0;

    Fireworks.prototype.FireRandom = function() {
       var f = Math.random()*this.bombArray.length | 0;      
       this.bombs[this.bombArray[f]]();
       // this.last++;
       // if (this.last >= this.bombArray.length) {
       //     this.last = 0;
       // }
       // this.bombs[this.bombArray[this.last]]();
        //this.bombs["test2"]();
    };


    Fireworks.prototype.Init = function(world, pp, sh, lights) {
        var self = this;

        this.effects["glitter3"] = function(particle, dt, time) {
            pp.New({
                   x: particle.x,
                   y: particle.y,
                   z: particle.z,
                   mass: 0.002,
                   gravity: -0.2,
                   size: 20+Math.random()*40,
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

        this.effects["glitter1"] = function(particle, dt, time) {
            if (particle.vy <= 0) {
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

        this.effects["glitter2"] = function(particle, dt, time) {
            particle.x += Math.sin(Math.PI*2*time)*Math.random()*3;
            particle.z += Math.sin(Math.PI*2*time)*Math.random()*3;
            for(var i = 0; i < 50; i++) {
                pp.New({
                       x: particle.x,
                       y: particle.y,
                       z: particle.z,
                       mass: 0.02,
                       gravity: -0.5,
                       size: 20+Math.random()*80,
                       vy: 2-Math.random()*4,
                       vz: 2-Math.random()*4,
                       vx: 2-Math.random()*4,
                       h: 1.0,
                       s: Math.random(),
                       l: Math.random(),
                       r: 1.0,
                       g: 1.0,
                       b: 1.0,
                       life: Math.random()*2,
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
            // Particles when going up
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

        this.effects["shell_effect2"] = function(particle, dt, time) {
            // Spin shell
            particle.x += Math.sin(dt*time)*2;
            // many particles when going up
            for( var i = 0; i < 10; i++) {
                pp.New({
                       x: particle.x,
                       y: particle.y,
                       z: particle.z,
                       vz: 2-Math.random()*4,
                       vx: 2-Math.random()*4,
                       mass: 0.002,
                       gravity: 0.2,
                       size: 20+Math.random()*40,
                       h: 1.0,
                       s: 1.0, //Math.random(),
                       l: 0.5,
                       r: 0.2,
                       g: 0.2,
                       b: 0.7,
                       life: Math.random()*2,
                       decay: 50,
                });
            }
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
                       lights.SetHemi(2.0, 0.2, 0.2, 1.0);

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
                                  size: Math.random()*300,
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

        this.bombs["test2"] = function() {
            var pos = world.GetLaunchPosition();
            self.effects["mortar_smoke"](pos);
            sh.Play("up1", 1.0);
            lights.NewLight(new THREE.Vector3(pos.x,30,pos.z), new THREE.Color(0.7, 0.3, 0), 10.0);
            var color = new THREE.Color(Math.random(), Math.random(), Math.random());

            pp.New({
                   effect: function(particle, dt, time) {
                      self.effects["shell_effect1"](particle, dt, time);
                   },
                   x: pos.x,
                   z: pos.z,
                   y: pos.y,
                   size: 200,
                   mass: 0.2,
                   vz: 0,
                   vx: 0,
                   vy: 15,
                   h: color.r,
                   s: color.g,
                   l: color.b,
                   life: 5+Math.random()*5,
                   decay: 10+Math.random()*20,
                   condition: function(particle, dt, time) {
                       return particle.vy <= -Math.random()*20? true:false;
                   },
                   action: function(particle, dt, time) {
                       sh.Play("boom1", 1.0, false);
                       lights.SetHemi(2.0, 0.5, 0.5, 0.5);

                       self.effects["shell_explode1"](particle, dt, time);
                       var grav = -1-Math.random()*2;
                       var radius = 50+Math.random()*50;
                       var crack = Math.random() > 0.5? true:false;
                       for (var i = 0; i < 100; i++) {
                           pp.New({
                                  effect: function(particle, dt, time) {
                                      self.effects["glitter3"](particle, dt, time);
                                      if(Math.random() > 0.5) {
                                          particle.size = 200;
                                      } else {
                                          particle.size = 50;
                                      }
                                  },
                                  condition: function(particle, dt, time) {
                                      return particle.life <= 0.1 && Math.random() < 0.1 ? true: false;
                                  },
                                  action: function(particle, dt, time) {
                                      if(crack) {
                                          self.effects["glitter2"](particle, dt, time);
                                          if(Math.random() > 0.8) {
                                              sh.Play("crackle1", 0.1, false);
                                          } 
                                      }
                                      particle.Reset();
                                  },
                                  x: particle.x,
                                  y: particle.y,
                                  z: particle.z,
                                  size: Math.random()*200,
                                  mass: 0.001,
                                  gravity: grav/2,
                                  vy: Math.random()*4,
                                  vz: 3-Math.random()*6, 
                                  vx: 3-Math.random()*6, 
                                  r: color.r, 
                                  g: color.g, 
                                  b: color.b, 
                                  h: color.r, 
                                  s: color.g, 
                                  l: color.b, 
                                  life: 0.1+Math.random()*2.5,
                                  decay: Math.random()*50,
                           });
                       }
                   }
            });
        }


        this.bombs["test"] = function() {
            var pos = world.GetLaunchPosition();
            self.effects["mortar_smoke"](pos);
            sh.Play("up3", 1.0);
            lights.NewLight(new THREE.Vector3(pos.x,30,pos.z), new THREE.Color(0.7, 0.3, 0), 10.0);

            pp.New({
                   effect: function(particle, dt, time) {
                      self.effects["shell_effect1"](particle, dt, time);
                   },
                   x: pos.x,
                   z: pos.z,
                   y: pos.y,
                   size: 200,
                   mass: 0.2,
                   vz: 0,
                   vx: 0,
                   vy: 15,
                   h: 0.9,
                   s: 0.9,
                   l: 0.9,
                   life: 5+Math.random()*5,
                   decay: 10+Math.random()*20,
                   condition: function(particle, dt, time) {
                       return particle.vy <= -Math.random()*20? true:false;
                   },
                   action: function(particle, dt, time) {
                       sh.Play("boom1", 1.0, false);
                       lights.SetHemi(2.0, 0.5, 0.5, 0.5);

                       self.effects["shell_explode1"](particle, dt, time);
                       var grav = -1-Math.random()*2;
                       var radius = 50+Math.random()*50;
                       var color = new THREE.Color(Math.random(), Math.random(), Math.random());
                       for (var i = 0; i < 100; i++) {
                           pp.New({
                                  effect: function(particle, dt, time) {
                                      self.effects["glitter1"](particle, dt, time);
                                      if(Math.random() > 0.5) {
                                          particle.size = 100;
                                      } else {
                                          particle.size = 50;
                                      }
                                  },
                                  condition: function(particle, dt, time) {
                                      return particle.life <= 0.1 && Math.random() < 0.1 ? true: false;
                                  },
                                  action: function(particle, dt, time) {
                                      self.effects["shell_explode1"](particle, dt, time);
                                      if (Math.random() <0.2) {
                                        sh.Play("boom2", 0.1, false);
                                      }
                                      particle.Reset();
                                  },
                                  x: particle.x,
                                  y: particle.y,
                                  z: particle.z,
                                  size: Math.random()*200,
                                  mass: 0.001,
                                  gravity: grav/2,
                                  vy: 2-Math.random()*4,
                                  vz: 5-Math.random()*10, 
                                  vx: 5-Math.random()*10, 
                                  r: color.r, 
                                  g: color.g, 
                                  b: color.b, 
                                  h: color.r, 
                                  s: color.g, 
                                  l: color.b, 
                                  life: 0.1+Math.random()*4.5,
                                  decay: Math.random()*20,
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
                       var radius = 50+Math.random()*50;
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
                                  size: Math.random()*300,
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

        this.bombs["gold_bomb"] = function() {
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
                   size: 200,
                   mass: 0.2,
                   vz: 0,
                   vx: 0,
                   vy: 10+Math.random()*6,
                   h: 0.9,
                   s: 0.9,
                   l: 0.9,
                   life: 5+Math.random()*5,
                   decay: 10+Math.random()*20,
                   condition: function(particle, dt, time) {
                       return particle.vy <= -Math.random()*20? true:false;
                   },
                   action: function(particle, dt, time) {
                       sh.Play("boom1", 1.0, false);
                       lights.SetHemi(2.0, 0.5, 0.5, 0.5);

                       self.effects["shell_explode1"](particle, dt, time);
                       var grav = -1-Math.random()*2;
                       var radius = 100;
                       for (var i = 0; i < 50; i++) {
                           pp.New({
                                  effect: function(particle, dt, time) {
                                      self.effects["glitter1"](particle, dt, time);
                                      if(Math.random() > 0.5) {
                                          particle.size = 100;
                                      } else {
                                          particle.size = 50;
                                      }
                                  },
                                  condition: function(particle, dt, time) {
                                      return particle.life <= 0.1? true: false;
                                  },
                                  action: function(particle, dt, time) {
                                      self.effects["glitter2"](particle, dt, time);
                                      if(Math.random() > 0.8) {
                                          sh.Play("crackle1", 0.1, false);
                                      } 
                                      particle.Reset();
                                  },
                                  x: particle.x,
                                  y: particle.y,
                                  z: particle.z,
                                  size: Math.random()*300,
                                  mass: 0.001,
                                  gravity: grav,
                                  vy: 2-Math.random()*4,
                                  vz: 5-Math.random()*10, 
                                  vx: 5-Math.random()*10, 
                                  r: 1.0,
                                  g: 0.6,
                                  b: 0.0,
                                  h: 0.9,
                                  s: Math.random(),
                                  l: 0.5,
                                  life: 0.1+Math.random()*3.5,
                                  decay: Math.random()*50,
                           });
                       }
                   }
            });
        }

        this.bombs["silver_bomb"] = function() {
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
                   size: 200,
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
                       lights.SetHemi(2.0, 0.2, 1.0, 0.2);

                       self.effects["shell_explode1"](particle, dt, time);
                       var grav = -1-Math.random()*2;
                       var radius = 100;
                       for (var i = 0; i < 100; i++) {
                           pp.New({
                                  effect: function(particle, dt, time) {
                                      self.effects["glitter1"](particle, dt, time);
                                      if(Math.random() > 0.5) {
                                          particle.size = 200;
                                      } else {
                                          particle.size = 50;
                                      }
                                  },
                                  condition: function(particle, dt, time) {
                                      return particle.life <= 0.1? true: false;
                                  },
                                  action: function(particle, dt, time) {
                                      self.effects["glitter2"](particle, dt, time);
                                      if(Math.random() > 0.5) {
                                          sh.Play("crackle2", 0.1, false);
                                      }
                                      particle.Reset();
                                  },
                                  x: particle.x,
                                  y: particle.y,
                                  z: particle.z,
                                  size: Math.random()*300,
                                  mass: 0.001,
                                  gravity: grav,
                                  vy: 5-Math.random()*10,
                                  vz: 5-Math.random()*10, 
                                  vx: 5-Math.random()*10, 
                                  r: 1.0,
                                  g: 1.0,
                                  b: 1.0,
                                  h: 0.9,
                                  s: Math.random(),
                                  l: 0.5,
                                  life: 0.1+Math.random()*3.5,
                                  decay: Math.random()*50,
                           });
                       }
                   }
            });
        }

        this.bombs["random_bomb"] = function() {
            var pos = world.GetLaunchPosition();
            self.effects["mortar_smoke"](pos);
            sh.Play("up3", 1.0);
            lights.NewLight(new THREE.Vector3(pos.x,30,pos.z), new THREE.Color(0.7, 0.3, 0), 10.0);
            var color = new THREE.Color(Math.random(), Math.random(), Math.random());

            pp.New({
                   effect: function(particle, dt, time) {
                      self.effects["shell_effect2"](particle, dt, time);
                   },
                   x: pos.x,
                   z: pos.z,
                   y: pos.y,
                   size: 100,
                   mass: 0.2,
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
                       lights.SetHemi(2.0, color.r, color.g, color.b);

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
                                  size: Math.random()*300,
                                  mass: 0.001,
                                  gravity: grav,
                                  vy: 5-Math.random()*10,
                                  vz: 10-Math.random()*20, 
                                  vx: 10-Math.random()*20, 
                                  r: color.r,
                                  g: color.g,
                                  b: color.b,
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
            sh.Play("up3", 1.0);
            lights.NewLight(new THREE.Vector3(pos.x,30,pos.z), new THREE.Color(0.7, 0.3, 0), 10.0);

            pp.New({
                   effect: function(particle, dt, time) {
                      self.effects["shell_effect2"](particle, dt, time);
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
                       lights.SetHemi(1.0, 0.2, 1.0, 0.2);

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
                                  size: Math.random()*300,
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

        this.bombs["small_bomb"] = function() {
            var pos = world.GetLaunchPosition();
            self.effects["mortar_smoke"](pos);
            sh.Play("up2", 1.0);
            lights.NewLight(new THREE.Vector3(pos.x,30,pos.z), new THREE.Color(0.7, 0.3, 0), 10.0);
            var color = new THREE.Color(Math.random(), Math.random(), Math.random());

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
                       sh.Play("boom4", 1.0, false);
                       lights.SetHemi(2.0, color.r, color.g, color.b);

                       self.effects["shell_explode1"](particle, dt, time);
                       var radius = 100;
                       for (var i = 0; i < 200; i++) {
                           pp.New({
                                  effect: function(particle, dt, time) {
                                      self.effects["glitter1"](particle, dt, time);
                                  },
                                  x: particle.x,
                                  y: particle.y,
                                  z: particle.z,
                                  size: Math.random()*300,
                                  mass: 0.001,
                                  gravity: 0.2,
                                  vy: 2-Math.random()*4, 
                                  vx: 2-Math.random()*4, 
                                  vz: 2-Math.random()*4, 
                                  r: color.r,
                                  g: color.g,
                                  b: color.b,
                                  h: 0.9,
                                  s: Math.random(),
                                  l: 0.9,
                                  life: 0.1+Math.random()*2,
                                  decay: 20+Math.random()*100,
                           });
                       }
                   }
            });
        }

        this.bombs["mix_flower"] = function() {
            var pos = world.GetLaunchPosition();
            self.effects["mortar_smoke"](pos);
            sh.Play("up1", 1.0);
            lights.NewLight(new THREE.Vector3(pos.x,30,pos.z), new THREE.Color(0.7, 0.3, 0), 10.0);
            var color = new THREE.Color(Math.random(), Math.random(), Math.random());

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
                       lights.SetHemi(2.0, color.r, color.g, color.b);

                       self.effects["shell_explode1"](particle, dt, time);
                       var grav = -1-Math.random()*2;
                       var radius = 100;
                       for (var i = 0; i < 300; i++) {
                           var mx = Math.sin((Math.PI*2) * (i/300))*3;
                           var mz = Math.cos((Math.PI*2) * (i/300))*3;
                           pp.New({
                                  effect: function(particle, dt, time) {
                                      self.effects["glitter1"](particle, dt, time);
                                      if(Math.random() > 0.5) {
                                          particle.size = 200;
                                      } else {
                                          particle.size = 50;
                                      }
                                  },
                                  x: particle.x,
                                  y: particle.y,
                                  z: particle.z,
                                  size: Math.random()*200,
                                  mass: 0.001,
                                  gravity: grav,
                                  vy: Math.sin(2-Math.random()*4)*3,
                                  vz: mz, 
                                  vx: mx, 
                                  r: color.r,
                                  g: color.g,
                                  b: color.b,
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

        this.bombs["mix_bomb"] = function() {
            var pos = world.GetLaunchPosition();
            self.effects["mortar_smoke"](pos);
            sh.Play("up3", 1.0);
            lights.NewLight(new THREE.Vector3(pos.x,30,pos.z), new THREE.Color(0.7, 0.3, 0), 10.0);
            var color = new THREE.Color(Math.random(), Math.random(), Math.random());

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
                       sh.Play("boom5", 1.0, false);
                       lights.SetHemi(2.0, color.r, color.g, color.b);

                       self.effects["shell_explode1"](particle, dt, time);
                       var grav = -1-Math.random()*2;
                       var radius = 100;
                       for (var i = 0; i < 300; i++) {
                           var mx = Math.sin((Math.PI*2) * (i/300))*3;
                           var mz = Math.cos((Math.PI*2) * (i/300))*3;
                           pp.New({
                                  effect: function(particle, dt, time) {
                                      self.effects["glitter1"](particle, dt, time);
                                  },
                                  condition: function(particle, dt, time) {
                                      return particle.life <= 0.1 &&
                                             particle.size >= 250? true:false;
                                  },
                                  action: function(particle, dt, time) {
                                      self.effects["shell_explode1"](particle, dt, time);
                                      if(Math.random() > 0.8) {
                                          sh.Play("crackle1", 0.1, false);
                                      }
                                      particle.Reset();
                                  },
                                  x: particle.x,
                                  y: particle.y,
                                  z: particle.z,
                                  size: Math.random()*200,
                                  mass: 0.001,
                                  gravity: grav,
                                  vy: 5-Math.sin(2-Math.random()*4),
                                  vz: mz, 
                                  vx: mx, 
                                  r: color.r,
                                  g: color.g,
                                  b: color.b,
                                  h: 0.9,
                                  s: Math.random(),
                                  l: 0.5,
                                  life: 0.1+Math.random()*1.5,
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
