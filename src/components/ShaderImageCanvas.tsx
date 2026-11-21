import {useEffect, useRef, useState} from 'react';
import {prefersReducedMotion} from '../utils/gsapSetup';
import {EditorialImage} from './EditorialImage';

interface ShaderImageCanvasProps {
  src: string;
  alt: string;
  className?: string;
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    v_uv.y = 1.0 - v_uv.y;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform sampler2D u_texture;
  uniform vec2 u_mouse;
  uniform float u_hover;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_imageRes;
  varying vec2 v_uv;

  void main() {
    vec2 ratio = vec2(
      min((u_resolution.x / u_resolution.y) / (u_imageRes.x / u_imageRes.y), 1.0),
      min((u_resolution.y / u_resolution.x) / (u_imageRes.y / u_imageRes.x), 1.0)
    );
    vec2 uv = vec2(
      v_uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      v_uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec2 delta = v_uv - u_mouse;
    float dist = length(delta);
    float ripple = sin(dist * 24.0 - u_time * 4.2) * exp(-dist * 5.2);
    vec2 displacedUv = uv + normalize(delta + 0.0001) * ripple * 0.016 * u_hover;

    vec3 color;
    color.r = texture2D(u_texture, displacedUv + vec2(0.0022 * u_hover, 0.0)).r;
    color.g = texture2D(u_texture, displacedUv).g;
    color.b = texture2D(u_texture, displacedUv - vec2(0.0022 * u_hover, 0.0)).b;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ShaderImageCanvas({src, alt, className = ''}: ShaderImageCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return;
    const isDesktopFine =
      window.innerWidth >= 1024 && Boolean(window.matchMedia?.('(pointer: fine)').matches);
    if (!isDesktopFine) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext('webgl', {alpha: false, antialias: true});
    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uHover = gl.getUniformLocation(program, 'u_hover');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uImgRes = gl.getUniformLocation(program, 'u_imageRes');

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let imgWidth = 1;
    let imgHeight = 1;
    let isLoaded = false;
    let disposed = false;
    let rafId = 0;
    let targetHover = 0;
    let currentHover = 0;
    const mouse = {x: 0.5, y: 0.5, tx: 0.5, ty: 0.5};

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.onload = () => {
      if (disposed) return;
      imgWidth = img.naturalWidth || 1;
      imgHeight = img.naturalHeight || 1;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      isLoaded = true;
      setWebglReady(true);
    };
    img.src = src;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / Math.max(rect.width, 1);
      mouse.ty = (e.clientY - rect.top) / Math.max(rect.height, 1);
      targetHover = 1;
    };

    const onLeave = () => {
      targetHover = 0;
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    const startTime = performance.now();
    const render = (now: number) => {
      if (disposed) return;
      rafId = requestAnimationFrame(render);
      if (!isLoaded) return;

      currentHover += (targetHover - currentHover) * 0.08;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uHover, currentHover);
      gl.uniform1f(uTime, (now - startTime) * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uImgRes, imgWidth, imgHeight);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      data-cursor="view"
      data-cursor-label="Explore"
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      {/* Fallback & SEO Image */}
      <EditorialImage
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          webglReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full block transition-opacity duration-500 ${
          webglReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
    </div>
  );
}
