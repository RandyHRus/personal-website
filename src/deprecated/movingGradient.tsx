import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import store, { STATES } from "@/state/reduxState";
import { connect, useSelector } from "react-redux";

const mapStateToProps = (state: any) => ({ thisState: state });

function MovingGradient(props: { thisState: any }) {
    const [camera, setCamera] = useState<THREE.Camera | null>(null);

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
        uniform float uTime;
        varying vec2 vUv;
        
        void main() {
        vec3 color1 = vec3(1.0, 0.0, 0.0);
        vec3 color2 = vec3(0.0, 1.0, 0.0);
        vec3 color3 = vec3(0.0, 0.0, 1.0);
        vec3 color4 = vec3(1.0, 1.0, 0.0);
        
        float time = uTime * 0.5;
        
        vec2 pos1 = vec2(cos(time * 2.0), sin(time * 2.0)) * 0.5 + 0.5;
        vec2 pos2 = vec2(cos(time * 3.0), sin(time * 3.0)) * 0.5 + 0.5;
        
        vec3 color = mix(mix(color1, color2, pos1.x), mix(color4, color3, pos2.x), vUv.y);
        
        gl_FragColor = vec4(color, 1.0);
        }
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
            className="relative width-full height-full"
            style={{ zIndex: 100 }}
        />
    );
}

export default connect(mapStateToProps)(MovingGradient);
