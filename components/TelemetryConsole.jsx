"use client";

import React, { useEffect, useRef, useState } from 'react';

/**
 * Real-Time Systems & Telemetry Console
 * Modular React / Next.js Component for Yared Kinetibeb Tesfaye's Portfolio
 * Highlights dual engineering identity in Cloud Microservices and Bare-Metal Embedded Systems.
 */
export default function TelemetryConsole() {
  const [mode, setMode] = useState('cloud'); // 'cloud' | 'embedded'
  const [uptimeText, setUptimeText] = useState('UPTIME: 99.998% | T+00:00:00.0');
  const [chAStat, setChAStat] = useState('CH-A: 142.8 MHz (WebSocket/Sensor)');
  const [chBStat, setChBStat] = useState('CH-B: 64.0 kHz (FreeRTOS PWM)');

  const canvasRef = useRef(null);
  const userMouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const animFrameId = useRef(null);
  const startTimeRef = useRef(Date.now());

  // Uptime counter timer
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedMs = Date.now() - startTimeRef.current;
      const totalSec = Math.floor(elapsedMs / 1000);
      const hours = String(Math.floor(totalSec / 3600)).padStart(2, '0');
      const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
      const secs = String(totalSec % 60).padStart(2, '0');
      const ms = String(Math.floor((elapsedMs % 1000) / 100));
      setUptimeText(`UPTIME: 99.998% | T+${hours}:${mins}:${secs}.${ms}`);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Update channel stats on mode change
  useEffect(() => {
    if (mode === 'cloud') {
      setChAStat('CH-A: 142.8 MHz (WebSocket Stream)');
      setChBStat('CH-B: 99.99% (gRPC / eBPF Mesh)');
    } else {
      setChAStat('CH-A: 16.0 MHz (ATmega328P Clock)');
      setChBStat('CH-B: 4.8 kHz (FreeRTOS PWM / ADC)');
    }
  }, [mode]);

  // Waveform Canvas Oscilloscope Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let isVisible = true;
    let t = 0;

    const render = () => {
      if (!isVisible) return;

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Draw Oscilloscope Background Grid
      ctx.strokeStyle = 'rgba(245, 185, 66, 0.08)';
      ctx.lineWidth = 1;

      const gridSpacingX = 40;
      const gridSpacingY = 30;

      for (let x = 0; x < width; x += gridSpacingX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacingY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center Reference Axis Line
      ctx.strokeStyle = 'rgba(245, 185, 66, 0.2)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Frequency & Amplitude Modulators
      const mouse = userMouseRef.current;
      const mouseFreqMod = mouse.active ? (mouse.x * 2.5 + 0.5) : 1.0;
      const noiseAmp = mouse.active ? (mouse.y * 12) : 3;

      const speed = mode === 'cloud' ? 0.08 : 0.04;
      t += speed;

      // Channel A (Amber): Telemetry Packet Jitter / Sensor Stream
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#f5b942';
      ctx.strokeStyle = '#f5b942';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const centerY = height * 0.38;
      for (let x = 0; x < width; x += 2) {
        const normX = x / width;
        const wave1 = Math.sin((normX * 14 * mouseFreqMod) + t * 2);
        const wave2 = Math.cos((normX * 28 * mouseFreqMod) - t * 3) * 0.4;
        const noise = (Math.random() - 0.5) * noiseAmp;

        // Packet Burst spike simulation
        const burst = (Math.sin(normX * 6 + t * 4) > 0.85) ? (Math.sin(normX * 40) * 16) : 0;
        const y = centerY + (wave1 + wave2) * 22 + noise + burst;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Channel B (Cyan/Emerald): Sine/Square Hybrid (PWM / Clock Signal)
      ctx.shadowBlur = 10;
      ctx.shadowColor = mode === 'cloud' ? '#06b6d4' : '#10b981';
      ctx.strokeStyle = mode === 'cloud' ? '#06b6d4' : '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const centerYB = height * 0.68;
      for (let x = 0; x < width; x += 2) {
        const normX = x / width;
        let yB = centerYB;

        if (mode === 'cloud') {
          // Smooth Sine + Harmonic Phase
          const wB1 = Math.sin((normX * 10 * mouseFreqMod) - t * 1.5);
          const wB2 = Math.sin((normX * 20 * mouseFreqMod) + t * 3) * 0.25;
          yB = centerYB + (wB1 + wB2) * 24;
        } else {
          // Square Wave PWM Simulation
          const pwmPeriod = Math.sin((normX * 16 * mouseFreqMod) + t * 2.5);
          const squareVal = pwmPeriod > 0 ? 22 : -22;
          yB = centerYB + squareVal;
        }

        if (x === 0) ctx.moveTo(x, yB);
        else ctx.lineTo(x, yB);
      }
      ctx.stroke();

      // Reset shadow for performance
      ctx.shadowBlur = 0;

      animFrameId.current = requestAnimationFrame(render);
    };

    // IntersectionObserver to auto-pause animation when offscreen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animFrameId.current);
          animFrameId.current = requestAnimationFrame(render);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(canvas);
    animFrameId.current = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animFrameId.current);
    };
  }, [mode]);

  // Mouse Interaction Handlers
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    userMouseRef.current = { x, y, active: true };
  };

  const handleMouseLeave = () => {
    userMouseRef.current = { x: 0.5, y: 0.5, active: false };
  };

  return (
    <div className="telemetry-console-card" id="telemetry-console">
      {/* Telemetry Header */}
      <div className="telemetry-header">
        <div className="telemetry-status">
          <span className="live-dot-pulse"></span>
          <span className="status-title">ENGINEERING SUBSYSTEMS // LIVE TELEMETRY</span>
        </div>
        <div className="telemetry-readouts">
          <div className="uptime-counter">{uptimeText}</div>
          <div className="mode-toggle-group">
            <button
              className={`mode-btn ${mode === 'cloud' ? 'active' : ''}`}
              onClick={() => setMode('cloud')}
            >
              <i className="fas fa-server"></i> Cloud Microservices
            </button>
            <button
              className={`mode-btn ${mode === 'embedded' ? 'active' : ''}`}
              onClick={() => setMode('embedded')}
            >
              <i className="fas fa-microchip"></i> Embedded & Hardware
            </button>
          </div>
        </div>
      </div>

      {/* Waveform Oscilloscope Canvas */}
      <div
        className="telemetry-canvas-wrapper"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas ref={canvasRef} width={840} height={180} />
        <div className="canvas-overlay-stats">
          <span><i className="fas fa-circle" style={{ color: '#f5b942', fontSize: '8px' }}></i> {chAStat}</span>
          <span><i className="fas fa-circle" style={{ color: mode === 'cloud' ? '#06b6d4' : '#10b981', fontSize: '8px' }}></i> {chBStat}</span>
          <span><i className="fas fa-mouse-pointer"></i> Drag mouse to modulate signal frequency & noise</span>
        </div>
      </div>

      {/* Bento Grid Domain Nodes */}
      <div className="telemetry-bento-grid">
        {/* Node 01 */}
        <div className="telemetry-node-card">
          <div className="node-header">
            <div className="node-badge"><i className="fas fa-cubes"></i> NODE 01</div>
            <span className="node-category">CLOUD / SYSTEM</span>
          </div>
          <h4 className="node-title">Low-Latency Go Microservices</h4>
          <ul className="node-metrics">
            <li><i className="fas fa-check-circle"></i> <span>Sub-ms p99 latency</span></li>
            <li><i className="fas fa-check-circle"></i> <span>Lock-free SPSC ring buffer</span></li>
            <li><i className="fas fa-check-circle"></i> <span>Concurrency pipelines</span></li>
          </ul>
          <div className="node-arch-tags">
            <span className="arch-tag">Golang 1.22</span>
            <span className="arch-tag">gRPC</span>
            <span className="arch-tag">Atomic Ring</span>
            <span className="arch-tag">Zero-Alloc</span>
          </div>
        </div>

        {/* Node 02 */}
        <div className="telemetry-node-card">
          <div className="node-header">
            <div className="node-badge"><i className="fas fa-microchip"></i> NODE 02</div>
            <span className="node-category">HARDWARE / FIRMWARE</span>
          </div>
          <h4 className="node-title">Bare-Metal & Embedded C/C++</h4>
          <ul className="node-metrics">
            <li><i className="fas fa-check-circle"></i> <span>FreeRTOS task scheduler</span></li>
            <li><i className="fas fa-check-circle"></i> <span>ADC / PWM register control</span></li>
            <li><i className="fas fa-check-circle"></i> <span>Hardware opto-isolation</span></li>
          </ul>
          <div className="node-arch-tags">
            <span className="arch-tag">ATmega328P</span>
            <span className="arch-tag">ISR Handlers</span>
            <span className="arch-tag">SPI / I2C</span>
            <span className="arch-tag">DMA</span>
          </div>
        </div>

        {/* Node 03 */}
        <div className="telemetry-node-card">
          <div className="node-header">
            <div className="node-badge"><i className="fab fa-docker"></i> NODE 03</div>
            <span className="node-category">ORCHESTRATION</span>
          </div>
          <h4 className="node-title">Cloud-Native & K8s Mesh</h4>
          <ul className="node-metrics">
            <li><i className="fas fa-check-circle"></i> <span>eBPF tracing</span></li>
            <li><i className="fas fa-check-circle"></i> <span>Container orchestration</span></li>
            <li><i className="fas fa-check-circle"></i> <span>Zero-downtime deploys</span></li>
          </ul>
          <div className="node-arch-tags">
            <span className="arch-tag">Docker</span>
            <span className="arch-tag">eBPF</span>
            <span className="arch-tag">Chaos Mesh</span>
            <span className="arch-tag">Prometheus</span>
          </div>
        </div>

        {/* Node 04 */}
        <div className="telemetry-node-card">
          <div className="node-header">
            <div className="node-badge"><i className="fas fa-bolt"></i> NODE 04</div>
            <span className="node-category">STREAMING</span>
          </div>
          <h4 className="node-title">Event-Driven Real-Time Data</h4>
          <ul className="node-metrics">
            <li><i className="fas fa-check-circle"></i> <span>Redis Pub/Sub</span></li>
            <li><i className="fas fa-check-circle"></i> <span>WebSockets broadcast</span></li>
            <li><i className="fas fa-check-circle"></i> <span>Time-series ingestion</span></li>
          </ul>
          <div className="node-arch-tags">
            <span className="arch-tag">Redis 7</span>
            <span className="arch-tag">WSS</span>
            <span className="arch-tag">100k+ msg/s</span>
            <span className="arch-tag">Time-Series</span>
          </div>
        </div>
      </div>
    </div>
  );
}
