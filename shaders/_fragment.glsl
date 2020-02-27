
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D image0;

float plot(vec2 uv, float y){
  	return smoothstep(y-0.002, y, uv.y) - smoothstep(y, y+0.002, uv.y);
}

float n_sin(float a) {
	return (1.0 + sin(a)) / 2.0;
}

void main() {

	vec2 uv = gl_FragCoord.xy / u_resolution.xy;

	vec2 m_uv = vec2(u_mouse.x / u_resolution.x, 1. - u_mouse.y / u_resolution.y);

	// gl_FragColor = vec4(uv.x, uv.y, (uv.y * sin(time)), 1.0);

	// float y = (1. + sin((u_time + uv.x) * 1.)) / 2.;

	// float y = pow(m_uv.y, 2.);

	float pct1 = plot(uv, m_uv.y);

	float pct2 = smoothstep(m_uv.x-0.002, m_uv.x, uv.x) -
				 smoothstep(m_uv.x, m_uv.x+0.002, uv.x);

	// vec3 color = (1.0 - pct)*vec3(y) + pct*vec3(0.0, 0.0, 0.0);

	vec3 color = 1.0 - pct1 * vec3(1.0, 1.0, 1.0) - pct2 * vec3(1.0, 1.0, 1.0);

	gl_FragColor = vec4(color, 1.0);
}
