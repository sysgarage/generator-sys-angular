(function() {
  'use strict';

  angular
    .module('<%= module %>')
    .controller('<%= controllerName %>', <%= controllerName %>);

  /* @ngInject */
  function <%= controllerName %>() {
    var vm = this;

    activate();

    function activate() {

    }
  }
})();
