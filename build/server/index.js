require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://0.0.0.0:8331/src/client/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configGet;
/**
 * Unified Configuration Reader
 *
 * This helper function allows you to use the same API in accessing configuration
 * values no matter where the code is being executed (i.e. browser/node).
 *
 * e.g.
 *   import config from '../config';
 *   config('welcomeMessage'); // => "Hello World!"
 */

/* eslint-disable no-console */
/* eslint-disable import/global-require */
/* eslint-disable no-underscore-dangle */

// PRIVATES

let configCache;

/**
 * This resolves the correct configuration source based on the execution
 * environment.  For node we use the standard config file, however, for browsers
 * we need to access the configuration object that would have been bound to
 * the "window" by our "reactApplication" middleware.
 *
 * @return {Object} The executing environment configuration object.
 */
function resolveConfigForBrowserOrServer() {
  if (configCache) {
    return configCache;
  }

  // NOTE: By using the "process.env.BUILD_FLAG_IS_NODE" flag here this block of code
  // will be removed when "process.env.BUILD_FLAG_IS_NODE === true".
  // If no "BUILD_FLAG_IS_NODE" env var is undefined we can assume that we are running outside
  // of a webpack run, and will therefore return the config file.
  if (true) {
    // i.e. running in our server/node process.
    // eslint-disable-next-line global-require
    const configFactory = __webpack_require__(12).default;
    configCache = configFactory({});

    return configCache;
  }

  // To get here we are likely running in the browser.

  if (typeof window !== 'undefined' && typeof window.__CLIENT_CONFIG__ === 'object') {
    configCache = window.__CLIENT_CONFIG__;
  } else {
    // To get here we must be running in the browser.
    console.warn('No client configuration object was bound to the window.');
    configCache = {};
  }

  return configCache;
}

// EXPORT

/**
 * This function wraps up the boilerplate needed to access the correct
 * configuration depending on whether your code will get executed in the
 * browser/node.
 *
 * i.e.
 *  - For the browser the config values are available at window.__CLIENT_CONFIG__
 *  - For a node process they are within the "<root>/config".
 *
 * To request a configuration value you must provide the repective path. For
 * example, f you had the following configuration structure:
 *   {
 *     foo: {
 *       bar: [1, 2, 3]
 *     },
 *     bob: 'bob'
 *   }
 *
 * You could use this function to access "bar" like so:
 *   import config from '../config';
 *   const value = config('foo.bar');
 *
 * And you could access "bob" like so:
 *   import config from '../config';
 *   const value = config('bob');
 *
 * If any part of the path isn't available as a configuration key/value then
 * an error will be thrown indicating that a respective configuration value
 * could not be found at the given path.
 */
function configGet(path) {
  const parts = typeof path === 'string' ? path.split('.') : path;

  if (parts.length === 0) {
    throw new Error('You must provide the path to the configuration value you would like to consume.');
  }
  let result = resolveConfigForBrowserOrServer();

  for (let i = 0; i < parts.length; i += 1) {
    if (result === undefined) {
      const errorMessage = `Failed to resolve configuration value at "${parts.join('.')}".`;
      // This "if" block gets stripped away by webpack for production builds.
      if (false) {
        throw new Error(`${errorMessage} We have noticed that you are trying to access this configuration value from the client bundle (i.e. code that will be executed in a browser). For configuration values to be exposed to the client bundle you must ensure that the path is added to the client configuration filter in the project configuration values file.`);
      }
      throw new Error(errorMessage);
    }
    result = result[parts[i]];
  }
  return result;
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function isFunction (value) {
  return value instanceof Function
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {"directives":{"base-uri":{"type":"sourceList"},"block-all-mixed-content":{"type":"boolean"},"child-src":{"type":"sourceList"},"connect-src":{"type":"sourceList"},"default-src":{"type":"sourceList"},"font-src":{"type":"sourceList"},"form-action":{"type":"sourceList"},"frame-ancestors":{"type":"sourceList"},"frame-src":{"type":"sourceList"},"img-src":{"type":"sourceList"},"manifest-src":{"type":"sourceList"},"media-src":{"type":"sourceList"},"object-src":{"type":"sourceList"},"script-src":{"type":"sourceList","hasUnsafes":true},"style-src":{"type":"sourceList","hasUnsafes":true},"plugin-types":{"type":"pluginTypes"},"sandbox":{"type":"sandbox"},"report-to":{"type":"reportUri"},"report-uri":{"type":"reportUri"},"upgrade-insecure-requests":{"type":"boolean"},"worker-src":{"type":"sourceList","hasUnsafes":true}},"allHeaders":["Content-Security-Policy","X-Content-Security-Policy","X-WebKit-CSP"],"mustQuote":["none","self","unsafe-inline","unsafe-eval"],"unsafes":["'unsafe-inline'","unsafe-inline","'unsafe-eval'","unsafe-eval"],"sandboxDirectives":["allow-forms","allow-modals","allow-orientation-lock","allow-pointer-lock","allow-popups","allow-popups-to-escape-sandbox","allow-presentation","allow-same-origin","allow-scripts","allow-top-navigation"]}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["happyPackPlugin"] = happyPackPlugin;
/* harmony export (immutable) */ __webpack_exports__["log"] = log;
/* harmony export (immutable) */ __webpack_exports__["exec"] = exec;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_happypack__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_happypack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_happypack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_notifier__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_notifier___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_node_notifier__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_colors_safe__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_colors_safe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_colors_safe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_child_process__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_child_process___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_child_process__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__config__);






// Generates a HappyPack plugin.
// @see https://github.com/amireh/happypack/
function happyPackPlugin({ name, loaders }) {
  return new __WEBPACK_IMPORTED_MODULE_0_happypack___default.a({
    id: name,
    verbose: false,
    threads: 4,
    loaders,
  });
}

function log(options) {
  const title = `${options.title.toUpperCase()}`;

  if (options.notify) {
    __WEBPACK_IMPORTED_MODULE_1_node_notifier___default.a.notify({
      title,
      message: options.message,
    });
  }

  const level = options.level || 'info';
  const msg = `${title}: ${options.message}`;

  switch (level) {
    case 'warn':
      console.log(__WEBPACK_IMPORTED_MODULE_2_colors_safe___default.a.yellow(msg));
      break;
    case 'error':
      console.log(__WEBPACK_IMPORTED_MODULE_2_colors_safe___default.a.bgRed.white(msg));
      break;
    case 'special':
      console.log(__WEBPACK_IMPORTED_MODULE_2_colors_safe___default.a.italic.cyan(msg));
      break;
    case 'info':
    default:
      console.log(__WEBPACK_IMPORTED_MODULE_2_colors_safe___default.a.green.dim(msg));
  }
}

function exec(command) {
  Object(__WEBPACK_IMPORTED_MODULE_3_child_process__["execSync"])(command, { stdio: 'inherit', cwd: __WEBPACK_IMPORTED_MODULE_4__config___default()('projectRootDir') });
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.Helmet = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSideEffect = __webpack_require__(23);

var _reactSideEffect2 = _interopRequireDefault(_reactSideEffect);

var _deepEqual = __webpack_require__(26);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _HelmetUtils = __webpack_require__(27);

var _HelmetConstants = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Helmet = function Helmet(Component) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
        _inherits(HelmetWrapper, _React$Component);

        function HelmetWrapper() {
            _classCallCheck(this, HelmetWrapper);

            return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _deepEqual2.default)(this.props, nextProps);
        };

        HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
            if (!nestedChildren) {
                return null;
            }

            switch (child.type) {
                case _HelmetConstants.TAG_NAMES.SCRIPT:
                case _HelmetConstants.TAG_NAMES.NOSCRIPT:
                    return {
                        innerHTML: nestedChildren
                    };

                case _HelmetConstants.TAG_NAMES.STYLE:
                    return {
                        cssText: nestedChildren
                    };
            }

            throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
        };

        HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
            var _extends2;

            var child = _ref.child,
                arrayTypeChildren = _ref.arrayTypeChildren,
                newChildProps = _ref.newChildProps,
                nestedChildren = _ref.nestedChildren;

            return _extends({}, arrayTypeChildren, (_extends2 = {}, _extends2[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _extends2));
        };

        HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
            var _extends3, _extends4;

            var child = _ref2.child,
                newProps = _ref2.newProps,
                newChildProps = _ref2.newChildProps,
                nestedChildren = _ref2.nestedChildren;

            switch (child.type) {
                case _HelmetConstants.TAG_NAMES.TITLE:
                    return _extends({}, newProps, (_extends3 = {}, _extends3[child.type] = nestedChildren, _extends3.titleAttributes = _extends({}, newChildProps), _extends3));

                case _HelmetConstants.TAG_NAMES.BODY:
                    return _extends({}, newProps, {
                        bodyAttributes: _extends({}, newChildProps)
                    });

                case _HelmetConstants.TAG_NAMES.HTML:
                    return _extends({}, newProps, {
                        htmlAttributes: _extends({}, newChildProps)
                    });
            }

            return _extends({}, newProps, (_extends4 = {}, _extends4[child.type] = _extends({}, newChildProps), _extends4));
        };

        HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
            var newFlattenedProps = _extends({}, newProps);

            Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
                var _extends5;

                newFlattenedProps = _extends({}, newFlattenedProps, (_extends5 = {}, _extends5[arrayChildName] = arrayTypeChildren[arrayChildName], _extends5));
            });

            return newFlattenedProps;
        };

        HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
            if (true) {
                if (!_HelmetConstants.VALID_TAG_NAMES.some(function (name) {
                    return child.type === name;
                })) {
                    if (typeof child.type === "function") {
                        return (0, _HelmetUtils.warn)("You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.");
                    }

                    return (0, _HelmetUtils.warn)("Only elements types " + _HelmetConstants.VALID_TAG_NAMES.join(", ") + " are allowed. Helmet does not support rendering <" + child.type + "> elements. Refer to our API for more information.");
                }

                if (nestedChildren && typeof nestedChildren !== "string" && (!Array.isArray(nestedChildren) || nestedChildren.some(function (nestedChild) {
                    return typeof nestedChild !== "string";
                }))) {
                    throw new Error("Helmet expects a string as a child of <" + child.type + ">. Did you forget to wrap your children in braces? ( <" + child.type + ">{``}</" + child.type + "> ) Refer to our API for more information.");
                }
            }

            return true;
        };

        HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
            var _this2 = this;

            var arrayTypeChildren = {};

            _react2.default.Children.forEach(children, function (child) {
                if (!child || !child.props) {
                    return;
                }

                var _child$props = child.props,
                    nestedChildren = _child$props.children,
                    childProps = _objectWithoutProperties(_child$props, ["children"]);

                var newChildProps = (0, _HelmetUtils.convertReactPropstoHtmlAttributes)(childProps);

                _this2.warnOnInvalidChildren(child, nestedChildren);

                switch (child.type) {
                    case _HelmetConstants.TAG_NAMES.LINK:
                    case _HelmetConstants.TAG_NAMES.META:
                    case _HelmetConstants.TAG_NAMES.NOSCRIPT:
                    case _HelmetConstants.TAG_NAMES.SCRIPT:
                    case _HelmetConstants.TAG_NAMES.STYLE:
                        arrayTypeChildren = _this2.flattenArrayTypeChildren({
                            child: child,
                            arrayTypeChildren: arrayTypeChildren,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;

                    default:
                        newProps = _this2.mapObjectTypeChildren({
                            child: child,
                            newProps: newProps,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;
                }
            });

            newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
            return newProps;
        };

        HelmetWrapper.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                props = _objectWithoutProperties(_props, ["children"]);

            var newProps = _extends({}, props);

            if (children) {
                newProps = this.mapChildrenToProps(children, newProps);
            }

            return _react2.default.createElement(Component, newProps);
        };

        _createClass(HelmetWrapper, null, [{
            key: "canUseDOM",


            // Component.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.

            /**
            * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
            * @param {Object} bodyAttributes: {"className": "root"}
            * @param {String} defaultTitle: "Default Title"
            * @param {Boolean} defer: true
            * @param {Boolean} encodeSpecialCharacters: true
            * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
            * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
            * @param {Array} meta: [{"name": "description", "content": "Test description"}]
            * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
            * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
            * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
            * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
            * @param {String} title: "Title"
            * @param {Object} titleAttributes: {"itemprop": "name"}
            * @param {String} titleTemplate: "MySite.com - %s"
            */
            set: function set(canUseDOM) {
                Component.canUseDOM = canUseDOM;
            }
        }]);

        return HelmetWrapper;
    }(_react2.default.Component), _class.propTypes = {
        base: _propTypes2.default.object,
        bodyAttributes: _propTypes2.default.object,
        children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
        defaultTitle: _propTypes2.default.string,
        defer: _propTypes2.default.bool,
        encodeSpecialCharacters: _propTypes2.default.bool,
        htmlAttributes: _propTypes2.default.object,
        link: _propTypes2.default.arrayOf(_propTypes2.default.object),
        meta: _propTypes2.default.arrayOf(_propTypes2.default.object),
        noscript: _propTypes2.default.arrayOf(_propTypes2.default.object),
        onChangeClientState: _propTypes2.default.func,
        script: _propTypes2.default.arrayOf(_propTypes2.default.object),
        style: _propTypes2.default.arrayOf(_propTypes2.default.object),
        title: _propTypes2.default.string,
        titleAttributes: _propTypes2.default.object,
        titleTemplate: _propTypes2.default.string
    }, _class.defaultProps = {
        defer: true,
        encodeSpecialCharacters: true
    }, _class.peek = Component.peek, _class.rewind = function () {
        var mappedState = Component.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = (0, _HelmetUtils.mapStateOnServer)({
                baseTag: [],
                bodyAttributes: {},
                encodeSpecialCharacters: true,
                htmlAttributes: {},
                linkTags: [],
                metaTags: [],
                noscriptTags: [],
                scriptTags: [],
                styleTags: [],
                title: "",
                titleAttributes: {}
            });
        }

        return mappedState;
    }, _temp;
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = (0, _reactSideEffect2.default)(_HelmetUtils.reducePropsToState, _HelmetUtils.handleClientStateChange, _HelmetUtils.mapStateOnServer)(NullComponent);

var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;

exports.Helmet = HelmetExport;
exports.default = HelmetExport;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

exports.__esModule = true;
var ATTRIBUTE_NAMES = exports.ATTRIBUTE_NAMES = {
    BODY: "bodyAttributes",
    HTML: "htmlAttributes",
    TITLE: "titleAttributes"
};

var TAG_NAMES = exports.TAG_NAMES = {
    BASE: "base",
    BODY: "body",
    HEAD: "head",
    HTML: "html",
    LINK: "link",
    META: "meta",
    NOSCRIPT: "noscript",
    SCRIPT: "script",
    STYLE: "style",
    TITLE: "title"
};

var VALID_TAG_NAMES = exports.VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
    return TAG_NAMES[name];
});

var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
    CHARSET: "charset",
    CSS_TEXT: "cssText",
    HREF: "href",
    HTTPEQUIV: "http-equiv",
    INNER_HTML: "innerHTML",
    ITEM_PROP: "itemprop",
    NAME: "name",
    PROPERTY: "property",
    REL: "rel",
    SRC: "src"
};

var REACT_TAG_MAP = exports.REACT_TAG_MAP = {
    accesskey: "accessKey",
    charset: "charSet",
    class: "className",
    contenteditable: "contentEditable",
    contextmenu: "contextMenu",
    "http-equiv": "httpEquiv",
    itemprop: "itemProp",
    tabindex: "tabIndex"
};

var HELMET_PROPS = exports.HELMET_PROPS = {
    DEFAULT_TITLE: "defaultTitle",
    DEFER: "defer",
    ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
    ON_CHANGE_CLIENT_STATE: "onChangeClientState",
    TITLE_TEMPLATE: "titleTemplate"
};

var HTML_TAG_MAP = exports.HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
    obj[REACT_TAG_MAP[key]] = key;
    return obj;
}, {});

var SELF_CLOSING_TAGS = exports.SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];

