import * as THREE from "./../libs/three.module.js";

function SoundHandler() {
    this.listener = 0;
    this.audioLoader = 0;
    this.sounds = {};

    SoundHandler.prototype.Init = function() {
        this.listener = new THREE.AudioListener();
        this.audioLoader = new THREE.AudioLoader();
        var self = this;
        // TBD: Add these as a map and loop over them.
        this.audioLoader.load( 'sounds/boom1.mp3', function(buffer) {
            self.sounds["boom1"] = buffer;
        });
        this.audioLoader.load( 'sounds/boom2.mp3', function(buffer) {
            self.sounds["boom2"] = buffer;
        });
        this.audioLoader.load( 'sounds/boom3.mp3', function(buffer) {
            self.sounds["boom3"] = buffer;
        });
        this.audioLoader.load( 'sounds/boom4.mp3', function(buffer) {
            self.sounds["boom4"] = buffer;
        });
        this.audioLoader.load( 'sounds/up1.mp3', function(buffer) {
            self.sounds["up1"] = buffer;
        });
        this.audioLoader.load( 'sounds/up2.mp3', function(buffer) {
            self.sounds["up2"] = buffer;
        });
        this.audioLoader.load( 'sounds/up3.mp3', function(buffer) {
            self.sounds["up3"] = buffer;
        });
        this.audioLoader.load( 'sounds/crackle1.mp3', function(buffer) {
            self.sounds["crackle1"] = buffer;
        });
        this.audioLoader.load( 'sounds/crackle2.mp3', function(buffer) {
            self.sounds["crackle2"] = buffer;
        });
    };

    SoundHandler.prototype.Play = function(name, volume, loop) {
        var sound = new THREE.Audio(this.listener);
        sound.setBuffer(this.sounds[name]);
        sound.setLoop(loop);
        sound.setVolume(volume);
        sound.play();
    };
}

export {SoundHandler};
