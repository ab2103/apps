const e = {
	ctx : false,
	states : [],
	fps : 0,
	lastTick : 0,
	bg : [],
	objects : {},
	draw : function (obj) {
		if ( ! e.ctx ) return;
		e.ctx.clearRect(0,0, e.ctx.canvas.width, e.ctx.canvas.height);
		for(let object in e.objects) {
			let state = e.objects[object] ; // e.states.shift();
			for (let key in state) {
				if (Array.isArray(state[key])) {
					e.ctx[key](...state[key]);
					continue;
				}
				e.ctx[key] = state[key];
			}
		}
	},
	isOn : false,
	run : function (tick) {
		e.fps = Math.floor(1000 / ( tick - e.lastTick)); // fps calculator
		e.lastTick = tick;
		if ( e.logFps) e.addObj("fps-plugin", {font : "16px Arial",fillStyle : "#" + Math.floor(Math.random() * 1000),fillText : [e.fps + " fps", 5, 20]}, true);
		e.draw(e.states);
		window.requestAnimationFrame(e.run)
	},
	start : function () {
		if ( e.isOn ) return;
		window.requestAnimationFrame(e.run);
		e.isOn = true;
		if ( e.logFps ) e.addObj("fps-plugin");
	},
	addObj : function (name , data={}, update) {
		if ( ! name) return console.log(`invalid name to add a object ('${name}')  !`)
		if (!update && Object.keys(e.objects).includes(name)) return console.log(`A object of same name ('${name}') already exists !`);
		e.objects[name] = data;
	}
}

let engine = e 
export {engine};