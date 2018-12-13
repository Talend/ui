import PropTypes from 'prop-types';
import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import { translate } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '@talend/react-components/lib/constants';
import { ActionBar, FilterBar } from '../../../index';
import '@talend/react-components/lib/translate';
// import SelectAll from './SelectAll';
import SelectDisplayMode from './SelectDisplayMode';
import SelectSortBy from './SelectSortBy';
// import Pagination from './Pagination';
import Label from './Label';

import theme from './Toolbar.scss';

const ToolbarContext = React.createContext();

/**
 * Here to enforce our component api
 * @param {object} props
 */
const Consumer = props => (
	<ToolbarContext.Consumer>
		{context => {
			if (!context) {
				throw Error('You are using the components out of Toobar provider scope');
			}
			return props.children(context);
		}}
	</ToolbarContext.Consumer>
);

Consumer.propTypes = {
	children: PropTypes.array,
};

class Toolbar extends React.Component {
	static defaultProps = {
		handleInputFilter: () => {},
		handleToggleFilter: () => {},
	};

	static propTypes = {
		children: PropTypes.array,
		handleInputFilter: PropTypes.func,
		handleToggleFilter: PropTypes.func,
	};

	handleInputFilter = (event, values) => {
		// Add specific toolbar handle behavior here
		console.log({ values });
		this.props.handleInputFilter(event, values);
	};

	handleToggleFilter = event => {
		// Add specific toolbar handle behavior here
		this.props.handleToggleFilter(event);
	};

	/*
		To avoid unecessary creation of our context handler,
		we put them in the state of the toolbar.
		So the state is declared after the handlers.
		That's not the main point of react state,
		just an idea.
	*/
	state = {
		handleInput: this.handleInputFilter,
		handleToggle: this.handleToggleFilter,
	};

	render() {
		return (
			<Navbar componentClass="div" className={theme['tc-list-toolbar']} role="toolbar" fluid>
				<ToolbarContext.Provider value={this.state}>{this.props.children}</ToolbarContext.Provider>
			</Navbar>
		);
	}
}

Toolbar.Sort = props => {
	const sortProps = {
		...props,
		onChange: props.onChange,
		isDescending: !props.sortAsc,
		field: props.sortOn,
	};
	return (
		<React.Fragment>
			<Label text="Sort by:" htmlFor={props.id && `${props.id}-sort-by`} />
			<SelectSortBy id={props.id && `${props.id}-sort`} {...sortProps} />
		</React.Fragment>
	);
};

function adaptActionsIds(actions, parentId) {
	return (
		actions &&
		actions.map(action => {
			if (action.id) {
				return {
					...action,
					id: `${parentId}-actions-${action.id}`,
				};
			}
			return action;
		})
	);
}

function adaptLeftAndRightActions(actions, parentId) {
	return (
		actions && {
			left: adaptActionsIds(actions.left, parentId),
			right: adaptActionsIds(actions.right, parentId),
		}
	);
}

Toolbar.ActionBar = ({ actions, multiSelectActions, id }) => {
	return <ActionBar actions={adaptLeftAndRightActions(actions, id)} />;
};

Toolbar.DisplayMode = props => {
	return (
		<React.Fragment>
			<Label text={'Display:'} htmlFor={props.displayModeId} />
			<SelectDisplayMode id={props.displayModeId} mode={props.displayMode} />
		</React.Fragment>
	);
};

Toolbar.FilterBar = ({ id, placeholder }) => {
	return (
		<Consumer>
			{({ collectionId, handleInput, handleToggle }) => (
				<FilterBar
					className="navbar-right"
					id={id || (collectionId && `${id || collectionId}-filter`)}
					navbar
					onFilter={handleInput}
					onToggle={handleToggle}
					placeholder={placeholder}
				/>
			)}
		</Consumer>
	);
};

Toolbar.FilterBar.propTypes = {
	id: PropTypes.string,
	placeholder: PropTypes.string,
};

export default translate(I18N_DOMAIN_COMPONENTS)(Toolbar);
