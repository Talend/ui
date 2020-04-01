import React from 'react';
import { shallow } from 'enzyme';
import Immutable from 'immutable';
import i18next from '../../../../i18n';
import { SemanticChooserButton } from '../../../../modules/SemanticChooser/component';
import Component from './ModelViewerLeaf.component';
import {
	getQuality,
	isUnion,
	defaultGetDisplayValue,
	defaultGetDisplayKey,
} from '../ModelViewer.container';

const t = i18next.t.bind(i18next);
const primitives = [{ id: 'typePrim', name: 'typePrim' }];
const matchings = [{ id: 'typeSem', name: 'typeSem', value: 10 }];
const categories = [{ id: 'typeCat', name: 'typeCat' }];
const type = { dqType: 'typeSem' };

describe('ModelViewerLeaf', () => {
	it('should render ModelViewerLeaf with the semantic chooser', () => {
		const value = {
			name: 'toto',
			'@talend-quality@': { '-1': 10, 0: 10, 1: 100, total: 120 },
			type,
		};
		const wrapper = shallow(
			<Component
				datasetId="42"
				categories={categories}
				dataKey="myDataKey"
				getDisplayValue={defaultGetDisplayValue}
				getQuality={getQuality}
				isUnion={isUnion}
				jsonpath="$"
				primitives={primitives}
				t={t}
				value={value}
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find(SemanticChooserButton).length).toBe(1);
	});

	it('should render ModelViewerLeaf without the semantic chooser', () => {
		const value = {
			name: 'toto',
			'@talend-quality@': { '-1': 10, 0: 10, 1: 100, total: 120 },
			type,
		};
		const wrapper = shallow(
			<Component
				categories={categories}
				dataKey="myDataKey"
				getDisplayValue={defaultGetDisplayValue}
				getQuality={getQuality}
				isUnion={isUnion}
				jsonpath="$"
				primitives={primitives}
				t={t}
				value={value}
			/>,
		);
		expect(wrapper.find(SemanticChooserButton).length).toBe(0);
	});

	it('should render ModelViewerLeaf with qualities in loading state', () => {
		const value = {
			name: 'toto',
			'@talend-quality@': { '-1': 10, 0: 10, 1: 100, total: 120 },
			type,
			path: 'myPath',
		};
		const semanticChooser = Immutable.Map({
			path: 'myPath',
			datasetId: 'myDatasetId',
		});
		const wrapper = shallow(
			<Component
				datasetId="42"
				dataKey="myDataKey"
				getDisplayValue={defaultGetDisplayValue}
				getQuality={getQuality}
				isUnion={isUnion}
				jsonpath="$"
				semanticChooser={semanticChooser}
				t={t}
				value={value}
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render ModelViewerLeaf with semantic awareness', () => {
		const value = {
			'@talend-quality@': { '-1': 10, 0: 10, 1: 100, total: 120 },
			type,
			matchings,
			primitives,
		};
		const wrapper = shallow(
			<Component
				datasetId="42"
				categories={categories}
				dataKey="myDataKey"
				getDisplayKey={defaultGetDisplayKey}
				getDisplayValue={defaultGetDisplayValue}
				getQuality={getQuality}
				hasSemanticAwareness
				isUnion={isUnion}
				jsonpath="$"
				primitives={primitives}
				t={t}
				value={value}
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render ModelViewerLeaf highlighted', () => {
		const value = {
			'@talend-quality@': { '-1': 10, 0: 10, 1: 100, total: 120 },
			type,
			matchings,
			primitives,
		};
		const wrapper = shallow(
			<Component
				datasetId="42"
				categories={categories}
				dataKey="myDataKey"
				getDisplayKey={defaultGetDisplayKey}
				getDisplayValue={defaultGetDisplayValue}
				getQuality={getQuality}
				hasSemanticAwareness
				isUnion={isUnion}
				jsonpath="$"
				jsonPathSelection="$"
				primitives={primitives}
				t={t}
				value={value}
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render ModelViewerLeaf with union', () => {
		const value = {
			'@talend-quality@': { '-1': 10, 0: 10, 1: 100, total: 120 },
			type,
			matchings,
			primitives,
		};
		const wrapper = shallow(
			<Component
				datasetId="42"
				categories={categories}
				dataKey="myDataKey"
				getDisplayKey={defaultGetDisplayKey}
				getDisplayValue={defaultGetDisplayValue}
				getQuality={getQuality}
				hasSemanticAwareness
				isUnion={isUnion}
				jsonpath="$"
				primitives={primitives}
				t={t}
				value={value}
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should call onSelect when click on the leaf', () => {
		const value = {
			name: 'toto',
			'@talend-quality@': { '-1': 10, 0: 10, 1: 100, total: 120 },
			type: [{ dqType: 'firstType' }, { dqType: 'secondType' }],
			matchings,
			primitives,
		};
		const event = {};
		const jsonpath = '$';
		const onSelect = jest.fn();
		const wrapper = shallow(
			<Component
				datasetId="42"
				categories={categories}
				dataKey="myDataKey"
				getDisplayKey={defaultGetDisplayKey}
				getDisplayValue={defaultGetDisplayValue}
				getQuality={getQuality}
				isUnion={isUnion}
				jsonpath="$"
				onSelect={onSelect}
				primitives={primitives}
				t={t}
				value={value}
			/>,
		);
		wrapper.find('button').simulate('click', event);
		expect(onSelect).toHaveBeenCalledWith(event, jsonpath, value);
	});
});
