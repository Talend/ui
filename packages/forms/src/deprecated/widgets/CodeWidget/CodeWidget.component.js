import React from 'react';
import PropTypes from 'prop-types';
import assetsApi from '@talend/assets-api';
import { Skeleton } from '@talend/react-components';

const ReactAce = React.lazy(() =>
	assetsApi.getUMD('react-ace').then(mod => ({ default: mod.default, __esModule: true })),
);

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
const SET_OPTIONS = {
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
	enableSnippets: true,
};

class AceCodeWidget extends React.Component {
	static displayName = 'AceCodeWidget';

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onLoad = this.onLoad.bind(this);
	}

	onChange(value) {
		if (this.props.onChange) {
			this.props.onChange(value);
		}
	}

	onLoad(event) {
		if (this.props.formContext.codeWidgetOnLoad) {
			this.props.formContext.codeWidgetOnLoad(event.env.editor);
		}
	}

	render() {
		const { id, options, value, disabled, readonly, autofocus } = this.props;
		// allow override using
		const contextProps = this.props.formContext && this.props.formContext.codeWidgetProps;
		let setOptions = SET_OPTIONS;
		if (contextProps && contextProps.setOptions) {
			setOptions = { ...SET_OPTIONS, ...contextProps.setOptions };
			delete contextProps.setOptions;
		}
		return (
			<React.Suspense fallback={<CodeSkeleton />}>
				<ReactAce
					className="tf-widget-code form-control"
					focus={autofocus || false}
					name={id}
					width="auto"
					mode={options && options.language}
					onLoad={this.onLoad}
					onChange={this.onChange}
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
			</React.Suspense>
		);
	}
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

export default AceCodeWidget;
