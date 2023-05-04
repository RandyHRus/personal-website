import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import store, { STATES } from "@/state/reduxState";
import { connect, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useLoader } from "@react-three/fiber";

const mapStateToProps = (state: any) => ({ thisState: state });

function MovingGradient(props: { thisState: any }) {
    const [camera, setCamera] = useState<THREE.Camera | null>(null);

    const endZoomOutHandler = () => {
        store.dispatch({ type: "end_zoom_out" });
    };

    const vertex = `
            varying vec2 vUv; 
            void main()
            {
                vUv = uv;
            
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
                gl_Position = projectionMatrix * mvPosition;
            }
       `;

    const fragment = `
        
    `;

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

        const clock = new THREE.Clock();

        var uniform = {
            uTime: { type: "f", value: 0.1 },
        };

        //add plane
        const planeGeometry = new THREE.PlaneGeometry(5, 5, 300, 300);
        const planeMaterial = new THREE.ShaderMaterial({
            uniforms: uniform,
            vertexShader: vertex,
            fragmentShader: fragment,
            side: THREE.DoubleSide,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        scene.add(plane);

        // Create a Three.js renderer
        const canvas: HTMLElement = document.getElementById(
            "gradientCanvas"
        ) as HTMLElement;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add animation and update the scene
        const animate = () => {
            planeMaterial.uniforms.uTime.value += clock.getDelta();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        // Return a cleanup function to dispose of Three.js resources
        return () => {
            renderer.dispose();
            document.body.removeChild(renderer.domElement);
        };
    }, [camera, fragment, vertex]);

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
