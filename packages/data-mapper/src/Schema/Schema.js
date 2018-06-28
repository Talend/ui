import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableRenderer from './TableRenderer';
import Constants from '../Constants';

function isMapped(dataAccessor, element, mappedElements) {
	return mappedElements == null ? false : dataAccessor.includes(mappedElements, element);
}

function isHighlighted(dataAccessor, element, selection, side, pendingItem, focusedElements, dnd) {
	const connected =
		selection == null
			? false
			: selection.side !== side &&
			  selection.connected != null &&
			  dataAccessor.includes(selection.connected, element);
	const pending =
		pendingItem != null &&
		pendingItem.side === side &&
		dataAccessor.areElementsEqual(pendingItem.element, element);
	const focused = focusedElements != null && dataAccessor.includes(focusedElements, element);
	const isTarget = dnd && dnd.target && dataAccessor.areElementsEqual(dnd.target.element, element);
	return connected || pending || focused || isTarget;
}

export default class Schema extends Component {
	constructor(props) {
		super(props);
		this.updateRendererNodeRef = this.updateRendererNodeRef.bind(this);
		this.onContentScroll = this.onContentScroll.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		// check first is a drag and drop is in progress
		let needUpdate = true;
		if (nextProps.dnd) {
			needUpdate = !(nextProps.dnd.source != null && nextProps.dnd.source.side === nextProps.side);
		}
		// then check if rendering focused elements is needed
		if (
			needUpdate &&
			nextProps.trigger &&
			(nextProps.trigger.code === Constants.Events.ENTER_ELEM ||
				nextProps.trigger.code === Constants.Events.LEAVE_ELEM)
		) {
			if (
				this.props.dataAccessor.haveSameContent(
					this.props.focusedElements,
					nextProps.focusedElements,
				)
			) {
				needUpdate = false;
			}
		}
		return needUpdate;
	}

	getNode(element) {
		const index = this.props.dataAccessor.getSchemaElementIndex(this.props.schema, element, true);
		const children = this.getRendererNode().getChildNodes();
		const childrenArray = Array.from(children);
		return childrenArray[index];
	}

	getYPosition(element) {
		const scrollTop = this.getRendererNode().getScrollTop();
		const child = this.getNode(element);
		if (child) {
			const childOffsetTop = this.getRendererNode().getChildOffsetTop(child);
			return childOffsetTop + child.clientHeight / 2 - scrollTop;
		}
		return 0;
	}

	getElementAtPosition(position) {
		let theElement = null;
		if (this.isRendererNodeDefined()) {
			let previousDist = -1;
			let currentDist = -1;
			const contentHeight = this.getRendererNode().getOffsetHeight();
			const elements = this.props.dataAccessor.getSchemaElements(this.props.schema, true);
			const children = this.getRendererNode().getChildNodes();
			const childrenArray = Array.from(children);
			for (let i = 0; i < childrenArray.length; i += 1) {
				previousDist = currentDist;
				const element = elements[i];
				const elemYPos = this.getYPosition(element);
				if (elemYPos > 0 && elemYPos < contentHeight) {
					currentDist = Math.abs(elemYPos - position);
					if (previousDist >= 0 && currentDist > previousDist) {
						break;
					}
					theElement = element;
				} else if (elemYPos > contentHeight) {
					break;
				}
			}
		}
		return theElement;
	}

	onContentScroll() {
		this.props.onScroll(this.props.side);
	}

	getVisibleElements() {
		let visibleElements = [];
		if (this.isRendererNodeDefined()) {
			const contentHeight = this.getRendererNode().getOffsetHeight();
			const elements = this.props.dataAccessor.getSchemaElements(this.props.schema, true);
			const children = this.getRendererNode().getChildNodes();
			const childrenArray = Array.from(children);
			if (elements.length != childrenArray.length) {
				visibleElements = visibleElements.concat(elements);
				return visibleElements;
			}
			const meanDist = this.computeMeanDist(elements);
			let startIndex = 0;
			if (meanDist > 0) {
				// compute start index
				const scrollTop = this.getRendererNode().getScrollTop();
				const n = Math.floor(scrollTop / meanDist);
				startIndex = Math.max(0, n);
			}
			const headerHeight = this.getRendererNode().getHeaderHeight();
			const bottomLimit = contentHeight + headerHeight;
			for (let i = startIndex; i < childrenArray.length; i += 1) {
				const element = elements[i];
				const elemYPos = this.getYPosition(element);
				if (elemYPos > headerHeight && elemYPos < bottomLimit) {
					// element is visible
					visibleElements = visibleElements.concat(element);
				} else if (elemYPos > bottomLimit) {
					break;
				}
			}
		}
		return visibleElements;
	}

	computeMeanDist(elements) {
		if (elements.length > 1) {
			const y1 = this.getYPosition(elements[0]);
			const y2 = this.getYPosition(elements[1]);
			return Math.abs(y2 - y1);
		}
		return 0;
	}

	reveal(element) {
		const node = this.getNode(element);
		const nodeHeight = node.clientHeight;
		const elemYPos = this.getYPosition(element);
		const contentHeight = this.getRendererNode().getOffsetHeight();
		const headerHeight = this.getRendererNode().getHeaderHeight();
		let revealed = false;
		const scrollTop = this.getRendererNode().getScrollTop();
		if (elemYPos < headerHeight) {
			const newScrollTop = scrollTop + elemYPos - headerHeight - nodeHeight / 2;
			this.getRendererNode().setScrollTop(newScrollTop);
			revealed = true;
		} else if (elemYPos > contentHeight + headerHeight - nodeHeight) {
			const offset = elemYPos + nodeHeight - contentHeight - headerHeight;
			this.getRendererNode().setScrollTop(scrollTop + offset);
			revealed = true;
		}
		return revealed;
	}

	isRendererNodeDefined() {
		return this.rendererNode;
	}

	getRendererNode() {
		if (this.rendererNode) {
			return this.rendererNode;
		}
		return {
			getChildNodes() {
				return [];
			},
			getScrollTop() {
				return 0;
			},
			setScrollTop(scrollTop) {},
			getChildOffsetTop(child) {
				return 0;
			},
			getOffsetHeight() {
				return 0;
			},
			getHeaderHeight() {
				return 0;
			},
		};
	}

	updateRendererNodeRef(ref) {
		this.rendererNode = ref;
	}

	render() {
		const { withTitle, ...tempProps } = this.props;
		const { dataAccessor, schema, side } = this.props;
		const contentProps = {
			...tempProps,
			isMapped,
			isHighlighted,
			onScroll: this.onContentScroll,
		};		
		return (
			<div className={`schema mapper-element ${side}`}>
				<TableRenderer
					ref={this.updateRendererNodeRef}
					title={withTitle && dataAccessor.getSchemaName(schema)}
					{...contentProps}
				/>
			</div>
		);
	}
}

Schema.propTypes = {
	dataAccessor: PropTypes.object.isRequired,
	schema: PropTypes.object.isRequired,
	columns: PropTypes.array.isRequired,
	rowsClassName: PropTypes.objectOf(PropTypes.string),
	withTitle: PropTypes.bool,
	withHeader: PropTypes.bool,
	filters: PropTypes.array,
	onFilterChange: PropTypes.func,
	sorters: PropTypes.object,
	onSortChange: PropTypes.func,
	focusedElements: PropTypes.array,
	onScroll: PropTypes.func,
	side: PropTypes.string,
	isElementVisible: PropTypes.func,
};
