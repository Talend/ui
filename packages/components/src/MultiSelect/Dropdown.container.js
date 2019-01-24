import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '../CircularProgress';
import VirtualizedList from '../VirtualizedList';
import theme from './Dropdown.scss';

function isIn(element, container) {
	if (element.parentElement === null) {
		return false;
	}
	if (element.parentElement !== container) {
		return isIn(element.parentElement, container);
	}
	return true;
}

export default class Dropdown extends React.Component {
	static propTypes = {
		isLoading: PropTypes.bool,
		height: PropTypes.number,
		renderItem: PropTypes.func,
		items: PropTypes.array,
		onRowClick: PropTypes.func,
		show: PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.onRef = this.onRef.bind(this);
		this.cache = { container: null };
	}

	componentDidMount() {
		const self = this;
		document.addEventListener('click', event => {
			// if event outside of me call onHide
			if (self.cache.container !== null && !isIn(event.target, self.cache.container)) {
				self.props.onHide(event);
			}
		});
	}

	onRef(ref) {
		this.cache.container = ref;
	}

	render() {
		return (
			<div className={theme.dropdown} ref={this.onRef}>
				{this.props.show && (
					<div className={theme.absolute} style={{ height: this.props.height }}>
						{this.props.isLoading ? (
							<div className={theme.loading}>
								<CircularProgress />
							</div>
						) : (
							<VirtualizedList
								type="custom"
								rowHeight={this.props.renderItem.rowHeight}
								rowRenderers={{ custom: this.props.renderItem }}
								collection={this.props.items}
								onRowClick={this.props.onRowClick}
							/>
						)}
					</div>
				)}
			</div>
		);
	}
}
