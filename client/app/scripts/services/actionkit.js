angular.module('app').factory('actionKitService', ['$http', function($http) {

    var getPetitionForm = function(cms_url) {
        var url = '/api/actionkit/getPetitionForm';

        return $http({
            method: 'GET',
            url: url,
            params: {
                'petitionFormUrl': cms_url
            }
        }).
        then(function(response) {

            if (response.status === 200 && response.data.error === false) {
                return response.data.response;
            } else {
                return false;
            }

        }, function() {
            return false;
        });
    };

    return {

        createUser: function(user) {

            var url = '/api/actionkit/createUser';

            return $http({
                method: 'POST',
                url: url,
                data: user
            }).
            then(function(response) {

                if (response.status === 200 && response.data.error === false) {
                    return response.data.response;
                } else {
                    return false;
                }

            }, function() {
                return false;
            });

        },

        getUser: function(email) {

            var url = '/api/actionkit/getUser';

            return $http({
                method: 'GET',
                url: url,
                params: {
                    'email': email
                }
            }).
            then(function(response) {

                if (response.status === 200 && response.data.error === false) {
                    return response.data.response;
                } else {
                    return false;
                }

            }, function() {
                return false;
            });
        },

        getPage: function(shortname) {

            var url = '/api/actionkit/getPage';

            return $http({
                method: 'GET',
                url: url,
                params: {
                    'shortname': shortname
                }
            }).
            then(function(response) {

                if (response.status === 200 && response.data.error === false) {
                
                    // get the petition information if it is one
                    if(response.data.response.type === 'Petition') {
                        return getPetitionForm(response.data.response.cms_form).then(function(petitionResponse) {
                            response.data.response.petitionForm = petitionResponse;
                            return response.data.response;
                        });
                    } else {
                        return response.data.response;
                    }
                    
                } else {
                    return false;
                }

            }, function() {
                return false;
            });
        },

        doAction: function(action) {

            var url = '/api/actionkit/doAction';

            return $http({
                method: 'POST',
                url: url,
                data: action
            }).
            then(function(response) {

                if (response.status === 200) {
                    if (response.data.error === false) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }

            }, function() {
                return false;
            });

        }
    };
}]);