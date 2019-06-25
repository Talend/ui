import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import TooltipTrigger from '../../TooltipTrigger';
import { virtualizedListContext } from '../virtualizedListContext';
import headerResizableCssModule from './HeaderResizable.scss';
import { getTheme } from '../../theme';
import getDefaultT from '../../translate';

const theme = getTheme(headerResizableCssModule);

const HeaderResizableContent = ({ customRender, label, ...rest }) => {
	if (typeof customRender === 'function') {
		return customRender(rest);
	} else if (label) {
		return label;
	}
	throw new Error('[HeaderResizableContent]: No children as function or label provided.');
};

class HeaderResizable extends React.Component {
	state = {
		resizing: false,
	};

	setResizing = () => {
		this.setState(prevState => ({
			resizing: !prevState.resizing,
		}));
	};

	render() {
		const { children, dataKey, label, t = getDefaultT() } = this.props;
		const { resizing } = this.state;
		const { Consumer } = virtualizedListContext;
		const tooltipLabel = t('RESIZE_COLUMN', { defaultValue: 'Resize column' });
		return (
			<Consumer>
				{({ resizeRow }) => (
					<div
						key={dataKey}
						className={classNames(
							theme('tc-header-cell-resizable'),
							theme({ 'tc-header-cell-resizable-resizing': resizing }),
						)}
					>
						<div className={classNames(theme('tc-header-cell-resizable-truncated-text'))}>
							<HeaderResizableContent customRender={children} label={label} />
						</div>
						<TooltipTrigger label={tooltipLabel} placement="top">
							<Draggable
								axis="x"
								defaultClassName={classNames(theme('tc-header-cell-resizable-drag-handle'))}
								onStart={() => this.setResizing()}
								onDrag={(_, data) => {
									resizeRow(dataKey, data.deltaX);
								}}
								onStop={() => this.setResizing()}
								position={{ x: 0 }}
							>
								<div className={classNames(theme('tc-header-cell-resizable-drag-handle-icon'))} />
							</Draggable>
						</TooltipTrigger>
					</div>
				)}
			</Consumer>
		);
	}
}

HeaderResizable.propTypes = {
	children: PropTypes.oneOfType[(PropTypes.element, PropTypes.arrayOf(PropTypes.element))],
	dataKey: PropTypes.string,
	label: PropTypes.string,
	t: PropTypes.func,
};

export default props => <HeaderResizable {...props} />;
