const DistortedTextFrag = `

  precision highp float;
  precision highp int;
  uniform sampler2D u_texture;
  uniform sampler2D u_touch_texture;
  uniform float u_time;
  uniform vec4 res;

  varying vec2 vUv;
  uniform float u_ratio;
  uniform vec2 u_mouse;

  // --------------------------------
  // 2D noise

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    // R and G values are velocity in the x and y direction
    // B value is the velocity length
    vec3 flow = texture2D(u_touch_texture, vUv).rgb;


    // Add noise to the base shape
    vec2 noise_pos = vec2(uv * u_mouse * 2.).xy;

    float speed = 0.1;

    float noise = (snoise(u_mouse + vec2(0.1, u_time * speed)) * .5 + .5) * 0.01;


    uv -= (flow.xy * (0.3 * 0.2));

    vec3 tex = texture2D(u_texture, uv).rgb;

    gl_FragColor = vec4(tex.r, tex.g, tex.b, tex.r);
}
`;

export default DistortedTextFrag;