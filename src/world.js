import * as THREE from "./../libs/three.module.js";

function World() {
    this.mortars = [];

    World.prototype.Init = function(scene) {
        var cubegeo = new THREE.CubeGeometry( 500, 1000, 5000 );
        var matgeo = new THREE.MeshPhongMaterial( {color: 0x333333} );
        var cube = new THREE.Mesh(cubegeo, matgeo);
        cube.rotation.x= -Math.PI/2;
        cube.position.y = -2500;
        scene.add( cube );

        for(var i = 0; i < 50; i++) {
            var size = 100+Math.random()*300;
            var cubegeo = new THREE.CubeGeometry( size, size, 3500 );
            var cube = new THREE.Mesh(cubegeo, matgeo);
            cube.rotation.x= -Math.PI/2;
            cube.position.x = -6000+Math.random()*12000;
            cube.position.z = -6000+Math.random()*12000;
            cube.position.y = -3000-Math.random()*1000;
            scene.add( cube );
        }

        for(var i = 0; i < 10; i++) {
            var x = 240-Math.random()*450;
            var z = 450-Math.random()*950;
            var texture = new THREE.TextureLoader().load( './mortar.png' );
            var cylmat = new THREE.MeshPhongMaterial( {map: texture });
            var cylgeo = new THREE.CylinderGeometry(10, 10, 30, 32, 32, true);
            var cyl = new THREE.Mesh(cylgeo, cylmat);
            cyl.position.y = 15;
            cyl.position.x = x-5;
            cyl.position.z = z-5;
            scene.add(cyl);
            this.mortars.push(cyl.position);
        }
    };

    World.prototype.GetLaunchPosition = function() {
        var i = Math.random()*this.mortars.length |0;
        return this.mortars[i];
    };

    World.prototype.Update = function(dt, time) {

    };
}
export {World}
