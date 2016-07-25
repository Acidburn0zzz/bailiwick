define(['exports', './criteria', './utils'], function (exports, _criteria, _utils) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ResultSet = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;

		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}

		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);

		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}

		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}

		return desc;
	}

	var _desc, _value, _class;

	var ResultSet = exports.ResultSet = (_class = function () {
		function ResultSet(model) {
			var criteria = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			_classCallCheck(this, ResultSet);

			if (criteria === null) {
				criteria = new _criteria.Criteria();
			} else if (!(criteria instanceof _criteria.Criteria)) {
				criteria = new _criteria.Criteria(criteria);
			}

			this.model = model;
			this.criteria = criteria;
		}

		_createClass(ResultSet, [{
			key: 'get',
			value: function get() {
				var limit = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
				var offset = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

				var cr = this.criteria;
				if (limit) {
					cr = cr.limit(limit);
				}
				if (offset) {
					cr = cr.offset(offset);
				}

				(0, _utils.debug)("Fetching %s results matching criteria: %o", this.model.name, cr);
				return this.model.get(cr);
			}
		}, {
			key: 'clone',
			value: function clone() {
				return Reflect.construct(this.constructor, [this.model, this.criteria]);
			}
		}, {
			key: 'where',
			value: function where(params) {
				(0, _utils.debug)("Cloning resultset to add params: ", params);
				this.criteria = this.criteria.filter(params);
			}
		}, {
			key: 'limit',
			value: function limit(count) {
				(0, _utils.debug)("Cloned resultset to add limit: ", count);
				this.criteria = this.criteria.limit(count);
			}
		}, {
			key: 'offset',
			value: function offset(index) {
				(0, _utils.debug)("Cloned resultset to add offset: ", index);
				this.criteria = this.criteria.offset(index);
			}
		}, {
			key: 'from',
			value: function from(location) {
				(0, _utils.debug)("Clone resultset to change location: ", location);
				this.criteria = this.criteria.from(location);
			}
		}]);

		return ResultSet;
	}(), (_applyDecoratedDescriptor(_class.prototype, 'where', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'where'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'limit', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'limit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offset', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'offset'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'from', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'from'), _class.prototype)), _class);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC1zZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQVlhLFMsV0FBQSxTO0FBRVoscUJBQWEsS0FBYixFQUFvQztBQUFBLE9BQWhCLFFBQWdCLHlEQUFQLElBQU87O0FBQUE7O0FBQ25DLE9BQUssYUFBYSxJQUFsQixFQUF5QjtBQUN4QixlQUFXLHdCQUFYO0FBQ0EsSUFGRCxNQUdLLElBQUssRUFBRSxzQ0FBRixDQUFMLEVBQXVDO0FBQzNDLGVBQVcsdUJBQWMsUUFBZCxDQUFYO0FBQ0E7O0FBRUQsUUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFFBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBOzs7O3lCQVE4QjtBQUFBLFFBQTFCLEtBQTBCLHlEQUFwQixJQUFvQjtBQUFBLFFBQWQsTUFBYyx5REFBUCxJQUFPOztBQUM5QixRQUFJLEtBQUssS0FBSyxRQUFkO0FBQ0EsUUFBSyxLQUFMLEVBQWE7QUFBRSxVQUFLLEdBQUcsS0FBSCxDQUFVLEtBQVYsQ0FBTDtBQUF5QjtBQUN4QyxRQUFLLE1BQUwsRUFBYztBQUFFLFVBQUssR0FBRyxNQUFILENBQVcsTUFBWCxDQUFMO0FBQTJCOztBQUUzQyxzQkFBTywyQ0FBUCxFQUFvRCxLQUFLLEtBQUwsQ0FBVyxJQUEvRCxFQUFxRSxFQUFyRTtBQUNBLFdBQU8sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFnQixFQUFoQixDQUFQO0FBQ0E7OzsyQkFXTztBQUNQLFdBQU8sUUFBUSxTQUFSLENBQW1CLEtBQUssV0FBeEIsRUFBcUMsQ0FBQyxLQUFLLEtBQU4sRUFBYSxLQUFLLFFBQWxCLENBQXJDLENBQVA7QUFDQTs7O3lCQVVNLE0sRUFBUztBQUNmLHNCQUFPLG1DQUFQLEVBQTRDLE1BQTVDO0FBQ0EsU0FBSyxRQUFMLEdBQWdCLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBc0IsTUFBdEIsQ0FBaEI7QUFDQTs7O3lCQVVNLEssRUFBUTtBQUNkLHNCQUFPLGlDQUFQLEVBQTBDLEtBQTFDO0FBQ0EsU0FBSyxRQUFMLEdBQWdCLEtBQUssUUFBTCxDQUFjLEtBQWQsQ0FBcUIsS0FBckIsQ0FBaEI7QUFDQTs7OzBCQVdPLEssRUFBUTtBQUNmLHNCQUFPLGtDQUFQLEVBQTJDLEtBQTNDO0FBQ0EsU0FBSyxRQUFMLEdBQWdCLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBc0IsS0FBdEIsQ0FBaEI7QUFDQTs7O3dCQVVLLFEsRUFBVztBQUNoQixzQkFBTyxzQ0FBUCxFQUErQyxRQUEvQztBQUNBLFNBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW9CLFFBQXBCLENBQWhCO0FBQ0EiLCJmaWxlIjoicmVzdWx0LXNldC5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