var HELMET_ATTRIBUTE = exports.HELMET_ATTRIBUTE = "data-react-helmet";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAsyncContext;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createAsyncContext() {
  var idPointer = 0;
  var registry = {};
  return {
    getNextId: function getNextId() {
      idPointer += 1;
      return idPointer;
    },
    resolved: function resolved(id) {
      registry[id] = true;
    },
    getState: function getState() {
      return {
        resolved: Object.keys(registry).reduce(function (acc, cur) {
          return Object.assign(acc, _defineProperty({}, cur, true));
        }, {})
      };
    }
  };
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Project Configuration.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * NOTE: All file/folder paths should be relative to the project root. The
                                                                                                                                                                                                                                                                   * absolute paths should be resolved during runtime by our build internal/server.
                                                                                                                                                                                                                                                                   */

var _path = __webpack_require__(1);

var _path2 = _interopRequireDefault(_path);

var _appRootDir = __webpack_require__(36);

var _appRootDir2 = _interopRequireDefault(_appRootDir);

var _projectRootDir = __webpack_require__(13);

var _projectRootDir2 = _interopRequireDefault(_projectRootDir);

var _envVars = __webpack_require__(37);

var EnvVars = _interopRequireWildcard(_envVars);

var _customConfigs = __webpack_require__(43);

var _customConfigs2 = _interopRequireDefault(_customConfigs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configFactory = configs => (0, _customConfigs2.default)({
  projectRootDir: _projectRootDir2.default,

  // The configuration values that should be exposed to our client bundle.
  // This value gets passed through the /shared/utils/objects/filterWithRules
  // util to create a filter object that can be serialised and included
  // with our client bundle.
  clientConfigFilter: {
    // This is here as an example showing that you can expose variables
    // that were potentially provivded by the environment
    welcomeMessage: true,
    // We only need to expose the enabled flag of the service worker.
    serviceWorker: {
      enabled: true
    },
    // We need to expose all the polyfill.io settings.
    polyfillIO: true,
    // We need to expose all the htmlPage settings.
    htmlPage: true
  },

  // The host on which the server should run.
  host: EnvVars.string('HOST', '0.0.0.0'),
  // The port on which the server should run.
  port: EnvVars.number('PORT', 1337),

  // The port on which the client bundle development server should run.
  clientDevServerPort: EnvVars.number('CLIENT_DEV_PORT', 8331),

  // This is an example environment variable which is used within the react
  // application to demonstrate the usage of environment variables across
  // the client and server bundles.
  welcomeMessage: EnvVars.string('WELCOME_MSG', 'Hello world!'),

  // Disable server side rendering?
  disableSSR: true,

  // How long should we set the browser cache for the served assets?
  // Don't worry, we add hashes to the files, so if they change the new files
  // will be served to browsers.
  // We are using the "ms" format to set the length.
  // @see https://www.npmjs.com/package/ms
  browserCacheMaxAge: '365d',

  // We use the polyfill.io service which provides the polyfills that a
  // client needs, which is far more optimal than the large output
  // generated by babel-polyfill.
  // Note: we have to keep this seperate from our "htmlPage" configuration
  // as the polyfill needs to be loaded BEFORE any of our other javascript
  // gets parsed.
  polyfillIO: {
    enabled: true,
    url: '//cdn.polyfill.io/v2/polyfill.min.js',
    // Reference https://qa.polyfill.io/v2/docs/features for a full list
    // of features.
    features: [
    // The default list.
    'default', 'es6']
  },

  // Basic configuration for the HTML page that hosts our application.
  // We make use of react-helmet to consume the values below.
  // @see https://github.com/nfl/react-helmet
  htmlPage: {
    titleTemplate: 'BlueRain - %s',
    defaultTitle: 'BlueRain',
    description: 'A starter kit giving you the minimum requirements for a production ready universal react application.'
  },

  // Content Security Policy (CSP)
  // @see server/middleware/security for more info.
  cspExtensions: {
    childSrc: [],
    connectSrc: [],
    defaultSrc: [],
    fontSrc: ['fonts.googleapis.com/css', 'fonts.gstatic.com'],
    imgSrc: ['placeimg.com'],
    mediaSrc: [],
    manifestSrc: [],
    objectSrc: [],
    scriptSrc: [
    // Allow scripts from cdn.polyfill.io so that we can import the
    // polyfill.
    'cdn.polyfill.io'],
    styleSrc: ['cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css', 'fonts.googleapis.com/css']
  },

  // Path to the public assets that will be served off the root of the
  // HTTP server.
  publicAssetsPath: './public',

  // Where does our build output live?
  buildOutputPath: './src/build',

  // Location of bluerain directory in the project
  bluerainDir: _path2.default.resolve(_appRootDir2.default.get(), 'bluerain'),

  // Name of bluerain file with boot options object
  bluerainJsFile: 'bluerain.js', // deprecated
  bootConfigFile: 'boot.js',

  // Do you want to included source maps for optimised builds of the client
  // bundle?
  includeSourceMapsForOptimisedClientBundle: false,

  // These extensions are tried when resolving src files for our bundles..
  bundleSrcTypes: ['js', 'jsx', 'json'],

  // What should we name the json output file that webpack generates
  // containing details of all output files for a bundle?
  bundleAssetsFileName: 'assets.json',

  // node_modules are not included in any bundles that target "node" as a
  // runtime (e.g.. the server bundle) as including them often breaks builds
  // due to thinks like require statements containing expressions..
  // However. some of the modules contain files need to be processed by
  // one of our Webpack loaders (e.g. CSS). Add any file types to the list
  // below to allow them to be processed by Webpack.
  nodeExternalsFileTypeWhitelist: [/\.(eot|woff|woff2|ttf|otf)$/, /\.(svg|png|jpg|jpeg|gif|ico)$/, /\.(mp4|mp3|ogg|swf|webp)$/, /\.(css|scss|sass|sss|less)$/],

  // Note: you can only have a single service worker instance.  Our service
  // worker implementation is bound to the "client" and "server" bundles.
  // It includes the "client" bundle assets, as well as the public folder assets,
  // and it is served by the "server" bundle.
  serviceWorker: {
    // Enabled?
    enabled: true,
    // Service worker name
    fileName: 'sw.js',
    // Paths to the public assets which should be included within our
    // service worker. Relative to our public folder path, and accepts glob
    // syntax.
    includePublicAssets: [
    // NOTE: This will include ALL of our public folder assets.  We do
    // a glob pull of them and then map them to /foo paths as all the
    // public folder assets get served off the root of our application.
    // You may or may not want to be including these assets.  Feel free
    // to remove this or instead include only a very specific set of
    // assets.
    './**/*'],
    // Offline page file name.
    offlinePageFileName: 'offline.html'
  },

  bundles: {
    client: {
      // Src entry file.
      srcEntryFile: './src/client/index.js',

      // Src paths.
      srcPaths: ['./src/client', './src/shared',
      // The service worker offline page generation needs access to the
      // config folder.  Don't worry we have guards within the config files
      // to ensure they never get included in a client bundle.
      './src/config'],

      // Where does the client bundle output live?
      outputPath: _path2.default.resolve(_appRootDir2.default.get(), 'build', 'client'),

      // What is the public http path at which we must serve the bundle from?
      webPath: '/src/client/',

      // Configuration settings for the development vendor DLL.  This will be created
      // by our development server and provides an improved dev experience
      // by decreasing the number of modules that webpack needs to process
      // for every rebuild of our client bundle.  It by default uses the
      // dependencies configured in package.json however you can customise
      // which of these dependencies are excluded, whilst also being able to
      // specify the inclusion of additional modules below.
      devVendorDLL: {
        // Enabled?
        enabled: true,

        // Specify any dependencies that you would like to include in the
        // Vendor DLL.
        //
        // NOTE: It is also possible that some modules require specific
        // webpack loaders in order to be processed (e.g. CSS/SASS etc).
        // For these cases you don't want to include them in the Vendor DLL.
        include: ['react-async-component', 'react', 'react-dom', 'react-helmet', 'react-router-dom'],

        // The name of the vendor DLL.
        name: '__dev_vendor_dll__'
      }
    },

    server: {
      // Src entry file.
      srcEntryFile: './src/server/index.js',

      // Src paths.
      srcPaths: ['./src/server', './src/shared', './src/config'],

      // Where does the server bundle output live?
      outputPath: _path2.default.resolve(_appRootDir2.default.get(), 'build', 'server')
    }
  },

  additionalNodeBundles: {
    // NOTE: The webpack configuration and build scripts have been built so
    // that you can add arbitrary additional node bundle configurations here.
    //
    // A common requirement for larger projects is to add additional "node"
    // target bundles (e.g an APi server endpoint). Therefore flexibility has been
    // baked into our webpack config factory to allow for this.
    //
    // Simply define additional configurations similar to below.  The development
    // server will manage starting them up for you.  The only requirement is that
    // within the entry for each bundle you create and return the "express"
    // listener.
    /*
      apiServer: {
        srcEntryFile: './api/index.js',
        srcPaths: [
          './api',
          './shared',
          './config',
        ],
        outputPath: './build/api',
      }
      */
  },

  // These plugin definitions provide you with advanced hooks into customising
  // the project without having to reach into the internals of the tools.
  //
  // We have decided to create this plugin approach so that you can come to
  // a centralised configuration folder to do most of your application
  // configuration adjustments.  Additionally it helps to make merging
  // from the origin starter kit a bit easier.
  plugins: _extends({
    // This plugin allows you to provide final adjustments your babel
    // configurations for each bundle before they get processed.
    //
    // This function will be called once for each for your bundles.  It will be
    // provided the current webpack config, as well as the buildOptions which
    // detail which bundle and mode is being targetted for the current function run.
    babelConfig: (babelConfig, buildOptions) => {
      // eslint-disable-next-line no-unused-vars
      const { target, mode } = buildOptions;

      // Example
      /*
        if (target === 'server' && mode === 'development') {
          babelConfig.presets.push('foo');
        }
      */

      return babelConfig;
    },

    // This plugin allows you to provide final adjustments your webpack
    // configurations for each bundle before they get processed.
    //
    // I would recommend looking at the "webpack-merge" module to help you with
    // merging modifications to each config.
    //
    // This function will be called once for each for your bundles.  It will be
    // provided the current webpack config, as well as the buildOptions which
    // detail which bundle and mode is being targetted for the current function run.
    webpackConfig: (webpackConfig, buildOptions) => {
      // eslint-disable-next-line no-unused-vars
      const { target, mode } = buildOptions;

      // Example:
      /*
        if (target === 'server' && mode === 'development') {
          webpackConfig.plugins.push(new MyCoolWebpackPlugin());
        }
        */

      // Debugging/Logging Example:
      /*
        if (target === 'server') {
          console.log(JSON.stringify(webpackConfig, null, 4));
        }
        */

      return webpackConfig;
    }

  }, configs)
});

// This protects us from accidentally including this configuration in our
// client bundle. That would be a big NO NO to do. :)
if (false) {
  throw new Error("You shouldn't be importing the `<projectroot>/config/values.js` directly into code that will be included in your 'client' bundle as the configuration object will be sent to user's browsers. This could be a security risk! Instead, use the `config` helper function located at `<projectroot>/config/index.js`.");
}

exports.default = configFactory;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = __webpack_require__(1);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _path2.default.resolve(__dirname, '..', '..');
/* WEBPACK VAR INJECTION */}.call(exports, "../../blueeast/bluerain-cli/packages/web/src/config"))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ifElse;
const execIfFunc = x => typeof x === 'function' ? x() : x;

/**
 * This is a higher order function that accepts a boolean condition and will
 * return a function allowing you to provide if/else values that should be
 * resolved based on the boolean condition.
 *
 * @param  {Boolean|() => Boolean} condition:
 *   The condition to test against. This can be a function for lazy resolution.
 *
 * @return {(X|() => X, Y|() => Y) => X|Y}
 *   A function where the first paramater is the "if" and the second paramater
 *   is the "else".  Each of these allows lazy resolving by providing a function.
 *
 * @example
 *   const ifDev = ifElse(process.env.NODE_ENV === 'development');
 *   ifDev('foo', () => 'lazy resolved');  // => 'foo'
 */
function ifElse(condition) {
  return (then, or) => execIfFunc(condition) ? execIfFunc(then) : execIfFunc(or);
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeNil;
/**
 * Filters out all null/undefined items from the given array.
 *
 * @param  {Array} as - the target array
 *
 * @return {Array} The filtered array.
 */
function removeNil(as) {
  return as.filter(a => a != null);
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * The base implementation of `_.reduce` and `_.reduceRight`, without support
 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initAccum Specify using the first or last element of
 *  `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
  eachFunc(collection, function(value, index, collection) {
    accumulator = initAccum
      ? (initAccum = false, value)
      : iteratee(accumulator, value, index, collection);
  });
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.reduce`, `_.reduceRight`, and `_.transform`.
 *
 * The guarded methods are:
 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
 * and `sortBy`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see _.reduceRight
 * @example
 *
 * _.reduce([1, 2], function(sum, n) {
 *   return sum + n;
 * }, 0);
 * // => 3
 *
 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 *   return result;
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
 */
function reduce(collection, iteratee, accumulator) {
  var func = isArray(collection) ? arrayReduce : baseReduce,
      initAccum = arguments.length < 3;

  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = reduce;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)(module)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(8);

var _express2 = _interopRequireDefault(_express);

var _compression = __webpack_require__(21);

var _compression2 = _interopRequireDefault(_compression);

var _fs = __webpack_require__(6);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(1);

var _reactApplication = __webpack_require__(22);

var _reactApplication2 = _interopRequireDefault(_reactApplication);

var _security = __webpack_require__(53);

var _security2 = _interopRequireDefault(_security);

var _clientBundle = __webpack_require__(93);

var _clientBundle2 = _interopRequireDefault(_clientBundle);

var _serviceWorker = __webpack_require__(94);

var _serviceWorker2 = _interopRequireDefault(_serviceWorker);

var _offlinePage = __webpack_require__(95);

var _offlinePage2 = _interopRequireDefault(_offlinePage);

var _errorHandlers = __webpack_require__(96);

var _errorHandlers2 = _interopRequireDefault(_errorHandlers);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _utils = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create our express based server.
/* eslint-disable no-console */

const app = (0, _express2.default)();

// Don't expose any software information to potential hackers.
app.disable('x-powered-by');

// Security middlewares.
app.use(..._security2.default);

// Gzip compress the responses.
app.use((0, _compression2.default)());

// Register our service worker generated by our webpack config.
// We do not want the service worker registered for development builds, and
// additionally only want it registered if the config allows.
if (false) {
  app.get(`/${(0, _config2.default)('serviceWorker.fileName')}`, _serviceWorker2.default);
  app.get(`${(0, _config2.default)('bundles.client.webPath')}${(0, _config2.default)('serviceWorker.offlinePageFileName')}`, _offlinePage2.default);
}

// Configure serving of our client bundle.
app.use((0, _config2.default)('bundles.client.webPath'), _clientBundle2.default);

// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
let publicPath = (0, _path.resolve)((0, _config2.default)('projectRootDir'), (0, _config2.default)('publicAssetsPath'));
const customPublicPath = (0, _path.resolve)(process.env.PWD, 'public');

if (!_fs2.default.existsSync(customPublicPath)) {
  (0, _utils.log)({
    title: 'Public Folder',
    level: 'info',
    message: 'Using default public folder.'
  });
} else {
  (0, _utils.log)({
    title: 'Public Folder',
    level: 'info',
    message: 'Using custom public folder.'
  });
  publicPath = customPublicPath;
}

app.use(_express2.default.static(publicPath));

// The React application middleware.
app.get('*', (request, response) => {
  (0, _utils.log)({
    title: 'Request',
    level: 'special',
    message: `Received for "${request.url}"`
  });

  return (0, _reactApplication2.default)(request, response);
});

// Error Handler middlewares.
app.use(..._errorHandlers2.default);

// Create an http listener for our express app.
const listener = app.listen((0, _config2.default)('port'), () => (0, _utils.log)({
  title: 'server',
  level: 'special',
  message: `✓

      ${(0, _config2.default)('welcomeMessage')}

      ${(0, _config2.default)('htmlPage.defaultTitle')} is ready!

      with

      Service Workers: ${(0, _config2.default)('serviceWorker.enabled')}
      Polyfills: ${(0, _config2.default)('polyfillIO.enabled')} (${(0, _config2.default)('polyfillIO.features').join(', ')})

      Server is now listening on Port ${(0, _config2.default)('port')}
      You can access it in the browser at http://${(0, _config2.default)('host')}:${(0, _config2.default)('port')}
      Press Ctrl-C to stop.



    `
}));

// We export the listener as it will be handy for our development hot reloader,
// or for exposing a general extension layer for application customisations.
exports.default = listener;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/home/nasir/blueeast/bluerain-cli/packages/web/src/server/middleware/reactApplication/index.js';
// import MainApp from '../../../shared/components/MainApp';
// Temp

exports.default = reactApplicationMiddleware;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(9);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _server = __webpack_require__(29);

var _reactRouterDom = __webpack_require__(30);

var _reactAsyncComponent = __webpack_require__(31);

var _reactAsyncBootstrapper = __webpack_require__(34);

var _reactAsyncBootstrapper2 = _interopRequireDefault(_reactAsyncBootstrapper);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _ServerHTML = __webpack_require__(45);

var _ServerHTML2 = _interopRequireDefault(_ServerHTML);

var _DemoApp = __webpack_require__(50);

var _DemoApp2 = _interopRequireDefault(_DemoApp);

var _utils = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * React application middleware, supports server side rendering.
 */
function reactApplicationMiddleware(request, response) {
  // Ensure a nonce has been provided to us.
  // See the server/middleware/security.js for more info.
  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }
  const nonce = response.locals.nonce;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if ((0, _config2.default)('disableSSR')) {
    if (true) {
      // eslint-disable-next-line no-console
      (0, _utils.log)({
        title: 'Server',
        level: 'info',
        message: `Handling react route without SSR: ${request.url}`
      });
    }
    // SSR is disabled so we will return an "empty" html page and
    // rely on the client to initialize and render the react application.
    const html = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_ServerHTML2.default, { nonce: nonce, __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      }
    }));
    response.status(200).send(`<!DOCTYPE html>${html}`);
    return;
  }

  // Create a context for our AsyncComponentProvider.
  const asyncComponentsContext = (0, _reactAsyncComponent.createAsyncContext)();

  // Create a context for <StaticRouter>, which will allow us to
  // query for the results of the render.
  const reactRouterContext = {};

  // Declare our React application.
  const app = _react2.default.createElement(
    _reactAsyncComponent.AsyncComponentProvider,
    { asyncContext: asyncComponentsContext, __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      }
    },
    _react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: request.url, context: reactRouterContext, __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      },
      _react2.default.createElement(_DemoApp2.default, {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        }
      })
    )
  );

  // Pass our app into the react-async-component helper so that any async
  // components are resolved for the render.
  (0, _reactAsyncBootstrapper2.default)(app).then(() => {
    const appString = (0, _server.renderToString)(app);

    // Generate the html response.
    const html = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_ServerHTML2.default, {
      reactAppString: appString,
      nonce: nonce,
      helmet: _reactHelmet2.default.rewind(),
      asyncComponentsState: asyncComponentsContext.getState(),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      }
    }));

    // Check if the router context contains a redirect, if so we need to set
    // the specific status and redirect header and end the response.
    if (reactRouterContext.url) {
      response.status(302).setHeader('Location', reactRouterContext.url);
      response.end();
      return;
    }

    response.status(reactRouterContext.missed ? // If the renderResult contains a "missed" match then we set a 404 code.
    // Our App component will handle the rendering of an Error404 view.
    404 : // Otherwise everything is all good and we send a 200 OK status.
    200).send(`<!DOCTYPE html>${html}`);
  });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = __webpack_require__(0);
