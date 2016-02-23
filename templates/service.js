(function() {
  'use strict';

  angular
    .module('<%= module %>')
    .factory('<%= service %>', <%= service %>);

  /* @ngInject */
  function <%= service %>() {
    var service = {
      functionExample: functionExample
    };

    return service;

    function functionExample() {

    }
  }
})();
