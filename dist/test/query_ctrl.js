'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sdk = require('app/plugins/sdk');

require('./css/query-editor.css!');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DynatraceDatasourceQueryCtrl = function (_QueryCtrl) {
  _inherits(DynatraceDatasourceQueryCtrl, _QueryCtrl);

  function DynatraceDatasourceQueryCtrl($scope, $injector) {
    _classCallCheck(this, DynatraceDatasourceQueryCtrl);

    var _this = _possibleConstructorReturn(this, (DynatraceDatasourceQueryCtrl.__proto__ || Object.getPrototypeOf(DynatraceDatasourceQueryCtrl)).call(this, $scope, $injector));

    _this.scope = $scope;
    _this.target.target = _this.target.target || 'select metric';
    _this.target.aggregation = _this.target.aggregation || 'select aggregation';

    _this.target.detail = _this.target.detail || {};

    _this.updateMetricDetails(_this.target.target);
    return _this;
  }

  _createClass(DynatraceDatasourceQueryCtrl, [{
    key: 'getMetricList',
    value: function getMetricList() {
      return this.datasource.metricFindQuery();
    }
  }, {
    key: 'getEntities',
    value: function getEntities(query, dimension) {
      return this.datasource.getEntities(query, dimension);
    }
  }, {
    key: 'updateMetricDetails',
    value: function updateMetricDetails(query) {
      var _this2 = this;

      this.datasource.metricFindDetails(query).then(function (res) {
        _this2.target.detail = res;
      });
    }
  }, {
    key: 'onChangeInternal',
    value: function onChangeInternal(query) {
      this.updateMetricDetails(query);
      this.panelCtrl.refresh();
    }
  }]);

  return DynatraceDatasourceQueryCtrl;
}(_sdk.QueryCtrl);

exports.default = DynatraceDatasourceQueryCtrl;


DynatraceDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
//# sourceMappingURL=query_ctrl.js.map
