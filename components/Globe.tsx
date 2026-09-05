"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function latLngToVector3([lng, lat]: [number, number], radius = 1.68) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function Globe({
  target,
  active = false,
}: {
  target?: [number, number];
  active?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 5.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(3, 2, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 0.8);
    pointLight.position.set(-4, -2, -3);
    scene.add(pointLight);

    // Earth group
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const sphereGeo = new THREE.SphereGeometry(1.6, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2563eb"),
      roughness: 0.72,
      metalness: 0.05,
    });
    const earthMesh = new THREE.Mesh(sphereGeo, sphereMat);
    earthGroup.add(earthMesh);

    const glowGeo = new THREE.SphereGeometry(1.64, 64, 64);
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.16,
      roughness: 1,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    earthGroup.add(glowMesh);

    // Marker
    const markerCoords = target || [13.405, 52.52];
    const markerPos = latLngToVector3(markerCoords);

    const markerGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const markerMesh = new THREE.Mesh(markerGeo, markerMat);
    markerMesh.position.copy(markerPos);
    earthGroup.add(markerMesh);

    const ringGeo = new THREE.RingGeometry(0.07, 0.11, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.copy(markerPos.clone().multiplyScalar(1.01));
    ringMesh.lookAt(markerPos.clone().multiplyScalar(2));
    earthGroup.add(ringMesh);

    // Stars background
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 600;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 80;
      starPositions[i + 1] = (Math.random() - 0.5) * 80;
      starPositions[i + 2] = (Math.random() - 0.5) * 80;
    }
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, transparent: true, opacity: 0.6 });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      earthGroup.rotation.y += delta * (active ? 0.12 : 0.045);

      const destination = active ? new THREE.Vector3(0, 0.65, 4.2) : new THREE.Vector3(0, 0.2, 5.4);
      camera.position.lerp(destination, 0.025);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      markerGeo.dispose();
      markerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [target, active]);

  return (
    <div className="overflow-hidden rounded-lg bg-slate-950 shadow-soft">
      <div ref={containerRef} className="h-[320px] w-full" />
    </div>
  );
}
