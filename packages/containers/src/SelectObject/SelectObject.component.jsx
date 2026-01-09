import ImmutablePropTypes from 'react-immutable-proptypes';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import JSONSchemaRenderer from '@talend/react-components/lib/JSONSchemaRenderer';

import Action from '../Action';
import FilterBar from '../FilterBar';
import List from '../List';
import TreeView from '../TreeView';

import theme from './SelectObject.module.scss';

function SelectObject({
	filteredData,
	idAttr,
	nameAttr,
	results,
	sourceData,
	tree,
	filter = {},
	...props
}) {
	let schema;
	if (props.schema && props.selected) {
		schema = {
			properties: props.selected,
			...props.schema,
		};
	}
	return (
		<div className={`tc-select-object ${theme.wrapper}`}>
			<FilterBar
				{...filter}
				className={classNames(filter.className, theme.filter)}
				id={props.id}
				dockable={false}
				navbar={false}
			/>
			<div className={theme.container}>
				{!tree && !filteredData && (
					<List {...props.list} id={`${props.id}-list`} data={sourceData} className={theme.list} />
				)}
				{tree && !filteredData && (
					<TreeView
						{...tree}
						componentId={props.id}
						noHeader
						data={sourceData}
						className={theme.tree}
					/>
				)}
				{filteredData && (
					<div className={theme.results}>
						{filteredData.map(data => (
							<Action
								className={classNames({ active: results.selectedId === data.get(idAttr) })}
								key={data.get(idAttr)}
								onClick={event => results.onClick(event, data)}
							>
								<h3>{data.get(nameAttr)}</h3>
								<span>{data.get('currentPosition')}</span>
							</Action>
						))}
					</div>
				)}
				{schema && <JSONSchemaRenderer schema={schema} className={theme.preview} />}
			</div>
		</div>
	);
}

SelectObject.displayName = 'SelectObject';
SelectObject.propTypes = {
	id: PropTypes.string,
	idAttr: PropTypes.string,
	nameAttr: PropTypes.string,
	tree: PropTypes.object,
	list: PropTypes.object,
	filter: PropTypes.object,
	schema: PropTypes.object,
	filteredData: ImmutablePropTypes.List,
	results: PropTypes.shape({
		selectedId: PropTypes.string,
		onClick: PropTypes.func,
	}),
	sourceData: ImmutablePropTypes.List,
	selected: PropTypes.object,
};

SelectObject.defaultProps = {
	idAttr: 'id',
};

export default SelectObject;
