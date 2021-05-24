import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { importFromCDN, Skeleton } from '@talend/react-components';

function CodeSkeleton() {
	return (
		<div>
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.small} />
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			<Skeleton type={Skeleton.TYPES.button} />
		</div>
	);
}

const AceEditor = lazy(() =>
	importFromCDN({
		name: 'react-ace',
		varName: 'ReactAce',
		version: '6.2.0',
		path: '/dist/react-ace.min.js',
	}),
);


const SET_OPTIONS = {
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
	enableSnippets: true,
};

function AceCodeWidget(props) {

	function onChange(value) {
		if (props.onChange) {
			props.onChange(value);
		}
	}

	function onLoad(event) {
		if (props.formContext.codeWidgetOnLoad) {
			props.formContext.codeWidgetOnLoad(event.env.editor);
		}
	}

	const { id, options, value, disabled, readonly, autofocus } = props;
	// allow override using
	const contextProps = props.formContext && props.formContext.codeWidgetProps;
	let setOptions = SET_OPTIONS;
	if (contextProps && contextProps.setOptions) {
		setOptions = { ...SET_OPTIONS, ...contextProps.setOptions };
		delete contextProps.setOptions;
	}

	return (
		<Suspense fallback={<CodeSkeleton />}>
			<AceEditor
				className="tf-widget-code form-control"
				focus={autofocus || false}
				name={id}
				width="auto"
				mode={options && options.language}
				onLoad={onLoad}
				onChange={onChange}
				readOnly={readonly}
				disabled={disabled}
				setOptions={setOptions}
				enableSnippets
				value={value}
				theme="chrome"
				showGutter={false}
				showPrintMargin={false}
				{...contextProps}
				{...options}
			/>
		</Suspense>
	);
}


if (process.env.NODE_ENV !== 'production') {
	AceCodeWidget.propTypes = {
		onChange: PropTypes.func,
		formContext: PropTypes.shape({
			codeWidgetProps: PropTypes.object,
			codeWidgetOnLoad: PropTypes.func,
		}),
		id: PropTypes.string,
		options: PropTypes.shape({
			language: PropTypes.string,
		}),
		value: PropTypes.string,
		disabled: PropTypes.bool,
		readonly: PropTypes.bool,
		autofocus: PropTypes.bool,
	};
}

AceCodeWidget.displayName = 'AceCodeWidget';

export default AceCodeWidget;
