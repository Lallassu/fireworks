import * as THREE from "./../libs/three.module.js";

function World() {

    World.prototype.Init = function(scene) {
        var cubegeo = new THREE.CubeGeometry( 500, 900, 5000 );
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

        // var cubegeo = new THREE.MeshPhongMaterial( {color: 0x555588} );
        // var cube = new THREE.Mesh(new THREE.CylinderGeometry(100, 100, 100, 100), cubegeo);
        // cube.position.y = 50;
        // scene.add(cube);

        var texture = new THREE.TextureLoader().load( './mortar.png' );
        var cylmat = new THREE.MeshPhongMaterial( {map: texture });
        var cylgeo = new THREE.CylinderGeometry(10, 10, 30, 32, 32, true);
        var cyl = new THREE.Mesh(cylgeo, cylmat);
        cyl.position.y = 15;
        cyl.position.x = -5;
        cyl.position.z = -5;
        scene.add(cyl);
    };

    World.prototype.Update = function(dt, time) {

    }
}
export {World}
