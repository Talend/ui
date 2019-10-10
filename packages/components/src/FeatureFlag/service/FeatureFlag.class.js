import Observable from './Observable.class';

export default class FeatureFlag extends Observable {
	constructor() {
		super();
		this.feature = new Map();
		window.featureFlag = this;
	}

	enable(featureName) {
		this.feature.set(featureName, true);
		this.notify(featureName);
	}

	disable(featureName) {
		this.feature.set(featureName, false);
		this.notify(featureName);
	}

	getStatus(featureName) {
		return this.feature.get(featureName) || false;
	}

	notify(featureName) {
		super.notify({ featureName, enabled: this.feature.get(featureName) });
	}
}
