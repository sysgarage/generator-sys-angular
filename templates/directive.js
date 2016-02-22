(function() {
  'use strict';

  angular
    .module('<%= module %>')
    .directive('<%= directive %>', <%= directive %>);

  /* @ngInject */
  function <%= directive %>() {
    var directive = {
      restrict: 'EA',
      templateUrl: '<%= templateUrl %>',
      scope: {},
      link: link,
      controller: <%= controller %>,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function link(scope, el, attr, vm) {

    }
  }

  /* @ngInject */
  function <%= controller %>() {
    var vm = this;
  }
})();
