/* eslint-disable new-cap */
import { Size, Position, PortDirection } from '../customTypings/index.d';

export const NONE = 'NONE';
export const SELECTED = 'SELECTED';
export const DROP_TARGET = 'DROP_TARGET';
export const FORBIDDEN_DROP_TARGET = 'FORBIDDEN_DROP_TARGET';

function getInHelper(obj: any, path: string[]): any {
	return path.reduce((v: any, k) => {
		if (v == null) return v;
		return typeof v.get === 'function' ? v.get(k) : v[k];
	}, obj);
}

function setInHelper(obj: any, path: string[], value: any): any {
	if (path.length === 0) return obj;
	if (path.length === 1) {
		if (typeof obj.set === 'function') return obj.set(path[0], value);
		return { ...obj, [path[0]]: value };
	}
	const current = typeof obj.get === 'function' ? obj.get(path[0]) : obj[path[0]];
	const updated =
		current != null && typeof current.setIn === 'function'
			? current.setIn(path.slice(1), value)
			: setInHelper(current ?? {}, path.slice(1), value);
	if (typeof obj.set === 'function') return obj.set(path[0], updated);
	return { ...obj, [path[0]]: updated };
}

export class PositionRecord {
	readonly x: number | undefined;
	readonly y: number | undefined;

	constructor({ x, y }: { x?: number; y?: number } = {}) {
		this.x = x;
		this.y = y;
	}

	get(key: string): any {
		return (this as any)[key];
	}

	set(key: string, value: any): PositionRecord {
		return new PositionRecord({ ...this, [key]: value });
	}

	getIn(path: string[]): any {
		return getInHelper(this, path);
	}

	setIn(path: string[], value: any): PositionRecord {
		return setInHelper(this, path, value) as PositionRecord;
	}

	toJS(): Position {
		return { x: this.x as number, y: this.y as number };
	}

	toJSON(): Position {
		return this.toJS();
	}
}

export class SizeRecord {
	readonly width: number | undefined;
	readonly height: number | undefined;

	constructor({ width, height }: { width?: number; height?: number } = {}) {
		this.width = width;
		this.height = height;
	}

	get(key: string): any {
		return (this as any)[key];
	}

	set(key: string, value: any): SizeRecord {
		return new SizeRecord({ ...this, [key]: value });
	}

	getIn(path: string[]): any {
		return getInHelper(this, path);
	}

	setIn(path: string[], value: any): SizeRecord {
		return setInHelper(this, path, value) as SizeRecord;
	}

	toJS(): Size {
		return { width: this.width as number, height: this.height as number };
	}

	toJSON(): Size {
		return this.toJS();
	}
}

/** TO BE REMOVED */
export class NodeGraphicalAttributes {
	[key: string]: any;

	constructor(params: any = {}) {
		// Default for properties so nested setIn paths (properties.startPosition) work
		this.properties = {};
		if (params instanceof NodeGraphicalAttributes) {
			// Shallow copy: preserves PositionRecord, Map instances etc.
			Object.assign(this, params);
		} else {
			const data =
				params != null && typeof params.toJS === 'function' ? params.toJS() : params || {};
			Object.assign(this, data);
		}
	}

	get(key: string): any {
		return this[key];
	}

	set(key: string, value: any): NodeGraphicalAttributes {
		const nga = new NodeGraphicalAttributes(this);
		nga[key] = value;
		return nga;
	}

	getIn(path: string[]): any {
		return getInHelper(this, path);
	}

	setIn(path: string[], value: any): NodeGraphicalAttributes {
		return setInHelper(this, path, value) as NodeGraphicalAttributes;
	}

	merge(values: any): NodeGraphicalAttributes {
		const data = values != null && typeof values.toJS === 'function' ? values.toJS() : values || {};
		const nga = new NodeGraphicalAttributes(this);
		Object.assign(nga, data);
		return nga;
	}

	delete(key: string): NodeGraphicalAttributes {
		const nga = new NodeGraphicalAttributes(this);
		delete nga[key];
		return nga;
	}

	deleteIn(path: string[]): NodeGraphicalAttributes {
		if (path.length === 0) return this;
		if (path.length === 1) return this.delete(path[0]);
		const current = this.get(path[0]);
		const updated =
			current != null && typeof current.deleteIn === 'function'
				? current.deleteIn(path.slice(1))
				: current;
		return this.set(path[0], updated);
	}

	toJS(): any {
		const result: any = {};
		for (const key of Object.keys(this)) {
			const val = this[key];
			result[key] = val && typeof val.toJS === 'function' ? val.toJS() : val;
		}
		return result;
	}
}

/** TO BE REMOVED */
export class NodeData {
	[key: string]: any;

