angular
  .module('app')
  .directive('datePicker', function() {
    return {
      replace: false,
      link: function(scope, element, attr, ctrl) {
          element.datepicker();
      },
      require: 'ngModel'
      // scope: {
      //   project.end_date: 'ngModel'
      // },

    };
  });
