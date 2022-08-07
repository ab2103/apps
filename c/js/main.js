import { clamp, cycle } from "./helpers.js";
import {engine} from "./engine.js";
const canvas = document.getElementById("game");
canvas.height = window.innerHeight-20
canvas.width = window.innerWidth-2
const ctx = canvas.getContext("2d");
const pi = Math.PI;

engine.ctx = ctx;

var obj = {
	x: 10,
	y: 10,
	height: 100,
	width: 100,
	color: "green",
	angle : 0
};

const drag = (e) => {
	let x = clamp(e.targetTouches[0].clientX, obj.width / 2, canvas.width -obj.width / 2);
	let y = clamp(e.targetTouches[0].clientY, obj.height / 2, canvas.height-obj.height / 2);

	obj.x = - obj.width / 2
	obj.y = - obj.height / 2
	obj.angle = cycle (obj.angle + (2* pi) / engine.fps, 0, 2*pi);
	move(x, y);
};

function move(x, y) {
	let data = {
		save : [],
		translate : [x, y],
		rotate : [obj.angle],
		fillStyle: obj.color,//"#" + Math.floor(Math.random() * 1000),
		fillRect: [obj.x, obj.y, obj.width, obj.height],
		restore : []
	};
	//engine.states.push(...stateStack);
	engine.objects["player"] = data;
}

function wait(n = 0) {
	return new Promise((a) => setTimeout(a, n));
}

window.ontouchmove = drag;
window.ontouchstart = drag;

engine.logFps = true;

engine.addObj("player")
window.requestAnimationFrame(engine.start);
