import { clamp, cycle } from "./helpers.js";
import { engine } from "./engine.js";
import { Player } from "./player.js";

const canvas = document.getElementById("game");
canvas.height = window.innerHeight - 20;
canvas.width = window.innerWidth - 2;
const ctx = canvas.getContext("2d");
const pi = Math.PI;

engine.ctx = ctx;

/*
var obj = {
	x: 10,
	y: 10,
	height: 100,
	width: 100,
	color: "green",
	angle: 0,
};

const drag = (e) => {
	let x = clamp(
		e.targetTouches[0].clientX,
		obj.width / 2,
		canvas.width - obj.width / 2
	);
	let y = clamp(
		e.targetTouches[0].clientY,
		obj.height / 2,
		canvas.height - obj.height / 2
	);

	obj.x = -obj.width / 2;
	obj.y = -obj.height / 2;
	obj.angle = cycle(obj.angle + pi / 2 / engine.fps, 0, 2 * pi);
	move(x, y);
};

function move(x, y) {
	let data = {
		save: [],
		translate: [x, y],
		rotate: [obj.angle],
		fillStyle: obj.color, //"#" + Math.floor(Math.random() * 1000),
		fillRect: [obj.x, obj.y, obj.width, obj.height],
		restore: [],
	};
	//engine.states.push(...stateStack);
	engine.objects["player"] = data;
}

window.ontouchmove = drag;
window.ontouchstart = drag;

//engine.addObj("player");
*/

let props = {
	x: 10,
	y: 10,
	height: 100,
	width: 100,
	color: "green",
	angle: 0,
};

const addSqaure = (e, x, y) => {
	let player = new Player({ ctx, engine, name : Date.now() + "" });
	player.isTouching = true;
	player.timeoutData = { f : () => player.kill(), n : 2000};
	if ( ! x && ! y) player.drag(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
	else player.drag(x, y);
	engine.addComp(player);
}
engine.logFps = true;
window.ontouchmove = addSqaure //(e) => player.drag(e, player);
window.ontouchstart = addSqaure
window.ontouchend = () => {
	//console.log(player.isTouching)
	//player.isTouching = false;
};
//engine.components = [player];
setInterval(() => {
	let y = Math.floor(Math.random() * (canvas.height + 1) )
	let x = Math.floor(Math.random() * (canvas.width + 1) )
	
	addSqaure(0, x, y);
}, 0)
window.requestAnimationFrame(engine.start);
