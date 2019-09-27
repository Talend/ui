import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@talend/react-components/lib/CircularProgress';

const AceEditor = React.lazy(() => import(/* webpackChunkName: "react-ace" */ 'react-ace'));

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
			setOptions = Object.assign({}, SET_OPTIONS, contextProps.setOptions);
			delete contextProps.setOptions;
		}
		return (
			<React.Suspense
				fallback={
					<div aria-busy>
						<CircularProgress />
					</div>
				}
			>
				<AceEditor
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
