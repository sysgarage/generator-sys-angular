(function() {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .controller('<%= controllerName %>', <%= controllerName %>);

  /* @ngInject */
  function <%= controllerName %>() {
    var vm = this;

    activate();

    function activate() {

    }
  }
})();
