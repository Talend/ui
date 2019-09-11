import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import { defaultTableHeaderRenderer } from 'react-virtualized';
import { ConsumerVirtualizedList } from '../virtualizedListContext';
import headerResizableCssModule from './HeaderResizable.scss';
import { getTheme } from '../../theme';
import getDefaultT from '../../translate';

const theme = getTheme(headerResizableCssModule);

const HeaderResizableContent = ({ customRender, ...rest }) => {
	if (customRender) {
		return customRender;
	} else if (rest.label) {
		return defaultTableHeaderRenderer(rest);
	}
	return null;
};

export class HeaderResizable extends React.Component {
	state = {
		resizing: false,
	};

	setResizing = resizing => {
		this.setState({
			resizing,
		});
	};

	render() {
		const { children, dataKey, label, sortBy, sortDirection, t = getDefaultT() } = this.props;
		const { resizing } = this.state;
		const tooltipLabel = t('RESIZE_COLUMN', { defaultValue: 'Resize column' });
		return (
			<ConsumerVirtualizedList>
				{({ resizeColumn }) => (
					<div
						key={dataKey}
						className={classNames(
							theme('tc-header-cell-resizable'),
							theme({ 'tc-header-cell-resizable-resizing': resizing }),
						)}
					>
						<div className={classNames(theme('tc-header-cell-resizable-truncated-text'))}>
							<HeaderResizableContent
								customRender={children}
								label={label}
								dataKey={dataKey}
								sortBy={sortBy}
								sortDirection={sortDirection}
							/>
						</div>
						<button
							className={classNames(theme('tc-header-cell-resizable-drag-button'))}
							onClick={event => {
								event.stopPropagation();
								event.preventDefault();
							}}
						>
							<Draggable
								axis="x"
								onStart={() => this.setResizing(true)}
								onDrag={(_, data) => {
									resizeColumn(dataKey, data.deltaX);
								}}
								onStop={() => {
									this.setResizing(false);
								}}
								position={{ x: 0 }}
							>
								<div
									className={classNames(theme('tc-header-cell-resizable-drag-handle-icon'))}
									title={tooltipLabel}
								>
									⋮
								</div>
							</Draggable>
						</button>
					</div>
				)}
			</ConsumerVirtualizedList>
		);
	}
}

HeaderResizable.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	dataKey: PropTypes.string,
	label: PropTypes.string,
	sortBy: PropTypes.string,
	sortDirection: PropTypes.string,
	t: PropTypes.func,
};

export default props => <HeaderResizable {...props} />;
