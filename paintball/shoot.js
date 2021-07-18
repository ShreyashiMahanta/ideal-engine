AFRAME.registerComponent("shoot",{
    init : function(){
        this.shootBall();
    }, 
    shootBall : function(){
        window.addEventListener("keydown",(e) =>{
            if(e.key === "z"){
                var bullet = document.createElement("a-entity");

                bullet.setAttribute("geometry",{
                    primitive : "sphere",
                    radius : 0.4
                });

                bullet.setAttribute("material","color","white");

                var cam = document.querySelector("#camera");
                var pos = cam.getAttribute("position");

                bullet.setAttribute("position",{
                    x : pos.x,
                    y : pos.y ,
                    z : 0.130
                });

                var camera = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);
        
                bullet.setAttribute("velocity", direction.multiplyScalar(-20));

                var scene = document.querySelector("#scene");


                  bullet.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: "0",
                  });
                  bullet.setAttribute("visible", false);
          
                  //add the collide event listener to the bullet
                  bullet.addEventListener("collide", this.wallHit);
          
                  scene.appendChild(bullet);              

                this.playShoot();
            }
        } )
    },

    wallHit: function(e){
     var scene = document.querySelector("#scene");

     var element = e.detail.target.el;
     var elementHit = e.detail.body.el;

     var paint = document.createElement("a-entity");

     var pos = element.getAttribute("position");
     var rotated = elementHit.getAttribute("rotation");

     paint.setAttribute("position",{
         x : pos.x,
         y : pos.y,
         z : pos.z,
     });

     paint.setAttribute("rotation",{
         x : rotated.x,
         y : rotated.y,
         z : rotated.z,
     });
      paint.setAttribute("scale", {
        x: 2,
        y: 2,
        z: 2,
      });

     var colourNum = parseInt(Math.random()* 8 + 1);

     paint.setAttribute("material",{
         transparent : true,
         opacity : 1,
         src: "./images/paint splash-0" + colourNum + ".png"

     });
     paint.setAttribute("geometry",{
         primitive : "plane",
         width : 0.5,
         height : 0.5
     })

     scene.appendChild(paint);

     element.removeEventListener("collide", this.wallHit);

     scene.removeChild(element);
    },

    playShoot: function(){
            var entity = document.querySelector("#sound1");
            entity.components.sound.playSound();
         
    },

   
});


AFRAME.registerComponent("move",{
    init : function(){
        this.walk();
    },

    walk: function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight"){
                var entity = document.querySelector("#sound2");
                entity.components.sound.playSound();
            }
        })
    }
});
