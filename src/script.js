import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
let data = [
    {
        title: "Porsche",
        price: "100,000 $",
        cylinders: 6,
    },
    {
        title: "207",
        price: "10,000 $",
        cylinders: 4,
    },
]
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
const openModel = (data) => {
    modal.style.display = "block";
    let name = document.getElementById("carName");
    let price = document.getElementById("carPrice");
    let cylinders = document.getElementById("carCylinders");
    name.innerHTML = data.title
    price.innerHTML = data.price
    cylinders.innerHTML = data.cylinders

}

span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
const closeModal = () => {
    modal.style.display = "none";

}

let sc = new THREE.Scene()
let textureloader = new THREE.TextureLoader()
let tx = textureloader.load('pic/1.jpg')
tx.colorSpace = THREE.SRGBColorSpace
tx.magFilter = THREE.NearestFilter

//salon
let salon = null;
let sakoo = null;
let salon_animation = null;
let gltf = new GLTFLoader()
let draco = new DRACOLoader()
draco.setDecoderPath('/draco/')
gltf.setDRACOLoader(draco)
gltf.load('models/saloon/gltf/salon.gltf', (car_salon) => {
    sc.add(car_salon.scene)
    salon = car_salon.scene
    salon.children[0].children[1].material.map = tx
    sakoo = salon.children[11]
    salon_animation = new THREE.AnimationMixer(salon)
    let action = salon_animation.clipAction(car_salon.animations[0])
    action.play()
})
let porsche = null
gltf.load("models/porsche/porsche.glb", (p) => {
    sc.add(p.scene)
    porsche = p.scene
    porsche.scale.set(0.4, 0.4, 0.4)
    porsche.position.set(4, 0, -6)
    // porsche.children[0].children[0].material.color.set('#8CFF33')
    window.addEventListener('keydown', (e) => {
        if (e.keyCode == 96) {
            porsche.children[0].children[0].material.color.set('#8CFF33')
        }
        if (e.keyCode == 97) {
            porsche.children[0].children[0].material.color.set('#FF4433')
        }
        if (e.keyCode == 98) {
            porsche.children[0].children[0].material.color.set('#000000')
            // car.children[124].material.color.set('#000000')
        }
        if (e.keyCode == 99) {
            porsche.children[0].children[0].material.color.set('#ffffff')
        }
        if (e.keyCode == 100) {
            porsche.children[0].children[0].material.color.set('#6933FF')
        }
        if (e.keyCode == 101) {
            porsche.children[0].children[0].material.color.set('#33FFFD')
        }
        if (e.keyCode == 102) {
            porsche.children[0].children[0].material.color.set('#584E32')
        }
        if (e.keyCode == 103) {
            porsche.children[0].children[0].material.color.set('#FF0041')
        }
        if (e.keyCode == 104) {
            porsche.children[0].children[0].material.color.set('#26595B')
        }
        if (e.keyCode == 105) {
            porsche.children[0].children[0].material.color.set('#FF05F7')
        }
    })
})

//car
let car = null;
let car_animation = null;
gltf.load('models/207/gltf/207car.gltf', (car_207) => {
    sc.add(car_207.scene)
    car = car_207.scene
    car_animation = new THREE.AnimationMixer(car)
    let action1 = car_animation.clipAction(car_207.animations[0])
    let action2 = car_animation.clipAction(car_207.animations[1])
    let action3 = car_animation.clipAction(car_207.animations[2])
    let action4 = car_animation.clipAction(car_207.animations[3])
    let action5 = car_animation.clipAction(car_207.animations[4])
    action1.play()
    action2.play()
    action3.play()
    action4.play()
    action5.play()


    //0 = 96
    //1 = 97
    //2 = 98
    //3 = 99
    //4 = 100
    //5 = 101
    //6 = 102
    //7 = 103
    //8 = 104
    //9 = 105

    window.addEventListener('keydown', (e) => {
        if (e.keyCode == 96) {
            car.children[0].material.color.set('#8CFF33')
        }
        if (e.keyCode == 97) {
            car.children[0].material.color.set('#FF4433')
        }
        if (e.keyCode == 98) {
            car.children[0].material.color.set('#000000')
            car.children[124].material.color.set('#000000')
        }
        if (e.keyCode == 99) {
            car.children[0].material.color.set('#ffffff')
        }
        if (e.keyCode == 100) {
            car.children[0].material.color.set('#6933FF')
        }
        if (e.keyCode == 101) {
            car.children[0].material.color.set('#33FFFD')
        }
        if (e.keyCode == 102) {
            car.children[0].material.color.set('#584E32')
        }
        if (e.keyCode == 103) {
            car.children[0].material.color.set('#FF0041')
        }
        if (e.keyCode == 104) {
            car.children[0].material.color.set('#26595B')
        }
        if (e.keyCode == 105) {
            car.children[0].material.color.set('#FF05F7')
        }
    })

})

