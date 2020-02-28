
import getMousePos from '../utils/getMousePos'

export default class Sketch {
	constructor({ id, dpi = window.devicePixelRatio, vertex, fragment, textures = {} }) {

		this.dpi = dpi
		this.vertex = vertex
		this.fragment = fragment
		this.textures = textures

		this.canvas = document.getElementById(id)

		this.init()
	}

	init() {
		if (!this.canvas) {
			this.canvas = document.createElement('canvas')
			this.canvas.id = 'canvas'
			document.body.appendChild(this.canvas)
		}

		this.gl = this.canvas.getContext('webgl')
		this.program = null

		this.setSize()
		window.onresize = () => this.setSize()

		this.mouse = {
			x: this.w / 2,
			y: this.h / 2,
		}
		document.addEventListener('mousemove', ({ clientX, clientY }) => {
			this.mouse.x = clientX
			this.mouse.y = clientY
		})

		// this.clearCanvas()
		// this.setSize()
		this.createPlane()
		this.createProgram()

		Object.keys(this.textures).map((key, i) => {
			this.createTexture(this.textures[key], i)
		})

		this.draw()
	}

	setSize() {
		this.w = window.innerWidth * this.dpi
		this.h = window.innerHeight * this.dpi

		this.canvas.width = this.w
		this.canvas.height = this.h

		this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight)
	}

	clearCanvas() {
		this.gl.clearColor(0., 0., 0., 1.)
		this.gl.clear(this.gl.COLOR_BUFFER_BIT)
	}

	createPlane() {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer())
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			new Float32Array([
				-1, -1,
				-1,  1,
				 1, -1,
				 1,  1,
			]),
			this.gl.STATIC_DRAW
		)
	}

	createProgram() {
		const shaders = this.getShaders()
	
		this.program = this.gl.createProgram()
	
		this.gl.attachShader(this.program, shaders.vertex)
		this.gl.attachShader(this.program, shaders.fragment)
		this.gl.linkProgram(this.program)
	
		const vertexPositionAttribute = this.gl.getAttribLocation(this.program, 'a_position')
	
		this.gl.enableVertexAttribArray(vertexPositionAttribute)
		this.gl.vertexAttribPointer(vertexPositionAttribute, 2, this.gl.FLOAT, false, 0, 0)
	
		this.gl.useProgram(this.program)
	}
	
	getShaders() {
		return {
			vertex: this.compileShader(
				this.gl.VERTEX_SHADER,
				this.vertex,
			),
			fragment: this.compileShader(
				this.gl.FRAGMENT_SHADER,
				this.fragment,
			)
		};
	}
	
	compileShader(type, source) {
		const shader = this.gl.createShader(type)
	
		this.gl.shaderSource(shader, source)
		this.gl.compileShader(shader)
	
		// all shaders errors goes here
		console.log(this.gl.getShaderInfoLog(shader))
	
		return shader
	}
	
	createTexture(src, index) {
		const image = new Image()
	
		image.crossOrigin = 'anonymous'
	
		image.onload = () => {
			const texture = this.gl.createTexture()
	
			this.gl.activeTexture(this.gl[`TEXTURE${index}`])
			this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
	
			this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true)
	
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, image)
	
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST)
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
	
			console.log(`${src} loaded`)
		}

		image.src = src
	}
	
	draw = (timeStamp) => {
		requestAnimationFrame(this.draw)

		this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'u_time'), timeStamp / 1000.0)
		this.gl.uniform2fv(this.gl.getUniformLocation(this.program, 'u_resolution'), [ this.w, this.h ])
		this.gl.uniform2fv(this.gl.getUniformLocation(this.program, 'u_mouse'), [ this.mouse.x, this.mouse.y ])

		// send textures to fragment shader
		Object.keys(this.textures).map((key, i) => {
			this.gl.uniform1i(this.gl.getUniformLocation(this.program, key), i)
		})
	
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
	}
}
