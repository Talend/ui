'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.mapStateToProps = mapStateToProps;
exports.mergeProps = mergeProps;

var _reactCmf = require('@talend/react-cmf');

var _datagrid = require('./datagrid.container');

var _datagrid2 = _interopRequireDefault(_datagrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapStateToProps(state, ownProps) {
	var props = {};
	if (ownProps.source) {
		props.sourceData = state.cmf.collections.getIn(ownProps.source.split('.'));
	}

	return props;
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	var props = _extends({}, ownProps, stateProps, dispatchProps);
	if (props.source) {
		delete props.source;
	}

	return props;
}

exports.default = (0, _reactCmf.cmfConnect)({
	mapStateToProps: mapStateToProps,
	mergeProps: mergeProps
})(_datagrid2.default);