var React__default = _interopDefault(React);
var ExecutionEnvironment = _interopDefault(__webpack_require__(24));
var shallowEqual = _interopDefault(__webpack_require__(25));

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }
  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }
  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state = void 0;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = function (_Component) {
      _inherits(SideEffect, _Component);

      function SideEffect() {
        _classCallCheck(this, SideEffect);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      // Try to use displayName of wrapped component
      SideEffect.peek = function peek() {
        return state;
      };

      // Expose canUseDOM so tests can monkeypatch it


      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      SideEffect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
      };

      SideEffect.prototype.componentWillMount = function componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      SideEffect.prototype.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      SideEffect.prototype.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      SideEffect.prototype.render = function render() {
        return React__default.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    }(React.Component);

    SideEffect.displayName = 'SideEffect(' + getDisplayName(WrappedComponent) + ')';
    SideEffect.canUseDOM = ExecutionEnvironment.canUseDOM;


    return SideEffect;
  };
}

module.exports = withSideEffect;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("exenv");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("shallowequal");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("deep-equal");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.warn = exports.requestAnimationFrame = exports.reducePropsToState = exports.mapStateOnServer = exports.handleClientStateChange = exports.convertReactPropstoHtmlAttributes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _objectAssign = __webpack_require__(28);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _HelmetConstants = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (encode === false) {
        return String(str);
    }

    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, _HelmetConstants.TAG_NAMES.TITLE);
    var innermostTemplate = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.TITLE_TEMPLATE);

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFAULT_TITLE);

    return innermostTitle || innermostDefaultTitle || undefined;
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[_HelmetConstants.TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        if (Array.isArray(props[tagName])) {
            return true;
        }
        if (typeof props[tagName] !== "undefined") {
            warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
        }
        return false;
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props.hasOwnProperty(property)) {
            return props[property];
        }
    }

    return null;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        bodyAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.BODY, propsList),
        defer: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFER),
        encode: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
        htmlAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.HTML, propsList),
        linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
        noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        onChangeClientState: getOnChangeClientState(propsList),
        scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.TITLE, propsList)
    };
};

var rafPolyfill = function () {
    var clock = Date.now();

    return function (callback) {
        var currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(function () {
                rafPolyfill(callback);
            }, 0);
        }
    };
}();

var cafPolyfill = function cafPolyfill(id) {
    return clearTimeout(id);
};

var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;

var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;

var warn = function warn(msg) {
    return console && typeof console.warn === "function" && console.warn(msg);
};

var _helmetCallback = null;

var handleClientStateChange = function handleClientStateChange(newState) {
    if (_helmetCallback) {
        cancelAnimationFrame(_helmetCallback);
    }

    if (newState.defer) {
        _helmetCallback = requestAnimationFrame(function () {
            commitTagChanges(newState, function () {
                _helmetCallback = null;
            });
        });
    } else {
        commitTagChanges(newState);
        _helmetCallback = null;
    }
};

var commitTagChanges = function commitTagChanges(newState, cb) {
    var baseTag = newState.baseTag,
        bodyAttributes = newState.bodyAttributes,
        htmlAttributes = newState.htmlAttributes,
        linkTags = newState.linkTags,
        metaTags = newState.metaTags,
        noscriptTags = newState.noscriptTags,
        onChangeClientState = newState.onChangeClientState,
        scriptTags = newState.scriptTags,
        styleTags = newState.styleTags,
        title = newState.title,
        titleAttributes = newState.titleAttributes;

    updateAttributes(_HelmetConstants.TAG_NAMES.BODY, bodyAttributes);
    updateAttributes(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes);

    updateTitle(title, titleAttributes);

    var tagUpdates = {
        baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
        noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };

    var addedTags = {};
    var removedTags = {};

    Object.keys(tagUpdates).forEach(function (tagType) {
        var _tagUpdates$tagType = tagUpdates[tagType],
            newTags = _tagUpdates$tagType.newTags,
            oldTags = _tagUpdates$tagType.oldTags;


        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    cb && cb();

    onChangeClientState(newState, addedTags, removedTags);
};

var flattenArray = function flattenArray(possibleArray) {
    return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};

var updateTitle = function updateTitle(title, attributes) {
    if (typeof title !== "undefined" && document.title !== title) {
        document.title = flattenArray(title);
    }

    updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var elementTag = document.getElementsByTagName(tagName)[0];

    if (!elementTag) {
        return;
    }

    var helmetAttributeString = elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";

        if (elementTag.getAttribute(attribute) !== value) {
            elementTag.setAttribute(attribute, value);
        }

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        elementTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        elementTag.removeAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
    } else if (elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
        elementTag.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, attributeKeys.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector(_HelmetConstants.TAG_NAMES.HEAD);
    var tagNodes = headElement.querySelectorAll(type + "[" + _HelmetConstants.HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML) {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
    var attributeString = generateElementAttributesAsString(attributes);
    var flattenedTitle = flattenArray(title);
    return attributeString ? "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT);
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = _HelmetConstants.SELF_CLOSING_TAGS.indexOf(type) === -1;

        return str + "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
    var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(attributes).reduce(function (obj, key) {
        obj[_HelmetConstants.REACT_TAG_MAP[key] || key] = attributes[key];
        return obj;
    }, initProps);
};

var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
    var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(props).reduce(function (obj, key) {
        obj[_HelmetConstants.HTML_TAG_MAP[key] || key] = props[key];
        return obj;
    }, initAttributes);
};

var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
    var _initProps;

    // assigning into an array to define toString function on it
    var initProps = (_initProps = {
        key: title
    }, _initProps[_HelmetConstants.HELMET_ATTRIBUTE] = true, _initProps);
    var props = convertElementAttributestoReactProps(attributes, initProps);

    return [_react2.default.createElement(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var _mappedTag;

        var mappedTag = (_mappedTag = {
            key: i
        }, _mappedTag[_HelmetConstants.HELMET_ATTRIBUTE] = true, _mappedTag);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = _HelmetConstants.REACT_TAG_MAP[attribute] || attribute;

            if (mappedAttribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || mappedAttribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return _react2.default.createElement(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
    switch (type) {
        case _HelmetConstants.TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
                }
            };
        case _HelmetConstants.ATTRIBUTE_NAMES.BODY:
        case _HelmetConstants.ATTRIBUTE_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return convertElementAttributestoReactProps(tags);
                },
                toString: function toString() {
                    return generateElementAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsReactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags, encode);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var baseTag = _ref.baseTag,
        bodyAttributes = _ref.bodyAttributes,
        encode = _ref.encode,
        htmlAttributes = _ref.htmlAttributes,
        linkTags = _ref.linkTags,
        metaTags = _ref.metaTags,
        noscriptTags = _ref.noscriptTags,
        scriptTags = _ref.scriptTags,
        styleTags = _ref.styleTags,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? "" : _ref$title,
        titleAttributes = _ref.titleAttributes;
    return {
        base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag, encode),
        bodyAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
        htmlAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
        link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags, encode),
        meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags, encode),
        noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags, encode),
        script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags, encode),
        style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags, encode),
        title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }, encode)
    };
};

exports.convertReactPropstoHtmlAttributes = convertReactPropstoHtmlAttributes;
exports.handleClientStateChange = handleClientStateChange;
exports.mapStateOnServer = mapStateOnServer;
exports.reducePropsToState = reducePropsToState;
exports.requestAnimationFrame = requestAnimationFrame;
exports.warn = warn;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("object-assign");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncComponent = exports.createAsyncContext = exports.AsyncComponentProvider = undefined;

var _AsyncComponentProvider = __webpack_require__(32);

var _AsyncComponentProvider2 = _interopRequireDefault(_AsyncComponentProvider);

var _createAsyncContext = __webpack_require__(11);

var _createAsyncContext2 = _interopRequireDefault(_createAsyncContext);

var _asyncComponent = __webpack_require__(33);

