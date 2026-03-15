import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

export class AIOrb {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.scene = new THREE.Scene();
    
    // Transparent background, high performance renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 100);
    this.camera.position.z = 6;

    this.orbGroup = new THREE.Group();
    this.scene.add(this.orbGroup);

    // Inner Glowing Core (Solid sphere)
    const coreGeometry = new THREE.SphereGeometry(1.2, 64, 64);
    this.coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x00BFFF,
      emissive: 0x00BFFF,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.95,
      roughness: 0.1,
      metalness: 0.8
    });
    this.core = new THREE.Mesh(coreGeometry, this.coreMaterial);
    this.orbGroup.add(this.core);

    // Outer Wireframe Grid (Icosahedron)
    const wireGeometry = new THREE.IcosahedronGeometry(1.5, 3);
    this.wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    this.wireframe = new THREE.Mesh(wireGeometry, this.wireMaterial);
    this.orbGroup.add(this.wireframe);

    // Subtle Ambient and Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);

    this.pointLight = new THREE.PointLight(0x00ffff, 2, 20);
    this.pointLight.position.set(0, 0, 0);
    this.scene.add(this.pointLight);

    // Animation state setup
    this.state = 'idle'; // idle, speaking, listening, thinking
    this.clock = new THREE.Clock();
    
    this.animate = this.animate.bind(this);
    this.animate();

    window.addEventListener('resize', () => {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    });
  }

  setState(newState) {
    this.state = newState;
  }

  animate() {
    requestAnimationFrame(this.animate);
    const time = this.clock.getElapsedTime();

    // Constant passive animations
    this.orbGroup.position.y = Math.sin(time * 2) * 0.1; // gentle hovering

    if (this.state === 'idle') {
      this.core.rotation.y += 0.005;
      this.wireframe.rotation.y -= 0.002;
      this.wireframe.rotation.x += 0.003;
      
      this.orbGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
      this.coreMaterial.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.1;
      this.wireMaterial.opacity = 0.2;
      
    } else if (this.state === 'speaking') {
      this.core.rotation.y += 0.02;
      this.wireframe.rotation.y -= 0.01;
      this.wireframe.rotation.x += 0.005;
      
      // Fast pulsing scale and glow
      const pulse = 1 + Math.sin(time * 12) * 0.05;
      this.orbGroup.scale.lerp(new THREE.Vector3(pulse, pulse, pulse), 0.2);
      this.coreMaterial.emissiveIntensity = 0.8 + Math.sin(time * 24) * 0.3;
      this.wireMaterial.opacity = 0.6;
      
    } else if (this.state === 'listening') {
      this.core.rotation.y += 0.005;
      this.wireframe.rotation.y -= 0.008;
      
      // Wave ripple stretching effect
      const ripple = 1 + Math.sin(time * 8) * 0.04;
      const stretch = 1 + Math.cos(time * 8) * 0.04;
      this.orbGroup.scale.lerp(new THREE.Vector3(stretch, ripple, stretch), 0.1);
      
      this.coreMaterial.emissiveIntensity = 0.7;
      this.wireMaterial.opacity = 0.8;
      
    } else if (this.state === 'thinking') {
      this.core.rotation.y += 0.03;
      this.wireframe.rotation.y += 0.03;
      this.wireframe.rotation.x += 0.03;
      
      this.orbGroup.scale.lerp(new THREE.Vector3(0.9, 0.9, 0.9), 0.1);
      this.coreMaterial.emissiveIntensity = 0.3 + Math.sin(time * 5) * 0.4;
      this.wireMaterial.opacity = 0.4;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
