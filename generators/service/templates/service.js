(function() {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .factory('factory', <%= serviceName %>);

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
