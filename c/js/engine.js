const e = {
	ctx: false,
	states: [],
	fps: 0,
	lastTick: 0,
	timeElapsed : 0,
	bg: [],
	objects: {},
	components: {},
	c2kill : [],
	draw: function (obj) {
		if (!e.ctx) return;
		e.ctx.clearRect(0, 0, e.ctx.canvas.width, e.ctx.canvas.height);
		
		for (let object in e.objects) {
			let state = e.objects[object]; // e.states.shift();
			for (let key in state) {
				if (Array.isArray(state[key])) {
					e.ctx[key](...state[key]);
					continue;
				}
				e.ctx[key] = state[key];
			}
		}
		
		for (let name in e.components) {
			let comp = e.components[name]
			comp.draw(comp.props);
		}
		
		while( e.c2kill.length) delete e.components[e.c2kill.shift()];
	},
	fpsCount: 0,
	isOn: false,
	run: function (tick) {
		e.timeElapsed = performance.now();
		e.fps = Math.floor(1000 / (tick - e.lastTick)); // fps calculator
		e.lastTick = tick;

		if (e.logFps)
			e.addObj(
				"fps-plugin",
				{
					font: "16px Arial",
					fillStyle: "#" + Math.floor(Math.random() * 1000),
					fillText: [e.fps + " fps", 5, 20],
				},
				true
			);
		e.draw(e.states);
		window.requestAnimationFrame(e.run);
	},
	start: function () {
		if (e.isOn) return;
		window.requestAnimationFrame(e.run);
		e.isOn = true;
		if (e.logFps) e.addObj("fps-plugin");
	},
	addObj: function (name, data = {}, update) {
		if (!name)
			return console.log(`invalid name to add a object ('${name}')  !`);
		if (!update && Object.keys(e.objects).includes(name))
			return console.log(`A object of same name ('${name}') already exists !`);
		e.objects[name] = data;
	},
	addComp : function (c = {}) {
		if (! c.name)
			return console.log(`invalid name to add a object ('${name}')  !`);
		if ( e.components.hasOwnProperty(c.name))
			return console.log(`A object of same name ('${name}') already exists !`);
		e.components[c.name] = c;
	},
	killC : function (name) {
		e.c2kill.push(name);
	}
};

let engine = e;
export { engine };
