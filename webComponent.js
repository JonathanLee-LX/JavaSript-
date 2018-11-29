class Counter extends HTMLElement {
	clicked() {
		this.x++;
		window.requestAnimationFrame(this.render.bind(this));
	}

	constructor() {
		super();
		this.onclick = this.clicked.bind(this);
		this.x = 0;
	}

	connectedCallback() { this.render(); }

	render() {
		this.textContent = this.x.toString();
	}

}

window.customElements.define('num-counter', Counter);