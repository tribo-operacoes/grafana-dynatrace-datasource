'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryOptionsCtrl = exports.QueryCtrl = exports.ConfigCtrl = exports.Datasource = undefined;

var _datasource = require('./datasource');

var _datasource2 = _interopRequireDefault(_datasource);

var _query_ctrl = require('./query_ctrl');

var _query_ctrl2 = _interopRequireDefault(_query_ctrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DynatraceConfigCtrl = function DynatraceConfigCtrl() {
  _classCallCheck(this, DynatraceConfigCtrl);
};

DynatraceConfigCtrl.templateUrl = 'partials/config.html';

var DynatraceQueryOptionsCtrl = function DynatraceQueryOptionsCtrl() {
  _classCallCheck(this, DynatraceQueryOptionsCtrl);
};

DynatraceQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

exports.Datasource = _datasource2.default;
exports.ConfigCtrl = DynatraceConfigCtrl;
exports.QueryCtrl = _query_ctrl2.default;
exports.QueryOptionsCtrl = DynatraceQueryOptionsCtrl;
//# sourceMappingURL=module.js.map
