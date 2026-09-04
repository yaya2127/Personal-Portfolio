"use client";

import React, { useEffect, useRef, useState } from 'react';

interface NodeData {
  id: string;
  label: string;
  color: string;
  glow: string;
  category: 'cloud' | 'embedded' | 'web';
  x: number;
  y: number;
  z: number;
  connections: string[];
}

/**
 * TechConstellation.tsx
 * Optimized 60 FPS 3D Interactive Polyhedron Constellation Mesh
 * Exact visual match to Image 2 with vibrant multi-color nodes, thick geometric wireframe edges,
 * high-performance 2-pass glow (no shadowBlur lag), and 3D drag momentum.
 */
export default function TechConstellation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hoveredNodeRef = useRef<string | null>(null);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  // Rotation and momentum state
  const rotationRef = useRef({ x: 0.2, y: 0.3, velX: 0, velY: 0.003 });
  const dragRef = useRef({ isDragging: false, lastMouseX: 0, lastMouseY: 0 });
  const animFrameId = useRef<number | null>(null);

  // 12 Expanded Polyhedron Nodes matching Image 2
  const nodesRef = useRef<NodeData[]>([
    { id: 'ts', label: 'TS', color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.8)', category: 'web', x: 0, y: 0, z: 0, connections: ['dj', 'git', 'sql', 'n'] },
    { id: 'n', label: 'N', color: '#ffffff', glow: 'rgba(255, 255, 255, 0.9)', category: 'web', x: 0, y: 0, z: 0, connections: ['ts', 'css', 'c++', 'dj', 'lv'] },
    { id: 'dj', label: 'dj', color: '#10b981', glow: 'rgba(16, 185, 129, 0.8)', category: 'cloud', x: 0, y: 0, z: 0, connections: ['ts', 'lv', 'sql', 'c++'] },
    { id: 'lv', label: 'LV', color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.8)', category: 'cloud', x: 0, y: 0, z: 0, connections: ['dj', 'git', 'n'] },
    { id: 'git', label: 'Git', color: '#f97316', glow: 'rgba(249, 115, 22, 0.8)', category: 'web', x: 0, y: 0, z: 0, connections: ['lv', 'css', 'ts'] },
    { id: 'sql', label: 'SQL', color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.8)', category: 'cloud', x: 0, y: 0, z: 0, connections: ['ts', 'c++', 'py', 'php'] },
    { id: 'c++', label: 'C++', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.8)', category: 'embedded', x: 0, y: 0, z: 0, connections: ['sql', 'py', 'php', 'n', 'dj'] },
    { id: 'py', label: 'Py', color: '#f5b942', glow: 'rgba(245, 185, 66, 0.8)', category: 'cloud', x: 0, y: 0, z: 0, connections: ['sql', 'c++', 'php'] },
    { id: 'php', label: 'PHP', color: '#6366f1', glow: 'rgba(99, 102, 241, 0.8)', category: 'web', x: 0, y: 0, z: 0, connections: ['c++', 'py', 'css', 'sql'] },
    { id: 'css', label: 'CSS', color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.8)', category: 'web', x: 0, y: 0, z: 0, connections: ['php', 'n', 'git'] },
    { id: 'go', label: 'Go', color: '#f5b942', glow: 'rgba(245, 185, 66, 0.8)', category: 'cloud', x: 0, y: 0, z: 0, connections: ['n', 'sql', 'k8s'] },
    { id: 'k8s', label: 'K8s', color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.8)', category: 'cloud', x: 0, y: 0, z: 0, connections: ['go', 'css'] }
  ]);

  // Distribute nodes in a wide 3D Sphere lattice
  useEffect(() => {
    const nodes = nodesRef.current;
    const count = nodes.length;
    const radius = 210; // Wide radius to fill the card like Image 2
    const phi = Math.PI * (3 - Math.sqrt(5));

    nodes.forEach((node, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      node.x = Math.cos(theta) * radiusAtY * radius;
      node.y = y * radius;
      node.z = Math.sin(theta) * radiusAtY * radius;
    });
  }, []);

  // 60 FPS Optimized 3D Rendering Loop (2-pass rendering, zero shadowBlur overhead)
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

      // Background Subtle Grid
      ctx.strokeStyle = 'rgba(245, 185, 66, 0.03)';
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

      // Auto rotation physics & damping
      if (!dragRef.current.isDragging && !hoveredNodeRef.current) {
        rot.x += rot.velX;
        rot.y += rot.velY;
        rot.velX *= 0.95;
        rot.velY = rot.velY * 0.95 + 0.0025 * 0.05;
      }

      const sinX = Math.sin(rot.x);
      const cosX = Math.cos(rot.x);
      const sinY = Math.sin(rot.y);
      const cosY = Math.cos(rot.y);

      const focalLength = 420;
      const sphereRadius = 210;

      const projectedNodes = nodesRef.current.map((node) => {
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;
        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        const scale = focalLength / (focalLength + z2 + sphereRadius);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;
        const alpha = Math.max(0.2, Math.min(1.0, (z2 + sphereRadius) / (2 * sphereRadius)));

        return { ...node, projX, projY, projZ: z2, scale, alpha };
      });

      projectedNodes.sort((a, b) => a.projZ - b.projZ);

      const activeHoverId = hoveredNodeRef.current;

      // 1. Draw Thick Multi-Color Wireframe Edges (2-pass fast render)
      projectedNodes.forEach((node) => {
        node.connections.forEach((targetId) => {
          const target = projectedNodes.find((n) => n.id === targetId);
          if (!target) return;

          const isEdgeHighlighted = activeHoverId && (activeHoverId === node.id || activeHoverId === target.id);
          const avgAlpha = (node.alpha + target.alpha) / 2;

          // Wireframe Edge Color (Orange/Magenta gradient feel like Image 2)
          const edgeColor = isEdgeHighlighted ? '#f97316' : (node.id === 'n' || target.id === 'n' ? '#f43f5e' : '#f97316');

          ctx.beginPath();
          ctx.moveTo(node.projX, node.projY);
          ctx.lineTo(target.projX, target.projY);

          if (isEdgeHighlighted) {
            // Glow pass
            ctx.strokeStyle = 'rgba(249, 115, 22, 0.4)';
            ctx.lineWidth = 6 * Math.max(node.scale, target.scale);
            ctx.stroke();

            // Core line
            ctx.beginPath();
            ctx.moveTo(node.projX, node.projY);
            ctx.lineTo(target.projX, target.projY);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2.5 * Math.max(node.scale, target.scale);
            ctx.stroke();
          } else {
            // Outer semi-transparent line
            ctx.strokeStyle = `rgba(249, 115, 22, ${avgAlpha * 0.35})`;
            ctx.lineWidth = 2.2 * Math.min(node.scale, target.scale);
            ctx.stroke();
          }
        });
      });

      // 2. Draw Vector-Quality Glowing Circular Badges (Matching Image 2)
      projectedNodes.forEach((node) => {
        const isHovered = activeHoverId === node.id;
        const baseRadius = 24;
        const radius = baseRadius * node.scale * (isHovered ? 1.3 : 1.0);
        const opacity = isHovered ? 1.0 : node.alpha;

        ctx.save();
        ctx.translate(node.projX, node.projY);

        // Glow ring pass (fast, no shadowBlur)
        ctx.beginPath();
        ctx.arc(0, 0, radius + 4, 0, Math.PI * 2);
        ctx.fillStyle = node.glow.replace(/[\d\.]+\)$/, `${opacity * 0.25})`);
        ctx.fill();

        // Node Circle Base
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(18, 18, 24, ${opacity * 0.95})`;
        ctx.strokeStyle = isHovered ? '#ffffff' : node.color;
        ctx.lineWidth = (isHovered ? 3.0 : 2.2) * node.scale;
        ctx.fill();
        ctx.stroke();

        // Node Label Text
        ctx.fillStyle = isHovered ? '#ffffff' : node.color;
        ctx.font = `800 ${Math.max(11, Math.round(13 * node.scale * (isHovered ? 1.15 : 1.0)))}px "Outfit", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, 0, 0);

        ctx.restore();
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
          animFrameId.current = requestAnimationFrame(render);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(canvas);
    animFrameId.current = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Handle Drag & Pointer Movements
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    dragRef.current = {
      isDragging: true,
      lastMouseX: e.clientX,
      lastMouseY: e.clientY
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (dragRef.current.isDragging) {
      const deltaX = e.clientX - dragRef.current.lastMouseX;
      const deltaY = e.clientY - dragRef.current.lastMouseY;

      rotationRef.current.velY = deltaX * 0.004;
      rotationRef.current.velX = -deltaY * 0.004;
      rotationRef.current.x += rotationRef.current.velX;
      rotationRef.current.y += rotationRef.current.velY;

      dragRef.current.lastMouseX = e.clientX;
      dragRef.current.lastMouseY = e.clientY;
    }

    // Hit test node hover
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const rot = rotationRef.current;

    const sinX = Math.sin(rot.x);
    const cosX = Math.cos(rot.x);
    const sinY = Math.sin(rot.y);
    const cosY = Math.cos(rot.y);

    const focalLength = 420;
    const sphereRadius = 210;

    let hoveredId: string | null = null;
    let minDistance = Infinity;

    nodesRef.current.forEach((node) => {
      let x1 = node.x * cosY - node.z * sinY;
      let z1 = node.z * cosY + node.x * sinY;
      let y2 = node.y * cosX - z1 * sinX;
      let z2 = z1 * cosX + node.y * sinX;

      const scale = focalLength / (focalLength + z2 + sphereRadius);
      const projX = centerX + x1 * scale;
      const projY = centerY + y2 * scale;
      const hitRadius = 28 * scale;

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

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      dragRef.current = {
        isDragging: true,
        lastMouseX: e.touches[0].clientX,
        lastMouseY: e.touches[0].clientY
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (dragRef.current.isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - dragRef.current.lastMouseX;
      const deltaY = e.touches[0].clientY - dragRef.current.lastMouseY;

      rotationRef.current.velY = deltaX * 0.004;
      rotationRef.current.velX = -deltaY * 0.004;
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
          <span><i className="fas fa-circle" style={{ color: '#3b82f6', fontSize: '8px' }}></i> TypeScript / React</span>
          <span><i className="fas fa-circle" style={{ color: '#10b981', fontSize: '8px' }}></i> Django / Python</span>
          <span><i className="fas fa-circle" style={{ color: '#a855f7', fontSize: '8px' }}></i> C++ / Embedded</span>
          <span><i className="fas fa-circle" style={{ color: '#ffffff', fontSize: '8px' }}></i> Next.js Core</span>
        </div>
      </div>

      <div className="constellation-canvas-wrapper" style={{ touchAction: 'pan-y' }}>
        <canvas
          ref={canvasRef}
          width={840}
          height={460}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ width: '100%', height: '460px', cursor: dragRef.current.isDragging ? 'grabbing' : 'grab' }}
        />
        <div className="constellation-hint">
          <i className="fas fa-hand-pointer"></i> Drag 3D Wireframe to spin | Hover node to isolate mesh
        </div>
      </div>
    </div>
  );
}
