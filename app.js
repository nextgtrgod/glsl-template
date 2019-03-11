import Render from './render'

const render = new Render({
	id: 'canvas',
	vertex: require('./shaders/vertex.glsl'),
	fragment: require('./shaders/fragment.glsl'),
	// textures: {
	// 	'image0': require('./images/1.jpg'),
	// 	'image1': require('./images/2.jpg'),
	// },
})
render.init()
