'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DynatraceDatasource = function () {
  function DynatraceDatasource(instanceSettings, $q, backendSrv, templateSrv) {
    _classCallCheck(this, DynatraceDatasource);

    this.type = instanceSettings.type;
    this.name = instanceSettings.name;
    this.q = $q;

    this.id = instanceSettings.jsonData.id;
    this.token = instanceSettings.jsonData.token;

    this.url = instanceSettings.url + '/e/' + this.id + '/api/v1/timeseries';

    this.headers = { Authorization: 'Api-Token ' + this.token };

    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
  }

  _createClass(DynatraceDatasource, [{
    key: 'doRequest',
    value: function doRequest(options) {
      options.url = this.url;
      options.headers = this.headers;
      return this.backendSrv.datasourceRequest(options);
    }
  }, {
    key: 'testDatasource',
    value: function testDatasource() {
      return this.doRequest({}).then(function () {
        return {
          status: 'success', message: 'Data source is working', title: 'Success'
        };
      }).catch(function () {
        return {
          status: 'error', message: 'Datasource test failed', title: 'Error'
        };
      });
    }
  }, {
    key: 'query',
    value: function query(options) {
      var _this = this;

      var targets = _lodash2.default.filter(options.targets, function (target) {
        return !target.hide;
      });
      var fromTs = options.range.from._d.getTime();
      var toTs = options.range.to._d.getTime();
      var requests = [];

      Object.keys(targets).forEach(function (t) {
        var opts = {
          method: 'POST',
          data: {
            aggregationType: targets[t].aggregation,
            endTimestamp: toTs,
            startTimestamp: fromTs,
            timeseriesId: targets[t].target
          }
        };
        requests[t] = _this.doRequest(opts);
      });

      // TODO: this throws an error when one of the requests fails
      // Would be better to finish all requests which do work
      return this.q.all(requests).then(function (results) {
        var metrics = [];

        Object.keys(results).forEach(function (r) {
          var regexp = new RegExp(targets[r].filter);
          var m = DynatraceDatasource.processDatapoints(results[r].data.result);

          metrics = metrics.concat(_lodash2.default.filter(m, function (serie) {
            return regexp.test(serie.target);
          }));
        });

        return { data: metrics };
      }).catch(function () {
        return {
          data: [] // TODO: Handle properly
        };
      });
    }
  }, {
    key: 'getEntities',
    value: function getEntities(target, dimension) {
      var options = {
        method: 'POST',
        data: {
          aggregationType: 'AVG',
          relativeTime: 'hour',
          timeseriesId: target
        }
      };

      return this.doRequest(options).then(function (res) {
        var entities = _lodash2.default.pickBy(res.data.result.entities, function (key) {
          return _lodash2.default.startsWith(key, dimension);
        });

        return _lodash2.default.map(entities, function (d, i) {
          return { text: d, value: i };
        });
      });
    }
  }, {
    key: 'metricFindQuery',
    value: function metricFindQuery() {
      // var interpolated = {
      //     target: this.templateSrv.replace(query, null, 'regex')
      // };

      return this.doRequest({
        method: 'GET'
      }).then(DynatraceDatasource.getTsNames);
    }
  }, {
    key: 'metricFindDetails',
    value: function metricFindDetails(query) {
      // TODO: Don't do a new request but take results from findquery
      return this.doRequest({
        method: 'GET'
      }).then(function (res) {
        var entry = _lodash2.default.filter(res.data, function (item) {
          return item.timeseriesId === query;
        })[0];

        return entry;
      }).catch(function () {
        return false;
      });
    }
  }], [{
    key: 'processDatapoints',
    value: function processDatapoints(result) {
      var r = [];

      Object.keys(result.dataPoints).forEach(function (tsid) {
        var label = '';
        var dp = result.dataPoints[tsid].map(function (x) {
          return [x[1], x[0]];
        });
        var identifiers = tsid.split(', ');

        Object.keys(identifiers).forEach(function (id) {
          label += result.entities[identifiers[id]] + ' ';
        });

        r.push({
          target: label,
          datapoints: dp
        });
      });

      return r;
    }
  }, {
    key: 'getTsNames',
    value: function getTsNames(result) {
      return _lodash2.default.map(result.data, function (d) {
        return { text: d.timeseriesId, value: d.timeseriesId };
      });
    }
  }]);

  return DynatraceDatasource;
}();

exports.default = DynatraceDatasource;
//# sourceMappingURL=datasource.js.map