var _asyncComponent2 = _interopRequireDefault(_asyncComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AsyncComponentProvider = _AsyncComponentProvider2.default;
exports.createAsyncContext = _createAsyncContext2.default;
exports.asyncComponent = _asyncComponent2.default;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createAsyncContext = __webpack_require__(11);

var _createAsyncContext2 = _interopRequireDefault(_createAsyncContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncComponentProvider = function (_React$Component) {
  _inherits(AsyncComponentProvider, _React$Component);

  function AsyncComponentProvider() {
    _classCallCheck(this, AsyncComponentProvider);

    return _possibleConstructorReturn(this, (AsyncComponentProvider.__proto__ || Object.getPrototypeOf(AsyncComponentProvider)).apply(this, arguments));
  }

  _createClass(AsyncComponentProvider, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.asyncContext = this.props.asyncContext || (0, _createAsyncContext2.default)();
      this.rehydrateState = this.props.rehydrateState;
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return {
        asyncComponents: {
          getNextId: this.asyncContext.getNextId,
          resolved: this.asyncContext.resolved,
          shouldRehydrate: function shouldRehydrate(id) {
            var resolved = _this2.rehydrateState.resolved[id];
            delete _this2.rehydrateState.resolved[id];
            return resolved;
          }
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);

  return AsyncComponentProvider;
}(_react2.default.Component);

AsyncComponentProvider.propTypes = {
  children: _propTypes2.default.node.isRequired,
  asyncContext: _propTypes2.default.shape({
    getNextId: _propTypes2.default.func.isRequired,
    resolved: _propTypes2.default.func.isRequired,
    getState: _propTypes2.default.func.isRequired
  }),
  rehydrateState: _propTypes2.default.shape({
    resolved: _propTypes2.default.object
  })
};

AsyncComponentProvider.defaultProps = {
  asyncContext: undefined,
  rehydrateState: {
    resolved: {}
  }
};

AsyncComponentProvider.childContextTypes = {
  asyncComponents: _propTypes2.default.shape({
    getNextId: _propTypes2.default.func.isRequired,
    resolved: _propTypes2.default.func.isRequired,
    shouldRehydrate: _propTypes2.default.func.isRequired
  }).isRequired
};

exports.default = AsyncComponentProvider;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var validSSRModes = ['resolve', 'defer', 'boundary'];

function asyncComponent(config) {
  var name = config.name,
      resolve = config.resolve,
      _config$autoResolveES = config.autoResolveES2015Default,
      autoResolveES2015Default = _config$autoResolveES === undefined ? true : _config$autoResolveES,
      _config$serverMode = config.serverMode,
      serverMode = _config$serverMode === undefined ? 'resolve' : _config$serverMode,
      LoadingComponent = config.LoadingComponent,
      ErrorComponent = config.ErrorComponent;


  if (validSSRModes.indexOf(serverMode) === -1) {
    throw new Error('Invalid serverMode provided to asyncComponent');
  }

  var env = ['node', 'browser'].indexOf(config.env) > -1 ? config.env : typeof window === 'undefined' ? 'node' : 'browser';

  var sharedState = {
    // A unique id we will assign to our async component which is especially
    // useful when rehydrating server side rendered async components.
    id: null,
    // This will be use to hold the resolved module allowing sharing across
    // instances.
    // NOTE: When using React Hot Loader this reference will become null.
    module: null,
    // If an error occurred during a resolution it will be stored here.
    error: null,
    // Allows us to share the resolver promise across instances.
    resolver: null

    // Takes the given module and if it has a ".default" the ".default" will
    // be returned. i.e. handy when you could be dealing with es6 imports.
  };var es6Resolve = function es6Resolve(x) {
    return autoResolveES2015Default && x != null && (typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') && x.default ? x.default : x;
  };

  var getResolver = function getResolver() {
    if (sharedState.resolver == null) {
      try {
        // Wrap whatever the user returns in Promise.resolve to ensure a Promise
        // is always returned.
        var resolver = resolve();
        sharedState.resolver = Promise.resolve(resolver);
      } catch (err) {
        sharedState.resolver = Promise.reject(err);
      }
    }
    return sharedState.resolver;
  };

  var AsyncComponent = function (_React$Component) {
    _inherits(AsyncComponent, _React$Component);

    function AsyncComponent(props, context) {
      _classCallCheck(this, AsyncComponent);

      // We have to set the id in the constructor because a RHL seems
      // to recycle the module and therefore the id closure will be null.
      // We can't put it in componentWillMount as RHL hot swaps the new code
      // so the mount call will not happen (but the ctor does).
      var _this = _possibleConstructorReturn(this, (AsyncComponent.__proto__ || Object.getPrototypeOf(AsyncComponent)).call(this, props, context));

      if (_this.context.asyncComponents && !sharedState.id) {
        sharedState.id = _this.context.asyncComponents.getNextId();
      }
      return _this;
    }

    // @see react-async-bootstrapper


    _createClass(AsyncComponent, [{
      key: 'asyncBootstrap',
      value: function asyncBootstrap() {
        var _this2 = this;

        var _context = this.context,
            asyncComponents = _context.asyncComponents,
            asyncComponentsAncestor = _context.asyncComponentsAncestor;
        var shouldRehydrate = asyncComponents.shouldRehydrate;


        var doResolve = function doResolve() {
          return _this2.resolveModule().then(function (module) {
            return module !== undefined;
          });
        };

        if (env === 'browser') {
          return shouldRehydrate(sharedState.id) ? doResolve() : false;
        }

        // node
        var isChildOfBoundary = asyncComponentsAncestor && asyncComponentsAncestor.isBoundary;
        return serverMode === 'defer' || isChildOfBoundary ? false : doResolve();
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        if (!this.context.asyncComponents) {
          return undefined;
        }

        return {
          asyncComponentsAncestor: {
            isBoundary: serverMode === 'boundary'
          }
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.setState({
          module: sharedState.module
        });
        if (sharedState.error) {
          this.registerErrorState(sharedState.error);
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (!this.state.module) {
          this.resolveModule();
        }
      }
    }, {
      key: 'resolveModule',
      value: function resolveModule() {
        var _this3 = this;

        this.resolving = true;

        return getResolver().then(function (module) {
          if (_this3.unmounted) {
            return undefined;
          }
          if (_this3.context.asyncComponents) {
            _this3.context.asyncComponents.resolved(sharedState.id);
          }
          sharedState.module = module;
          if (env === 'browser') {
            _this3.setState({
              module: module
            });
          }
          _this3.resolving = false;
          return module;
        }).catch(function (error) {
          if (_this3.unmounted) {
            return undefined;
          }
          if (env === 'node' || env === 'browser' && !ErrorComponent) {
            // We will at least log the error so that user isn't completely
            // unaware of an error occurring.
            // eslint-disable-next-line no-console
            console.warn('Failed to resolve asyncComponent');
            // eslint-disable-next-line no-console
            console.warn(error);
          }
          sharedState.error = error;
          _this3.registerErrorState(error);
          _this3.resolving = false;
          return undefined;
        });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.unmounted = true;
      }
    }, {
      key: 'registerErrorState',
      value: function registerErrorState(error) {
        var _this4 = this;

        if (env === 'browser') {
          setTimeout(function () {
            if (!_this4.unmounted) {
              _this4.setState({
                error: error
              });
            }
          }, 16);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _state = this.state,
            module = _state.module,
            error = _state.error;

        // This is as workaround for React Hot Loader support.  When using
        // RHL the local component reference will be killed by any change
        // to the component, this will be our signal to know that we need to
        // re-resolve it.

        if (sharedState.module == null && !this.resolving && typeof window !== 'undefined') {
          this.resolveModule();
        }

        if (error) {
          return ErrorComponent ? _react2.default.createElement(ErrorComponent, _extends({}, this.props, { error: error })) : null;
        }

        var Component = es6Resolve(module);
        return Component ? _react2.default.createElement(Component, this.props) : LoadingComponent ? _react2.default.createElement(LoadingComponent, this.props) : null;
      }
    }]);

    return AsyncComponent;
  }(_react2.default.Component);

  AsyncComponent.displayName = name || 'AsyncComponent';

  AsyncComponent.contextTypes = {
    asyncComponentsAncestor: _propTypes2.default.shape({
      isBoundary: _propTypes2.default.bool
    }),
    asyncComponents: _propTypes2.default.shape({
      getNextId: _propTypes2.default.func.isRequired,
      resolved: _propTypes2.default.func.isRequired,
      shouldRehydrate: _propTypes2.default.func.isRequired
    })
  };

  AsyncComponent.childContextTypes = {
    asyncComponentsAncestor: _propTypes2.default.shape({
      isBoundary: _propTypes2.default.bool
    })
  };

  return AsyncComponent;
}

exports.default = asyncComponent;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = asyncBootstrapper;

var _reactTreeWalker = __webpack_require__(35);

var _reactTreeWalker2 = _interopRequireDefault(_reactTreeWalker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncBootstrapper(app, options) {
  var visitor = function visitor(element, instance) {
    if (instance && typeof instance.asyncBootstrap === 'function') {
      return instance.asyncBootstrap();
    }
    return true;
  };

  return (0, _reactTreeWalker2.default)(app, visitor, {}, options);
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPromise = undefined;
exports.default = reactTreeWalker;

var _react = __webpack_require__(0);

var defaultOptions = {
  componentWillUnmount: false

  // Lifted from https://github.com/sindresorhus/p-reduce
  // Thanks @sindresorhus!
}; /* eslint-disable no-console */

// Inspired by the awesome work done by the Apollo team.
// See https://github.com/apollostack/react-apollo/blob/master/src/server.ts
// This version has been adapted to be promise based.

// eslint-disable-next-line import/no-extraneous-dependencies
var pReduce = function pReduce(iterable, reducer, initVal) {
  return new Promise(function (resolve, reject) {
    var iterator = iterable[Symbol.iterator]();
    var i = 0;

    var next = function next(total) {
      var el = iterator.next();

      if (el.done) {
        resolve(total);
        return;
      }

      Promise.all([total, el.value]).then(function (value) {
        // eslint-disable-next-line no-plusplus
        next(reducer(value[0], value[1], i++));
      }).catch(reject);
    };

    next(initVal);
  });
};

// Lifted from https://github.com/sindresorhus/p-map-series
// Thanks @sindresorhus!
var pMapSeries = function pMapSeries(iterable, iterator) {
  var ret = [];

  return pReduce(iterable, function (a, b, i) {
    return Promise.resolve(iterator(b, i)).then(function (val) {
      ret.push(val);
    });
  }).then(function () {
    return ret;
  });
};

var ensureChild = function ensureChild(child) {
  return child && typeof child.render === 'function' ? ensureChild(child.render()) : child;
};

var isPromise = exports.isPromise = function isPromise(x) {
  return x != null && typeof x.then === 'function';
};

// Recurse an React Element tree, running visitor on each element.
// If visitor returns `false`, don't call the element's render function
// or recurse into its child elements
function reactTreeWalker(element, visitor, context) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultOptions;

  return new Promise(function (resolve) {
    var doVisit = function doVisit(getChildren, visitorResult, childContext) {
      var doTraverse = function doTraverse(shouldContinue) {
        if (!shouldContinue) {
          // We recieved a false, which indicates a desire to stop traversal.
          resolve();
        }

        var child = ensureChild(getChildren());
        var theChildContext = typeof childContext === 'function' ? childContext() : childContext;

        if (child == null) {
          // If no children then we can't traverse.  We've reached the leaf.
          resolve();
        } else if (_react.Children.count(child)) {
          // If its a react Children collection we need to breadth-first
          // traverse each of them.
          var mapper = function mapper(aChild) {
            return aChild ? reactTreeWalker(aChild, visitor, theChildContext, options) : undefined;
          };
          // pMapSeries allows us to do depth-first traversal. Thanks @sindresorhus!
          pMapSeries(_react.Children.map(child, function (cur) {
            return cur;
          }), mapper).then(resolve);
        } else {
          // Otherwise we pass the individual child to the next recursion.
          reactTreeWalker(child, visitor, theChildContext, options).then(resolve);
        }
      };

      if (visitorResult === false) {
        // Visitor returned false, indicating a desire to not traverse.
        resolve();
      } else if (isPromise(visitorResult)) {
        // We need to execute the result and pass it's result through to our
        // continuer.
        visitorResult.then(doTraverse).catch(function (e) {
          console.log('Error occurred in Promise based visitor result provided to react-tree-walker.');
          if (e) {
            console.log(e);
            if (e.stack) {
              console.log(e.stack);
            }
          }
        });
      } else {
        doTraverse(true);
      }
    };

    // Is this element a Component?
    if (typeof element.type === 'function') {
      var Component = element.type;
      var props = Object.assign({}, Component.defaultProps, element.props);

      // Is this a class component? (http://bit.ly/2j9Ifk3)
      var isReactClassComponent = Component.prototype && (Component.prototype.isReactComponent || Component.prototype.isPureReactComponent);

      if (isReactClassComponent) {
        // React class component

        var instance = new Component(props, context);

        // In case the user doesn't pass these to super in the constructor
        instance.props = instance.props || props;
        instance.context = instance.context || context;

        // Make the setState synchronous.
        instance.setState = function (newState) {
          if (typeof newState === 'function') {
            // eslint-disable-next-line no-param-reassign
            newState = newState(instance.state, instance.props, instance.context);
          }
          instance.state = Object.assign({}, instance.state, newState);
        };

        doVisit(function () {
          // Call componentWillMount if it exists.
          if (instance.componentWillMount) {
            instance.componentWillMount();
          }

          var children = instance.render();

          if (options.componentWillUnmount && instance.componentWillUnmount) {
            try {
              instance.componentWillUnmount();
            } catch (err) {
              // This is an experimental feature, we don't want to break
              // the bootstrapping process, but lets warn the user it
              // occurred.
              console.warn('Error calling componentWillUnmount whilst walking your react tree');
              console.warn(err);
            }
          }

          return children;
        }, visitor(element, instance, context), function () {
          return (
            // Ensure the child context is initialised if it is available. We will
            // need to pass it down the tree.
            instance.getChildContext ? Object.assign({}, context, instance.getChildContext()) : context
          );
        });
      } else {
        // Stateless Functional Component
        doVisit(function () {
          return Component(props, context);
        }, visitor(element, null, context), context);
      }
    } else {
      // This must be a basic element, such as a string or dom node.
      doVisit(function () {
        return element.props && element.props.children ? element.props.children : undefined;
      }, visitor(element, null, context), context);
    }
  }).catch(function (err) {
    // We don't want errors to be swallowed!
    console.error('Error walking your react tree');
    console.error(err);
  });
}

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("app-root-dir");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.string = string;
exports.number = number;
exports.bool = bool;

var _dotenv = __webpack_require__(38);

var _dotenv2 = _interopRequireDefault(_dotenv);

var _fs = __webpack_require__(6);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(1);

var _path2 = _interopRequireDefault(_path);

var _ifElse = __webpack_require__(14);

var _ifElse2 = _interopRequireDefault(_ifElse);

var _removeNil = __webpack_require__(15);

var _removeNil2 = _interopRequireDefault(_removeNil);

var _projectRootDir = __webpack_require__(13);

var _projectRootDir2 = _interopRequireDefault(_projectRootDir);

var _utils = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// PRIVATES

function registerEnvFile() {
  const DEPLOYMENT = process.env.DEPLOYMENT;
  const envFile = '.env';

  // This is the order in which we will try to resolve an environment configuration
  // file.
  const envFileResolutionOrder = (0, _removeNil2.default)([
  // Is there an environment config file at the app root?
  // This always takes preference.
  // e.g. /projects/react-universally/.env
  _path2.default.resolve(_projectRootDir2.default, envFile),
  // Is there an environment config file at the app root for our target
  // environment name?
  // e.g. /projects/react-universally/.env.staging
  (0, _ifElse2.default)(DEPLOYMENT)(_path2.default.resolve(_projectRootDir2.default, `${envFile}.${DEPLOYMENT}`))]);

  // Find the first env file path match.
  const envFilePath = envFileResolutionOrder.find(filePath => _fs2.default.existsSync(filePath));

  // If we found an env file match the register it.
  if (envFilePath) {
    // eslint-disable-next-line no-console
    (0, _utils.log)({
      title: 'server',
      level: 'special',
      message: `Registering environment variables from: ${envFilePath}`
    });
    _dotenv2.default.config({ path: envFilePath });
  }
}

// Ensure that we first register any environment variables from an existing
// env file.
/**
 * Helper for resolving environment specific configuration files.
 *
 * It resolves .env files that are supported by the `dotenv` library.
 *
 * Please read the application configuration docs for more info.
 */

registerEnvFile();

// EXPORTED HELPERS

/**
 * Gets a string environment variable by the given name.
 *
 * @param  {String} name - The name of the environment variable.
 * @param  {String} defaultVal - The default value to use.
 *
 * @return {String} The value.
 */
function string(name, defaultVal) {
  return process.env[name] || defaultVal;
}

/**
 * Gets a number environment variable by the given name.
 *
 * @param  {String} name - The name of the environment variable.
 * @param  {number} defaultVal - The default value to use.
 *
 * @return {number} The value.
 */
function number(name, defaultVal) {
  return process.env[name] ? parseInt(process.env[name], 10) : defaultVal;
}

function bool(name, defaultVal) {
  return process.env[name] ? process.env[name] === 'true' || process.env[name] === '1' : defaultVal;
}

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("happypack");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("node-notifier");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("colors/safe");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = customConfigs;

var _fs = __webpack_require__(6);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(1);

var _path2 = _interopRequireDefault(_path);

var _deepmerge = __webpack_require__(44);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _utils = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customConfigs(_config) {

  // So incoming configs are not mutated
  const config = _extends({}, _config);

  // Dynamically requiring a module for both node and webpack. 
  const requireFunc =  true ? require : require;
  const customConfigPath = _path2.default.resolve(config.bluerainDir, 'config.js');

  if (!_fs2.default.existsSync(customConfigPath)) {
    (0, _utils.log)({
      title: 'Configs',
      level: 'info',
      message: 'Using default configurations.'
    });
    return config;
  }

  const customConfig = requireFunc(customConfigPath).default; // eslint-disable-line

  if (typeof customConfig === 'function') {
    (0, _utils.log)({
      title: 'Configs',
      level: 'info',
      message: 'Loading custom configurations (full-control mode).'
    });
    return customConfig(config);
  }

  (0, _utils.log)({
    title: 'Configs',
    level: 'info',
    message: 'Loading custom configurations (extending mode).'
  });

  return (0, _deepmerge2.default)(config, customConfig);
}

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("deepmerge");

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/home/nasir/blueeast/bluerain-cli/packages/web/src/server/middleware/reactApplication/ServerHTML.js'; /**
                                                                                                                           * This module is responsible for generating the HTML page response for
                                                                                                                           * the react application middleware.
                                                                                                                           */

/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _serializeJavascript = __webpack_require__(16);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _ifElse = __webpack_require__(14);

var _ifElse2 = _interopRequireDefault(_ifElse);

var _removeNil = __webpack_require__(15);

var _removeNil2 = _interopRequireDefault(_removeNil);

var _getClientBundleEntryAssets = __webpack_require__(46);

var _getClientBundleEntryAssets2 = _interopRequireDefault(_getClientBundleEntryAssets);

var _ClientConfig = __webpack_require__(47);

var _ClientConfig2 = _interopRequireDefault(_ClientConfig);

var _HTML = __webpack_require__(49);

var _HTML2 = _interopRequireDefault(_HTML);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// PRIVATES

function KeyedComponent({ children }) {
  return _react.Children.only(children);
}

// Resolve the assets (js/css) for the client bundle's entry chunk.
const clientEntryAssets = (0, _getClientBundleEntryAssets2.default)();

function stylesheetTag(stylesheetFilePath) {
  return _react2.default.createElement('link', { href: stylesheetFilePath, media: 'screen, projection', rel: 'stylesheet', type: 'text/css', __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  });
}

function scriptTag(jsFilePath) {
  return _react2.default.createElement('script', { type: 'text/javascript', src: jsFilePath, __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    }
  });
}

// COMPONENT

function ServerHTML(props) {
  const { asyncComponentsState, helmet, nonce, reactAppString } = props;

  // Creates an inline script definition that is protected by the nonce.
  const inlineScript = body => _react2.default.createElement('script', { nonce: nonce, type: 'text/javascript', dangerouslySetInnerHTML: { __html: body }, __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    }
  });

  const headerElements = (0, _removeNil2.default)([...(0, _ifElse2.default)(helmet)(() => helmet.meta.toComponent(), []), ...(0, _ifElse2.default)(helmet)(() => helmet.title.toComponent(), []), ...(0, _ifElse2.default)(helmet)(() => helmet.base.toComponent(), []), ...(0, _ifElse2.default)(helmet)(() => helmet.link.toComponent(), []), (0, _ifElse2.default)(clientEntryAssets && clientEntryAssets.css)(() => stylesheetTag(clientEntryAssets.css)), ...(0, _ifElse2.default)(helmet)(() => helmet.style.toComponent(), [])]);

  const bodyElements = (0, _removeNil2.default)([
  // Binds the client configuration object to the window object so
  // that we can safely expose some configuration values to the
  // client bundle that gets executed in the browser.
  _react2.default.createElement(_ClientConfig2.default, { nonce: nonce, __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    }
  }),
  // Bind our async components state so the client knows which ones
  // to initialise so that the checksum matches the server response.
  // @see https://github.com/ctrlplusb/react-async-component
  (0, _ifElse2.default)(asyncComponentsState)(() => inlineScript(`window.__ASYNC_COMPONENTS_REHYDRATE_STATE__=${(0, _serializeJavascript2.default)(asyncComponentsState)};`)),
  // Enable the polyfill io script?
  // This can't be configured within a react-helmet component as we
  // may need the polyfill's before our client JS gets parsed.
  (0, _ifElse2.default)((0, _config2.default)('polyfillIO.enabled'))(() => scriptTag(`${(0, _config2.default)('polyfillIO.url')}?features=${(0, _config2.default)('polyfillIO.features').join(',')}`)),
  // When we are in development mode our development server will
  // generate a vendor DLL in order to dramatically reduce our
  // compilation times.  Therefore we need to inject the path to the
  // vendor dll bundle below.
  (0, _ifElse2.default)("true" === 'true' && (0, _config2.default)('bundles.client.devVendorDLL.enabled'))(() => scriptTag(`${(0, _config2.default)('bundles.client.webPath')}${(0, _config2.default)('bundles.client.devVendorDLL.name')}.js?t=${Date.now()}`)), (0, _ifElse2.default)(clientEntryAssets && clientEntryAssets.js)(() => scriptTag(clientEntryAssets.js)), ...(0, _ifElse2.default)(helmet)(() => helmet.script.toComponent(), [])]);

  return _react2.default.createElement(_HTML2.default, {
    htmlAttributes: (0, _ifElse2.default)(helmet)(() => helmet.htmlAttributes.toComponent(), null),
    headerElements: headerElements.map((x, idx) => _react2.default.createElement(
      KeyedComponent,
      { key: idx, __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        }
      },
      x
    )),
    bodyElements: bodyElements.map((x, idx) => _react2.default.createElement(
      KeyedComponent,
      { key: idx, __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        }
      },
      x
    )),
    appBodyString: reactAppString,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95
    }
  });
}

ServerHTML.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  asyncComponentsState: _propTypes2.default.object,
  // eslint-disable-next-line react/forbid-prop-types
  helmet: _propTypes2.default.object,
  nonce: _propTypes2.default.string,
  reactAppString: _propTypes2.default.string
};

// EXPORT

exports.default = ServerHTML;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getClientBundleEntryAssets;

var _fs = __webpack_require__(6);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(1);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let resultCache;

/**
 * Retrieves the js/css for the named chunks that belong to our client bundle.
 *
 * Note: the order of the chunk names is important. The same ordering will be
 * used when rendering the scripts.
 *
 * This is useful to us for a couple of reasons:
 *   - It allows us to target the assets for a specific chunk, thereby only
 *     loading the assets we know we will need for a specific request.
 *   - The assets are hashed, and therefore they can't be "manually" added
 *     to the render logic.  Having this method allows us to easily fetch
 *     the respective assets simply by using a chunk name. :)
 */
/**
 * This file resolves the entry assets available from our client bundle.
 */

function getClientBundleEntryAssets() {
  // Return the assets json cache if it exists.
  // In development mode we always read the assets json file from disk to avoid
  // any cases where an older version gets cached.
  if (false) {
    return resultCache;
  }

  const assetsFilePath = (0, _path.resolve)((0, _config2.default)('projectRootDir'), (0, _config2.default)('bundles.client.outputPath'), `./${(0, _config2.default)('bundleAssetsFileName')}`);

  if (!_fs2.default.existsSync(assetsFilePath)) {
    throw new Error(`We could not find the "${assetsFilePath}" file, which contains a list of the assets of the client bundle.  Please ensure that the client bundle has been built.`);
  }

  const readAssetsJSONFile = () => JSON.parse(_fs2.default.readFileSync(assetsFilePath, 'utf8'));
  const assetsJSONCache = readAssetsJSONFile();
  if (typeof assetsJSONCache.index === 'undefined') {
    throw new Error('No asset data found for expected "index" entry chunk of client bundle.');
  }
  resultCache = assetsJSONCache.index;
  return resultCache;
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/home/nasir/blueeast/bluerain-cli/packages/web/src/config/components/ClientConfig.js';

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _serializeJavascript = __webpack_require__(16);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _filterWithRules = __webpack_require__(48);

var _filterWithRules2 = _interopRequireDefault(_filterWithRules);

var _configFactory = __webpack_require__(12);

var _configFactory2 = _interopRequireDefault(_configFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const values = (0, _configFactory2.default)();

// Filter the config down to the properties that are allowed to be included
// in the HTML response.
const clientConfig = (0, _filterWithRules2.default)(
// These are the rules used to filter the config.
values.clientConfigFilter,
// The config values to filter.
values);

const serializedClientConfig = (0, _serializeJavascript2.default)(clientConfig);

/**
 * A react component that generates a script tag that binds the allowed
 * values to the window so that config values can be read within the
 * browser.
 *
 * They get bound to window.__CLIENT_CONFIG__
 */
function ClientConfig({ nonce }) {
  return _react2.default.createElement('script', {
    type: 'text/javascript',
    nonce: nonce
    // eslint-disable-next-line react/no-danger
    , dangerouslySetInnerHTML: {
      __html: `window.__CLIENT_CONFIG__=${serializedClientConfig}`
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  });
}

ClientConfig.propTypes = {
  nonce: _propTypes2.default.string.isRequired
};

exports.default = ClientConfig;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filterWithRules;
function filterWithRulesLoop(rules, obj, basePropPath = '') {
  return Object.keys(rules).reduce((acc, key) => {
    const propPath = basePropPath !== '' ? `${basePropPath}.${key}` : key;

    if (typeof rules[key] === 'object') {
      if (typeof obj[key] !== 'object') {
        throw new Error(`Expected prop at path "${propPath}" to be an object`);
      }
      acc[key] = filterWithRulesLoop(rules[key], obj[key], propPath); // eslint-disable-line no-param-reassign,max-len
    } else if (rules[key]) {
      if (typeof obj[key] === 'undefined') {
        throw new Error(`Filter set an "allow" on path "${propPath}", however, this path was not found on the source object.`);
      }
      acc[key] = obj[key]; // eslint-disable-line no-param-reassign
    }
    return acc;
  }, {});
}

/**
 * Applies a rules object to filter a given object's structure.
 *
 * The rules object should match the shape of the source object and should
 * have a truthy/falsey value indicating if a property should be included/
 * excluded.  If the filters do not contain a property that exists on the
 * source object then the respective property will be excluded.
 *
 * @param  {Object} rules : The filter rules.
 * @param  {Object} obj   : The object to filter.
 *
 * @return {Object}
 *   The filtered object.
 *
 * @example
 *   filter(
 *     // rules
 *     {
 *       foo: { bar: true },
 *       poop: true
 *     },
 *     // source
 *     {
 *       foo: { bar: 'bar', qux: 'qux' },
 *       bob: 'bob',
 *       poop: { plop: 'splash' }
 *     },
 *   )
 */
function filterWithRules(rules, obj) {
  return filterWithRulesLoop(rules, obj);
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/nasir/blueeast/bluerain-cli/packages/web/src/shared/components/HTML/index.js'; /* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/html-has-lang */

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The is the HTML shell for our React Application.
 */
function HTML(props) {
  const { htmlAttributes, headerElements, bodyElements, appBodyString } = props;
  return _react2.default.createElement(
    'html',
    _extends({}, htmlAttributes, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      }
    }),
    _react2.default.createElement(
      'head',
      {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      },
      headerElements
    ),
    _react2.default.createElement(
      'body',
      {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      },
      _react2.default.createElement('div', {
        id: 'app',
        className: 'app-container',
        dangerouslySetInnerHTML: { __html: appBodyString },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }),
      bodyElements
    )
  );
}

HTML.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  htmlAttributes: _propTypes2.default.object,
  headerElements: _propTypes2.default.node,
  bodyElements: _propTypes2.default.node,
  appBodyString: _propTypes2.default.string
};

HTML.defaultProps = {
  htmlAttributes: null,
  headerElements: null,
  bodyElements: null,
  appBodyString: ''
};

// EXPORT

exports.default = HTML;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/home/nasir/blueeast/bluerain-cli/packages/web/src/shared/components/DemoApp/index.js';

__webpack_require__(51);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(9);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

__webpack_require__(52);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Error404 from './Error404';
// import Header from './Header';

// import AsyncHomeRoute from './AsyncHomeRoute';
// import AsyncCounterRoute from './AsyncCounterRoute';
// import AsyncAboutRoute from './AsyncAboutRoute';

function MainApp() {
  return _react2.default.createElement(
    'div',
    { className: 'app-root', __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      }
    },
    _react2.default.createElement(
      _reactHelmet2.default,
      {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      },
      _react2.default.createElement('html', { lang: 'en', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }),
      _react2.default.createElement('meta', { charSet: 'utf-8', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }),
      _react2.default.createElement('meta', { name: 'application-name', content: 'BlueRain', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }),
      _react2.default.createElement('meta', { name: 'description', content: 'BlueRain', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }),
      _react2.default.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }),
      _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }),
      _react2.default.createElement('meta', { name: 'msapplication-TileColor', content: '#2b2b2b', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }),
      _react2.default.createElement('meta', { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }),
      _react2.default.createElement('meta', { name: 'theme-color', content: '#2b2b2b', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }),
      _react2.default.createElement(
        'title',
        {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 28
          }
        },
        'BlueRain'
      ),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '152x152',
        href: '/favicons/apple-touch-icon-152x152.png',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        }
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '144x144',
        href: '/favicons/apple-touch-icon-144x144.png',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        }
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '120x120',
        href: '/favicons/apple-touch-icon-120x120.png',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        }
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '114x114',
        href: '/favicons/apple-touch-icon-114x114.png',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '76x76',
        href: '/favicons/apple-touch-icon-76x76.png',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        }
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '72x72',
        href: '/favicons/apple-touch-icon-72x72.png',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        }
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '57x57',
        href: '/favicons/apple-touch-icon-57x57.png',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '60x60',
        href: '/favicons/apple-touch-icon-60x60.png',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon-180x180.png',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        }
      }),
      _react2.default.createElement('link', { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#00a9d9', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        }
      }),
      _react2.default.createElement('link', { rel: 'icon', type: 'image/png', href: '/favicons/favicon-196x196.png', sizes: '196x196', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      }),
      _react2.default.createElement('link', { rel: 'icon', type: 'image/png', href: '/favicons/favicon-128.png', sizes: '128x128', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        }
      }),
      _react2.default.createElement('link', { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }),
      _react2.default.createElement('link', { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png', sizes: '32x32', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }),
      _react2.default.createElement('link', { rel: 'icon', sizes: '16x16 32x32', href: '/favicon.ico', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }),
      _react2.default.createElement('meta', { name: 'msapplication-TileColor', content: '#2b2b2b', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        }
      }),
      _react2.default.createElement('meta', { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        }
      }),
      _react2.default.createElement('meta', { name: 'msapplication-square70x70logo', content: '/favicons/mstile-70x70.png', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        }
      }),
      _react2.default.createElement('meta', { name: 'msapplication-square150x150logo', content: '/favicons/mstile-150x150.png', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        }
      }),
      _react2.default.createElement('meta', { name: 'msapplication-wide310x150logo', content: '/favicons/mstile-310x150.png', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        }
      }),
      _react2.default.createElement('meta', { name: 'msapplication-square310x310logo', content: '/favicons/mstile-310x310.png', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        }
      }),
      _react2.default.createElement('link', { rel: 'manifest', href: '/manifest.json', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      })
    )
  );
}

