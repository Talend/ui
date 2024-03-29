import { useState } from 'react';

import { action } from '@storybook/addon-actions';

import Datalist from './Datalist.component';

const defaultProps = {
	onChange: action('onChange'),
	disabled: false,
	readOnly: false,
	placeholder: 'search for something...',
	titleMap: [
		{ name: 'My foo', value: 'foo', description: 'foo description' },
		{ name: 'My bar', value: 'bar' },
		{ name: 'My foobar', value: 'foobar', description: 'foobar description' },
		{ name: 'My lol', value: 'lol' },
	],
};

const propsMultiSection = {
	...defaultProps,
	multiSection: true,
	titleMap: [
		{
			title: 'cat 1',
			suggestions: [
				{ name: 'My foo', value: 'foo', description: 'foo description' },
				{ name: 'My faa', value: 'faa' },
			],
		},
		{ title: 'cat 2', suggestions: [{ name: 'My bar', value: 'bar' }] },
		{
			title: 'cat 3',
			suggestions: [{ name: 'My foobar', value: 'foobar', description: 'foobar description' }],
		},
		{ title: 'cat 4', suggestions: [{ name: 'My lol', value: 'lol' }] },
	],
};

const singleSectionProps = {
	...defaultProps,
	multiSection: false,
};

const titleMapWithDisabledItems = [
	{ name: 'My foo', value: 'foo', description: 'foo description', disabled: true },
	{ name: 'My bar', value: 'bar' },
	{ name: 'My lol', value: 'lol', disabled: true },
	{ name: 'My foobar', value: 'foobar', description: 'foobar description' },
];

export default {
	title: 'Components/Form - Controls/Datalist',
	decorators: [story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>],
};

export const DefaultMultiSection = () => {
	const restrictedValues = { ...propsMultiSection, restricted: true };
	const defaultValue = { ...propsMultiSection, value: 'lol' };
	const withIcons = {
		...propsMultiSection,
		titleMap: propsMultiSection.titleMap.map(titleMap => ({
			...titleMap,
			suggestions: titleMap.suggestions.map(suggestion => ({
				...suggestion,
				icon: { name: 'talend-clock' },
			})),
		})),
	};
	return (
		<form className="form">
			<h3>By default</h3>
			<Datalist {...propsMultiSection} />
			<h3>default value</h3>
			<Datalist {...defaultValue} />
			<h3>Restricted values</h3>
			<Datalist {...restrictedValues} />
			<h3>With icons</h3>
			<Datalist {...withIcons} />
			<h3>Auto focused</h3>
			<Datalist {...propsMultiSection} autoFocus />
		</form>
	);
};

export const DefaultSingleSection = () => {
	const restrictedValues = { ...singleSectionProps, restricted: true };
	const defaultValue = { ...singleSectionProps, value: 'lol' };
	const disabledItems = { ...singleSectionProps, titleMap: titleMapWithDisabledItems };
	const withIcons = {
		...singleSectionProps,
		titleMap: singleSectionProps.titleMap.map((titleMap, i) => ({
			...titleMap,
			icon: {
				name: ['talend-clock', 'talend-world', 'talend-flow', 'talend-flow-o'][i],
				title: 'My icon',
			},
		})),
	};
	const [titleMap, setTitleMap] = useState(defaultValue.titleMap);
	return (
		<form className="form">
			<h3>By default</h3>
			<Datalist {...singleSectionProps} />

			<h3>Allow adding new elements</h3>
			<Datalist
				{...singleSectionProps}
				allowAddNewElements
				allowAddNewElementsSuffix="(Not in the dictionary)"
			/>

			<h3>default value</h3>
			<Datalist {...defaultValue} />
			<h3>Restricted values</h3>
			<Datalist {...restrictedValues} />
			<h3>Loading</h3>
			<Datalist {...singleSectionProps} titleMap={[]} isLoading />
			<h3>Auto focused</h3>
			<Datalist {...singleSectionProps} autoFocus />
			<h3>With disabled Items</h3>
			<Datalist {...disabledItems} autoFocus />
			<h3>With icons</h3>
			<Datalist {...withIcons} />
			<h3>With suggestions API</h3>
			<Datalist
				{...defaultValue}
				titleMap={titleMap}
				onLiveChange={() => {
					setTimeout(() => {
						setTitleMap(prev => [...prev]);
					}, 200);
				}}
			/>
			<h3>Insert custom elements via render props</h3>
			<Datalist {...singleSectionProps}>
				{(content, { isShown }, _, inputRef) => (
					<div>
						{isShown && (
							<button
								onClick={() => inputRef.blur()}
								onMouseDown={e => e.preventDefault()}
								type="button"
							>
								Close dropdown
							</button>
						)}
						{content}
						{isShown && (
							<button
								onClick={action('onAfterClick')}
								onMouseDown={e => e.preventDefault()}
								type="button"
							>
								after
							</button>
						)}
					</div>
				)}
			</Datalist>
		</form>
	);
};

export const DisabledAndReadonly = () => {
	const disabledSectionProps = {
		...defaultProps,
		disabled: true,
		readOnly: false,
	};
	const readonlySectionProps = {
		...defaultProps,
		disabled: false,
		readOnly: true,
	};
	const combinationSectionProps = {
		...defaultProps,
		disabled: true,
		readOnly: true,
	};
	return (
		<form className="form">
			<h3>Disabled</h3>
			<Datalist {...disabledSectionProps} />
			<h3>Readonly</h3>
			<Datalist {...readonlySectionProps} />
			<h3>Combination (disabled + readonly)</h3>
			<Datalist {...combinationSectionProps} />
		</form>
	);
};
