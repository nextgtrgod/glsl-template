
precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

void main() {

	vec2 uv = gl_FragCoord.xy / resolution.xy;

	gl_FragColor = vec4(uv.x, uv.y, (uv.y * sin(time)), 1.0);
}
