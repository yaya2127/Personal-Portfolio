"use client";

import React, { useEffect, useRef, useState } from 'react';

/**
 * TechConstellation.jsx
 * Standalone 3D Interactive Tech Stack Constellation Graph
 * Renders 15 tech badges in a 3D rotating sphere with mouse/touch drag momentum.
 */
export default function TechConstellation() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const hoveredNodeRef = useRef(null);
  const [activeHover, setActiveHover] = useState(null);

  // Rotation and momentum state
  const rotationRef = useRef({ x: 0.2, y: 0.3, velX: 0, velY: 0.004 });
  const dragRef = useRef({ isDragging: false, lastMouseX: 0, lastMouseY: 0 });
  const animFrameId = useRef(null);

  // 15 Tech Stack Nodes with 3D Spherical Distribution
  const nodesRef = useRef([
    { id: 'go', label: 'Go', category: 'cloud', x: 0, y: 0, z: 0, connections: ['k8s', 'redis', 'postgres', 'wss'] },
    { id: 'cpp', label: 'C++', category: 'embedded', x: 0, y: 0, z: 0, connections: ['freertos', 'arduino', 'wss'] },
    { id: 'py', label: 'Python', category: 'cloud', x: 0, y: 0, z: 0, connections: ['postgres', 'docker'] },
    { id: 'ts', label: 'TS', category: 'web', x: 0, y: 0, z: 0, connections: ['react', 'nestjs', 'git'] },
    { id: 'react', label: 'React', category: 'web', x: 0, y: 0, z: 0, connections: ['ts', 'wss', 'git'] },
    { id: 'k8s', label: 'K8s', category: 'cloud', x: 0, y: 0, z: 0, connections: ['docker', 'go'] },
    { id: 'docker', label: 'Docker', category: 'cloud', x: 0, y: 0, z: 0, connections: ['k8s', 'py', 'nestjs'] },
    { id: 'postgres', label: 'PostgreSQL', category: 'cloud', x: 0, y: 0, z: 0, connections: ['go', 'py', 'redis'] },
    { id: 'redis', label: 'Redis', category: 'cloud', x: 0, y: 0, z: 0, connections: ['go', 'wss', 'postgres'] },
    { id: 'freertos', label: 'FreeRTOS', category: 'embedded', x: 0, y: 0, z: 0, connections: ['cpp', 'arduino'] },
    { id: 'arduino', label: 'Arduino', category: 'embedded', x: 0, y: 0, z: 0, connections: ['cpp', 'freertos'] },
    { id: 'wss', label: 'WebSockets', category: 'embedded', x: 0, y: 0, z: 0, connections: ['go', 'redis', 'react'] },
    { id: 'nestjs', label: 'NestJS', category: 'cloud', x: 0, y: 0, z: 0, connections: ['ts', 'docker'] },
    { id: 'git', label: 'Git', category: 'web', x: 0, y: 0, z: 0, connections: ['react', 'ts'] },
    { id: 'ebpf', label: 'eBPF', category: 'cloud', x: 0, y: 0, z: 0, connections: ['k8s', 'go'] }
  ]);

  // Distribute 15 nodes uniformly on a 3D Sphere (Fibonacci Sphere Algorithm)
  useEffect(() => {
    const nodes = nodesRef.current;
    const count = nodes.length;
    const radius = 135; // Sphere radius in 3D space
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    nodes.forEach((node, i) => {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // Radius at y height
      const theta = phi * i;

      node.x = Math.cos(theta) * radiusAtY * radius;
      node.y = y * radius;
      node.z = Math.sin(theta) * radiusAtY * radius;
    });
  }, []);

  // 3D Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isVisible = true;

    const render = () => {
      if (!isVisible) return;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid pattern
      ctx.strokeStyle = 'rgba(245, 185, 66, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const rot = rotationRef.current;

      // Apply physics velocity & damping if not dragging or hovered
      if (!dragRef.current.isDragging && !hoveredNodeRef.current) {
        rot.x += rot.velX;
        rot.y += rot.velY;

        // Damping velocity gradually towards baseline auto-rotation speed
        rot.velX *= 0.95;
        rot.velY = rot.velY * 0.95 + 0.003 * 0.05;
      }

      // Rotate nodes around 3D axes
      const sinX = Math.sin(rot.x);
      const cosX = Math.cos(rot.x);
      const sinY = Math.sin(rot.y);
      const cosY = Math.cos(rot.y);

      const focalLength = 380;
      const sphereRadius = 135;

      const projectedNodes = nodesRef.current.map((node) => {
        // Rotate Y
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        // Rotate X
        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        // 3D Perspective Projection
        const scale = focalLength / (focalLength + z2 + sphereRadius);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;
        const alpha = Math.max(0.15, Math.min(1.0, (z2 + sphereRadius) / (2 * sphereRadius)));

        return {
          ...node,
          projX,
          projY,
          projZ: z2,
          scale,
          alpha
        };
      });

      // Sort nodes by Z depth so back nodes are rendered first
      projectedNodes.sort((a, b) => a.projZ - b.projZ);

      const activeHoverId = hoveredNodeRef.current;

      // 1. Draw Connecting Edges
      projectedNodes.forEach((node) => {
        node.connections.forEach((targetId) => {
          const target = projectedNodes.find((n) => n.id === targetId);
          if (!target) return;

          const isEdgeHighlighted =
            activeHoverId && (activeHoverId === node.id || activeHoverId === target.id);
          const avgAlpha = (node.alpha + target.alpha) / 2;

          ctx.beginPath();
          ctx.moveTo(node.projX, node.projY);
          ctx.lineTo(target.projX, target.projY);

          if (isEdgeHighlighted) {
            ctx.strokeStyle = 'rgba(245, 185, 66, 0.8)';
            ctx.lineWidth = 2.2 * Math.max(node.scale, target.scale);
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#f5b942';
          } else {
            ctx.strokeStyle = `rgba(245, 185, 66, ${avgAlpha * 0.25})`;
            ctx.lineWidth = 1.2 * Math.min(node.scale, target.scale);
            ctx.shadowBlur = 0;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        });
      });

      // 2. Draw Nodes (Tech Badges)
      projectedNodes.forEach((node) => {
        const isHovered = activeHoverId === node.id;
        const baseRadius = 22;
        const radius = baseRadius * node.scale * (isHovered ? 1.25 : 1.0);
        const opacity = isHovered ? 1.0 : node.alpha;

        ctx.save();
        ctx.translate(node.projX, node.projY);

        // Circular background fill
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);

        if (isHovered) {
          ctx.fillStyle = 'rgba(30, 30, 42, 0.95)';
          ctx.strokeStyle = '#f5b942';
          ctx.lineWidth = 2.5;
          ctx.shadowBlur = 16;
          ctx.shadowColor = '#f5b942';
        } else {
          ctx.fillStyle = `rgba(18, 18, 24, ${opacity * 0.85})`;
          ctx.strokeStyle = node.category === 'cloud'
            ? `rgba(245, 185, 66, ${opacity * 0.6})`
            : node.category === 'embedded'
            ? `rgba(6, 182, 212, ${opacity * 0.6})`
            : `rgba(16, 185, 129, ${opacity * 0.6})`;
          ctx.lineWidth = 1.5 * node.scale;
          ctx.shadowBlur = 6 * node.scale;
          ctx.shadowColor = node.category === 'cloud' ? '#f5b942' : '#06b6d4';
        }

        ctx.fill();
        ctx.stroke();

        // Node Label Text
        ctx.shadowBlur = 0;
        ctx.fillStyle = isHovered ? '#ffffff' : `rgba(241, 245, 249, ${opacity})`;
        ctx.font = `${isHovered ? '700' : '600'} ${Math.max(10, Math.round(11 * node.scale * (isHovered ? 1.15 : 1.0)))}px "Outfit", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, 0, 0);

        ctx.restore();
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    // IntersectionObserver to pause animation when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
            animFrameId.current = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);
    animFrameId.current = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Handle Drag & Mouse Movements
  const handleMouseDown = (e) => {
    dragRef.current = {
      isDragging: true,
      lastMouseX: e.clientX,
      lastMouseY: e.clientY
    };
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (dragRef.current.isDragging) {
      const deltaX = e.clientX - dragRef.current.lastMouseX;
      const deltaY = e.clientY - dragRef.current.lastMouseY;

      rotationRef.current.velY = deltaX * 0.005;
      rotationRef.current.velX = -deltaY * 0.005;
      rotationRef.current.x += rotationRef.current.velX;
      rotationRef.current.y += rotationRef.current.velY;

      dragRef.current.lastMouseX = e.clientX;
      dragRef.current.lastMouseY = e.clientY;
    }

    // Check hit test for node hovering
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const rot = rotationRef.current;

    const sinX = Math.sin(rot.x);
    const cosX = Math.cos(rot.x);
    const sinY = Math.sin(rot.y);
    const cosY = Math.cos(rot.y);

    const focalLength = 380;
    const sphereRadius = 135;

    let hoveredId = null;
    let minDistance = Infinity;

    nodesRef.current.forEach((node) => {
      let x1 = node.x * cosY - node.z * sinY;
      let z1 = node.z * cosY + node.x * sinY;
      let y2 = node.y * cosX - z1 * sinX;
      let z2 = z1 * cosX + node.y * sinX;

      const scale = focalLength / (focalLength + z2 + sphereRadius);
      const projX = centerX + x1 * scale;
      const projY = centerY + y2 * scale;
      const hitRadius = 24 * scale;

      const dist = Math.hypot(mouseX - projX, mouseY - projY);
      if (dist < hitRadius && dist < minDistance) {
        minDistance = dist;
        hoveredId = node.id;
      }
    });

    hoveredNodeRef.current = hoveredId;
    setActiveHover(hoveredId);
  };

  const handleMouseUp = () => {
    dragRef.current.isDragging = false;
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      dragRef.current = {
        isDragging: true,
        lastMouseX: e.touches[0].clientX,
        lastMouseY: e.touches[0].clientY
      };
    }
  };

  const handleTouchMove = (e) => {
    if (dragRef.current.isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - dragRef.current.lastMouseX;
      const deltaY = e.touches[0].clientY - dragRef.current.lastMouseY;

      rotationRef.current.velY = deltaX * 0.005;
      rotationRef.current.velX = -deltaY * 0.005;
      rotationRef.current.x += rotationRef.current.velX;
      rotationRef.current.y += rotationRef.current.velY;

      dragRef.current.lastMouseX = e.touches[0].clientX;
      dragRef.current.lastMouseY = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = () => {
    dragRef.current.isDragging = false;
  };

  return (
    <div className="tech-constellation-card" ref={containerRef}>
      <div className="constellation-header">
        <div className="constellation-title">
          <i className="fas fa-network-wired" style={{ color: '#f5b942' }}></i>
          <span>3D TECH STACK CONSTELLATION MESH</span>
        </div>
        <div className="constellation-legend">
          <span><i className="fas fa-circle" style={{ color: '#f5b942', fontSize: '8px' }}></i> Cloud & Backend</span>
          <span><i className="fas fa-circle" style={{ color: '#06b6d4', fontSize: '8px' }}></i> Embedded & IoT</span>
          <span><i className="fas fa-circle" style={{ color: '#10b981', fontSize: '8px' }}></i> Web & Core</span>
        </div>
      </div>

      <div className="constellation-canvas-wrapper" style={{ touchAction: 'pan-y' }}>
        <canvas
          ref={canvasRef}
          width={840}
          height={400}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ width: '100%', height: '400px', cursor: dragRef.current.isDragging ? 'grabbing' : 'grab' }}
        />
        <div className="constellation-hint">
          <i className="fas fa-hand-pointer"></i> Drag 3D Sphere to rotate | Hover node to isolate mesh
        </div>
      </div>
    </div>
  );
}
