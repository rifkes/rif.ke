const frag = `
  precision mediump float;

  varying vec2 vUv;
  varying vec3 viewZ;
  uniform float u_ratio;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_alpha;
  uniform sampler2D u_touch_texture;
  uniform float u_noise_seed;
  uniform sampler2D u_texture;
  uniform float u_distortion_amount;
  uniform vec2 u_resolution;

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

  float random (in vec2 _st) {
      return fract(sin(dot(_st.xy,
                          vec2(12.9898,78.233)))*
          43758.5453123);
  }

  void main() {
    vec2 st = vUv;
    vec2 uv = vUv;

    float distortion_amount = clamp(u_distortion_amount, 0.0, 1.0);

    vec2 mouse = st * 2. - u_mouse.xy;
    mouse.x *= u_ratio * 2.;
    mouse.x += u_noise_seed;

    // Texture we create and update in JS => bas shape
    float touch = texture2D(u_touch_texture, st).r;

    // Add noise to the base shape
    vec2 noise_pos = vec2(st * u_mouse * 2.).xy;

    float speed = 0.1;

    float noise = snoise(noise_pos + vec2(0., u_time * speed + u_noise_seed * 0.1)) * .5 + .5;
    noise += snoise(noise_pos * touch) * 1.75 + 0.1;
    touch *= touch * touch;

    // Apply color scheme
    vec3 color = mix(vec3(0.0, 0.0, 0.0), vec3(.0, .0, .0), smoothstep(.01, .98, touch));


    uv = vec2(uv - 0.5);

    float wave = noise * 2.;
    float strength = smoothstep(0.0, 2.0, 4.) - smoothstep(3.0, 4.0, 4.) * (1.0 - sin( 5.) * 0.45);
    float distortion = mix(1.0, 1.0 + (strength * distortion_amount), wave);

    // expansion value from the centre (lower value, larger image)
    uv *= distortion;

    uv += .5;

    vec4 texturePixelColor = texture2D(u_texture, uv);

    texturePixelColor.r += (0.3) * random(vec2(texturePixelColor.r, vUv.x * vUv.y));
    texturePixelColor.g += (0.3) * random(vec2(texturePixelColor.g, vUv.x * vUv.y));
    texturePixelColor.b += (0.3) * random(vec2(texturePixelColor.b, vUv.x * vUv.y));
    
    // pop a little vignette around the edges so we don't get that weird stretching/stripy stuff at the edges
    // this is only necessary if we're distorting the image so let’s base it on the distortion amount
    float vignette = ((distance(uv - .5, vec2(0.0)) * 4.) - 1.5) * distortion_amount;
    float vignettePixel = clamp(vignette, 0.0, 1.0);

    texturePixelColor.rgb += vignettePixel;

    vec4 transparentVersion = vec4(texturePixelColor.rgb, 0.0);

    vec4 mixed = mix(texturePixelColor, transparentVersion, 1.0 - touch);

    // add noise
    mixed.r += (0.3) * random(vec2(mixed.r, vUv.x * vUv.y + sin(u_time)));
    mixed.g += (0.3) * random(vec2(mixed.g, vUv.x * vUv.y + sin(u_time)));
    mixed.b += (0.3) * random(vec2(mixed.b, vUv.x * vUv.y + sin(u_time)));
    
    // drawing thing
    mixed.a = 0.;
    mixed.a += ( touch * 40.);

    gl_FragColor = mixed;
}
`;

export default frag;