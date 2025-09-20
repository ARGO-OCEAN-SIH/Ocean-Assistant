'use client'

import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec3 } from "ogl";

export default function Orb({ hue = 220, hoverIntensity = 0.3, rotateOnHover = true, forceHoverState = false }) {
  const ctnDom = React.useRef(null);
  
  const vert = /* glsl */ `
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;
  
  const frag = /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform float iTime;
    uniform vec3 iResolution;
    uniform float hue;
    uniform float hover;
    uniform float rot;
    uniform float hoverIntensity;

    // Convert RGB to YIQ for hue rotation
    vec3 rgb2yiq(vec3 c) {
      float y = dot(c, vec3(0.299, 0.587, 0.114));
      float i = dot(c, vec3(0.596, -0.274, -0.322));
      float q = dot(c, vec3(0.211, -0.523, 0.312));
      return vec3(y, i, q);
    }

    // Convert YIQ to RGB
    vec3 yiq2rgb(vec3 c) {
      float r = c.x + 0.956 * c.y + 0.621 * c.z;
      float g = c.x - 0.272 * c.y - 0.647 * c.z;
      float b = c.x - 1.106 * c.y + 1.703 * c.z;
      return vec3(r, g, b);
    }

    // Adjust hue of a color by hueDeg degrees
    vec3 adjustHue(vec3 color, float hueDeg) {
      float hueRad = hueDeg * 3.14159265 / 180.0;
      vec3 yiq = rgb2yiq(color);
      float cosA = cos(hueRad);
      float sinA = sin(hueRad);
      float i = yiq.y * cosA - yiq.z * sinA;
      float q = yiq.y * sinA + yiq.z * cosA;
      yiq.y = i;
      yiq.z = q;
      return yiq2rgb(yiq);
    }

    // 3D Perlin noise - classic simplex noise replacement
    float snoise(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0);
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      // First corner
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx);

      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      // x0, x1, x2, x3 offset
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      // Hash
      i = mod(i, 289.0);
      vec4 p = permute( permute( permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      // Normalized gradients
      float n_ = 1.0/7.0; // N=7
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );

      vec4 x = x_ *ns.x + ns.y;
      vec4 y = y_ *ns.x + ns.y;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      // Gradients
      vec4 norm = inversesqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

      // Mix contributions
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    // Permutation function
    vec4 permute(vec4 x) {
      return mod(((x*34.0)+1.0)*x, 289.0);
    }

    vec4 extractAlpha(vec3 colorIn) {
      float a = max(max(colorIn.r, colorIn.g), colorIn.b);
      return vec4(colorIn.rgb / (a + 1e-5), a);
    }

    const vec3 baseColor1 = vec3(0.611, 0.262, 0.996);
    const vec3 baseColor2 = vec3(0.298, 0.760, 0.913);
    const vec3 baseColor3 = vec3(0.062, 0.078, 0.600);

    float innerRadius = 0.6;
    float noiseScale = 0.65;

    float lightFunc1(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * attenuation);
    }

    float lightFunc2(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * dist * attenuation);
    }

    vec4 draw(vec2 uv, float time, float hover, float rot, float hue, float hoverIntensity) {
      vec3 col1 = adjustHue(baseColor1, hue);
      vec3 col2 = adjustHue(baseColor2, hue);
      vec3 col3 = adjustHue(baseColor3, hue);

      float ang = atan(uv.y, uv.x);
      float len = length(uv);
      float invLen = len > 0.0 ? 1.0 / len : 0.0;

      float n0 = snoise(vec3(uv * noiseScale, time * 0.5)) * 0.5 + 0.5;
      float r0 = mix(innerRadius * 0.95, 1.0, n0);
      float d0 = distance(uv, (r0 * invLen) * uv);
      float v0 = lightFunc1(1.0, 10.0, d0);
      v0 *= smoothstep(r0 * 1.1, r0, len);
      float cl = mix(0.4, 1.0, sin(ang + time * 2.0) * 0.5 + 0.5);

      float a = time * -0.5;
      vec2 pos = vec2(cos(a), sin(a)) * r0;
      float d = distance(uv, pos);
      float v1 = lightFunc2(1.5, 5.0, d);
      v1 *= lightFunc1(hover * hoverIntensity, 25.0, d0);

      float v2 = smoothstep(1.0, innerRadius + 0.3, len);
      float v3 = smoothstep(innerRadius, innerRadius + 0.4, len);

      vec3 col = mix(col1, col2, cl);
      col = (col * v0) + (col3 * v1); 
      col *= v2 * v3;

      col = clamp(col, 0.0, 1.0);
      
      return vec4(col, length(col));
    }

    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      uv.y *= iResolution.y / iResolution.x;
      vec4 color = draw(uv, iTime, hover, rot, hue, hoverIntensity);
      gl_FragColor = color;
    }
  `;

  // Removed duplicate ctnDom declaration

  useEffect(() => {
    if (!ctnDom.current) return;

    const renderer = new Renderer({ dpr: window.devicePixelRatio, alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    ctnDom.current.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height) },
        hue: { value: hue },
        hover: { value: 0 },
        rot: { value: 0 },
        hoverIntensity: { value: hoverIntensity }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const { width, height } = ctnDom.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width = width + "px";
      gl.canvas.style.height = height + "px";
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
    }
    resize();

    window.addEventListener("resize", resize);

    let targetHover = 0;
    let rotation = 0;

    const mouseMoveHandler = (event) => {
      const rect = ctnDom.current.getBoundingClientRect();
      const pos = [
        (event.clientX - rect.left) / rect.width,
        1.0 - (event.clientY - rect.top) / rect.height,
      ];
      const centeredPos = [
        2.0 * pos[0] - 1.0,
        2.0 * pos[1] - 1.0,
      ];
      if (Math.sqrt(centeredPos[0] * centeredPos[0] + centeredPos[1] * centeredPos[1]) < 0.9) {
        targetHover = 1;
      } else {
        targetHover = 0;
      }
    };

    ctnDom.current.addEventListener("mousemove", mouseMoveHandler);
    ctnDom.current.addEventListener("mouseleave", () => {
      targetHover = 0;
    });

    let lastTime = 0;

    const animate = (t) => {
      requestAnimationFrame(animate);
      const delta = (t - lastTime) * 0.001;
      lastTime = t;
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.hue.value = hue;
      program.uniforms.hoverIntensity.value = hoverIntensity;
      program.uniforms.hover.value += (targetHover - program.uniforms.hover.value) * 0.1;

      if (rotateOnHover && program.uniforms.hover.value > 0.3) {
        rotation += delta * 0.5;
      }
      program.uniforms.rot.value = rotation;

      renderer.render({ scene: mesh });
    };
    animate(0);

    return () => {
      window.removeEventListener("resize", resize);
      ctnDom.current.removeEventListener("mousemove", mouseMoveHandler);
      ctnDom.current.removeEventListener("mouseleave", () => {});
      ctnDom.current.removeChild(gl.canvas);
      cancelAnimationFrame(animate);
      if (gl.getExtension("WEBGL_lose_context")) {
        gl.getExtension("WEBGL_lose_context").loseContext();
      }
    };
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);

  return <div ref={ctnDom} className="w-full h-full rounded-full overflow-hidden" />;
}
