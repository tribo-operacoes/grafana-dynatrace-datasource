'use strict';

System.register(['./datasource', './query_ctrl'], function (_export, _context) {
  "use strict";

  var DynatraceDatasource, DynatraceDatasourceQueryCtrl, DynatraceConfigCtrl, DynatraceQueryOptionsCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_datasource) {
      DynatraceDatasource = _datasource.default;
    }, function (_query_ctrl) {
      DynatraceDatasourceQueryCtrl = _query_ctrl.default;
    }],
    execute: function () {
      _export('ConfigCtrl', DynatraceConfigCtrl = function DynatraceConfigCtrl() {
        _classCallCheck(this, DynatraceConfigCtrl);
      });

      DynatraceConfigCtrl.templateUrl = 'partials/config.html';

      _export('QueryOptionsCtrl', DynatraceQueryOptionsCtrl = function DynatraceQueryOptionsCtrl() {
        _classCallCheck(this, DynatraceQueryOptionsCtrl);
      });

      DynatraceQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

      _export('Datasource', DynatraceDatasource);

      _export('ConfigCtrl', DynatraceConfigCtrl);

      _export('QueryCtrl', DynatraceDatasourceQueryCtrl);

      _export('QueryOptionsCtrl', DynatraceQueryOptionsCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
