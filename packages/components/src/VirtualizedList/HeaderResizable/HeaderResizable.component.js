import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import keycode from 'keycode';
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

	onKeyDownResizeColumn = (event, resizeFn) => {
		resizeFn(this.props.dataKey, this.getDeltaFromKeyCode(event));
	};

	setResizing = resizing => () => {
		this.setState(state => ({
			...state,
			resizing,
		}));
	};

	getDeltaFromKeyCode = event => {
		switch (event.keyCode) {
			case keycode.codes.left:
				return -10;
			case keycode.codes.right:
				return 10;
			default:
				return 0;
		}
	};

	render() {
		const { children, dataKey, label, sortBy, sortDirection, t = getDefaultT() } = this.props;
		const { resizing } = this.state;
		const tooltipLabel = t('RESIZE_COLUMN', { defaultValue: 'Resize column' });

		/* eslint-disable jsx-a11y/no-static-element-interactions */
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
						<span
							onClick={event => {
								event.stopPropagation();
							}}
							onKeyDown={event => {
								event.stopPropagation();
							}}
							className={classNames(theme('tc-header-cell-resizable-drag-button'))}
						>
							<input
								data-testId="resize-input-button-ally"
								className={classNames(
									theme('tc-header-cell-resizable-drag-accessibility'),
									'sr-only',
								)}
								title={tooltipLabel}
								type="button"
								value={tooltipLabel}
								onKeyDown={event => this.onKeyDownResizeColumn(event, resizeColumn)}
								onClick={event => this.onKeyDownResizeColumn(event, resizeColumn)}
							/>
							<Draggable
								className={classNames(theme('tc-header-cell-resizable-drag-button-handle'))}
								axis="x"
								onStart={this.setResizing(true)}
								onDrag={(_, data) => {
									resizeColumn(dataKey, data.deltaX);
								}}
								onStop={this.setResizing(false)}
								position={{ x: 0 }}
							>
								<div
									className={classNames(theme('tc-header-cell-resizable-drag-button-handle-icon'))}
									title={tooltipLabel}
								/>
							</Draggable>
						</span>
					</div>
				)}
			</ConsumerVirtualizedList>
		);
		/* eslint-enable jsx-a11y/no-static-element-interactions */
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
