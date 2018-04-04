export default class MappingConfiguration {
	constructor(renderer, actions) {
		this.renderer = renderer;
		this.actions = actions;
	}

	getRenderer() {
		return this.renderer;
	}

	getActions() {
		return this.actions;
	}
}
