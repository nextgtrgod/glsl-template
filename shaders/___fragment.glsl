
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

vec3 colorA = normalize( vec3(8., 136., 179.) );
vec3 colorB = normalize( vec3(255., 130., 0.) );

void main() {

	vec2 uv = gl_FragCoord.xy / u_resolution.xy;

	float pct1 = sine(uv, n_sin(u_time + 0.0) / 10.0, 2.0);

	float pct2 = sine(uv, n_sin(-u_time + 1.0) / 7.0, 1.5);

	float pct3 = sine(uv, n_sin(u_time - 2.0) / 9.0, 3.0);

	float pct4 = sine(uv, n_sin(u_time + 3.0) / 6.0, 2.5);

	float color = 	plot(uv, pct2, 0.005) +
					plot(uv, pct2, 0.004) +
					plot(uv, pct3, 0.006) +
					plot(uv, pct4, 0.005);

	// float color = plot(uv, pct, 0.01);

	float amount = pow( uv.y, (1.0 + n_sin(u_time)) / 2.0 );

	vec3 bg_color = mix(
		colorB,
		colorA,
		amount
	);

	gl_FragColor = vec4(vec3(color) + bg_color, 1.0);
}
