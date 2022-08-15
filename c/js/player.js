
import { clamp, cycle } from "./helpers.js";
import { Component } from "./component.js";

const pi = Math.PI;
const d_theta = pi;

class Player extends Component {
	isTouching = false;
	data = {
		x: 10,
		y: 10,
		height: 50,
		width: 50,
		size : 5,
		color: "#" + Math.floor(Math.random() * 1000),
		angle: 0,
		dir : 1,
	};
	props = {
		save: [],
		translate: [0, 0],
		rotate: [0],
		fillStyle: "green", //"#" + Math.floor(Math.random() * 1000),
		fillRect: [0, 0, 0, 0],
		restore: [],
	};

	constructor({ ctx, props, engine, name }) {
		super({ ctx });
		this.engine = engine;
		this.type = "Player";
		this.name = name;
		this.props = props;
		this.sat = performance.now();
		this.visible = true;
	}
	onTouch () {
		if (! this.isTouching ) return;
		
		if ( this.data.size > 8 ) this.data.dir = -1;
		if ( this.data.size < 1 ) this.data.dir = 1;
		 this.data.size += this.data.dir * 0.5;
		this.props.fillRect = [this.data.x, this.data.y, this.data.size, this.data.size]
		
		this.data.angle = cycle(this.data.angle + d_theta / this.engine.fps, 0, 2 * pi);
		this.props.rotate =[this.data.angle] 
		super.newProps = true;
	}

	drag(x=this.data.px, y=this.data.py) {
		let p = this.data;
		
		this.data.px = x;
		this.data.py = y;
		
		p.tx = clamp(
			x,
			p.width / 2,
			this.ctx.canvas.width - p.width / 2
		);
		p.ty = clamp(
			y,
			p.height / 2,
			this.ctx.canvas.height - p.height / 2
		);

		p.x = -p.width / 2;
		p.y = -p.height / 2;

		this.data = p;
		this.move();
		super.newProps = true;
	}

	draw() {
		this.timeout();
		if ( ! this.visible ) return;
		this.onTouch();
		super.draw(this.props);
	}

	setProps(v) {
		//console.log(v);
		if (v && v != {}) this.props = v;
	}

	move() {
		let d = this.data;
		let props = {
			save: [],
			translate: [d.tx, d.ty],
			rotate: [d.angle],
			fillStyle: d.color, //"#" + Math.floor(Math.random() * 1000),
			fillRect: [d.x, d.y, d.size, d.size],
			restore: [],
		};

		this.setProps(props);
	}
	
	timeout () {
		//console.log(! this.isTimeoutDone , this.engine.timeElapsed , this.sat );
		if ( ! this.timeoutData ) return;
		let { f, n } = this.timeoutData || {};
		if (! this.isTimeoutDone && this.engine.timeElapsed - this.sat >= n ) f(this.isTimeoutDone = true, console.log("Timeout trigerred for", this.name));
	}
	
	hide () {
		this.visible = false;
	}
	
	kill () {
		this.engine.killC (this.name);
	}
}

export { Player };
