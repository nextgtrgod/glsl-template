
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D image0;

#define PI 3.14159265359

float n_sin(float a) {
	return (1.0 + sin(a)) / 2.0;
}

float plot(vec2 uv, float pct, float width) {
	return 	smoothstep(pct - width / 2.0, pct, uv.y) -
			smoothstep(pct, pct + width / 2.0, uv.y);
}

float sine(vec2 uv, float A, float P) {
	return A*n_sin(P*uv.x*PI - u_time) + (1. - A) / 2.;
}

void main() {

	vec2 uv = gl_FragCoord.xy / u_resolution.xy;

	// float pct = uv.x;
	float A = n_sin(u_time);

	float pct1 = sine(uv, A / 6.0, 2.0);

	float pct2 = sine(uv, n_sin(u_time + 1.0) / 8.0, 2.0);

	float pct3 = sine(uv, n_sin(u_time - 2.0) / 4.0, 3.0);

	float pct4 = sine(uv, n_sin(u_time + 3.0) / 3.0, 2.5);

	float color = 	plot(uv, pct1, 0.005) +
					plot(uv, pct2, 0.004) +
					plot(uv, pct3, 0.006) +
					plot(uv, pct4, 0.005);

	vec3 final = vec3(0.0, 46.0, 145.0) / 255.0 + vec3(color);

	gl_FragColor = vec4(vec3(final), 1.0);
}
