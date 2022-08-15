class Component {
	newProps = false;
	//propUpdaters = [];

	constructor({ ctx, props }) {
		this.ctx = ctx;
		if (props) this.props = props;
	}

	draw(props = this.props) {
		//this.propUpdaters.forEach(f => f(this));

		if (!props) return;
		for (let prop in props) {
			if (Array.isArray(this.props[prop])) {
				this.ctx[prop](...this.props[prop]);
				continue;
			}
			this.ctx[prop] = this.props[prop];
		}
		this.newProps = false;
	}

	setProps(props) {
		this.props = props;
		this.newProps = true;
	}
}

export { Component };
