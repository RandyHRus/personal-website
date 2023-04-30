import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as TWEEN from "@tweenjs/tween.js";

const inter = Inter({ subsets: ["latin"] });

const cameraTranslationStart = new THREE.Vector3(3, 2, 7);
const cameraTranslationEnd = new THREE.Vector3(-0.05, 2, 4.17);
const cameraRotationStart = new THREE.Euler(0, 0.5, 0);
const cameraRotationEnd = new THREE.Euler(
    -Math.PI / 8,
    Math.PI / 8,
    Math.PI / 32
);

const waitDuration = 2000;
const cameraMoveDuration = 8000;

export default function Home() {
    useEffect(() => {
        // Create a Three.js scene
        const scene = new THREE.Scene();

        // Create a Three.js camera
        const camera = new THREE.PerspectiveCamera(
            90,
            window.innerWidth / window.innerHeight,
            0.01,
            1000
        );
        camera.position.set(
            cameraTranslationStart.x,
            cameraTranslationStart.y,
            cameraTranslationStart.z
        );

        camera.rotation.set(
            cameraRotationStart.x,
            cameraRotationStart.y,
            cameraRotationStart.z
        );

        // Create a Three.js renderer
        const canvas: HTMLElement = document.getElementById(
            "threeCanvas"
        ) as HTMLElement;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //load GLTF
        const loader = new GLTFLoader();
        loader.load(
            "models/purchased/scene.gltf",
            (gltf) => {
                scene.add(gltf.scene);
                return gltf;
            },
            undefined,
            (error) => {
                console.error(error);
                return null;
            }
        );

        new TWEEN.Tween(camera.position)
            .to(cameraTranslationEnd, cameraMoveDuration)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();

        new TWEEN.Tween(camera.rotation)
            .to(
                {
                    x: cameraRotationEnd.x,
                    y: cameraRotationEnd.y,
                    z: cameraRotationEnd.z,
                },
                cameraMoveDuration
            )
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();

        // Add animation and update the scene
        const animate = () => {
            console.log(camera.rotation);
            TWEEN.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div>
            <canvas id="threeCanvas" />
        </div>
    );
}
function loadGLTF(scene: THREE.Scene) {
    throw new Error("Function not implemented.");
}
