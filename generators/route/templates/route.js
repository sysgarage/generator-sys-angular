(function() {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .config(<%= routeName %>);

  /* @ngInject */
  function <%= routeName %>($stateProvider) {
    $stateProvider
      .state('<%= state %>', {
        url: '/<%= url %>',
        templateUrl: '<%= templateUrl %>',
        controller: '<%= controllerName %>',
        controllerAs: 'vm'
      });
  }

})();