exports.default = MainApp;

/***/ }),
/* 51 */
/***/ (function(module, exports) {



/***/ }),
/* 52 */
/***/ (function(module, exports) {



/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uuid = __webpack_require__(54);

var _uuid2 = _interopRequireDefault(_uuid);

var _hpp = __webpack_require__(55);

var _hpp2 = _interopRequireDefault(_hpp);

var _helmet = __webpack_require__(60);

var _helmet2 = _interopRequireDefault(_helmet);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cspConfig = {
  directives: {
    childSrc: ["'self'"],
    // Note: Setting this to stricter than * breaks the service worker. :(
    // I can't figure out how to get around this, so if you know of a safer
    // implementation that is kinder to service workers please let me know.
    connectSrc: ['*'], // ["'self'", 'ws:'],
    defaultSrc: ["'self'"],
    imgSrc: ["'self'"],
    fontSrc: ["'self'", 'data:'],
    objectSrc: ["'self'"],
    mediaSrc: ["'self'"],
    manifestSrc: ["'self'"],
    scriptSrc: [
    // Allow scripts hosted from our application.
    "'self'",
    // Note: We will execution of any inline scripts that have the following
    // nonce identifier attached to them.
    // This is useful for guarding your application whilst allowing an inline
    // script to do data store rehydration (redux/mobx/apollo) for example.
    // @see https://helmetjs.github.io/docs/csp/
    (req, res) => `'nonce-${res.locals.nonce}'`,
    // This is a know workaround for browsers that don't support nonces.
    // It will be ignored by browsers that do support nonces as they will
    // recognise that we have also provided a nonce configuration and
    // use the stricter rule.
    "'unsafe-inline'"],
    styleSrc: ["'self'",
    // Webpack generates JS that loads our CSS, so this is needed:
    "'unsafe-inline'", 'blob:']
  }
};

// Add any additional CSP from the static config.
const cspExtensions = (0, _config2.default)('cspExtensions');
Object.keys(cspExtensions).forEach(key => {
  if (cspConfig.directives[key]) {
    cspConfig.directives[key] = cspConfig.directives[key].concat(cspExtensions[key]);
  } else {
    cspConfig.directives[key] = cspExtensions[key];
  }
});

if (true) {
  // When in development mode we need to add our secondary express server that
  // is used to host our client bundle to our csp config.
  Object.keys(cspConfig.directives).forEach(directive => {
    cspConfig.directives[directive].push(`${(0, _config2.default)('host')}:${(0, _config2.default)('clientDevServerPort')}`);
  });
}

// Attach a unique "nonce" to every response.  This allows use to declare
// inline scripts as being safe for execution against our content security policy.
// @see https://helmetjs.github.io/docs/csp/
function nonceMiddleware(req, res, next) {
  // eslint-disable-next-line no-param-reassign
  res.locals.nonce = _uuid2.default.v4();
  next();
}

const securityMiddleware = [nonceMiddleware,

// Prevent HTTP Parameter pollution.
// @see http://bit.ly/2f8q7Td
(0, _hpp2.default)(),

// The xssFilter middleware sets the X-XSS-Protection header to prevent
// reflected XSS attacks.
// @see https://helmetjs.github.io/docs/xss-filter/
_helmet2.default.xssFilter(),

// Frameguard mitigates clickjacking attacks by setting the X-Frame-Options header.
// @see https://helmetjs.github.io/docs/frameguard/
_helmet2.default.frameguard('deny'),

// Sets the X-Download-Options to prevent Internet Explorer from executing
// downloads in your site’s context.
// @see https://helmetjs.github.io/docs/ienoopen/
_helmet2.default.ieNoOpen(),

// Don’t Sniff Mimetype middleware, noSniff, helps prevent browsers from trying
// to guess (“sniff”) the MIME type, which can have security implications. It
// does this by setting the X-Content-Type-Options header to nosniff.
// @see https://helmetjs.github.io/docs/dont-sniff-mimetype/
_helmet2.default.noSniff(),

// Content Security Policy
//
// If you are unfamiliar with CSPs then I highly recommend that you do some
// reading on the subject:
//  - https://content-security-policy.com/
//  - https://developers.google.com/web/fundamentals/security/csp/
//  - https://developer.mozilla.org/en/docs/Web/Security/CSP
//  - https://helmetjs.github.io/docs/csp/
//
// If you are relying on scripts/styles/assets from other servers (internal
// or external to your company) then you will need to explicitly configure
// the CSP below to allow for this.  For example you can see I have had to
// add the polyfill.io CDN in order to allow us to use the polyfill script.
// It can be a pain to manage these, but it's a really great habit to get
// in to.
//
// You may find CSPs annoying at first, but it is a great habit to build.
// The CSP configuration is an optional item for helmet, however you should
// not remove it without making a serious consideration that you do not
// require the added security.
_helmet2.default.contentSecurityPolicy(cspConfig)];

exports.default = securityMiddleware;

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(56);
var isString = __webpack_require__(57);
var isArray = __webpack_require__(58);

var typeis = __webpack_require__(59);

/**
 * @public
 * @param {object} options
 * @param {boolean} [options.checkQuery]
 * @param {boolean} [options.checkBody]
 * @param {string} [options.checkBodyOnlyForContentType]
 * @param {string[]|string} [options.whitelist]
 * @return {function}
 */
module.exports = function (options) {

    options = defaults(options || {}, {
        checkQuery: true,
        checkBody: true,
        checkBodyOnlyForContentType: 'urlencoded',
        whitelist: null
    });

    if (isString(options.whitelist)) {
        options.whitelist = [ options.whitelist ];
    }

    if (options.whitelist !== null && !isArray(options.whitelist)) {
        console.error(
            '[HPP] ' +
            'Please pass either a string or an array to "options.whitelist". ' +
            'Deactivated the whitelist!'
        );
        options.whitelist = null;
    }

    if (isArray(options.whitelist)) {

        options.whitelist = options.whitelist.filter(function (elem) {

            if (!isString(elem)) {

                console.error(
                    '[HPP] ' +
                    'Please pass only strings into the "options.whitelist" array. ' +
                    'Removed the entry <' + elem + '>!'
                );

                return false;
            }

            return true;

        });

    }

    /**
     * @private
     * @param {object} req
     * @return {boolean}
     */
    function _correctContentType(req) {
        return typeis(req, options.checkBodyOnlyForContentType);
    }

    /**
     * @private
     * @param {string} keyReqPart e.g 'body' or 'query'
     * @param {string} keyPolluted e.g 'bodyPolluted' or 'queryPolluted'
     * @param {object} req
     */
    function _putAside(keyReqPart, keyPolluted, req) {

        var whitelist = options.whitelist;

        var reqPart = req[keyReqPart];
        var reqPolluted = req[keyPolluted];

        // Put aside only once in case multiple HPP middlewares are used
        if (reqPolluted === undefined) { // Check identical to lodash's isUndefined(reqPolluted)

            reqPolluted = req[keyPolluted] = {};

            var parameters = Object.keys(reqPart);

            for ( var i = 0, parametersLen = parameters.length; i < parametersLen; i+=1 ) {

                var paramKey = parameters[i];
                var paramValue = reqPart[paramKey];

                if (!isArray(paramValue)) {
                    continue;
                }

                // Put aside
                reqPolluted[paramKey] = paramValue;
                // Select the first parameter value
                reqPart[paramKey] = paramValue[paramValue.length-1];

            }

        }

        // Processed separately to allow multiple whitelists from multiple HPP middlewares as well as
        // for performance reasons
        if (whitelist !== null) { // Validation at top ensures whitelist is either null or an array

            for (var k = 0, whitelistLen = whitelist.length; k < whitelistLen; k += 1) {

                var whitelistedParam = whitelist[k];

                if (reqPolluted[whitelistedParam]) {
                    // Put back
                    reqPart[whitelistedParam] = reqPolluted[whitelistedParam];
                    delete reqPolluted[whitelistedParam];
                }

            }

        }

    }

    /**
     * @public
     * @param {object} req
     * @param {object} [req.query]
     * @param {object} [req.body]
     * @param {object} res
     * @param {function} next
     */
    return function hpp(req, res, next) {

        if (options.checkQuery && req.query) {
            _putAside('query', 'queryPolluted', req);
        }

        if (options.checkBody && req.body && _correctContentType(req)) {
            _putAside('body', 'bodyPolluted', req);
        }

        next();

    };

};



/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("lodash/defaults");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("lodash/isString");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("lodash/isArray");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("type-is");

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var connect = __webpack_require__(61)

var DEFAULT_MIDDLEWARE = [
  'dnsPrefetchControl',
  'frameguard',
  'hidePoweredBy',
  'hsts',
  'ieNoOpen',
  'noSniff',
  'xssFilter'
]

var middlewares
function helmet (options) {
  options = options || {}

  if (options.constructor.name === 'IncomingMessage') {
    throw new Error('It appears you have done something like `app.use(helmet)`, but it should be `app.use(helmet())`.')
  }

  var chain = connect()

  middlewares.forEach(function (middlewareName) {
    var middleware = helmet[middlewareName]
    var middlewareOptions = options[middlewareName]
    var isDefault = DEFAULT_MIDDLEWARE.indexOf(middlewareName) !== -1

    if (middlewareOptions === false) {
      return
    } else if (middlewareOptions === true) {
      middlewareOptions = {}
    }

    if (middlewareOptions != null) {
      chain.use(middleware(middlewareOptions))
    } else if (isDefault) {
      chain.use(middleware({}))
    }
  })

  return chain
}

helmet.contentSecurityPolicy = __webpack_require__(62)
helmet.dnsPrefetchControl = __webpack_require__(81)
helmet.expectCt = __webpack_require__(82)
helmet.frameguard = __webpack_require__(83)
helmet.hidePoweredBy = __webpack_require__(85)
helmet.hpkp = __webpack_require__(86)
helmet.hsts = __webpack_require__(87)
helmet.ieNoOpen = __webpack_require__(88)
helmet.noCache = __webpack_require__(89)
helmet.noSniff = __webpack_require__(90)
helmet.referrerPolicy = __webpack_require__(91)
helmet.xssFilter = __webpack_require__(92)
middlewares = Object.keys(helmet)

module.exports = helmet


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("connect");

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var camelize = __webpack_require__(63)
var cspBuilder = __webpack_require__(64)
var isFunction = __webpack_require__(3)
var platform = __webpack_require__(66)
var checkOptions = __webpack_require__(67)
var containsFunction = __webpack_require__(77)
var getHeaderKeysForBrowser = __webpack_require__(78)
var transformDirectivesForBrowser = __webpack_require__(79)
var parseDynamicDirectives = __webpack_require__(80)
var config = __webpack_require__(5)

module.exports = function csp (options) {
  checkOptions(options)

  var originalDirectives = camelize(options.directives || {})
  var directivesAreDynamic = containsFunction(originalDirectives)
  var shouldBrowserSniff = options.browserSniff !== false
  var reportOnlyIsFunction = isFunction(options.reportOnly)

  if (shouldBrowserSniff) {
    return function csp (req, res, next) {
      var userAgent = req.headers['user-agent']

      var browser
      if (userAgent) {
        browser = platform.parse(userAgent)
      } else {
        browser = {}
      }

      var headerKeys
      if (options.setAllHeaders || !userAgent) {
        headerKeys = config.allHeaders
      } else {
        headerKeys = getHeaderKeysForBrowser(browser, options)
      }

      if (headerKeys.length === 0) {
        next()
        return
      }

      var directives = transformDirectivesForBrowser(browser, originalDirectives)

      if (directivesAreDynamic) {
        directives = parseDynamicDirectives(directives, [req, res])
      }

      var policyString = cspBuilder({ directives: directives })

      headerKeys.forEach(function (headerKey) {
        if ((reportOnlyIsFunction && options.reportOnly(req, res)) ||
            (!reportOnlyIsFunction && options.reportOnly)) {
          headerKey += '-Report-Only'
        }
        res.setHeader(headerKey, policyString)
      })

      next()
    }
  } else {
    var headerKeys
    if (options.setAllHeaders) {
      headerKeys = config.allHeaders
    } else {
      headerKeys = ['Content-Security-Policy']
    }

    return function csp (req, res, next) {
      var directives = parseDynamicDirectives(originalDirectives, [req, res])
      var policyString = cspBuilder({ directives: directives })

      if ((reportOnlyIsFunction && options.reportOnly(req, res)) ||
          (!reportOnlyIsFunction && options.reportOnly)) {
        headerKeys.forEach(function (headerKey) {
          res.setHeader(headerKey + '-Report-Only', policyString)
        })
      } else {
        headerKeys.forEach(function (headerKey) {
          res.setHeader(headerKey, policyString)
        })
      }

      next()
    }
  }
}


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("camelize");

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var dashify = __webpack_require__(65)

module.exports = function (options) {
  var directives = options.directives

  var keysSeen = {}

  return Object.keys(directives).reduce(function (result, originalKey) {
    var directive = dashify(originalKey)

    if (keysSeen[directive]) {
      throw new Error(originalKey + ' is specified more than once')
    }
    keysSeen[directive] = true

    var value = directives[originalKey]
    if (Array.isArray(value)) {
      value = value.join(' ')
    } else if (value === true) {
      value = ''
    }

    if (value) {
      return result.concat(directive + ' ' + value)
    } else {
      return result.concat(directive)
    }
  }, []).join('; ')
}


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * dashify <https://github.com/jonschlinkert/dashify>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */



module.exports = function dashify(str) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }
  str = str.replace(/([a-z])([A-Z])/g, '$1-$2');
  str = str.replace(/[ \t\W]/g, '-');
  str = str.replace(/^-+|-+$/g, '');
  return str.toLowerCase();
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Platform.js <https://mths.be/platform>
 * Copyright 2014-2016 Benjamin Tan <https://demoneaux.github.io/>
 * Copyright 2011-2013 John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <https://mths.be/mit>
 */
;(function() {
  'use strict';

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as a reference to the global object. */
  var root = (objectTypes[typeof window] && window) || this;

  /** Backup possible global object. */
  var oldRoot = root;

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  /**
   * Used as the maximum length of an array-like object.
   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
   * for more details.
   */
  var maxSafeInteger = Math.pow(2, 53) - 1;

  /** Regular expression to detect Opera. */
  var reOpera = /\bOpera/;

  /** Possible global object. */
  var thisBinding = this;

  /** Used for native method references. */
  var objectProto = Object.prototype;

  /** Used to check for own properties of an object. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to resolve the internal `[[Class]]` of values. */
  var toString = objectProto.toString;

  /*--------------------------------------------------------------------------*/

  /**
   * Capitalizes a string value.
   *
   * @private
   * @param {string} string The string to capitalize.
   * @returns {string} The capitalized string.
   */
  function capitalize(string) {
    string = String(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * A utility function to clean up the OS name.
   *
   * @private
   * @param {string} os The OS name to clean up.
   * @param {string} [pattern] A `RegExp` pattern matching the OS name.
   * @param {string} [label] A label for the OS.
   */
  function cleanupOS(os, pattern, label) {
    // Platform tokens are defined at:
    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    var data = {
      '10.0': '10',
      '6.4':  '10 Technical Preview',
      '6.3':  '8.1',
      '6.2':  '8',
      '6.1':  'Server 2008 R2 / 7',
      '6.0':  'Server 2008 / Vista',
      '5.2':  'Server 2003 / XP 64-bit',
      '5.1':  'XP',
      '5.01': '2000 SP1',
      '5.0':  '2000',
      '4.0':  'NT',
      '4.90': 'ME'
    };
    // Detect Windows version from platform tokens.
    if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) &&
        (data = data[/[\d.]+$/.exec(os)])) {
      os = 'Windows ' + data;
    }
    // Correct character case and cleanup string.
    os = String(os);

    if (pattern && label) {
      os = os.replace(RegExp(pattern, 'i'), label);
    }

    os = format(
      os.replace(/ ce$/i, ' CE')
        .replace(/\bhpw/i, 'web')
        .replace(/\bMacintosh\b/, 'Mac OS')
        .replace(/_PowerPC\b/i, ' OS')
        .replace(/\b(OS X) [^ \d]+/i, '$1')
        .replace(/\bMac (OS X)\b/, '$1')
        .replace(/\/(\d)/, ' $1')
        .replace(/_/g, '.')
        .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
        .replace(/\bx86\.64\b/gi, 'x86_64')
        .replace(/\b(Windows Phone) OS\b/, '$1')
        .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
        .split(' on ')[0]
    );

    return os;
  }

  /**
   * An iteration utility for arrays and objects.
   *
   * @private
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   */
  function each(object, callback) {
    var index = -1,
        length = object ? object.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        callback(object[index], index, object);
      }
    } else {
      forOwn(object, callback);
    }
  }

  /**
   * Trim and conditionally capitalize string values.
   *
   * @private
   * @param {string} string The string to format.
   * @returns {string} The formatted string.
   */
  function format(string) {
    string = trim(string);
    return /^(?:webOS|i(?:OS|P))/.test(string)
      ? string
      : capitalize(string);
  }

  /**
   * Iterates over an object's own properties, executing the `callback` for each.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function executed per own property.
   */
  function forOwn(object, callback) {
    for (var key in object) {
      if (hasOwnProperty.call(object, key)) {
        callback(object[key], key, object);
      }
    }
  }

  /**
   * Gets the internal `[[Class]]` of a value.
   *
   * @private
   * @param {*} value The value.
   * @returns {string} The `[[Class]]`.
   */
  function getClassOf(value) {
    return value == null
      ? capitalize(value)
      : toString.call(value).slice(8, -1);
  }

  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of "object", "function", or "unknown".
   *
   * @private
   * @param {*} object The owner of the property.
   * @param {string} property The property to check.
   * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
   */
  function isHostType(object, property) {
    var type = object != null ? typeof object[property] : 'number';
    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
      (type == 'object' ? !!object[property] : true);
  }

  /**
   * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
   *
   * @private
   * @param {string} string The string to qualify.
   * @returns {string} The qualified string.
   */
  function qualify(string) {
    return String(string).replace(/([ -])(?!$)/g, '$1?');
  }

  /**
   * A bare-bones `Array#reduce` like utility function.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {*} The accumulated result.
   */
  function reduce(array, callback) {
    var accumulator = null;
    each(array, function(value, index) {
      accumulator = callback(accumulator, value, index, array);
    });
    return accumulator;
  }

  /**
   * Removes leading and trailing whitespace from a string.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} The trimmed string.
   */
  function trim(string) {
    return String(string).replace(/^ +| +$/g, '');
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a new platform object.
   *
   * @memberOf platform
   * @param {Object|string} [ua=navigator.userAgent] The user agent string or
   *  context object.
   * @returns {Object} A platform object.
   */
  function parse(ua) {

    /** The environment context object. */
    var context = root;

    /** Used to flag when a custom context is provided. */
    var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';

    // Juggle arguments.
    if (isCustomContext) {
      context = ua;
      ua = null;
    }

    /** Browser navigator object. */
    var nav = context.navigator || {};

    /** Browser user agent string. */
    var userAgent = nav.userAgent || '';

    ua || (ua = userAgent);

    /** Used to flag when `thisBinding` is the [ModuleScope]. */
    var isModuleScope = isCustomContext || thisBinding == oldRoot;

    /** Used to detect if browser is like Chrome. */
    var likeChrome = isCustomContext
      ? !!nav.likeChrome
      : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());

    /** Internal `[[Class]]` value shortcuts. */
    var objectClass = 'Object',
        airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
        enviroClass = isCustomContext ? objectClass : 'Environment',
        javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),
        phantomClass = isCustomContext ? objectClass : 'RuntimeObject';

    /** Detect Java environments. */
    var java = /\bJava/.test(javaClass) && context.java;

    /** Detect Rhino. */
    var rhino = java && getClassOf(context.environment) == enviroClass;

    /** A character to represent alpha. */
    var alpha = java ? 'a' : '\u03b1';

    /** A character to represent beta. */
    var beta = java ? 'b' : '\u03b2';

    /** Browser document object. */
    var doc = context.document || {};

    /**
     * Detect Opera browser (Presto-based).
     * http://www.howtocreate.co.uk/operaStuff/operaObject.html
     * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
     */
    var opera = context.operamini || context.opera;

    /** Opera `[[Class]]`. */
    var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))
      ? operaClass
      : (opera = null);

    /*------------------------------------------------------------------------*/

    /** Temporary variable used over the script's lifetime. */
    var data;

    /** The CPU architecture. */
    var arch = ua;

    /** Platform description array. */
    var description = [];

    /** Platform alpha/beta indicator. */
    var prerelease = null;

    /** A flag to indicate that environment features should be used to resolve the platform. */
    var useFeatures = ua == userAgent;

    /** The browser/environment version. */
    var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();

    /** A flag to indicate if the OS ends with "/ Version" */
    var isSpecialCasedOS;

    /* Detectable layout engines (order is important). */
    var layout = getLayout([
      { 'label': 'EdgeHTML', 'pattern': 'Edge' },
      'Trident',
      { 'label': 'WebKit', 'pattern': 'AppleWebKit' },
      'iCab',
      'Presto',
      'NetFront',
      'Tasman',
      'KHTML',
      'Gecko'
    ]);

    /* Detectable browser names (order is important). */
    var name = getName([
      'Adobe AIR',
      'Arora',
      'Avant Browser',
      'Breach',
      'Camino',
      'Electron',
      'Epiphany',
      'Fennec',
      'Flock',
      'Galeon',
      'GreenBrowser',
      'iCab',
      'Iceweasel',
      'K-Meleon',
      'Konqueror',
      'Lunascape',
      'Maxthon',
      { 'label': 'Microsoft Edge', 'pattern': 'Edge' },
      'Midori',
      'Nook Browser',
      'PaleMoon',
      'PhantomJS',
      'Raven',
      'Rekonq',
      'RockMelt',
      { 'label': 'Samsung Internet', 'pattern': 'SamsungBrowser' },
      'SeaMonkey',
      { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Sleipnir',
      'SlimBrowser',
      { 'label': 'SRWare Iron', 'pattern': 'Iron' },
      'Sunrise',
      'Swiftfox',
      'Waterfox',
      'WebPositive',
      'Opera Mini',
      { 'label': 'Opera Mini', 'pattern': 'OPiOS' },
      'Opera',
      { 'label': 'Opera', 'pattern': 'OPR' },
      'Chrome',
      { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },
      { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },
      { 'label': 'Firefox for iOS', 'pattern': 'FxiOS' },
      { 'label': 'IE', 'pattern': 'IEMobile' },
      { 'label': 'IE', 'pattern': 'MSIE' },
      'Safari'
    ]);

    /* Detectable products (order is important). */
    var product = getProduct([
      { 'label': 'BlackBerry', 'pattern': 'BB10' },
      'BlackBerry',
      { 'label': 'Galaxy S', 'pattern': 'GT-I9000' },
      { 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },
      { 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },
      { 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },
      { 'label': 'Galaxy S5', 'pattern': 'SM-G900' },
      { 'label': 'Galaxy S6', 'pattern': 'SM-G920' },
      { 'label': 'Galaxy S6 Edge', 'pattern': 'SM-G925' },
      { 'label': 'Galaxy S7', 'pattern': 'SM-G930' },
      { 'label': 'Galaxy S7 Edge', 'pattern': 'SM-G935' },
      'Google TV',
      'Lumia',
      'iPad',
      'iPod',
      'iPhone',
      'Kindle',
      { 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Nexus',
      'Nook',
      'PlayBook',
      'PlayStation Vita',
      'PlayStation',
      'TouchPad',
      'Transformer',
      { 'label': 'Wii U', 'pattern': 'WiiU' },
      'Wii',
      'Xbox One',
      { 'label': 'Xbox 360', 'pattern': 'Xbox' },
      'Xoom'
    ]);

    /* Detectable manufacturers. */
    var manufacturer = getManufacturer({
      'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },
      'Archos': {},
      'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },
      'Asus': { 'Transformer': 1 },
      'Barnes & Noble': { 'Nook': 1 },
      'BlackBerry': { 'PlayBook': 1 },
      'Google': { 'Google TV': 1, 'Nexus': 1 },
      'HP': { 'TouchPad': 1 },
      'HTC': {},
      'LG': {},
      'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },
      'Motorola': { 'Xoom': 1 },
      'Nintendo': { 'Wii U': 1,  'Wii': 1 },
      'Nokia': { 'Lumia': 1 },
      'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
      'Sony': { 'PlayStation': 1, 'PlayStation Vita': 1 }
    });

    /* Detectable operating systems (order is important). */
    var os = getOS([
      'Windows Phone',
      'Android',
      'CentOS',
      { 'label': 'Chrome OS', 'pattern': 'CrOS' },
      'Debian',
      'Fedora',
      'FreeBSD',
      'Gentoo',
      'Haiku',
      'Kubuntu',
      'Linux Mint',
      'OpenBSD',
      'Red Hat',
      'SuSE',
      'Ubuntu',
      'Xubuntu',
      'Cygwin',
      'Symbian OS',
      'hpwOS',
      'webOS ',
      'webOS',
      'Tablet OS',
      'Tizen',
      'Linux',
      'Mac OS X',
      'Macintosh',
      'Mac',
      'Windows 98;',
      'Windows '
    ]);

    /*------------------------------------------------------------------------*/

    /**
     * Picks the layout engine from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected layout engine.
     */
    function getLayout(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the manufacturer from an array of guesses.
     *
     * @private
     * @param {Array} guesses An object of guesses.
     * @returns {null|string} The detected manufacturer.
     */
    function getManufacturer(guesses) {
      return reduce(guesses, function(result, value, key) {
        // Lookup the manufacturer by product or scan the UA for the manufacturer.
        return result || (
          value[product] ||
          value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||
          RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)
        ) && key;
      });
    }

    /**
     * Picks the browser name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected browser name.
     */
    function getName(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the OS name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected OS name.
     */
    function getOS(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua)
            )) {
          result = cleanupOS(result, pattern, guess.label || guess);
        }
        return result;
      });
    }

    /**
     * Picks the product name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected product name.
     */
    function getProduct(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + ' *\\w+-[\\w]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua)
            )) {
          // Split by forward slash and append product version if needed.
          if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
            result[0] += ' ' + result[1];
          }
          // Correct character case and cleanup string.
          guess = guess.label || guess;
          result = format(result[0]
            .replace(RegExp(pattern, 'i'), guess)
            .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
            .replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
        }
        return result;
      });
    }

    /**
     * Resolves the version using an array of UA patterns.
     *
     * @private
     * @param {Array} patterns An array of UA patterns.
     * @returns {null|string} The detected version.
     */
    function getVersion(patterns) {
      return reduce(patterns, function(result, pattern) {
        return result || (RegExp(pattern +
          '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
      });
    }

    /**
     * Returns `platform.description` when the platform object is coerced to a string.
     *
     * @name toString
     * @memberOf platform
     * @returns {string} Returns `platform.description` if available, else an empty string.
     */
    function toStringPlatform() {
      return this.description || '';
    }

    /*------------------------------------------------------------------------*/

    // Convert layout to an array so we can add extra details.
    layout && (layout = [layout]);

    // Detect product names that contain their manufacturer's name.
    if (manufacturer && !product) {
      product = getProduct([manufacturer]);
    }
    // Clean up Google TV.
    if ((data = /\bGoogle TV\b/.exec(product))) {
      product = data[0];
    }
    // Detect simulators.
    if (/\bSimulator\b/i.test(ua)) {
      product = (product ? product + ' ' : '') + 'Simulator';
    }
    // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.
    if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
      description.push('running in Turbo/Uncompressed mode');
    }
    // Detect IE Mobile 11.
    if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {
      data = parse(ua.replace(/like iPhone OS/, ''));
      manufacturer = data.manufacturer;
      product = data.product;
    }
    // Detect iOS.
    else if (/^iP/.test(product)) {
      name || (name = 'Safari');
      os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
        ? ' ' + data[1].replace(/_/g, '.')
        : '');
    }
    // Detect Kubuntu.
    else if (name == 'Konqueror' && !/buntu/i.test(os)) {
      os = 'Kubuntu';
    }
    // Detect Android browsers.
    else if ((manufacturer && manufacturer != 'Google' &&
        ((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) || /\bVita\b/.test(product))) ||
        (/\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua))) {
      name = 'Android Browser';
      os = /\bAndroid\b/.test(os) ? os : 'Android';
    }
    // Detect Silk desktop/accelerated modes.
    else if (name == 'Silk') {
      if (!/\bMobi/i.test(ua)) {
        os = 'Android';
        description.unshift('desktop mode');
      }
      if (/Accelerated *= *true/i.test(ua)) {
        description.unshift('accelerated');
      }
    }
    // Detect PaleMoon identifying as Firefox.
    else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
      description.push('identifying as Firefox ' + data[1]);
    }
    // Detect Firefox OS and products running Firefox.
    else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
      os || (os = 'Firefox OS');
      product || (product = data[1]);
    }
    // Detect false positives for Firefox/Safari.
    else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
      // Escape the `/` for Firefox 1.
      if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
        // Clear name of false positives.
        name = null;
      }
      // Reassign a generic name.
      if ((data = product || manufacturer || os) &&
          (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
        name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
      }
    }
    // Add Chrome version to description for Electron.
    else if (name == 'Electron' && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
      description.push('Chromium ' + data);
    }
    // Detect non-Opera (Presto-based) versions (order is important).
    if (!version) {
      version = getVersion([
        '(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))',
        'Version',
        qualify(name),
        '(?:Firefox|Minefield|NetFront)'
      ]);
    }
    // Detect stubborn layout engines.
    if ((data =
          layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' ||
          /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') ||
          /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' ||
          !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') ||
          layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront'
        )) {
      layout = [data];
    }
    // Detect Windows Phone 7 desktop mode.
    if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
      name += ' Mobile';
      os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
      description.unshift('desktop mode');
    }
    // Detect Windows Phone 8.x desktop mode.
    else if (/\bWPDesktop\b/i.test(ua)) {
      name = 'IE Mobile';
      os = 'Windows Phone 8.x';
      description.unshift('desktop mode');
      version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
    }
    // Detect IE 11 identifying as other browsers.
    else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
      if (name) {
        description.push('identifying as ' + name + (version ? ' ' + version : ''));
      }
      name = 'IE';
      version = data[1];
    }
    // Leverage environment features.
    if (useFeatures) {
      // Detect server-side environments.
      // Rhino has a global function while others have a global object.
      if (isHostType(context, 'global')) {
        if (java) {
          data = java.lang.System;
          arch = data.getProperty('os.arch');
          os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
        }
        if (isModuleScope && isHostType(context, 'system') && (data = [context.system])[0]) {
          os || (os = data[0].os || null);
          try {
            data[1] = context.require('ringo/engine').version;
            version = data[1].join('.');
            name = 'RingoJS';
          } catch(e) {
            if (data[0].global.system == context.system) {
              name = 'Narwhal';
            }
          }
        }
        else if (
          typeof context.process == 'object' && !context.process.browser &&
          (data = context.process)
        ) {
          if (typeof data.versions == 'object') {
            if (typeof data.versions.electron == 'string') {
              description.push('Node ' + data.versions.node);
              name = 'Electron';
              version = data.versions.electron;
            } else if (typeof data.versions.nw == 'string') {
              description.push('Chromium ' + version, 'Node ' + data.versions.node);
              name = 'NW.js';
              version = data.versions.nw;
            }
          } else {
            name = 'Node.js';
            arch = data.arch;
            os = data.platform;
            version = /[\d.]+/.exec(data.version)
            version = version ? version[0] : 'unknown';
          }
        }
        else if (rhino) {
          name = 'Rhino';
        }
      }
      // Detect Adobe AIR.
      else if (getClassOf((data = context.runtime)) == airRuntimeClass) {
        name = 'Adobe AIR';
        os = data.flash.system.Capabilities.os;
      }
      // Detect PhantomJS.
      else if (getClassOf((data = context.phantom)) == phantomClass) {
        name = 'PhantomJS';
        version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);
      }
      // Detect IE compatibility modes.
      else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
        // We're in compatibility mode when the Trident version + 4 doesn't
        // equal the document mode.
        version = [version, doc.documentMode];
        if ((data = +data[1] + 4) != version[1]) {
          description.push('IE ' + version[1] + ' mode');
          layout && (layout[1] = '');
          version[1] = data;
        }
        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
      }
      // Detect IE 11 masking as other browsers.
      else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\b/.test(name)) {
        description.push('masking as ' + name + ' ' + version);
        name = 'IE';
        version = '11.0';
        layout = ['Trident'];
        os = 'Windows';
      }
      os = os && format(os);
    }
    // Detect prerelease phases.
    if (version && (data =
          /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||
          /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||
          /\bMinefield\b/i.test(ua) && 'a'
        )) {
      prerelease = /b/i.test(data) ? 'beta' : 'alpha';
      version = version.replace(RegExp(data + '\\+?$'), '') +
        (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
    }
    // Detect Firefox Mobile.
    if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS)\b/.test(os)) {
      name = 'Firefox Mobile';
    }
    // Obscure Maxthon's unreliable version.
    else if (name == 'Maxthon' && version) {
      version = version.replace(/\.[\d.]+/, '.x');
    }
    // Detect Xbox 360 and Xbox One.
    else if (/\bXbox\b/i.test(product)) {
      if (product == 'Xbox 360') {
        os = null;
      }
      if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
        description.unshift('mobile mode');
      }
    }
    // Add mobile postfix.
    else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&
        (os == 'Windows CE' || /Mobi/i.test(ua))) {
      name += ' Mobile';
    }
    // Detect IE platform preview.
    else if (name == 'IE' && useFeatures) {
      try {
        if (context.external === null) {
          description.unshift('platform preview');
        }
      } catch(e) {
        description.unshift('embedded');
      }
    }
    // Detect BlackBerry OS version.
    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
    else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data =
          (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||
          version
        )) {
      data = [data, /BB10/.test(ua)];
      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
      version = null;
    }
    // Detect Opera identifying/masking itself as another browser.
    // http://www.opera.com/support/kb/view/843/
    else if (this != forOwn && product != 'Wii' && (
          (useFeatures && opera) ||
          (/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||
          (name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os)) ||
          (name == 'IE' && (
            (os && !/^Win/.test(os) && version > 5.5) ||
            /\bWindows XP\b/.test(os) && version > 8 ||
            version == 8 && !/\bTrident\b/.test(ua)
          ))
        ) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {
      // When "identifying", the UA contains both Opera and the other browser's name.
      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');
      if (reOpera.test(name)) {
        if (/\bIE\b/.test(data) && os == 'Mac OS') {
          os = null;
        }
        data = 'identify' + data;
      }
      // When "masking", the UA contains only the other browser's name.
      else {
        data = 'mask' + data;
        if (operaClass) {
          name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
        } else {
          name = 'Opera';
        }
        if (/\bIE\b/.test(data)) {
          os = null;
        }
        if (!useFeatures) {
          version = null;
        }
      }
      layout = ['Presto'];
      description.push(data);
    }
    // Detect WebKit Nightly and approximate Chrome/Safari versions.
    if ((data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
      // Correct build number for numeric comparison.
      // (e.g. "532.5" becomes "532.05")
      data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data];
      // Nightly builds are postfixed with a "+".
      if (name == 'Safari' && data[1].slice(-1) == '+') {
        name = 'WebKit Nightly';
        prerelease = 'alpha';
        version = data[1].slice(0, -1);
      }
      // Clear incorrect browser versions.
      else if (version == data[1] ||
          version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
        version = null;
      }
      // Use the full Chrome version when available.
      data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
      // Detect Blink layout engine.
      if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {
        layout = ['Blink'];
      }
      // Detect JavaScriptCore.
      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi
      if (!useFeatures || (!likeChrome && !data[1])) {
        layout && (layout[1] = 'like Safari');
        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : '8');
      } else {
        layout && (layout[1] = 'like Chrome');
        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
      }
      // Add the postfix of ".x" or "+" for approximate versions.
      layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));
      // Obscure version for some Safari 1-2 releases.
      if (name == 'Safari' && (!version || parseInt(version) > 45)) {
        version = data;
      }
    }
    // Detect Opera desktop modes.
    if (name == 'Opera' &&  (data = /\bzbov|zvav$/.exec(os))) {
      name += ' ';
      description.unshift('desktop mode');
      if (data == 'zvav') {
        name += 'Mini';
        version = null;
      } else {
        name += 'Mobile';
      }
      os = os.replace(RegExp(' *' + data + '$'), '');
    }
    // Detect Chrome desktop mode.
    else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
      description.unshift('desktop mode');
      name = 'Chrome Mobile';
      version = null;

      if (/\bOS X\b/.test(os)) {
        manufacturer = 'Apple';
        os = 'iOS 4.3+';
      } else {
        os = null;
      }
    }
    // Strip incorrect OS versions.
    if (version && version.indexOf((data = /[\d.]+$/.exec(os))) == 0 &&
        ua.indexOf('/' + data + '-') > -1) {
      os = trim(os.replace(data, ''));
    }
    // Add layout engine.
    if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (
        /Browser|Lunascape|Maxthon/.test(name) ||
        name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) ||
        /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(name) && layout[1])) {
      // Don't add layout details to description if they are falsey.
      (data = layout[layout.length - 1]) && description.push(data);
    }
    // Combine contextual information.
    if (description.length) {
      description = ['(' + description.join('; ') + ')'];
    }
    // Append manufacturer to description.
    if (manufacturer && product && product.indexOf(manufacturer) < 0) {
      description.push('on ' + manufacturer);
    }
    // Append product to description.
    if (product) {
      description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);
    }
    // Parse the OS into an object.
    if (os) {
      data = / ([\d.+]+)$/.exec(os);
      isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
      os = {
        'architecture': 32,
        'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,
        'version': data ? data[1] : null,
        'toString': function() {
          var version = this.version;
          return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
        }
      };
    }
    // Add browser/OS architecture.
    if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
      if (os) {
        os.architecture = 64;
        os.family = os.family.replace(RegExp(' *' + data), '');
      }
      if (
          name && (/\bWOW64\b/i.test(ua) ||
          (useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua)))
      ) {
        description.unshift('32-bit');
      }
    }
    // Chrome 39 and above on OS X is always 64-bit.
    else if (
        os && /^OS X/.test(os.family) &&
        name == 'Chrome' && parseFloat(version) >= 39
    ) {
      os.architecture = 64;
    }

    ua || (ua = null);

    /*------------------------------------------------------------------------*/

    /**
     * The platform object.
     *
     * @name platform
     * @type Object
     */
    var platform = {};

    /**
     * The platform description.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.description = ua;

    /**
     * The name of the browser's layout engine.
     *
     * The list of common layout engines include:
     * "Blink", "EdgeHTML", "Gecko", "Trident" and "WebKit"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.layout = layout && layout[0];

    /**
     * The name of the product's manufacturer.
     *
     * The list of manufacturers include:
     * "Apple", "Archos", "Amazon", "Asus", "Barnes & Noble", "BlackBerry",
     * "Google", "HP", "HTC", "LG", "Microsoft", "Motorola", "Nintendo",
     * "Nokia", "Samsung" and "Sony"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.manufacturer = manufacturer;

    /**
     * The name of the browser/environment.
     *
     * The list of common browser names include:
     * "Chrome", "Electron", "Firefox", "Firefox for iOS", "IE",
     * "Microsoft Edge", "PhantomJS", "Safari", "SeaMonkey", "Silk",
     * "Opera Mini" and "Opera"
     *
     * Mobile versions of some browsers have "Mobile" appended to their name:
     * eg. "Chrome Mobile", "Firefox Mobile", "IE Mobile" and "Opera Mobile"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.name = name;

    /**
     * The alpha/beta release indicator.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.prerelease = prerelease;

    /**
     * The name of the product hosting the browser.
     *
     * The list of common products include:
     *
     * "BlackBerry", "Galaxy S4", "Lumia", "iPad", "iPod", "iPhone", "Kindle",
     * "Kindle Fire", "Nexus", "Nook", "PlayBook", "TouchPad" and "Transformer"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.product = product;

    /**
     * The browser's user agent string.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.ua = ua;

    /**
     * The browser/environment version.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.version = name && version;

    /**
     * The name of the operating system.
     *
     * @memberOf platform
     * @type Object
     */
    platform.os = os || {

      /**
       * The CPU architecture the OS is built for.
       *
       * @memberOf platform.os
       * @type number|null
       */
      'architecture': null,

      /**
       * The family of the OS.
       *
       * Common values include:
       * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
       * "Windows XP", "OS X", "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE",
       * "Android", "iOS" and "Windows Phone"
       *
       * @memberOf platform.os
       * @type string|null
       */
      'family': null,

      /**
       * The version of the OS.
       *
       * @memberOf platform.os
       * @type string|null
       */
      'version': null,

      /**
       * Returns the OS string.
       *
       * @memberOf platform.os
       * @returns {string} The OS string.
       */
      'toString': function() { return 'null'; }
    };

    platform.parse = parse;
    platform.toString = toStringPlatform;

    if (platform.version) {
      description.unshift(version);
    }
    if (platform.name) {
      description.unshift(name);
    }
    if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
      description.push(product ? '(' + os + ')' : 'on ' + os);
    }
    if (description.length) {
      platform.description = description.join(' ');
    }
    return platform;
  }

  /*--------------------------------------------------------------------------*/

  // Export platform.
  var platform = parse();

  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (true) {
    // Expose platform on the global object to prevent errors when platform is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    root.platform = platform;

    // Define as an anonymous module so platform can be aliased through path mapping.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return platform;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for CommonJS support.
    forOwn(platform, function(value, key) {
      freeExports[key] = value;
    });
  }
  else {
    // Export to the global object.
    root.platform = platform;
  }
}.call(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)(module)))

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var checkDirective = __webpack_require__(68)
var dasherize = __webpack_require__(76)