	constructor(params: any = {}) {
		const data = params != null && typeof params.toJS === 'function' ? params.toJS() : params || {};
		Object.assign(this, data);
	}

	get(key: string): any {
		return this[key];
	}

	set(key: string, value: any): NodeData {
		const nd = new NodeData(this);
		nd[key] = value;
		return nd;
	}

	getIn(path: string[]): any {
		return getInHelper(this, path);
	}

	setIn(path: string[], value: any): NodeData {
		return setInHelper(this, path, value) as NodeData;
	}
}

/** TO BE REMOVED */
export class LinkGraphicalAttributes {
	[key: string]: any;

	constructor(params: any = {}) {
		this.properties = {};
		if (params instanceof LinkGraphicalAttributes) {
			Object.assign(this, params);
		} else {
			const data =
				params != null && typeof params.toJS === 'function' ? params.toJS() : params || {};
			Object.assign(this, data);
		}
	}

	get(key: string): any {
		return this[key];
	}

	set(key: string, value: any): LinkGraphicalAttributes {
		const lga = new LinkGraphicalAttributes(this);
		lga[key] = value;
		return lga;
	}

	getIn(path: string[]): any {
		return getInHelper(this, path);
	}

	setIn(path: string[], value: any): LinkGraphicalAttributes {
		return setInHelper(this, path, value) as LinkGraphicalAttributes;
	}
}

/** TO BE REMOVED */
export class LinkData {
	[key: string]: any;

	constructor(params: any = {}) {
		const data = params != null && typeof params.toJS === 'function' ? params.toJS() : params || {};
		Object.assign(this, data);
	}

	get(key: string): any {
		return this[key];
	}

	set(key: string, value: any): LinkData {
		const ld = new LinkData(this);
		ld[key] = value;
		return ld;
	}

	getIn(path: string[]): any {
		return getInHelper(this, path);
	}

	setIn(path: string[], value: any): LinkData {
		return setInHelper(this, path, value) as LinkData;
	}
}

/** TO BE REMOVED */
export class PortGraphicalAttributes {
	[key: string]: any;

	constructor(params: any = {}) {
		this.properties = {};
		if (params instanceof PortGraphicalAttributes) {
			Object.assign(this, params);
		} else {
			const data =
				params != null && typeof params.toJS === 'function' ? params.toJS() : params || {};
			Object.assign(this, data);
		}
	}

	get(key: string): any {
		return this[key];
	}

	set(key: string, value: any): PortGraphicalAttributes {
		const pga = new PortGraphicalAttributes(this);
		pga[key] = value;
		return pga;
	}

	getIn(path: string[]): any {
		return getInHelper(this, path);
	}

	setIn(path: string[], value: any): PortGraphicalAttributes {
		return setInHelper(this, path, value) as PortGraphicalAttributes;
	}
}

/** TO BE REMOVED */
export class PortData {
	[key: string]: any;

	constructor(params: any = {}) {
		const data = params != null && typeof params.toJS === 'function' ? params.toJS() : params || {};
		Object.assign(this, data);
	}

	get(key: string): any {
		return this[key];
	}

	set(key: string, value: any): PortData {
		const pd = new PortData(this);
		pd[key] = value;
		return pd;
	}

	getIn(path: string[]): any {
		return getInHelper(this, path);
	}

	setIn(path: string[], value: any): PortData {
		return setInHelper(this, path, value) as PortData;
	}
}

export class NodeRecord {
	readonly id: string | undefined;
	readonly type: string | undefined;
	readonly data: any;
	readonly graphicalAttributes: any;

	constructor({
		id,
		type,
		data,
		graphicalAttributes,
	}: {
		id?: string;
		type?: string;
		data?: any;
		graphicalAttributes?: any;
	} = {}) {
		this.id = id;
		this.type = type;
		this.data = data ?? new NodeData();
		// Default graphicalAttributes as NodeGraphicalAttributes for API compatibility
		this.graphicalAttributes = graphicalAttributes ?? new NodeGraphicalAttributes();
	}

	get(key: string): any {
		return (this as any)[key];
	}

	set(key: string, value: any): NodeRecord {
		return new NodeRecord({ ...this, [key]: value });
	}

	getIn(path: string[]): any {
		return getInHelper(this, path);
	}

	setIn(path: string[], value: any): NodeRecord {
		return setInHelper(this, path, value) as NodeRecord;
	}

	/** methods TO BE REMOVED */
	getPosition(): Position {
		const pos = this.graphicalAttributes?.get
			? this.graphicalAttributes.get('position')
			: this.graphicalAttributes?.position;
		return pos;
	}

	getSize(): Size {
		const size = this.graphicalAttributes?.get
			? this.graphicalAttributes.get('nodeSize')
			: this.graphicalAttributes?.nodeSize;
		return size;
	}

