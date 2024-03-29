import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as TWEEN from "@tweenjs/tween.js";
import store, { STATES } from "@/state/reduxState";
import { connect, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

/**
 * Inspired from this tutorial: https://www.youtube.com/watch?v=6YJ-2MvDqhc
 */

const mapStateToProps = (state: any) => ({ thisState: state });

const cameraTranslationZoomStart = new THREE.Vector3(0, 0, 4);
const cameraTranslationZoomEnd = new THREE.Vector3(0, 0, 2);

function lerp(start: number, end: number, t: number) {
    return start * (1 - t) + end * t;
}

// noise function retrieved from: https://github.com/stegu/webgl-noise
//
// Copyright (C) 2011 by Ashima Arts (Simplex noise)
// Copyright (C) 2011-2016 by Stefan Gustavson (Classic noise and others)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
const vertexShader = `

    vec3 mod289(vec3 x)
    {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    vec4 mod289(vec4 x)
    {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    vec4 permute(vec4 x)
    {
        return mod289(((x*34.0)+10.0)*x);
    }
    vec4 taylorInvSqrt(vec4 r)
    {
        return 1.79284291400159 - 0.85373472095314 * r;
    }
    vec3 fade(vec3 t) {
        return t*t*t*(t*(t*6.0-15.0)+10.0);
    }

    float cnoise(vec3 P)
    {

        vec3 Pi0 = floor(P); // Integer part for indexing
        vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
        Pi0 = mod289(Pi0);
        Pi1 = mod289(Pi1);
        vec3 Pf0 = fract(P); // Fractional part for interpolation
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 * (1.0 / 7.0);
        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 * (1.0 / 7.0);
        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
        return 2.2 * n_xyz;
    }

    uniform float uTime;
    varying vec2 vUv;
    float intensity = 0.15;

    void main() {
        vec3 displaced = position + intensity * cnoise(position + uTime);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        vUv = uv;
    }
`;

const fragmentShader = `

    uniform float uTime;
    varying vec2 vUv; // get UV coordinates from vertex shader
    
    // Perlin noise function
    float noise(float p) {
        return sin(p);
    }

    void main() {
        vec2 uv = vUv;
        
        // Generate color using Perlin noise from UV map
        float r = (noise(uv.x*20.0 + uTime)) * 0.1 + 0.4; 
        float b = (noise(uv.y*20.0 + uTime)) * 0.4;

        vec3 color = vec3(r, b, 1);

        gl_FragColor = vec4(color, 1.0);
    }
`;

function LiquidScene(props: { thisState: any }) {
    const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
    const [fadeOpacity, setFadeOpacity] = useState(0);
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
    const [yPos, setYPos] = useState<number>(0);
    const [error, setError] = useState<string>("");
    const thisState = useSelector((state) => props.thisState);

    // It is laggy to resize the window, especially in a 3D scene. Use throttling to optimize. More info:
    // https://web.archive.org/web/20220714020647/https://bencentra.com/code/2015/02/27/optimizing-window-resize.html
    let throttledResize = useRef<boolean>(false);
    const throttleResizeDelay: number = 250;

    const handleErrorClose = () => {
        console.log("closing error");
        setError("");
    };

    // Handle page load
    useEffect(() => {
        // Create a Three.js camera
        let _camera = new THREE.PerspectiveCamera(
            90,
            window.innerWidth / window.innerHeight,
            0.01,
            1000
        );
        setCamera(_camera);
        _camera.position.set(
            cameraTranslationZoomStart.x,
            cameraTranslationZoomStart.y,
            cameraTranslationZoomStart.z
        );

        // Create a Three.js renderer
        const canvas: HTMLElement = document.getElementById(
            "threeCanvas"
        ) as HTMLElement;
        try {
            const _renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: true,
            });
            _renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(_renderer.domElement);
            setRenderer(_renderer);
        } catch (err) {
            let errorMsg: string =
                "Failed to render WebGL scene. This could be due to hardware acceleration being turned off in your browser settings.";
            console.error(errorMsg);
            setError(errorMsg);
        }

        // change yPos on scroll
        window.onscroll = () => {
            setYPos(window.pageYOffset);
        };
    }, []);

    // Initialize scene
    useEffect(() => {
        const resizeCanvas = () => {
            if (!camera || !renderer) return;

            if (!throttledResize.current) {
                // we're throttled!
                throttledResize.current = true;
                // set a timeout to un-throttle
                setTimeout(function () {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    throttledResize.current = false;
                }, throttleResizeDelay);
            }
        };

        if (!camera || !renderer) return;

        // Create a Three.js scene
        const scene = new THREE.Scene();

        //Add objects
        const clock = new THREE.Clock();
        let uniforms = {
            uTime: { type: "f", value: 0.1 },
        };
        const liquidGeometry = new THREE.TetrahedronGeometry(2, 40);
        const liquidMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        });

        const obj = new THREE.Mesh(liquidGeometry, liquidMaterial);
        scene.add(obj);

        //add light
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 0, 0);
        scene.add(light);

        // Add animation and update the scene
        const animate = () => {
            liquidMaterial.uniforms.uTime.value += clock.getDelta() / 2;
            TWEEN.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        // Add event listener to handle resizing
        window.addEventListener("resize", resizeCanvas);

        // Return a cleanup function to dispose of Three.js resources
        return () => {
            renderer.dispose();
            document.body.removeChild(renderer.domElement);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [camera, renderer]);

    // Handle scroll and state change
    useEffect(() => {
        if (!camera) return;

        switch (thisState.appState.state) {
            case STATES.DRIFT: {
                if (yPos != 0) {
                    store.dispatch({ type: "end_drift" });
                } else {
                    //TODO
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

                    //set fadeOpacity to percentage of scroll
                    const newFadeOpacity = scrollPercentage;
                    setFadeOpacity(newFadeOpacity);
                }
                break;
            }
            default:
                break;
        }
    }, [camera, thisState.appState.state, yPos]);

    return (
        <div>
            <div
                style={{
                    opacity: fadeOpacity,
                }}
                className="fixed bg-tertiary h-screen w-full z-10"
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
            <Snackbar
                open={error !== ""}
                autoHideDuration={60000}
                onClose={handleErrorClose}
                className="z-10"
            >
                <Alert severity="error" sx={{ width: "100%" }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default connect(mapStateToProps)(LiquidScene);
