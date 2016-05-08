/*!
 * json-schema-form
 * @version 1.0.0-alpha.1
 * Copyright 2016 JSON Schema Form
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.canonicalTitleMap = exports.schemaDefaults = exports.sfPath = undefined;

	var _merge = __webpack_require__(2);

	Object.keys(_merge).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _merge[key];
	    }
	  });
	});

	var _select = __webpack_require__(7);

	Object.keys(_select).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _select[key];
	    }
	  });
	});

	var _traverse = __webpack_require__(8);

	Object.keys(_traverse).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _traverse[key];
	    }
	  });
	});

	var _schemaDefaults = __webpack_require__(9);

	var schemaDefaultsImp = _interopRequireWildcard(_schemaDefaults);

	var _sfPath = __webpack_require__(3);

	var sfPathImp = _interopRequireWildcard(_sfPath);

	var _canonicalTitleMap = __webpack_require__(6);

	var _canonicalTitleMap2 = _interopRequireDefault(_canonicalTitleMap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var sfPath = exports.sfPath = sfPathImp;
	var schemaDefaults = exports.schemaDefaults = schemaDefaultsImp;
	var canonicalTitleMap = exports.canonicalTitleMap = _canonicalTitleMap2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.merge = merge;

	var _sfPath = __webpack_require__(3);

	var _canonicalTitleMap = __webpack_require__(6);

	var _canonicalTitleMap2 = _interopRequireDefault(_canonicalTitleMap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//export function merge(schema, form, schemaDefaultTypes, ignore, options, readonly, asyncTemplates) {
	function merge(lookup, form, options, readonly, asyncTemplates) {
	  form = form || [];
	  options = options || {};

	  //ok let's merge!
	  //We look at the supplied form and extend it with schema standards
	  return form.map(function (obj) {

	    //handle the shortcut with just a name
	    if (typeof obj === 'string') {
	      obj = { key: obj };
	    }

	    if (obj.key) {
	      if (typeof obj.key === 'string') {
	        obj.key = (0, _sfPath.parse)(obj.key);
	      }
	    }

	    //If it has a titleMap make sure it's a list
	    if (obj.titleMap) {
	      obj.titleMap = (0, _canonicalTitleMap2.default)(obj.titleMap);
	    }

	    //extend with std form from schema.
	    if (obj.key) {
	      var strid = (0, _sfPath.stringify)(obj.key);
	      if (lookup[strid]) {
	        (function () {
	          var schemaDefaults = lookup[strid];
	          if (schemaDefaults) {
	            Object.keys(schemaDefaults).forEach(function (attr) {
	              if (obj[attr] === undefined) {
	                obj[attr] = schemaDefaults[attr];
	              }
	            });
	          }
	        })();
	      }
	    }

	    // Are we inheriting readonly?
	    if (readonly === true) {
	      // Inheriting false is not cool.
	      obj.readonly = true;
	    }

	    //if it's a type with items, merge 'em!
	    if (obj.items) {
	      obj.items = merge(lookup, obj.items, options, obj.readonly, asyncTemplates);
	    }

	    //if its has tabs, merge them also!
	    if (obj.tabs) {
	      obj.tabs.forEach(function (tab) {
	        if (tab.items) {
	          tab.items = merge(lookup, tab.items, options, obj.readonly, asyncTemplates);
	        }
	      });
	    }

	    // Special case: checkbox
	    // Since have to ternary state we need a default
	    if (obj.type === 'checkbox' && obj.schema['default'] === undefined) {
	      obj.schema['default'] = false;
	    };

	    // Special case: template type with tempplateUrl that's needs to be loaded before rendering
	    // TODO: this is not a clean solution. Maybe something cleaner can be made when $ref support
	    // is introduced since we need to go async then anyway
	    if (asyncTemplates && obj.type === 'template' && !obj.template && obj.templateUrl) {
	      asyncTemplates.push(obj);
	    }

	    return obj;
	  });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _objectpath = __webpack_require__(4);

	Object.defineProperty(exports, 'parse', {
	  enumerable: true,
	  get: function get() {
	    return _objectpath.parse;
	  }
	});
	Object.defineProperty(exports, 'stringify', {
	  enumerable: true,
	  get: function get() {
	    return _objectpath.stringify;
	  }
	});
	Object.defineProperty(exports, 'normalize', {
	  enumerable: true,
	  get: function get() {
	    return _objectpath.normalize;
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(5).ObjectPath;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	;!function (undefined) {

		var ObjectPath = {
			parse: function parse(str) {
				if (typeof str !== 'string') {
					throw new TypeError('ObjectPath.parse must be passed a string');
				}

				var i = 0;
				var parts = [];
				var d, b, q, c;
				while (i < str.length) {
					d = str.indexOf('.', i);
					b = str.indexOf('[', i);

					// we've reached the end
					if (d === -1 && b === -1) {
						parts.push(str.slice(i, str.length));
						i = str.length;
					}

					// dots
					else if (b === -1 || d !== -1 && d < b) {
							parts.push(str.slice(i, d));
							i = d + 1;
						}

						// brackets
						else {
								if (b > i) {
									parts.push(str.slice(i, b));
									i = b;
								}
								q = str.slice(b + 1, b + 2);
								if (q !== '"' && q !== '\'') {
									c = str.indexOf(']', b);
									if (c === -1) c = str.length;
									parts.push(str.slice(i + 1, c));
									i = str.slice(c + 1, c + 2) === '.' ? c + 2 : c + 1;
								} else {
									c = str.indexOf(q + ']', b);
									if (c === -1) c = str.length;
									while (str.slice(c - 1, c) === '\\' && b < str.length) {
										b++;
										c = str.indexOf(q + ']', b);
									}
									parts.push(str.slice(i + 2, c).replace(new RegExp('\\' + q, 'g'), q));
									i = str.slice(c + 2, c + 3) === '.' ? c + 3 : c + 2;
								}
							}
				}
				return parts;
			},

			// root === true : auto calculate root; must be dot-notation friendly
			// root String : the string to use as root
			stringify: function stringify(arr, quote) {

				if (!Array.isArray(arr)) arr = [arr.toString()];

				quote = quote === '"' ? '"' : '\'';

				return arr.map(function (n) {
					return '[' + quote + n.toString().replace(new RegExp(quote, 'g'), '\\' + quote) + quote + ']';
				}).join('');
			},

			normalize: function normalize(data, quote) {
				return ObjectPath.stringify(Array.isArray(data) ? data : ObjectPath.parse(data), quote);
			},

			// Angular
			registerModule: function registerModule(angular) {
				angular.module('ObjectPath', []).provider('ObjectPath', function () {
					this.parse = ObjectPath.parse;
					this.stringify = ObjectPath.stringify;
					this.normalize = ObjectPath.normalize;
					this.$get = function () {
						return ObjectPath;
					};
				});
			}
		};

		// AMD
		if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return { ObjectPath: ObjectPath };
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}

		// CommonJS
		else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
				exports.ObjectPath = ObjectPath;
			}

			// Browser global
			else {
					window.ObjectPath = ObjectPath;
				}
	}();

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; // Takes a titleMap in either object or list format and returns one in
	// in the list format.


	exports.default = function (titleMap, originalEnum) {
	  if (!Array.isArray(titleMap)) {
	    var _ret = function () {
	      var canonical = [];
	      if (originalEnum) {
	        originalEnum.forEach(function (value) {
	          canonical.push({ name: titleMap[value], value: value });
	        });
	      } else {
	        Object.keys(titleMap).forEach(function (value) {
	          canonical.push({ name: titleMap[value], value: value });
	        });
	      }
	      return {
	        v: canonical
	      };
	    }();

	    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	  }
	  return titleMap;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.select = select;

	var _sfPath = __webpack_require__(3);

	var _sfPath2 = _interopRequireDefault(_sfPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var numRe = /^\d+$/;

	/**
	  * @description
	  * Utility method to access deep properties without
	  * throwing errors when things are not defined.
	  * Can also set a value in a deep structure, creating objects when missing
	  * ex.
	  * var foo = Select('address.contact.name',obj)
	  * Select('address.contact.name',obj,'Leeroy')
	  *
	  * @param {string} projection A dot path to the property you want to get/set
	  * @param {object} obj   (optional) The object to project on, defaults to 'this'
	  * @param {Any}    valueToSet (opional)  The value to set, if parts of the path of
	  *                 the projection is missing empty objects will be created.
	  * @returns {Any|undefined} returns the value at the end of the projection path
	  *                          or undefined if there is none.
	  */
	function select(projection, obj, valueToSet) {
	  if (!obj) {
	    obj = this;
	  }
	  //Support [] array syntax
	  var parts = typeof projection === 'string' ? _sfPath2.default.parse(projection) : projection;

	  if (typeof valueToSet !== 'undefined' && parts.length === 1) {
	    //special case, just setting one variable
	    obj[parts[0]] = valueToSet;
	    return obj;
	  }

	  if (typeof valueToSet !== 'undefined' && typeof obj[parts[0]] === 'undefined') {
	    // We need to look ahead to check if array is appropriate
	    obj[parts[0]] = parts.length > 2 && numRe.test(parts[1]) ? [] : {};
	  }

	  var value = obj[parts[0]];
	  for (var i = 1; i < parts.length; i++) {
	    // Special case: We allow JSON Form syntax for arrays using empty brackets
	    // These will of course not work here so we exit if they are found.
	    if (parts[i] === '') {
	      return undefined;
	    }
	    if (typeof valueToSet !== 'undefined') {
	      if (i === parts.length - 1) {
	        //last step. Let's set the value
	        value[parts[i]] = valueToSet;
	        return valueToSet;
	      } else {
	        // Make sure to create new objects on the way if they are not there.
	        // We need to look ahead to check if array is appropriate
	        var tmp = value[parts[i]];
	        if (typeof tmp === 'undefined' || tmp === null) {
	          tmp = numRe.test(parts[i + 1]) ? [] : {};
	          value[parts[i]] = tmp;
	        }
	        value = tmp;
	      }
	    } else if (value) {
	      //Just get nex value.
	      value = value[parts[i]];
	    }
	  }
	  return value;
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.traverseSchema = traverseSchema;
	exports.traverseForm = traverseForm;
	/**
	 * Traverse a schema, applying a function(schema,path) on every sub schema
	 * i.e. every property of an object.
	 */
	function traverseSchema(schema, fn, path, ignoreArrays) {
	  ignoreArrays = ignoreArrays === undefined ? true : ignoreArrays;

	  path = path || [];

	  var traverse = function traverse(schema, fn, path) {
	    fn(schema, path);
	    if (schema.properties) {
	      Object.keys(schema.properties).forEach(function (name) {
	        var currentPath = path.slice();
	        currentPath.push(name);
	        traverse(schema.properties[name], fn, currentPath);
	      });
	    }

	    //Only support type "array" which have a schema as "items".
	    if (!ignoreArrays && schema.items) {
	      var arrPath = path.slice();arrPath.push('');
	      traverse(schema.items, fn, arrPath);
	    }
	  };

	  traverse(schema, fn, path || []);
	}

	function traverseForm(form, fn) {
	  fn(form);
	  if (form.items) {
	    form.items.forEach(function (f) {
	      traverseForm(f, fn);
	    });
	  }

	  if (form.tabs) {
	    form.tabs.forEach(function (tab) {
	      if (tab.items) {
	        tab.items.forEach(function (f) {
	          traverseForm(f, fn);
	        });
	      }
	    });
	  }
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.defaultFormDefinition = defaultFormDefinition;
	exports.stdFormObj = stdFormObj;
	exports.text = text;
	exports.number = number;
	exports.integer = integer;
	exports.checkbox = checkbox;
	exports.select = select;
	exports.checkboxes = checkboxes;
	exports.fieldset = fieldset;
	exports.array = array;
	exports.createDefaults = createDefaults;
	exports.defaultForm = defaultForm;

	var _sfPath = __webpack_require__(3);

	var _canonicalTitleMap = __webpack_require__(6);

	var _canonicalTitleMap2 = _interopRequireDefault(_canonicalTitleMap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* Utils */
	var stripNullType = function stripNullType(type) {
	  if (Array.isArray(type) && type.length == 2) {
	    if (type[0] === 'null') {
	      return type[1];
	    };
	    if (type[1] === 'null') {
	      return type[0];
	    };
	  };
	  return type;
	};

	//Creates an default titleMap list from an enum, i.e. a list of strings.
	var enumToTitleMap = function enumToTitleMap(enm) {
	  var titleMap = []; //canonical titleMap format is a list.
	  enm.forEach(function (name) {
	    titleMap.push({ name: name, value: name });
	  });
	  return titleMap;
	};

	/**
	 * Creates a default form definition from a schema.
	 */
	function defaultFormDefinition(schemaTypes, name, schema, options) {
	  var rules = schemaTypes[stripNullType(schema.type)];
	  if (rules) {
	    var def = void 0;
	    // We give each rule a possibility to recurse it's children.
	    var innerDefaultFormDefinition = function innerDefaultFormDefinition(childName, childSchema, childOptions) {
	      return defaultFormDefinition(schemaTypes, childName, childSchema, childOptions);
	    };
	    for (var i = 0; i < rules.length; i++) {
	      def = rules[i](name, schema, options, innerDefaultFormDefinition);

	      //first handler in list that actually returns something is our handler!
	      if (def) {

	        // Do we have form defaults in the schema under the x-schema-form-attribute?
	        if (def.schema['x-schema-form']) {
	          Object.assign(def, def.schema['x-schema-form']);
	        }

	        return def;
	      }
	    }
	  }
	}

	/**
	 * Creates a form object with all common properties
	 */
	function stdFormObj(name, schema, options) {
	  options = options || {};

	  // The Object.assign used to be a angular.copy. Should work though.
	  var f = options.global && options.global.formDefaults ? Object.assign({}, options.global.formDefaults) : {};
	  if (options.global && options.global.supressPropertyTitles === true) {
	    f.title = schema.title;
	  } else {
	    f.title = schema.title || name;
	  }

	  if (schema.description) {
	    f.description = schema.description;
	  }
	  if (options.required === true || schema.required === true) {
	    f.required = true;
	  }
	  if (schema.maxLength) {
	    f.maxlength = schema.maxLength;
	  }
	  if (schema.minLength) {
	    f.minlength = schema.minLength;
	  }
	  if (schema.readOnly || schema.readonly) {
	    f.readonly = true;
	  }
	  if (schema.minimum) {
	    f.minimum = schema.minimum + (schema.exclusiveMinimum ? 1 : 0);
	  }
	  if (schema.maximum) {
	    f.maximum = schema.maximum - (schema.exclusiveMaximum ? 1 : 0);
	  }

	  // Non standard attributes (DONT USE DEPRECATED)
	  // If you must set stuff like this in the schema use the x-schema-form attribute
	  if (schema.validationMessage) {
	    f.validationMessage = schema.validationMessage;
	  }
	  if (schema.enumNames) {
	    f.titleMap = (0, _canonicalTitleMap2.default)(schema.enumNames, schema['enum']);
	  }
	  f.schema = schema;

	  // Ng model options doesn't play nice with undefined, might be defined
	  // globally though
	  f.ngModelOptions = f.ngModelOptions || {};

	  return f;
	};

	/*** Schema types to form type mappings, with defaults ***/
	function text(name, schema, options) {
	  if (stripNullType(schema.type) === 'string' && !schema['enum']) {
	    var f = stdFormObj(name, schema, options);
	    f.key = options.path;
	    f.type = 'text';
	    options.lookup[(0, _sfPath.stringify)(options.path)] = f;
	    return f;
	  }
	}

	//default in json form for number and integer is a text field
	//input type="number" would be more suitable don't ya think?
	function number(name, schema, options) {
	  if (stripNullType(schema.type) === 'number') {
	    var f = stdFormObj(name, schema, options);
	    f.key = options.path;
	    f.type = 'number';
	    options.lookup[(0, _sfPath.stringify)(options.path)] = f;
	    return f;
	  }
	}

	function integer(name, schema, options) {
	  if (stripNullType(schema.type) === 'integer') {
	    var f = stdFormObj(name, schema, options);
	    f.key = options.path;
	    f.type = 'number';
	    options.lookup[(0, _sfPath.stringify)(options.path)] = f;
	    return f;
	  }
	}

	function checkbox(name, schema, options) {
	  if (stripNullType(schema.type) === 'boolean') {
	    var f = stdFormObj(name, schema, options);
	    f.key = options.path;
	    f.type = 'checkbox';
	    options.lookup[(0, _sfPath.stringify)(options.path)] = f;
	    return f;
	  }
	}

	function select(name, schema, options) {
	  if (stripNullType(schema.type) === 'string' && schema['enum']) {
	    var f = stdFormObj(name, schema, options);
	    f.key = options.path;
	    f.type = 'select';
	    if (!f.titleMap) {
	      f.titleMap = enumToTitleMap(schema['enum']);
	    }
	    options.lookup[(0, _sfPath.stringify)(options.path)] = f;
	    return f;
	  }
	}

	function checkboxes(name, schema, options) {
	  if (stripNullType(schema.type) === 'array' && schema.items && schema.items['enum']) {
	    var f = stdFormObj(name, schema, options);
	    f.key = options.path;
	    f.type = 'checkboxes';
	    if (!f.titleMap) {
	      f.titleMap = enumToTitleMap(schema.items['enum']);
	    }
	    options.lookup[(0, _sfPath.stringify)(options.path)] = f;
	    return f;
	  }
	}

	function fieldset(name, schema, options, defaultFormDef) {
	  if (stripNullType(schema.type) === 'object') {
	    var _ret = function () {
	      var f = stdFormObj(name, schema, options);
	      f.type = 'fieldset';
	      f.items = [];
	      options.lookup[(0, _sfPath.stringify)(options.path)] = f;

	      console.log('fieldset', f, schema);
	      //recurse down into properties
	      if (schema.properties) {
	        Object.keys(schema.properties).forEach(function (key) {
	          var value = schema.properties[key];
	          var path = options.path.slice();
	          path.push(key);
	          if (options.ignore[(0, _sfPath.stringify)(path)] !== true) {
	            var required = schema.required && schema.required.indexOf(key) !== -1;

	            var def = defaultFormDef(key, value, {
	              path: path,
	              required: required || false,
	              lookup: options.lookup,
	              ignore: options.ignore,
	              global: options.global
	            });
	            if (def) {
	              f.items.push(def);
	            }
	          }
	        });
	      }
	      return {
	        v: f
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	}

	function array(name, schema, options, defaultFormDef) {
	  if (stripNullType(schema.type) === 'array') {
	    var f = stdFormObj(name, schema, options);
	    f.type = 'array';
	    f.key = options.path;
	    options.lookup[(0, _sfPath.stringify)(options.path)] = f;

	    var required = schema.required && schema.required.indexOf(options.path[options.path.length - 1]) !== -1;

	    // The default is to always just create one child. This works since if the
	    // schemas items declaration is of type: "object" then we get a fieldset.
	    // We also follow json form notatation, adding empty brackets "[]" to
	    // signify arrays.

	    var arrPath = options.path.slice();
	    arrPath.push('');

	    f.items = [defaultFormDef(name, schema.items, {
	      path: arrPath,
	      required: required || false,
	      lookup: options.lookup,
	      ignore: options.ignore,
	      global: options.global
	    })];

	    return f;
	  }
	}

	function createDefaults() {
	  //First sorted by schema type then a list.
	  //Order has importance. First handler returning an form snippet will be used.
	  return {
	    string: [select, text],
	    object: [fieldset],
	    number: [number],
	    integer: [integer],
	    boolean: [checkbox],
	    array: [array],
	    defaultForm: defaultForm
	  };
	};

	/**
	 * Create form defaults from schema
	 */
	function defaultForm(schema, defaultSchemaTypes, ignore, globalOptions) {
	  var form = [];
	  var lookup = {}; //Map path => form obj for fast lookup in merging
	  ignore = ignore || {};
	  globalOptions = globalOptions || {};

	  if (schema.properties) {
	    Object.keys(schema.properties).forEach(function (key) {
	      if (ignore[key] !== true) {
	        var required = schema.required && schema.required.indexOf(key) !== -1;
	        var def = defaultFormDefinition(defaultSchemaTypes, key, schema.properties[key], {
	          path: [key], // Path to this property in bracket notation.
	          lookup: lookup, // Extra map to register with. Optimization for merger.
	          ignore: ignore, // The ignore list of paths (sans root level name)
	          required: required, // Is it required? (v4 json schema style)
	          global: globalOptions // Global options, including form defaults
	        });
	        if (def) {
	          form.push(def);
	        }
	      }
	    });
	  } else {
	    throw new Error('Not implemented. Only type "object" allowed at root level of schema.');
	  }
	  return { form: form, lookup: lookup };
	}

/***/ }
/******/ ])
});
;