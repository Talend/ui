import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { checkA11y } from '@storybook/addon-a11y';

import Well from 'react-bootstrap/lib/Well';
import { Layout, Drawer } from '@talend/react-components';

import { createStore, combineReducers } from 'redux';

import { I18nextProvider } from 'react-i18next';
import i18n from './../stories/config/i18n';

import { formReducer } from '../src/UIForm';

import jsonStories from './jsonStories';
import customTemplateStory from './customTemplateStory';
import customWidgetStory from './customWidgetStory';
import customActionsStory from './customActionsStory';

// integrate widget code
import 'brace/theme/monokai';
import 'brace/ext/language_tools';
import 'brace/mode/python';
import 'brace/snippets/python';

const reducers = { forms: formReducer };
const reducer = combineReducers(reducers);
const store = createStore(reducer);

a11y(ReactDOM);

class FormLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			wrapper: 'Drawer',
		};
		this.components = {
			Well,
			Drawer,
		};
		this.onWrapperChange = this.onWrapperChange.bind(this);
		this.onStackedChange = this.onStackedChange.bind(this);
	}
	onWrapperChange(event) {
		this.setState({ wrapper: event.target.value });
	}

	onStackedChange() {
		this.setState({ stacked: !this.state.stacked });
	}

	getWrapper() {
		return this.components[this.state.wrapper];
	}
	render() {
		let main = null;
		const drawers = [];
		const Wrapper = this.getWrapper();
		if (this.state.wrapper === 'Drawer') {
			drawers.push(<Wrapper stacked={this.state.stacked}>{this.props.story}</Wrapper>);
		} else {
			main = <Wrapper>{this.props.story}</Wrapper>;
		}
		const one = (
			<form style={{ width: 300 }}>
				<div className="form-group">
					<label>Display the form in</label>
					<select onChange={this.onWrapperChange} className="form-control">
						{Object.keys(this.components).map(component => <option selected={this.state.wrapper === component}>{component}</option>)}
					</select>
				</div>
				{this.state.wrapper === 'Drawer' && (
					<div className="checkbox">
						<label>
							<input type="checkbox" name="stacked" id="stacked" value={this.state.isStacked} onChange={this.onStackedChange} />
							stacked
						</label>
					</div>
				)}
				{this.props.lang}
			</form>
		)
		return (
			<Layout drawers={drawers} mode="TwoColumns" one={one}>
				<div style={{ margin: 10 }}>
					{main}
				</div>
			</Layout>
		);
	}
}

const forStoryDecorator = story => (
	<I18nextProvider i18n={i18n}>
		<Provider store={store}>
			<FormLayout lang={(
				<nav
					style={{ position: 'fixed', bottom: 0, width: '100vw', textAlign: 'center', zIndex: 1 }}
				>
					<div className="btn-group">
						<button className="btn" onClick={() => i18n.changeLanguage('en')}>
							Default (en)
						</button>
						<button className="btn" onClick={() => i18n.changeLanguage('fr')}>
							fr
						</button>
						<button className="btn" onClick={() => i18n.changeLanguage('it')}>
							it
						</button>
					</div>
				</nav>

				)}
				story={story()}
			/>
		</Provider>
	</I18nextProvider>
);

const coreConceptsStories = storiesOf('Core concepts', module)
	.addDecorator(checkA11y)
	.addDecorator(withKnobs)
	.addDecorator(forStoryDecorator);

const coreFieldsetsStories = storiesOf('Core fieldsets', module)
	.addDecorator(checkA11y)
	.addDecorator(withKnobs)
	.addDecorator(forStoryDecorator);

const coreFieldsStories = storiesOf('Core fields', module)
	.addDecorator(checkA11y)
	.addDecorator(withKnobs)
	.addDecorator(forStoryDecorator);

const oldStories = storiesOf('Migration', module)
	.addDecorator(checkA11y)
	.addDecorator(withKnobs)
	.addDecorator(forStoryDecorator);

jsonStories.forEach(({ category, name, story }) => {
	switch (category) {
		case 'concepts':
			coreConceptsStories.add(name, story);
			break;
		case 'fieldsets':
			coreFieldsetsStories.add(name, story);
			break;
		case 'fields':
			coreFieldsStories.add(name, story);
			break;
		case 'old':
			oldStories.add(name, story);
			break;
		default:
			console.error(`No category ${category} found for story ${name}`);
	}
});

coreConceptsStories.add(customTemplateStory.name, customTemplateStory.story);
coreConceptsStories.add(customWidgetStory.name, customWidgetStory.story);
coreConceptsStories.add(customActionsStory.name, customActionsStory.story);
