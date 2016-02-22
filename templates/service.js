(function() {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .factory('<%= serviceName %>', <%= serviceName %>);

  /* @ngInject */
  function <%= serviceName %>() {
    var service = {
      functionExample: functionExample
    };

    return service;

    function functionExample() {

    }
  }
})();
