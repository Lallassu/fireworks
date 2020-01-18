import * as THREE from "./../libs/three.module.js";

function World() {
    this.mortars = [];

    World.prototype.Init = function(scene) {
        var cubegeo = new THREE.CubeGeometry( 500, 1000, 5000 );
        var mat = new THREE.MeshPhongMaterial( {color: 0x333333} );
        var cube = new THREE.Mesh(cubegeo, mat);
        cube.rotation.x= -Math.PI/2;
        cube.position.y = -2500;
        scene.add( cube );

        for(var i = 0; i < 30; i++) {
            var size = 100+Math.random()*300;
            var cubegeo = new THREE.CubeGeometry( size, size, 3500 );
            var cube = new THREE.Mesh(cubegeo, mat);
            cube.rotation.x= -Math.PI/2;
            cube.position.x = -6000+Math.random()*12000;
            cube.position.z = -6000+Math.random()*12000;
            cube.position.y = -3000-Math.random()*1000;
            scene.add( cube );
        }

        for(var i = 0; i < 10; i++) {
            var x = 200-Math.random()*400;
            var z = 400-Math.random()*900;
            var texture = new THREE.TextureLoader().load( './mortar.png' );
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set( 1, 1 );
				
            var cylmat = new THREE.MeshPhongMaterial( {map: texture });
            var cylgeo = new THREE.CylinderGeometry(8, 8, 40, 32, 32);
            var cyl = new THREE.Mesh(cylgeo, cylmat);
            cyl.position.y = 15;
            cyl.position.x = x-5;
            cyl.position.z = z-5;
            scene.add(cyl);
            this.mortars.push(cyl.position);

            var cubegeo = new THREE.CubeGeometry( 30, 30, 2 );
            var mat = new THREE.MeshPhongMaterial( {color: 0x000000} );
            var cube = new THREE.Mesh(cubegeo, mat);
            cube.rotation.x= -Math.PI/2;
            cube.position.y = 1;
            cube.position.x = x-5;
            cube.position.z = z-5;
            scene.add( cube );
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
