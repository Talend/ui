import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

function Menu({ item, jsonpath, menu, quality }) {
	const MenuComponent = menu;
	return (
		<div className={theme.menu}>
			{
				MenuComponent &&
				<Action
					className={theme['menu-trigger']}
					link
					label={'...'}
					overlayPlacement={'bottom'}
					overlayComponent={<MenuComponent item={item} jsonpath={jsonpath} />}
				/>
			}
			<QualityCircles item={item} quality={quality} jsonpath={jsonpath} />
		</div>
	);
}
Menu.propTypes = {
	item: PropTypes.object,
	jsonpath: PropTypes.string,
	menu: PropTypes.element,
	quality: QualityCircles.propTypes.quality,
};


function Item(props) {
	const { data, item, jsonpath, level, onSelect, onToggle, opened } = props;
	const isOpened = opened.indexOf(jsonpath) !== -1;
	const type = item.type && (item.type.dqType || item.type.type);
	const onClick = onSelect && (event => onSelect(event, jsonpath, item));

	const caretSpaceAdjustment = Math.max(marginLeft * level, 0);
	const levelSpaceAdjustment = Math.max(paddingLeft * (level - 1), 0);
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
				<button onClick={onClick} className={theme.main}>
					{item.doc}
					{type && <span className={theme.type}>({type})</span>}
				</button>
				{type !== 'object' && <Menu {...props} />}
			</div>

			{item.fields && isOpened &&
				<ul className={classNames(theme.fields, 'tc-object-model-item-fields')}>
					{
						item.fields.map((field, index) =>
							<Item
								key={index}
								{...props}
								jsonpath={getJSONPath(index, jsonpath, 'array')}
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
					<Item key={index} {...props} jsonpath={getJSONPath(index, '', 'array')} item={item} level={0} />
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
	menu: PropTypes.element,
	onSelect: PropTypes.func,
	onToggle: PropTypes.func,
	opened: PropTypes.arrayOf(PropTypes.string),
	quality: QualityCircles.propTypes.quality,
	style: PropTypes.object,
};
