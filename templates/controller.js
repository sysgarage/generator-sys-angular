(function() {
  'use strict';

  angular
    .module('<%= module %>')
    .controller('<%= controller %>', <%= controller %>);

  /* @ngInject */
  function <%= controller %>() {
    var vm = this;

    activate();

    function activate() {

    }
  }
})();