module.exports = function (options) {
  if (!options) {
    throw new Error('csp must be called with arguments. See the documentation.')
  }

  var directives = options.directives

  var directivesExist = Object.prototype.toString.call(directives) === '[object Object]'
  if (!directivesExist || Object.keys(directives).length === 0) {
    throw new Error('csp must have at least one directive under the "directives" key. See the documentation.')
  }

  Object.keys(directives).forEach(function (directiveKey) {
    checkDirective(dasherize(directiveKey), directives[directiveKey], options)
  })
}


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(5)
var checkers = {
  sourceList: __webpack_require__(69),
  pluginTypes: __webpack_require__(70),
  sandbox: __webpack_require__(71),
  reportUri: __webpack_require__(72),
  boolean: __webpack_require__(74)
}

module.exports = function (key, value, options) {
  if (options.loose) { return }

  if (!config.directives.hasOwnProperty(key)) {
    throw new Error('"' + key + '" is an invalid directive. See the documentation for the supported list. Force this by enabling loose mode.')
  }

  var directiveType = config.directives[key].type
  checkers[directiveType](key, value, options)
}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(3)
var config = __webpack_require__(5)

module.exports = function sourceListCheck (key, value, options) {
  var directiveInfo = config.directives[key]

  if (value === false) { return }

  if (!Array.isArray(value)) {
    throw new Error('"' + value + '" is not a valid value for ' + key + '. Use an array of strings.')
  }

  if (value.length === 0) {
    throw new Error(key + ' must have at least one value. To block everything, set ' + key + ' to ["\'none\'"].')
  }

  value.forEach(function (sourceExpression) {
    if (!sourceExpression) {
      throw new Error('"' + sourceExpression + '" is not a valid source expression. Only non-empty strings are allowed.')
    }

    if (isFunction(sourceExpression)) { return }

    sourceExpression = sourceExpression.valueOf()

    if ((typeof sourceExpression !== 'string') || (sourceExpression.length === 0)) {
      throw new Error('"' + sourceExpression + '" is not a valid source expression. Only non-empty strings are allowed.')
    }

    if (!directiveInfo.hasUnsafes && (config.unsafes.indexOf(sourceExpression) !== -1)) {
      throw new Error('"' + sourceExpression + '" does not make sense in ' + key + '. Remove it.')
    }

    if (config.mustQuote.indexOf(sourceExpression) !== -1) {
      throw new Error('"' + sourceExpression + '" must be quoted in ' + key + '. Change it to "\'' + sourceExpression + '\'" in your source list. Force this by enabling loose mode.')
    }
  })
}


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(5)
var isFunction = __webpack_require__(3)

