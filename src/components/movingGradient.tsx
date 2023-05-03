import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import store, { STATES } from "@/state/reduxState";
import { connect, useSelector } from "react-redux";
import { useRouter } from "next/router";

const mapStateToProps = (state: any) => ({ thisState: state });

function MovingGradient(props: { thisState: any }) {
    const [camera, setCamera] = useState<THREE.Camera | null>(null);

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
    }, []);

    // Initialize scene
    useEffect(() => {
        if (!camera) return;

        // Create a Three.js scene
        const scene = new THREE.Scene();

        //reset camera positions
        camera.position.z = 1;

        //add lights
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);

        //add plane
        const planeGeometry = new THREE.PlaneGeometry(5, 5, 300, 300);
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0x676767,
            side: THREE.DoubleSide,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        scene.add(plane);

        //test
        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);

        // Create a Three.js renderer
        const canvas: HTMLElement = document.getElementById(
            "gradientCanvas"
        ) as HTMLElement;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add animation and update the scene
        const animate = () => {
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

    return (
        <canvas
            id="gradientCanvas"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
            }}
        />
    );
}

export default connect(mapStateToProps)(MovingGradient);
