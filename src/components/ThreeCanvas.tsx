import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as TWEEN from "@tweenjs/tween.js";
import store, { STATES } from "@/state/reduxState";
import { connect, useSelector } from "react-redux";
import { useRouter } from "next/router";

// drift animation
const cameraTranslationDriftStart = new THREE.Vector3(3, 2, 7);
const cameraTranslationDriftEnd = new THREE.Vector3(0, 2, 6);
const cameraRotationDriftStart = new THREE.Euler(0, 0.5, 0);
const cameraRotationDriftEnd = new THREE.Euler(0, 0, 0);

// zoom animation
const cameraTranslationZoomEnd = new THREE.Vector3(-0.05, 2, 4.3);
const cameraRotationZoomStart = new THREE.Euler(0, 0.5, 0);
const cameraRotationZoomEnd = new THREE.Euler(
    -Math.PI / 8,
    Math.PI / 8,
    Math.PI / 32
);

const cameraZoomDuration = 2000; //8000;
const cameraDriftDuration = 16000;

const mapStateToProps = (state: any) => ({ thisState: state });

function ThreeCanvas(props: any) {
    const [camera, setCamera] = useState<THREE.Camera | null>(null);
    const [fadeOpacity, setFadeOpacity] = useState(0);
    let driftTranslationAnimation = useRef<TWEEN.Tween<THREE.Vector3>>();
    let driftRotationAnimation = useRef<TWEEN.Tween<THREE.Euler>>();
    const thisState = useSelector((state) => props.thisState);
    const router = useRouter();

    const endZoomInHandler = () => {
        store.dispatch({ type: "end_zoom_in" });
    };

    const endZoomOutHandler = () => {
        store.dispatch({ type: "end_zoom_out" });
    };

    // Handle page load
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
    }, [thisState]);

    // Initialize scene
    useEffect(() => {
        if (!camera) return;

        // Create a Three.js scene
        const scene = new THREE.Scene();

        //reset camera positions
        camera.position.copy(cameraTranslationDriftStart);
        camera.rotation.copy(cameraRotationDriftStart);

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

        // Return a cleanup function to dispose of Three.js resources
        return () => {
            renderer.dispose();
            //document.body.removeChild(renderer.domElement);
        };
    }, [camera]);

    // Handle state change.
    useEffect(() => {
        function startZoomInAnimation() {
            if (!camera) return;

            console.log("start zoom in animation");

            new TWEEN.Tween(camera.position)
                .to(cameraTranslationZoomEnd, cameraZoomDuration)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start()
                .onUpdate((_, elapsed: number) => {
                    setFadeOpacity(elapsed * 1.4);
                })
                .onComplete(() => {
                    endZoomInHandler();
                });

            new TWEEN.Tween(camera.rotation)
                .to(
                    {
                        x: cameraRotationZoomEnd.x,
                        y: cameraRotationZoomEnd.y,
                        z: cameraRotationZoomEnd.z,
                    },
                    cameraZoomDuration
                )
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
        }

        function startZoomOutAnimation() {
            if (!camera) return;

            console.log("start zoom out animation");

            // reset camera
            camera.position.copy(cameraTranslationZoomEnd);
            camera.rotation.copy(cameraRotationZoomEnd);

            new TWEEN.Tween(camera.position)
                .to(
                    {
                        x: cameraTranslationDriftStart.x,
                        y: cameraTranslationDriftStart.y,
                        z: cameraTranslationDriftStart.z,
                    },
                    cameraZoomDuration
                )
                .easing(TWEEN.Easing.Quadratic.Out)
                .start()
                .onUpdate((_, elapsed: number) => {
                    setFadeOpacity(1 - elapsed);
                })
                .onComplete(() => {
                    endZoomOutHandler();
                });

            new TWEEN.Tween(camera.rotation)
                .to(
                    {
                        x: cameraRotationZoomStart.x,
                        y: cameraRotationZoomStart.y,
                        z: cameraRotationZoomStart.z,
                    },
                    cameraZoomDuration
                )
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
        }

        function startDriftAnimation() {
            if (!camera) return;

            console.log("start drift animation");

            //reset camera positions
            camera.position.copy(cameraTranslationDriftStart);
            camera.rotation.copy(cameraRotationDriftStart);

            driftTranslationAnimation.current = new TWEEN.Tween(camera.position)
                .to(cameraTranslationDriftEnd, cameraDriftDuration)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .yoyo(true)
                .repeat(Infinity)
                .start();

            driftRotationAnimation.current = new TWEEN.Tween(camera.rotation)
                .to(
                    {
                        x: cameraRotationDriftEnd.x,
                        y: cameraRotationDriftEnd.y,
                        z: cameraRotationDriftEnd.z,
                    },
                    cameraDriftDuration
                )
                .easing(TWEEN.Easing.Quadratic.InOut)
                .yoyo(true)
                .repeat(Infinity)
                .start();
        }

        if (driftTranslationAnimation.current) {
            driftTranslationAnimation.current.end();
        }

        if (driftRotationAnimation.current) {
            driftRotationAnimation.current.end();
        }

        switch (thisState.appState.state) {
            case STATES.ZOOM_IN:
                startZoomInAnimation();
                break;
            case STATES.ZOOM_OUT:
                startZoomOutAnimation();
                break;
            case STATES.INIT:
                startDriftAnimation();
                break;
            default:
                break;
        }
    }, [thisState, camera]);

    return (
        <div
            style={{
                zIndex: 100,
                opacity: fadeOpacity,
            }}
            className="three fixed left-0 right-0 top-0 bottom-0 bg-indigo-900 "
        >
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
        </div>
    );
}

export default connect(mapStateToProps)(ThreeCanvas);
