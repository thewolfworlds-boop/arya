import React, { useEffect, useRef } from 'react';

export default function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle mouse tracking for gentle romantic parallax
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Floating Stardust Particles (Light Rose Tints) - Optimized for 60fps performance
    const numParticles = Math.min(35, Math.floor((width * height) / 25000));
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.15,
      pulseSpeed: Math.random() * 0.01 + 0.003,
      layer: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#d96b83' : '#e9a6b4'
    }));

    // Soft Sunlight / Blush Bokeh Orbs
    const numBokeh = 5;
    const bokehOrbs = Array.from({ length: numBokeh }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 90 + 50,
      alpha: Math.random() * 0.1 + 0.03,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      color: Math.random() > 0.5 ? 'rgba(246, 214, 221, ' : 'rgba(253, 236, 239, '
    }));

    // Falling Soft Rose Petals
    const numPetals = 6;
    const petals = Array.from({ length: numPetals }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.008,
      speedY: Math.random() * 0.35 + 0.15,
      speedX: Math.sin(Math.random() * Math.PI) * 0.2,
      opacity: Math.random() * 0.35 + 0.15
    }));

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.025;
      mouse.y += (mouse.targetY - mouse.y) * 0.025;

      const offsetX = (mouse.x - width / 2) * 0.01;
      const offsetY = (mouse.y - height / 2) * 0.01;

      ctx.clearRect(0, 0, width, height);

      // Render Soft Bokeh Orbs
      bokehOrbs.forEach((orb) => {
        orb.x += orb.speedX;
        orb.y += orb.speedY;

        if (orb.x < -100) orb.x = width + 100;
        if (orb.x > width + 100) orb.x = -100;
        if (orb.y < -100) orb.y = height + 100;
        if (orb.y > height + 100) orb.y = -100;

        const px = orb.x + offsetX * 0.5;
        const py = orb.y + offsetY * 0.5;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, orb.radius);
        grad.addColorStop(0, orb.color + orb.alpha + ')');
        grad.addColorStop(1, orb.color + '0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Floating Dust Particles
      particles.forEach((p) => {
        p.alpha += p.pulseSpeed;
        if (p.alpha > 0.6 || p.alpha < 0.1) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        const px = p.x + offsetX * p.layer;
        const py = p.y + offsetY * p.layer;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.6, p.alpha));
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Render Falling Rose Petals
      petals.forEach((petal) => {
        petal.y += petal.speedY;
        petal.x += Math.sin(petal.y * 0.01) * 0.4;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > height + 20) {
          petal.y = -20;
          petal.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(petal.x + offsetX, petal.y + offsetY);
        ctx.rotate(petal.rotation);
        ctx.fillStyle = `rgba(217, 107, 131, ${petal.opacity})`;

        // Organic rose petal silhouette
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-petal.size / 2, -petal.size, -petal.size, petal.size / 2, 0, petal.size);
        ctx.bezierCurveTo(petal.size, petal.size / 2, petal.size / 2, -petal.size, 0, 0);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.95
      }}
    />
  );
}