//lights
let aml = new THREE.AmbientLight('#FFFFFF', 1)
let direct = new THREE.DirectionalLight('#FFFFFF', 1)
direct.position.set(1, 1, 1)
sc.add(aml, direct)


let size = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    size.width = window.innerWidth
    size.height = window.innerHeight
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width, size.height)
})



let camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.set(0, 1, 6)
sc.add(camera)



let canvas = document.querySelector('.web')
let renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
})

renderer.setSize(size.width, size.height)
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.5


//PTLCNTLS

let pointer = new PointerLockControls(camera, canvas)

let keyboard = [];
window.addEventListener('keydown', (e) => {
    keyboard[e.key] = true
})
window.addEventListener('keyup', (e) => {
    keyboard[e.key] = false
})

function move() {
    if (keyboard['W'] || keyboard['w'] || keyboard['ص'] || keyboard['ArrowUp']) {
        pointer.moveForward(0.2)
    }
    if (keyboard['S'] || keyboard['s'] || keyboard['س'] || keyboard['ArrowDown']) {
        pointer.moveForward(-0.2)
    }
    if (keyboard['D'] || keyboard['d'] || keyboard['ی'] || keyboard['ArrowRight']) {
        pointer.moveRight(0.2)
    }
    if (keyboard['A'] || keyboard['a'] || keyboard['ش'] || keyboard['ArrowLeft']) {
        pointer.moveRight(-0.2)
    }
}
window.addEventListener('keydown', (e) => {
    console.log(e)
    if (e.keyCode == 13) {
        pointer.lock()
    }
    if (e.keyCode == 67) {
        closeModal()
    }
})





let clock = new THREE.Clock()
let start_time = 0
let animation = () => {


    let elaps = clock.getElapsedTime()
    let delta = elaps - start_time
    start_time = elaps

    if (salon) {
        sakoo.rotation.y = elaps * 0.3
        salon_animation.update(delta)
    }
    if (car) {
        car.rotation.y = elaps * 0.3
        car_animation.update(delta)
    }
    // if(porsche){
    //     console.log(porsche)
    // }
    //pointer function
    move()

    //limit conditions
    let x = camera.position.x
    let z = camera.position.z
    if ((z >= -5 && z <= -4) && (x >= 2 && x <= 6)) {
        openModel(data[0])
    }

    // if(car){
    //     console.log("x : ",x,"  z : ",z)
    if ((z >= 1 && z <= 2) && (x >= -1 && x < 2)) {
        openModel(data[1])
    }
    // }
    if (z <= -9.2) {
        camera.position.z = -9.19
    }
    if (x >= 13.4) {
        camera.position.x = 13.3
    }
    if (x <= -14.17) {
        camera.position.x = -14.16
    }
    if (z >= 6.59) {
        camera.position.z = 6.585
    }
    if (x >= -9.02 && x <= -8.540 && z >= -9.50 && z <= -6.8) {
        camera.position.x = -8.539
    }
    if (z <= -6.76 && x <= -8.93 && x >= -15.0) {
        camera.position.z = -6.74
        if (x <= -12.27) {
            camera.position.x = -12.26
        }
    }
    if (x >= -12.10 && x <= -11.70 && z > -6.92 && z < 1) {
        camera.position.x = -11.69
    }
    if (x <= -12.20 && x >= -15.16 && z < 1.65 && z > 0.99) {
        camera.position.z = 1.66
    }


    //console.log("x = " + x + " " + "z = " + z);

    renderer.render(sc, camera)
    window.requestAnimationFrame(animation)
}
animation()