import React from 'react';
import classNames from 'classnames';
import { Icon, actions } from 'react-cmf';

import ButtonsDispatcher from '../ButtonsDispatcher';
import SortBar from './SortBar';
import theme from './List.scss';

/**
 * @param {object} props react props
 * @example
<List name="Hello world"></List>
 */
function List(props) {
	const searchCSS = classNames(theme.searchInputContainer, 'form-group has-feedback pull-right');
	return (
		<div className={theme.container}>
			<div className={theme.appBar}>
				<div className={searchCSS}>
					<input
						type="search"
						name="search"
						value={this.props.searchQuery}
						onChange={this.onSearchQueryChange}
						className="form-control"
						placeholder={this.props.settings.searchLabel || 'search'}
					/>
					<Icon
						name="icon-search"
						className="form-control-feedback"
						aria-hidden="true"
					/>
				</div>
				<ButtonsDispatcher
					contentType={this.props.settings.contentType}
					category="list"
					icon btn="add"
				/>
			</div>
			<div className={theme.content}>
				<SortBar
					vocabulary={['name', 'step']}
					on={'name'}
					onChange={this.onSortChange}
				/>
				{this.props.items.map((item, i) => (
					<SortableListRow
						columns={this.props.settings.columns}
						contentType={this.props.settings.contentType}
						item={item} key={i}
					/>
				))}
			</div>
		</div>
	);
}

List.propTypes = {
	name: React.PropTypes.string,
};

export default List;
