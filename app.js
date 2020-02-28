import Sketch from './modules/Sketch'

// new Sketch({
// 	id: 'gl',
// 	vertex: require('./shaders/vertex.glsl'),
// 	fragment: require('./shaders/fragment.glsl'),
// 	textures: {
// 		'image0': require('./images/1.jpg'),
// 		// 'image1': require('./images/2.jpg'),
// 	},
// })

import rough from 'roughjs/bundled/rough.esm.js'

// const seed = 420

let canvas = document.getElementById('test')
console.log(canvas)
let dpi = 1 || window.devicePixelRatio

canvas.width = window.innerWidth * dpi
canvas.height = window.innerHeight * dpi

const rc = rough.canvas(canvas)
rc.polygon([[690, 130], [790, 140], [750, 240], [690, 220]])

// for (let i = 1; i <= 6; i++) {
// 	rc.line(
// 		200, 240 + i * 60,
// 		900, 240 + i * 60,
// 	)

// 	rc.circle(80, 150, 120, {
// 		fill: 'rgb(255, 150, 0)',
// 		fillStyle: 'cross-hatch',
// 	})
// }

{
	let svg = document.getElementById('svg')

	const rc = rough.svg(svg)

	;[0, 1, 2, 3, 4, 5].map(i => {
		let hLine = rc.line(200, 240 + i*50, 900, 240 + i*50, {
			fill: 'rgb(20, 20, 20)',
			// fillWeight: 5,
			bowing: 1.5,
			strokeWidth: 1.0,
			// seed,
		})

		let vLine = rc.line(
			200 + i*120, 240,
			200 + i*120, 500, {
				fill: 'rgb(20, 20, 20)',
				// fillWeight: 5,
				bowing: 1.5,
				strokeWidth: 1.0,
				// seed,
			})

		svg.appendChild(hLine)
		svg.appendChild(vLine)
	})

	svg.appendChild(
		rc.circle(80, 150, 120, {
			fill: 'rgb(255, 150, 0)',
			fillStyle: 'cross-hatch',
			bowing: 2.0,
			strokeWidth: 1.0,
			// curveStepCount: 2,
			roughness: 10,
			// curveFitting: .85,
		})
	)

	svg.appendChild(
		rc.rectangle(600, 50, 150, 150, {
			fill: 'rgb(20, 20, 20)',
			// fillStyle: 'zigzag-line',
			hachureAngle: 60, // angle of hachure,
			hachureGap: 8,
		})
	)
}


// let maze = ''
// for (let i = 1; i <= 8196; i++) {
// 	maze += ((Math.random() >= 0.5) ? '╲' : '╱')
// 	maze += !(i % 100) ? '\n' : ''
// }

// console.log(
// 	`%c${maze}`, 
// 	`
// 		background: linear-gradient(to right, #5433ff, #20bdff, #a5fecb);
// 		color: #FFF;
// 		font-family: monospace;
// 		font-size: 12px;
// 		font-weight: bold;
// 		line-height: 1;
// 	`)