var notAllowed = ['self', "'self'"].concat(config.unsafes)

module.exports = function pluginTypesCheck (key, value, options) {
  if (!Array.isArray(value) && (value !== false)) {
    throw new Error('"' + value + '" is not a valid value for ' + key + '. Use an array of strings.')
  }

  if (value.length === 0) {
    throw new Error(key + ' must have at least one value. To block everything, set ' + key + ' to ["\'none\'"].')
  }

  value.forEach(function (pluginType) {
    if (!pluginType) {
      throw new Error('"' + pluginType + '" is not a valid plugin type. Only non-empty strings are allowed.')
    }

    if (isFunction(pluginType)) { return }

    pluginType = pluginType.valueOf()

    if ((typeof pluginType !== 'string') || (pluginType.length === 0)) {
      throw new Error('"' + pluginType + '" is not a valid plugin type. Only non-empty strings are allowed.')
    }

    if (notAllowed.indexOf(pluginType) !== -1) {
      throw new Error('"' + pluginType + '" does not make sense in ' + key + '. Remove it.')
    }

    if (config.mustQuote.indexOf(pluginType) !== -1) {
      throw new Error('"' + pluginType + '" must be quoted in ' + key + '. Change it to "\'' + pluginType + '\'" in your source list. Force this by enabling loose mode.')
    }
  })
}


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(3)
var config = __webpack_require__(5)

module.exports = function sandboxCheck (key, value, options) {
  if (value === false) { return }
  if (value === true) { return }

  if (!Array.isArray(value)) {
    throw new Error('"' + value + '" is not a valid value for ' + key + '. Use an array of strings or `true`.')
  }

  if (value.length === 0) {
    throw new Error(key + ' must have at least one value. To block everything, set ' + key + ' to `true`.')
  }

  value.forEach(function (expression) {
    if (isFunction(expression)) { return }

    if (config.sandboxDirectives.indexOf(expression) === -1) {
      throw new Error('"' + expression + '" is not a valid ' + key + ' directive. Remove it.')
    }
  })
}


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(3)
var isString = __webpack_require__(73)

module.exports = function (key, value) {
  if (value === false) { return }
  if (isFunction(value)) { return }

  if (!isString(value) || (value.length === 0)) {
    throw new Error('"' + value + '" is not a valid value for ' + key + '. Use a non-empty string.')
  }
}


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = function isString (value) {
  return Object.prototype.toString.call(value) === '[object String]'
}


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var isBoolean = __webpack_require__(75)

module.exports = function (key, value) {
  if (!isBoolean(value)) {
    throw new Error('"' + value + '" is not a valid value for ' + key + '. Use `true` or `false`.')
  }
}


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function isBoolean (value) {
  return Object.prototype.toString.call(value) === '[object Boolean]'
}


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = Array.isArray || function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