	getNodeType(): string {
		const nt = this.graphicalAttributes?.get
			? this.graphicalAttributes.get('nodeType')
			: this.graphicalAttributes?.nodeType;
		return nt;
	}
}

export class NestedNodeRecord extends NodeRecord {
	readonly components: any;

	constructor(
		params: {
			id?: string;
			type?: string;
			data?: any;
			graphicalAttributes?: any;
			components?: any;
		} = {},
	) {
		super(params);
		this.components = params.components ?? {};
	}

	set(key: string, value: any): NestedNodeRecord {
		return new NestedNodeRecord({ ...this, [key]: value });
	}

	setIn(path: string[], value: any): NestedNodeRecord {
		return setInHelper(this, path, value) as NestedNodeRecord;
	}

	/** methods TO BE REMOVED */
	getComponents(): any {
		return this.components;
	}

	setComponents(components: any): NestedNodeRecord {
		return new NestedNodeRecord({ ...this, components });
	}
}

export class LinkRecord {
	readonly id: string | undefined;
	readonly sourceId: string | undefined;
	readonly targetId: string | undefined;
	readonly data: any;
	readonly graphicalAttributes: any;

	constructor({
		id,
		sourceId,
		targetId,
		data,
		graphicalAttributes,
	}: {
		id?: string;
		sourceId?: string;
		targetId?: string;
		data?: any;
		graphicalAttributes?: any;
	} = {}) {
		this.id = id;
		this.sourceId = sourceId;
		this.targetId = targetId;
		this.data = data ?? new LinkData();
		this.graphicalAttributes = graphicalAttributes ?? new LinkGraphicalAttributes();
	}

	get(key: string): any {
		return (this as any)[key];
	}

	set(key: string, value: any): LinkRecord {
		return new LinkRecord({ ...this, [key]: value });
	}

	getIn(path: string[]): any {
		return getInHelper(this, path);
	}

	setIn(path: string[], value: any): LinkRecord {
		return setInHelper(this, path, value) as LinkRecord;
	}

	/** methods TO BE REMOVED */
	getLinkType(): string {
		const lt = this.graphicalAttributes?.get
			? this.graphicalAttributes.get('linkType')
			: this.graphicalAttributes?.linkType;
		return lt;
	}
}

export class PortRecord {
	readonly id: string | undefined;
	readonly nodeId: string | undefined;
	readonly data: any;
	readonly graphicalAttributes: any;

	constructor({
		id,
		nodeId,
		data,
		graphicalAttributes,
	}: {
		id?: string;
		nodeId?: string;
		data?: any;
		graphicalAttributes?: any;
	} = {}) {
		this.id = id;
		this.nodeId = nodeId;
		this.data = data ?? new PortData();
		this.graphicalAttributes = graphicalAttributes ?? new PortGraphicalAttributes();
	}

	get(key: string): any {
		return (this as any)[key];
	}

	set(key: string, value: any): PortRecord {
		return new PortRecord({ ...this, [key]: value });
	}

	getIn(path: string[]): any {
		return getInHelper(this, path);
	}

	setIn(path: string[], value: any): PortRecord {
		return setInHelper(this, path, value) as PortRecord;
	}

	/** methods TO BE REMOVED */
	getPosition(): Position {
		const pos = this.graphicalAttributes?.get
			? this.graphicalAttributes.get('position')
			: this.graphicalAttributes?.position;
		return pos;
	}

	setPosition(position: Position): PortRecord {
		return new PortRecord({
			...this,
			graphicalAttributes: this.graphicalAttributes?.set
				? this.graphicalAttributes.set('position', position)
				: { ...this.graphicalAttributes, position },
		});
	}

	getPortType(): string {
		const pt = this.graphicalAttributes?.get
			? this.graphicalAttributes.get('portType')
			: this.graphicalAttributes?.portType;
		return pt;
	}

	getPortDirection(): PortDirection {
		const direction = this.graphicalAttributes?.getIn
			? this.graphicalAttributes.getIn(['properties', 'type'])
			: this.graphicalAttributes?.properties?.type;
		return direction;
	}

	getPortFlowType(): string {
		const ft = this.data?.get ? this.data.get('flowType') : this.data?.flowType;
		return ft;
	}

	getIndex(): number {
		const idx = this.graphicalAttributes?.getIn
			? this.graphicalAttributes.getIn(['properties', 'index'])
			: this.graphicalAttributes?.properties?.index;
		return idx;
	}

	setIndex(index: number): PortRecord {
		return new PortRecord({
			...this,
			graphicalAttributes: this.graphicalAttributes?.setIn
				? this.graphicalAttributes.setIn(['properties', 'index'], index)
				: {
						...this.graphicalAttributes,
						properties: { ...this.graphicalAttributes?.properties, index },
					},
		});
	}
}
