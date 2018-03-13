import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Menu from './Menu.component';
import QualityCircles from './QualityCircles.component';
import Icon from '../../Icon';
import { Action } from '../../Actions';
import getJSONPath from '../jsonPath';
import theme from './Model.scss';

const paddingLeft = 30;
const marginLeft = 4;

function Caret({ data, jsonpath, onToggle, isOpened }) {
	const iconName = isOpened ? 'talend-caret-down' : 'talend-chevron-left';
	const iconTransform = isOpened ? null : 'rotate-180';

	return (
		<Icon
			title={isOpened ? `Collapse ${jsonpath}` : `Expand ${jsonpath}`}
			name={iconName}
			transform={iconTransform}
			className={theme.caret}
			onClick={e => {
				onToggle(e, { data, isOpened, jsonpath });
			}}
		/>
	);
}
Caret.propTypes = {
	data: PropTypes.any,
	isOpened: PropTypes.bool,
	jsonpath: PropTypes.string,
	onToggle: PropTypes.func,
};

class ModelMenus extends React.Component {
	constructor(props) {
		super(props);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
		this.onOverlayClose = this.onOverlayClose.bind(this);
	}

	onMenuItemClick() {
		this.overlay.hide();
	}

	/*
	Accessibility : set focus back on the button when overlay is closed
	 */
	onOverlayClose() {
		ReactDOM.findDOMNode(this.button).focus(); // eslint-disable-line react/no-find-dom-node
	}

	render() {
		const { item, jsonpath, menu, quality } = this.props;
		return (
			<div className={theme.menu}>
				{
					menu &&
					<Action
						aria-label={'Open menu'}
						buttonRef={button => { this.button = button; }}
						className={theme['menu-trigger']}
						link
						label={'...'}
						overlayId={`tc-object-viewer-model-menu-${jsonpath}`}
						overlayPlacement={'bottom'}
						overlayComponent={
							<Menu
								menuItems={menu}
								onClose={this.onOverlayClose}
								onMenuItemClick={this.onMenuItemClick}
								item={item}
								jsonpath={jsonpath}
							/>
						}
						overlayRef={overlay => { this.overlay = overlay; }}
					/>
				}
				<QualityCircles item={item} quality={quality} jsonpath={jsonpath} />
			</div>
		);
	}
}
ModelMenus.propTypes = {
	item: PropTypes.object,
	jsonpath: PropTypes.string,
	menu: Menu.propTypes.menuItems,
	quality: QualityCircles.propTypes.quality,
};

function Item(props) {
	const { data, item, jsonpath, level, onSelect, onToggle, opened } = props;
	const isOpened = opened.indexOf(jsonpath) !== -1;
	const type = item.type && (item.type.dqType || item.type.type);
	const onClick = onSelect && (event => onSelect(event, jsonpath, item));

	const caretSpaceAdjustment = marginLeft * level;
	const levelSpaceAdjustment = Math.max(paddingLeft * level, paddingLeft);
	const spaceAdjustment = { paddingLeft: caretSpaceAdjustment + levelSpaceAdjustment };

	return (
		<li className={classNames(theme.item, 'tc-object-model-item')}>
			<div className={theme.title} style={spaceAdjustment}>
				{item.fields &&
					<Caret
						data={data}
						isOpened={isOpened}
						jsonpath={jsonpath}
						onToggle={onToggle}
					/>
				}
				<button onClick={onClick} className={theme.main} aria-label={`Select ${item.name} (${jsonpath})`}>
					{item.doc}
					{type && <span className={theme.type}>({type})</span>}
				</button>
				{type !== 'object' && <ModelMenus {...props} />}
			</div>

			{item.fields && isOpened &&
				<ul className={classNames(theme.fields, 'tc-object-model-item-fields')}>
					{
						item.fields.map((field, index) =>
							<Item
								key={index}
								{...props}
								jsonpath={getJSONPath(field.name, jsonpath, 'object')}
								item={field}
								level={level + 1}
							/>
						)
					}
				</ul>
			}
		</li>
	);
}
Item.propTypes = {
	item: PropTypes.shape({
		// TODO
	}),
	jsonpath: PropTypes.string,
	onSelect: PropTypes.func,
	opened: PropTypes.arrayOf(PropTypes.string),
};

export default function Model({ className, style, ...props }) {
	return (
		<ul className={classNames(theme.model, 'tc-object-model', className)} style={style}>
			{
				props.data &&
				props.data.map((item, index) =>
					<Item key={index} {...props} jsonpath={getJSONPath(item.name, '$', 'object')} item={item} level={0} />
				)
			}
		</ul>
	);
}
Model.defaultProps = {
	data: [],
	quality: {},
	opened: [],
};
Model.propTypes = {
	className: PropTypes.string,
	data: PropTypes.arrayOf(Item.propTypes.item).isRequired,
	menu: Menu.propTypes.menuItems,
	onSelect: PropTypes.func,
	onToggle: PropTypes.func,
	opened: PropTypes.arrayOf(PropTypes.string),
	quality: QualityCircles.propTypes.quality,
	style: PropTypes.object,
};
