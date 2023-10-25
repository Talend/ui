/**
 * @fileoverview Contains internal rules used at Talend
 * @author Jean-Michel FRANCOIS
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports = {
	rules: requireIndex(__dirname + '/rules'),
};
