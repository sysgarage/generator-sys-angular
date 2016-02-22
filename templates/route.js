(function() {
  'use strict';

  angular
    .module('<%= module %>')
    .config(<%= route %>);

  /* @ngInject */
  function <%= route %>($stateProvider) {
    $stateProvider
      .state('<%= state %>', {
        url: '/<%= url %>',
        templateUrl: '<%= templateUrl %>',
        controller: '<%= controller %>',
        controllerAs: 'vm'
      });
  }

})();
