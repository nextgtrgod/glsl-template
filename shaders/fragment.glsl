
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D image0;

#define PI 3.14159265359

float n_sin(float a) {
	return (1.0 + sin(a)) / 2.0;
}

float n_cos(float a) {
	return (1.0 + cos(a)) / 2.0;
}

void main() {
	vec2 uv = gl_FragCoord.xy / u_resolution.xy;

	float pct = 0.0;

	float r = (1.0+n_sin(u_time)) / 6.0;

	// float r = 0.25;

	vec2 center = vec2(
		.25 * n_cos(2.0*PI*u_time / 5.0) + (1. - 0.25) / 2.0,
		.25 * n_sin(2.0*PI*u_time / 5.0) + (1. - 0.25) / 2.0
	);

	pct = distance(uv, center); // 1

	// pct = dot(uv-vec2(0.5), uv-vec2(0.5));

	// pct = length(vec2(0.5) - uv); // 2

	// vec2 tC = vec2(0.5) - uv; //
	// pct = sqrt(pow(tC.x, 2.0) + pow(tC.y, 2.0)); // 3

	vec3 color = (1.0 - vec3(step(r, pct))) * normalize(vec3(255., 127., 63.));

	gl_FragColor = vec4(color, 1.0);
}
