import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as TWEEN from "@tweenjs/tween.js";
import store, { STATES } from "@/state/reduxState";
import { connect, useSelector } from "react-redux";

// drift animation
const cameraTranslationDriftStart = new THREE.Vector3(3, 2, 7);
const cameraTranslationDriftEnd = new THREE.Vector3(0, 2, 6);
const cameraRotationDriftStart = new THREE.Euler(0, 0.5, 0);
const cameraRotationDriftEnd = new THREE.Euler(0, 0, 0);

// zoom animation
const cameraTranslationZoomEnd = new THREE.Vector3(-0.05, 2, 4.3);
const cameraRotationZoomEnd = new THREE.Euler(
    -Math.PI / 8,
    Math.PI / 8,
    Math.PI / 32
);

const cameraDriftDuration = 16000;

const mapStateToProps = (state: any) => ({ thisState: state });

function OfficeScene(props: { thisState: any }) {
    const [camera, setCamera] = useState<THREE.Camera | null>(null);
    const [fadeOpacity, setFadeOpacity] = useState(0);
    const [yPos, setYPos] = useState<number>(0);
    const [cameraTranslationZoomStart, setCameraTranslationZoomStart] =
        useState<THREE.Vector3>(new THREE.Vector3());
    const [cameraRotationZoomStart, setCameraRotationZoomStart] =
        useState<THREE.Euler>(new THREE.Euler());
    let driftTranslationAnimation = useRef<TWEEN.Tween<THREE.Vector3>>();
    let driftRotationAnimation = useRef<TWEEN.Tween<THREE.Euler>>();
    const thisState = useSelector((state) => props.thisState);

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

        // change yPos on scroll
        window.onscroll = () => {
            setYPos(window.pageYOffset);
        };
    }, []);

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
            document.body.removeChild(renderer.domElement);
        };
    }, [camera]);

    // Handle scroll and state change
    useEffect(() => {
        function startDriftAnimation() {
            if (!camera) return;

            console.log("start drift animation");

            if (driftTranslationAnimation?.current) {
                driftTranslationAnimation.current.resume();
                driftRotationAnimation?.current?.resume();
            } else {
                driftTranslationAnimation.current = new TWEEN.Tween(
                    camera.position
                )
                    .to(cameraTranslationDriftEnd, cameraDriftDuration)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .yoyo(true)
                    .repeat(Infinity)
                    .start();

                driftRotationAnimation.current = new TWEEN.Tween(
                    camera.rotation
                )
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
        }

        function lerp(start: number, end: number, t: number) {
            return start * (1 - t) + end * t;
        }

        if (!camera) return;

        switch (thisState.appState.state) {
            case STATES.DRIFT: {
                if (yPos != 0) {
                    store.dispatch({ type: "end_drift" });
                    driftTranslationAnimation?.current?.pause();
                    driftRotationAnimation?.current?.pause();
                    setCameraTranslationZoomStart(camera.position.clone());
                    setCameraRotationZoomStart(camera.rotation.clone());
                } else {
                    startDriftAnimation();
                }
                break;
            }
            case STATES.ZOOM: {
                if (yPos == 0) {
                    store.dispatch({ type: "start_drift" });
                } else {
                    const ySize = window.innerHeight;
                    const scrollPercentage = window.scrollY / ySize;

                    // change camera position to percentage of scroll
                    const newCameraPosition = new THREE.Vector3(
                        lerp(
                            cameraTranslationZoomStart.x,
                            cameraTranslationZoomEnd.x,
                            scrollPercentage
                        ),
                        lerp(
                            cameraTranslationZoomStart.y,
                            cameraTranslationZoomEnd.y,
                            scrollPercentage
                        ),
                        lerp(
                            cameraTranslationZoomStart.z,
                            cameraTranslationZoomEnd.z,
                            scrollPercentage
                        )
                    );
                    camera.position.copy(newCameraPosition);

                    // change camera rotation to percentage of scroll
                    const newCameraRotation = new THREE.Euler(
                        lerp(
                            cameraRotationZoomStart.x,
                            cameraRotationZoomEnd.x,
                            scrollPercentage
                        ),
                        lerp(
                            cameraRotationZoomStart.y,
                            cameraRotationZoomEnd.y,
                            scrollPercentage
                        ),
                        lerp(
                            cameraRotationZoomStart.z,
                            cameraRotationZoomEnd.z,
                            scrollPercentage
                        )
                    );
                    camera.rotation.copy(newCameraRotation);

                    //set fadeOpacity to percentage of scroll
                    const newFadeOpacity = scrollPercentage;
                    setFadeOpacity(newFadeOpacity);
                }
                break;
            }
            default:
                break;
        }
    }, [
        camera,
        cameraRotationZoomStart,
        cameraTranslationZoomStart,
        thisState.appState,
        yPos,
    ]);

    return (
        <div
            style={{
                opacity: fadeOpacity,
            }}
            className="fixed bg-tertiary fade h-screen w-screen z-30"
        >
            <canvas
                id="threeCanvas"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>
    );
}

export default connect(mapStateToProps)(OfficeScene);
