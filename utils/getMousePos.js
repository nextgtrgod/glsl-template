export default function getMousePos(e) {

	let posx = 0
	let posy = 0

	if (!e) { let e = window.event }

	if (e.clientX || e.clientY) {
		posx = e.clientX
		posy = e.clientY
	}

	return {
		x: posx,
		y: posy,
	}
}
