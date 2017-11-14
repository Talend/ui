import { api, componentState } from '@talend/react-cmf';
import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { Filter as Component } from '@talend/react-components';

class Filter extends React.Component {
	static displayName = 'Container(Filter)';

	static contextTypes = {
		registry: PropTypes.object,
		store: PropTypes.object,
	};

	static propTypes = {
		...componentState.propTypes,
		id: PropTypes.string.isRequired,
		collectionToFilter: PropTypes.object.isRequired,
		placeholder: PropTypes.string,
		filterInputValue: PropTypes.string,
		actionInfo: PropTypes.shape({
			id: PropTypes.string.isRequired,
			'collection-to-filter': PropTypes.string.isRequired,
			filterExpression: PropTypes.string.isRequired,
			blurExpression: PropTypes.string,
			focusExpression: PropTypes.string,
			toggleExpression: PropTypes.string,
			docked: PropTypes.bool,
			undockable: PropTypes.bool,
		}).isRequired,
	};

	constructor(props) {
		super(props);
		this.onFilter = this.onFilter.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onToggle = this.onToggle.bind(this);
		this.getFilter = this.getFilter.bind(this);
		this.getBlur = this.getBlur.bind(this);
		this.getFocus = this.getFocus.bind(this);
		this.getToggle = this.getToggle.bind(this);
	}

	// If they are differences between the next props collection we have to filter
	// our current collection.
	// We apply the expression filter to be sure to be comform to the new collection.
	componentWillReceiveProps(nextProps) {
		if (
			(this.props.collectionToFilter && this.props.collectionToFilter.size) !==
			(nextProps.collectionToFilter && nextProps.collectionToFilter.size)
		) {
			const event = { target: { value: this.props.filterInputValue } };
			this.props.dispatchActionCreator('filter:update', event, {
				componentName: 'Container(Filter)',
				key: this.props.id,
				collectionFiltered: this.getFilter(event, nextProps.collectionToFilter),
			});
		}
	}

	onFilter(event) {
		this.props.dispatchActionCreator('filter:save', event, {
			componentName: 'Container(Filter)',
			key: this.props.id,
			collectionFiltered: this.getFilter(event, this.props.collectionToFilter),
		});
	}

	onBlur(event) {
		// Implement a defaut comportement here ?
		this.getBlur(event);
	}

	onFocus(event) {
		// Implement a defaut comportement here ?
		this.getFocus(event);
	}

	onToggle(event) {
		// Implement a defaut comportement here ?
		this.getToggle(event);
	}

	getBlur(event) {
		if (api.expression.get(this.props.actionInfo.blurExpression, this.context)) {
			return api.expression.get(this.props.actionInfo.blurExpression, this.context);
		}
		invariant(true, `No blur expression defined in settings ${this.props.actionInfo}`);
		return event;
	}

	getFocus(event) {
		if (api.expression.get(this.props.actionInfo.focusExpression, this.context)) {
			return api.expression.get(this.props.actionInfo.focusExpression, this.context);
		}
		invariant(true, `No focus expression defined in settings ${this.props.actionInfo}`);
		return event;
	}

	getToggle(event) {
		if (api.expression.get(this.props.actionInfo.toggleExpression, this.context)) {
			return api.expression.get(this.props.actionInfo.toggleExpression, this.context);
		}
		invariant(true, `No toggle expression defined in settings ${this.props.actionInfo}`);
		return event;
	}

	getFilter(event, collectionToFilter) {
		if (api.expression.get(this.props.actionInfo.filterExpression, this.context)) {
			return api.expression.get(this.props.actionInfo.filterExpression, this.context)(
				event,
				collectionToFilter,
			);
		}
		invariant(true, `No filter expression defined in settings ${this.props.actionInfo}`);
		return event;
	}

	render() {
		const {
			docked,
			undockable,
			debounceMinLength,
			debounceTimeout,
			highlight,
			placeholder,
		} = this.props.actionInfo;

		const filter = {
			id: this.props.id ? `${this.props.id}-filter` : 'FILTER',
			docked,
			undockable,
			debounceMinLength,
			debounceTimeout,
			onFilter: event => this.onFilter(event),
			onBlur: event => this.onBlur(event),
			onFocus: event => this.onFocus(event),
			onToggle: event => this.onToggle(event),
			highlight,
			placeholder,
		};
		return <Component {...filter} />;
	}
}

export default Filter;