var isDate = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Date]';
};

var isRegex = function (obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var has = Object.prototype.hasOwnProperty;
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (has.call(obj, key)) {
      keys.push(key);
    }
  }
  return keys;
};

function dashCase(str) {
  return str.replace(/[A-Z](?:(?=[^A-Z])|[A-Z]*(?=[A-Z][^A-Z]|$))/g, function (s, i) {
    return (i > 0 ? '-' : '') + s.toLowerCase();
  });
}

function map(xs, f) {
  if (xs.map) {
    return xs.map(f);
  }
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

function reduce(xs, f, acc) {
  if (xs.reduce) {
    return xs.reduce(f, acc);
  }
  for (var i = 0; i < xs.length; i++) {
    acc = f(acc, xs[i], i);
  }
  return acc;
}

function walk(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  if (isDate(obj) || isRegex(obj)) {
    return obj;
  }
  if (isArray(obj)) {
    return map(obj, walk);
  }
  return reduce(objectKeys(obj), function (acc, key) {
    var camel = dashCase(key);
    acc[camel] = walk(obj[key]);
    return acc;
  }, {});
}

module.exports = function (obj) {
  if (typeof obj === 'string') {
    return dashCase(obj);
  }
  return walk(obj);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(3)

module.exports = function containsFunction (obj) {
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) { continue }

    var value = obj[key]

    if (!Array.isArray(value)) {
      value = [value]
    }

    if (value.some(isFunction)) {
      return true
    }
  }

  return false
}


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(5)

function goodBrowser () {
  return ['Content-Security-Policy']
}

var handlers = {
  'Android Browser': function (browser, options) {
    if (parseFloat(browser.os.version) < 4.4 || options.disableAndroid) {
      return []
    } else {
      return ['Content-Security-Policy']
    }
  },

  Chrome: function (browser) {
    var version = parseFloat(browser.version)

    if (version >= 14 && version < 25) {
      return ['X-WebKit-CSP']
    } else if (version >= 25) {
      return ['Content-Security-Policy']
    } else {
      return []
    }
  },

  'Chrome Mobile': function (browser) {
    if (browser.os.family === 'iOS') {
      return ['Content-Security-Policy']
    } else {
      return handlers['Android Browser'].apply(this, arguments)
    }
  },

  Firefox: function (browser) {
    var version = parseFloat(browser.version)

    if (version >= 23) {
      return ['Content-Security-Policy']
    } else if (version >= 4 && version < 23) {
      return ['X-Content-Security-Policy']
    } else {
      return []
    }
  },

  'Firefox Mobile': function (browser) {
    // Handles both Firefox for Android and Firefox OS
    var family = browser.os.family
    var version = parseFloat(browser.version)

    if (family === 'Firefox OS') {
      if (version >= 32) {
        return ['Content-Security-Policy']
      } else {
        return ['X-Content-Security-Policy']
      }
    } else if (family === 'Android') {
      if (version >= 25) {
        return ['Content-Security-Policy']
      } else {
        return ['X-Content-Security-Policy']
      }
    }

    return []
  },

  'Firefox for iOS': goodBrowser,

  IE: function (browser) {
    var version = parseFloat(browser.version)
    var header = version < 12 ? 'X-Content-Security-Policy' : 'Content-Security-Policy'

    return [header]
  },

  'Microsoft Edge': goodBrowser,

  'Microsoft Edge Mobile': goodBrowser,

  Opera: function (browser) {
    if (parseFloat(browser.version) >= 15) {
      return ['Content-Security-Policy']
    } else {
      return []
    }
  },

  Safari: function (browser) {
    var version = parseFloat(browser.version)

    if (version >= 7) {
      return ['Content-Security-Policy']
    } else if (version >= 6) {
      return ['X-WebKit-CSP']
    } else {
      return []
    }
  }
}

handlers['IE Mobile'] = handlers.IE

module.exports = function getHeaderKeysForBrowser (browser, options) {
  var handler = handlers[browser.name]

  if (handler) {
    return handler(browser, options)
  } else {
    return config.allHeaders
  }
}


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var reduce = __webpack_require__(18)

function createFirefoxPreCSP10Directives (directives, basePolicy) {
  return reduce(directives, function (result, value, key) {
    if (key === 'connectSrc') {
      result.xhrSrc = value
    } else {
      result[key] = value
    }

    if (key === 'scriptSrc') {
      var optionsValues = []

      if (value.indexOf("'unsafe-inline'") !== -1) {
        optionsValues.push('inline-script')
      }
      if (value.indexOf("'unsafe-eval'") !== -1) {
        optionsValues.push('eval-script')
      }

      if (optionsValues.length !== 0) {
        result.options = optionsValues
      }
    }

    return result
  }, basePolicy)
}

var handlers = {
  Firefox: function (browser, directives) {
    var version = parseFloat(browser.version)

    if (version >= 4 && version < 23) {
      var basePolicy = {}
      if (version < 5) {
        basePolicy.allow = ['*']

        if (directives.defaultSrc) {
          basePolicy.allow = directives.defaultSrc
          delete directives.defaultSrc
        }
      } else {
        basePolicy.defaultSrc = ['*']
      }

      return createFirefoxPreCSP10Directives(directives, basePolicy)
    } else {
      return directives
    }
  },

  'Firefox Mobile': function (browser, directives) {
    // Handles both Firefox for Android and Firefox OS
    var family = browser.os.family
    var version = parseFloat(browser.version)

    if ((family === 'Firefox OS' && version < 32) || (family === 'Android' && version < 25)) {
      return createFirefoxPreCSP10Directives(directives, { defaultSrc: ['*'] })
    } else {
      return directives
    }
  }
}

module.exports = function transformDirectivesForBrowser (browser, directives) {
  var handler = handlers[browser.name]

  if (handler) {
    return handler(browser, directives)
  } else {
    return directives
  }
}


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var reduce = __webpack_require__(18)
var isFunction = __webpack_require__(3)

module.exports = function parseDynamicDirectives (directives, functionArgs) {
  return reduce(directives, function (result, value, key) {
    if (Array.isArray(value)) {
      result[key] = value.map(function (element) {
        if (isFunction(element)) {
          return element.apply(null, functionArgs)
        } else {
          return element
        }
      })
    } else if (isFunction(value)) {
      result[key] = value.apply(null, functionArgs)
    } else if (value !== false) {
      result[key] = value
    }

    return result
  }, {})
}


/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = function dnsPrefetchControl (options) {
  if (options && options.allow) {
    return function dnsPrefetchControl (req, res, next) {
      res.setHeader('X-DNS-Prefetch-Control', 'on')
      next()
    }
  } else {
    return function dnsPrefetchControl (req, res, next) {
      res.setHeader('X-DNS-Prefetch-Control', 'off')
      next()
    }
  }
}


/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = function expectCt (options) {
  var headerValue = getHeaderValue(options)

  return function expectCt (req, res, next) {
    res.setHeader('Expect-CT', headerValue)
    next()
  }
}

function getHeaderValue (options) {
  options = options || {}

  var directives = []

  if (options.enforce) {
    directives.push('enforce')
  }

  directives.push('max-age=' + parseMaxAge(options.maxAge))

  if (options.reportUri) {
    directives.push('report-uri="' + options.reportUri + '"')
  }

  return directives.join('; ')
}

function parseMaxAge (option) {
  if (option == null) { return 0 }

  if ((typeof option !== 'number') || (option < 0)) {
    throw new Error(option + ' is not a valid value for maxAge. Please choose a positive integer.')
  }

  return option
}


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var isString = __webpack_require__(84)

module.exports = function frameguard (options) {
  options = options || {}

  var domain = options.domain
  var action = options.action

  var directive
  if (action === undefined) {
    directive = 'SAMEORIGIN'
  } else if (isString(action)) {
    directive = action.toUpperCase()
  }

  if (directive === 'ALLOWFROM') {
    directive = 'ALLOW-FROM'
  } else if (directive === 'SAME-ORIGIN') {
    directive = 'SAMEORIGIN'
  }

  if (['DENY', 'ALLOW-FROM', 'SAMEORIGIN'].indexOf(directive) === -1) {
    throw new Error('action must be undefined, "DENY", "ALLOW-FROM", or "SAMEORIGIN".')
  }

  if (directive === 'ALLOW-FROM') {
    if (!isString(domain)) {
      throw new Error('ALLOW-FROM action requires a domain parameter.')
    }
    if (!domain.length) {
      throw new Error('domain parameter must not be empty.')
    }
    directive = 'ALLOW-FROM ' + domain
  }

  return function frameguard (req, res, next) {
    res.setHeader('X-Frame-Options', directive)
    next()
  }
}


/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = function (val) {
  return typeof val === 'string' || val instanceof String
}


/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = function hidePoweredBy (options) {
  var setTo = (options || {}).setTo

  if (setTo) {
    return function hidePoweredBy (req, res, next) {
      res.setHeader('X-Powered-By', setTo)
      next()
    }
  } else {
    return function hidePoweredBy (req, res, next) {
      res.removeHeader('X-Powered-By')
      next()
    }
  }
}


/***/ }),
/* 86 */
/***/ (function(module, exports) {

var badArgumentsError = new Error('hpkp must be called with a maxAge and at least two SHA-256s (one actually used and another kept as a backup).')

module.exports = function hpkp (passedOptions) {
  var options = parseOptions(passedOptions)
  var headerKey = getHeaderKey(options)
  var headerValue = getHeaderValue(options)

  return function hpkp (req, res, next) {
    var setHeader = true
    var setIf = options.setIf

    if (setIf) {
      setHeader = setIf(req, res)
    }

    if (setHeader) {
      res.setHeader(headerKey, headerValue)
    }

    next()
  }
}

function parseOptions (options) {
  if (!options) { throw badArgumentsError }

  if (options.maxage && options.maxAge) { throw badArgumentsError }

  var maxAge = options.maxAge
  var sha256s = options.sha256s
  var setIf = options.setIf

  if (!maxAge || maxAge <= 0) { throw badArgumentsError }
  if (!sha256s || sha256s.length < 2) { throw badArgumentsError }
  if (setIf && (typeof setIf !== 'function')) {
    throw new TypeError('setIf must be a function.')
  }

  if (options.reportOnly && !options.reportUri) { throw badArgumentsError }

  return {
    maxAge: maxAge,
    sha256s: sha256s,
    includeSubDomains: options.includeSubDomains || options.includeSubdomains,
    reportUri: options.reportUri,
    reportOnly: options.reportOnly,
    setIf: setIf
  }
}

function getHeaderKey (options) {
  var header = 'Public-Key-Pins'
  if (options.reportOnly) {
    header += '-Report-Only'
  }
  return header
}

function getHeaderValue (options) {
  var result = options.sha256s.map(function (sha) {
    return 'pin-sha256="' + sha + '"'
  })
  result.push('max-age=' + Math.round(options.maxAge))
  if (options.includeSubDomains) {
    result.push('includeSubDomains')
  }
  if (options.reportUri) {
    result.push('report-uri="' + options.reportUri + '"')
  }
  return result.join('; ')
}


/***/ }),
/* 87 */
/***/ (function(module, exports) {

var defaultMaxAge = 180 * 24 * 60 * 60

module.exports = function hsts (options) {
  options = options || {}

  var maxAge = options.maxAge != null ? options.maxAge : defaultMaxAge
  var includeSubDomains = (options.includeSubDomains !== false) && (options.includeSubdomains !== false)
  var setIf = options.hasOwnProperty('setIf') ? options.setIf : alwaysTrue

  if (options.hasOwnProperty('maxage')) {
    throw new Error('maxage is not a supported property. Did you mean to pass "maxAge" instead of "maxage"?')
  }
  if (arguments.length > 1) {
    throw new Error('HSTS passed the wrong number of arguments.')
  }
  if (typeof maxAge !== 'number') {
    throw new TypeError('HSTS must be passed a numeric maxAge parameter.')
  }
  if (maxAge < 0) {
    throw new RangeError('HSTS maxAge must be nonnegative.')
  }
  if (typeof setIf !== 'function') {
    throw new TypeError('setIf must be a function.')
  }
  if (options.hasOwnProperty('includeSubDomains') && options.hasOwnProperty('includeSubdomains')) {
    throw new Error('includeSubDomains and includeSubdomains cannot both be specified.')
  }

  var header = 'max-age=' + Math.round(maxAge)
  if (includeSubDomains) {
    header += '; includeSubDomains'
  }
  if (options.preload) {
    header += '; preload'
  }

  return function hsts (req, res, next) {
    if (setIf(req, res)) {
      res.setHeader('Strict-Transport-Security', header)
    }

    next()
  }
}

function alwaysTrue () {
  return true
}


/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = function ienoopen () {
  return function ienoopen (req, res, next) {
    res.setHeader('X-Download-Options', 'noopen')
    next()
  }
}


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = function nocache () {
  return function nocache (req, res, next) {
    res.setHeader('Surrogate-Control', 'no-store')
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')

    next()
  }
}


/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = function nosniff () {
  return function nosniff (req, res, next) {
    res.setHeader('X-Content-Type-Options', 'nosniff')
    next()
  }
}


/***/ }),
/* 91 */
/***/ (function(module, exports) {

var DEFAULT_POLICY = 'no-referrer'
var ALLOWED_POLICIES = [
  'no-referrer',
  'no-referrer-when-downgrade',
  'same-origin',
  'origin',
  'strict-origin',
  'origin-when-cross-origin',
  'strict-origin-when-cross-origin',
  'unsafe-url',
  ''
]
var ALLOWED_POLICIES_ERROR_LIST = ALLOWED_POLICIES.map(function (policy) {
  if (policy.length) {
    return '"' + policy + '"'
  } else {
    return 'and the empty string'
  }
}).join(', ')

module.exports = function referrerPolicy (options) {
  options = options || {}

  var policy
  if ('policy' in options) {
    policy = options.policy
  } else {
    policy = DEFAULT_POLICY
  }

  if (ALLOWED_POLICIES.indexOf(policy) === -1) {
    throw new Error('"' + policy + '" is not a valid policy. Allowed policies: ' + ALLOWED_POLICIES_ERROR_LIST + '.')
  }

  return function referrerPolicy (req, res, next) {
    res.setHeader('Referrer-Policy', policy)
    next()
  }
}


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = function xXssProtection (options) {
  if (options && options.setOnOldIE) {
    return function xXssProtection (req, res, next) {
      res.setHeader('X-XSS-Protection', '1; mode=block')
      next()
    }
  } else {
    return function xXssProtection (req, res, next) {
      var matches = /msie\s*(\d+)/i.exec(req.headers['user-agent'])

      var value
      if (!matches || (parseFloat(matches[1]) >= 9)) {
        value = '1; mode=block'
      } else {
        value = '0'
      }

      res.setHeader('X-XSS-Protection', value)
      next()
    }
  }
}


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(8);

var _express2 = _interopRequireDefault(_express);

var _path = __webpack_require__(1);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Middleware to server our client bundle.
 */
exports.default = _express2.default.static((0, _path.resolve)((0, _config2.default)('projectRootDir'), (0, _config2.default)('bundles.client.outputPath')), {
  maxAge: (0, _config2.default)('browserCacheMaxAge')
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = __webpack_require__(1);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Middleware to serve our service worker.
/* eslint-disable no-unused-vars */

function serviceWorkerMiddleware(req, res, next) {
  res.sendFile((0, _path.resolve)((0, _config2.default)('projectRootDir'), (0, _config2.default)('bundles.client.outputPath'), (0, _config2.default)('serviceWorker.fileName')));
}

exports.default = serviceWorkerMiddleware;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = offlinePageMiddleware;

var _fs = __webpack_require__(6);

var _path = __webpack_require__(1);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Middleware to intercept calls to our offline page to ensure that
 * inline scripts get a nonce value attached to them.
 */
function offlinePageMiddleware(req, res, next) {
  // We should have had a nonce provided to us.  See the server/index.js for
  // more information on what this is.
  if (typeof res.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }
  const nonce = res.locals.nonce;

  (0, _fs.readFile)(
  // Path to the offline page.
  (0, _path.resolve)((0, _config2.default)('projectRootDir'), (0, _config2.default)('bundles.client.outputPath'), (0, _config2.default)('serviceWorker.offlinePageFileName')),
  // Charset for read
  'utf-8',
  // Read handler
  (err, data) => {
    if (err) {
      res.status(500).send('Error returning offline page.');
      return;
    }
    // We replace the placeholder with the actual nonce.
    const offlinePageWithNonce = data.replace('OFFLINE_PAGE_NONCE_PLACEHOLDER', nonce);
    // Send back the page as the response
    res.send(offlinePageWithNonce);
  });
} /* eslint-disable no-unused-vars */

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const prettyError = __webpack_require__(97).start();

// Configure prettyError to simplify the stack trace:

// skip events.js and http.js and similar core node files
prettyError.skipNodeFiles();

// skip all the trace lines about express` core and sub-modules
prettyError.skipPackage('express');

const errorHandlersMiddleware = [
/**
 * 404 errors middleware.
 *
 * NOTE: the react application middleware hands 404 paths, but it is good to
 * have this backup for paths not handled by the react middleware. For
 * example you may bind a /api path to express.
 */
function notFoundMiddlware(req, res, next) {
  res.status(404).send('Sorry, that resource was not found.');
},

/**
 * 500 errors middleware.
 *
 * NOTE: You must provide specify all 4 parameters on this callback function
 * even if they aren't used, otherwise it won't be used.
 */
function unexpectedErrorMiddleware(err, req, res, next) {
  if (err) {
    console.log(prettyError.render(err));
  }
  res.status(500).send('Sorry, an unexpected error occurred.');
}];

exports.default = errorHandlersMiddleware;

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = require("pretty-error");

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map