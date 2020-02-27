import Sketch from './modules/Sketch'

const sketch = new Sketch({
	id: 'canvas',
	vertex: require('./shaders/vertex.glsl'),
	fragment: require('./shaders/fragment.glsl'),
	// textures: {
	// 	'image0': require('./images/1.jpg'),
	// 	'image1': require('./images/2.jpg'),
	// },
})


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
