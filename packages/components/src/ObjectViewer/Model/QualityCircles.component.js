import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PieChartButton from '../../PieChartButton';
import theme from './QualityCircles.scss';
import Menu from './Menu.component';

function getQualityModels(qualities) {
	let invalidPercentage = qualities && qualities[-1] || 0;
	let emptyPercentage = qualities && qualities[0] || 0;
	let validPercentage = qualities && qualities[1] || 0;
	const total = invalidPercentage + emptyPercentage + validPercentage;
	if (total) {
		invalidPercentage = invalidPercentage / total * 100;
		emptyPercentage = emptyPercentage / total * 100;
		validPercentage = validPercentage / total * 100;
	}
	return {
		invalid: [{ color: 'lightning-yellow', percentage: invalidPercentage }],
		empty: [{ color: 'silver-chalice', percentage: emptyPercentage }],
		valid: [{ color: 'rio-grande', percentage: validPercentage }],
	};
}

class QualityCircle extends React.Component {
	constructor(props) {
		super(props);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
	}

	/*
	Accessibility : this is called in addition to menuItem.onClick
	It hides the overlay containing the menu, and set focus back on the button
	 */
	onMenuItemClick() {
		this.overlay.hide();
		ReactDOM.findDOMNode(this.button).focus(); // eslint-disable-line react/no-find-dom-node
	}

	render() {
		const { menu, onClick, item, jsonpath, model, type } = this.props;
		return (
			<PieChartButton
				buttonRef={button => { this.button = button; }}
				display={'small'}
				hideLabel
				label={`${model[0].percentage} %`}
				model={model}
				onClick={onClick && (event => onClick(event, { item, jsonpath, type }))}
				overlayComponent={
					<Menu
						menuItems={menu[type]}
						onMenuItemClick={this.onMenuItemClick}
						item={item}
						jsonpath={jsonpath}
						type={type}
					/>
				}
				overlayRef={overlay => { this.overlay = overlay; }}
			/>
		);
	}
}

QualityCircle.propTypes = {
	onClick: PropTypes.func,
	item: PropTypes.object,
	jsonpath: PropTypes.string,
	menu: PropTypes.shape({
		invalid: Menu.propTypes.menuItems,
		empty: Menu.propTypes.menuItems,
		valid: Menu.propTypes.menuItems,
	}),
	model: PropTypes.object,
	type: PropTypes.oneOf('invalid', 'empty', 'valid'),
};

export default function QualityCircles({ item, jsonpath, quality }) {
	const {
		key = '@talend-quality@',
		onClick,
		menu,
	} = quality;

	if (!item[key]) {
		return null;
	}

	const { invalid, empty, valid } = getQualityModels(item[key]);

	return (
		<div className={classNames(theme.quality, 'tc-object-model-quality')}>
			<QualityCircle
				onClick={onClick} menu={menu} item={item} jsonpath={jsonpath} model={invalid}
				type={'invalid'}
			/>
			<QualityCircle onClick={onClick} menu={menu} item={item} jsonpath={jsonpath} model={empty} type={'empty'} />
			<QualityCircle onClick={onClick} menu={menu} item={item} jsonpath={jsonpath} model={valid} type={'valid'} />
		</div>
	);
}
QualityCircles.propTypes = {
	item: PropTypes.object, // TODO
	jsonpath: PropTypes.string,
	quality: PropTypes.shape({
		key: PropTypes.string,
		onClick: PropTypes.func,
	}),
};
