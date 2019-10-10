export default class Observable {
	constructor() {
		this.observers = [];
	}

	subscribe(fn) {
		this.observers.push(fn);
	}

	unsubscribe(fn) {
		this.observers = this.observers.filter(subscriber => subscriber !== fn);
	}

	notify(...args) {
		this.observers.forEach(observer => observer(...args));
	}
}
