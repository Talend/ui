import Constants from '../Constants';
import DataAccessorWrapper from './DataAccessorWrapper';

function storeMapping(dataAccessor, mapping) {
	return mapping.map(item => ({
		sourceId: dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT).id,
		targetId: dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT).id,
	}));
}

function restoreMapping(dataAccessor, storedMapping) {
	return storedMapping.map(item => ({
		source: dataAccessor.getElementFromCache(Constants.MappingSide.INPUT, item.sourceId),
		target: dataAccessor.getElementFromCache(Constants.MappingSide.OUTPUT, item.targetId),
	}));
}

export default class DataAccessorWithUndoRedo extends DataAccessorWrapper {
	constructor() {
		super();
		this.undoStack = [];
		this.redoStack = [];
	}

	addMapping(mapping, source, target) {
		const cmd = {
			code: Constants.Commands.ADD_MAPPING,
			label: `Map ${source.name} to ${target.name}`,
			sourceId: source.id,
			targetId: target.id,
		};
		this.undoStack.push(cmd);
		this.clearRedoStack();
		return super.addMapping(mapping, source, target);
	}

	removeMapping(mapping, source, target) {
		const cmd = {
			code: Constants.Commands.REMOVE_MAPPING,
			label: `Clear mapping between ${source.name} and ${target.name}`,
			sourceId: source.id,
			targetId: target.id,
		};
		this.undoStack.push(cmd);
		this.clearRedoStack();
		return super.removeMapping(mapping, source, target);
	}

	clearMapping(mapping) {
		const cmd = {
			code: Constants.Commands.CLEAR_MAPPING,
			label: 'Clear all mapping',
			storedMapping: storeMapping(this, mapping),
		};
		this.undoStack.push(cmd);
		this.clearRedoStack();
		return super.clearMapping(mapping);
	}

	canUndo() {
		return this.undoStack.length > 0;
	}

	getUndoLabel() {
		if (this.canUndo()) {
			return `Undo "${this.undoStack[this.undoStack.length - 1].label}"`;
		}
		return null;
	}

	getCurrentUndoCommand() {
		if (this.canUndo()) {
			return this.undoStack[this.undoStack.length - 1];
		}
		return null;
	}

	undo(mapping) {
		if (this.canUndo()) {
			const cmd = this.undoStack.pop();
			this.redoStack.push(cmd);
			let source = null;
			let target = null;
			let restoredMapping = null;
			switch (cmd.code) {
				case Constants.Commands.ADD_MAPPING:
					// remove mapping
					source = this.getElementFromCache(Constants.MappingSide.INPUT, cmd.sourceId);
					target = this.getElementFromCache(Constants.MappingSide.OUTPUT, cmd.targetId);
					return super.removeMapping(mapping, source, target);
				case Constants.Commands.REMOVE_MAPPING:
					// add mapping
					source = this.getElementFromCache(Constants.MappingSide.INPUT, cmd.sourceId);
					target = this.getElementFromCache(Constants.MappingSide.OUTPUT, cmd.targetId);
					return super.addMapping(mapping, source, target);
				case Constants.Commands.CLEAR_MAPPING:
					// restore mapping
					restoredMapping = restoreMapping(this, cmd.storedMapping);
					return super.addMappingItems(mapping, restoredMapping);
				default:
					// unknown command!
					break;
			}
		}
		return mapping;
	}

	canRedo() {
		return this.redoStack.length > 0;
	}

	getRedoLabel() {
		if (this.canRedo()) {
			return `Redo "${this.redoStack[this.redoStack.length - 1].label}"`;
		}
		return null;
	}

	getCurrentRedoCommand() {
		if (this.canRedo()) {
			return this.redoStack[this.redoStack.length - 1];
		}
		return null;
	}

	redo(mapping) {
		if (this.canRedo()) {
			const cmd = this.redoStack.pop();
			this.undoStack.push(cmd);
			let source = null;
			let target = null;
			switch (cmd.code) {
				case Constants.Commands.ADD_MAPPING:
					// add mapping
					source = this.getElementFromCache(Constants.MappingSide.INPUT, cmd.sourceId);
					target = this.getElementFromCache(Constants.MappingSide.OUTPUT, cmd.targetId);
					return super.addMapping(mapping, source, target);
				case Constants.Commands.REMOVE_MAPPING:
					// remove mapping
					source = this.getElementFromCache(Constants.MappingSide.INPUT, cmd.sourceId);
					target = this.getElementFromCache(Constants.MappingSide.OUTPUT, cmd.targetId);
					return super.removeMapping(mapping, source, target);
				case Constants.Commands.CLEAR_MAPPING:
					// clear mapping
					return super.clearMapping(mapping);
				default:
					// unknown command!
					break;
			}
		}
		return mapping;
	}

	clearUndoStack() {
		this.undoStack = [];
	}

	clearRedoStack() {
		this.redoStack = [];
	}

	clear() {
		this.clearUndoStack();
		this.clearRedoStack();
	}
}
