angular
  .module('app')
  .factory('FormHelper', function($location) {
    var FormHelper = {
      showError: function(property) {
        return property.$invalid && property.$dirty;
      },
      showSuccess: function(property) {
        return property.$valid && property.$dirty;
      },
      // form.setDirty() exists in v1.1 of Angular, but unfortunately
      // we can't fallback on the default functionality through
      // type checking because form.setDirty() doesn't work in 1.0.7
      // (and maybe other versions).
      setDirty: function(form) {
        for (var i in form) {
          var input = form[i];
          if (input.$pristine) {
            input.$pristine = false;
            input.$dirty = true;
          }
        }
      },
      // The same issue exists with form.setPristine().
      setPristine: function(form) {
        for (var i in form) {
          var input = form[i];
          if (input.$dirty) {
            input.$pristine = true;
            input.$dirty = false;
          }
        }
      },
      validateForm: function(form) {
        var errors = [];
        if (form.$error.required) {
          errors.push("Please fill out all required fields.");
        }
        if (form.$error.url) {
          errors.push("Please enter a valid URL.");
        }
        if (form.$error.email) {
          errors.push("Please enter a valid email address.");
        }
        this.setDirty(form);
        alert(errors.join("\n"));
      },
      create: function(form, model, callback) {
        if (form.$valid) {
          model.$save(function(resource) {
            callback();
          });
        } else {
          this.validateForm(form);
        }
      },
      update: function(form, model, callback) {
        if (form.$valid) {
          model.$update(function(resource) {
            callback();
          });
        } else {
          this.validateForm(form);
        }
      }
    };
    return FormHelper;
  });
