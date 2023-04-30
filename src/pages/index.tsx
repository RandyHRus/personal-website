import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as TWEEN from "@tweenjs/tween.js";
import { Button } from "@mui/material";
import StartButton from "@/components/startButton";

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
    const [camera, setCamera] = useState<THREE.Camera | null>(null);

    const clickStartButtonHandler = () => {
        console.log("starting");
        startZoomAnimation();
    };

    function startZoomAnimation() {
        if (!camera) return;

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
    }

    useEffect(() => {
        // Create a Three.js camera
        setCamera(
            new THREE.PerspectiveCamera(
                90,
                window.innerWidth / window.innerHeight,
                0.01,
                1000
            )
        );
    }, []);

    useEffect(() => {
        if (!camera) return;

        // Create a Three.js scene
        const scene = new THREE.Scene();

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

        // Add animation and update the scene
        const animate = () => {
            TWEEN.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();
    }, [camera]);

    return (
        <div style={{ position: "relative" }}>
            <canvas
                id="threeCanvas"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            />
            <div className="center" style={{ zIndex: 100 }}>
                <StartButton
                    onClick={() => clickStartButtonHandler()}
                ></StartButton>
            </div>
        </div>
    );
}
