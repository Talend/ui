'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getColumnDefsFromSample = getColumnDefsFromSample;
exports.getRowDataFromSample = getRowDataFromSample;
exports.getPinnedColumnDefsFromSample = getPinnedColumnDefsFromSample;
exports.valueGetterFromRowData = valueGetterFromRowData;

var _constants = require('../constants/');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getColumnDefsFromSample(sample) {
	if (!sample) {
		return [];
	}

	return sample.schema.fields.map(function (avroField) {
		var _ref;

		return _ref = {
			headerName: avroField.doc,
			type: avroField.type.dqType || avroField.type.type,
			field: '' + _constants.NAMESPACE_SAMPLE + avroField.name
		}, _defineProperty(_ref, _constants.TALEND_QUALITY_KEY, avroField[_constants.TALEND_QUALITY_KEY]), _defineProperty(_ref, 'avro', avroField), _ref;
	});
}

function getRowDataFromSample(sample) {
	if (!sample) {
		return [];
	}

	return sample.data.map(function (row, index) {
		return Object.keys(row.value).reduce(function (rowData, key) {
			return _extends({}, rowData, _defineProperty({}, '' + _constants.NAMESPACE_SAMPLE + key, {
				value: row.value[key].value,
				quality: row.value[key].quality,
				comments: [],
				avro: {}
			}));
		}, _defineProperty({}, '' + _constants.NAMESPACE_INDEX + _constants.COLUMN_INDEX, index));
	});
}

function getPinnedColumnDefsFromSample(sample) {
	if (!sample) {
		return [];
	}

	return [{
		field: '' + _constants.NAMESPACE_INDEX + _constants.COLUMN_INDEX,
		width: 100
	}];
}

function valueGetterFromRowData(_ref2) {
	var colDef = _ref2.colDef,
	    data = _ref2.data;

	return data[colDef.field];
}