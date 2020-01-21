import * as THREE from "./../libs/three.module.js";

function SoundHandler() {
    this.listener = 0;
    this.audioLoader = 0;
    this.mortar = [];
    this.crackle = [];
    this.lightBoom = [];
    this.heavyBoom = [];

    SoundHandler.prototype.Init = function() {
        this.listener = new THREE.AudioListener();
        this.audioLoader = new THREE.AudioLoader();
        var self = this;

        for(var i = 1; i <= 3; i++) {
            this.audioLoader.load( 'sounds/light_boom'+(i).toString()+'.mp3', function(buffer) {
                self.lightBoom.push(buffer);
            });
        }

        for(var i = 1; i <= 2; i++) {
            this.audioLoader.load( 'sounds/heavy_boom'+(i).toString()+'.mp3', function(buffer) {
                self.heavyBoom.push(buffer);
            });
        }

        for(var i = 1; i <= 3; i++) {
            this.audioLoader.load( 'sounds/up'+(i).toString()+'.mp3', function(buffer) {
                self.mortar.push(buffer);
            });
        }

        for(var i = 1; i <= 2; i++) {
            this.audioLoader.load( 'sounds/crackle'+(i).toString()+'.mp3', function(buffer) {
                self.crackle.push(buffer);
            });
        }
    };

    SoundHandler.prototype.PlayRandomMortar = function(volume) {
        var buffer = this.mortar[Math.random()*this.mortar.length|0];
        this.Play(buffer, volume);
    };

    SoundHandler.prototype.PlayRandomLightBoom = function(volume) {
        var buffer = this.lightBoom[Math.random()*this.lightBoom.length|0];
        this.Play(buffer, volume);
    };

    SoundHandler.prototype.PlayRandomHeavyBoom = function(volume) {
        var buffer = this.heavyBoom[Math.random()*this.heavyBoom.length|0];
        this.Play(buffer, volume);
    };

    SoundHandler.prototype.PlayRandomCrackle = function(volume) {
        var buffer = this.crackle[Math.random()*this.crackle.length|0];
        this.Play(buffer, volume);
    };


    SoundHandler.prototype.Play = function(buffer, volume) {
        var sound = new THREE.Audio(this.listener);
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(volume);
        sound.play();
    };
}

export {SoundHandler};
