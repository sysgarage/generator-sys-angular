(function() {
  'use strict';

  angular
    .module('<%= module %>')
    .directive('<%= directiveName %>', <%= directiveName %>);

  /* @ngInject */
  function <%= directiveName %>() {
    var directive = {
      restrict: 'EA',
      templateUrl: '<%= templateUrl %>',
      scope: {},
      link: link,
      controller: <%= controllerName %>,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function link(scope, el, attr, vm) {

    }
  }

  /* @ngInject */
  function <%= controllerName %>() {
    var vm = this;
  }
})();
