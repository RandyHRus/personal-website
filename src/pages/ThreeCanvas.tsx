import { useEffect, useState, Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as TWEEN from "@tweenjs/tween.js";
import store, { STATES } from "@/reduxState";
import { connect, useSelector } from "react-redux";

const cameraTranslationStart = new THREE.Vector3(3, 2, 7);
const cameraTranslationEnd = new THREE.Vector3(-0.05, 2, 4.3);
const cameraRotationStart = new THREE.Euler(0, 0.5, 0);
const cameraRotationEnd = new THREE.Euler(
    -Math.PI / 8,
    Math.PI / 8,
    Math.PI / 32
);

const cameraMoveDuration = 1000; //8000;

const mapStateToProps = (state: any) => ({ thisState: state });

function ThreeCanvas(props: any) {
    const [camera, setCamera] = useState<THREE.Camera | null>(null);
    const thisState = useSelector((state) => props.thisState);

    useEffect(() => {
        function startZoomInAnimation() {
            if (!camera) return;

            new TWEEN.Tween(camera.position)
                .to(cameraTranslationEnd, cameraMoveDuration)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start()
                .onComplete(() => {
                    endZoomInHandler();
                });

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

        function startZoomOutAnimation() {
            if (!camera) return;

            new TWEEN.Tween(camera.position)
                .to(
                    {
                        x: cameraTranslationStart.x,
                        y: cameraTranslationStart.y,
                        z: cameraTranslationStart.z,
                    },
                    cameraMoveDuration
                )
                .easing(TWEEN.Easing.Quadratic.Out)
                .start()
                .onComplete(() => {
                    endZoomOutHandler();
                });

            new TWEEN.Tween(camera.rotation)
                .to(
                    {
                        x: cameraRotationStart.x,
                        y: cameraRotationStart.y,
                        z: cameraRotationStart.z,
                    },
                    cameraMoveDuration
                )
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
        }

        switch (thisState.appState.state) {
            case STATES.ZOOM_IN:
                startZoomInAnimation();
                break;
            case STATES.ZOOM_OUT:
                startZoomOutAnimation();
                break;
        }
    }, [thisState, camera]);

    const endZoomInHandler = () => {
        store.dispatch({ type: "end_zoom_in" });
    };

    const endZoomOutHandler = () => {
        store.dispatch({ type: "end_zoom_out" });
    };

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
    );
}

export default connect(mapStateToProps)(ThreeCanvas);
