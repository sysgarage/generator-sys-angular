(function() {
  'use strict';

  angular
    .module('<%= module %>')
    .config(<%= routeName %>);

  /* @ngInject */
  function <%= routeName %>($stateProvider) {
    $stateProvider
      .state('<%= state %>', {
        url: '/<%= url %>',
        templateUrl: '<%= templateUrl %>',
        controller: '<%= controller %>',
        controllerAs: 'vm'
      });
  }

})();
