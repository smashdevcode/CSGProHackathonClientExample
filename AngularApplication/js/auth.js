
(function() {
    'use strict';

    angular
        .module('app')
        .factory('auth', auth);

    auth.$inject = ['$q', 'api', 'session'];

    function auth($q, api, session) {
        var service = {
            login: login,
            logout: logout
        };

        return service;

        function login(username, password) {
            session.username = username;
            session.password = password;

            // Attempt to get the user from the API.
            return api.getUser()
                .then(function () {
                    session.isAuthenticated = true;
                    return 'Login successful.';
                }, function () {
                    resetSession();
                    return $q.reject(Error('Login failed.'));
                });
        }

        function logout() {
            resetSession();
        }

        function resetSession() {
            session.isAuthenticated = false;
            session.username = null;
            session.password = null;
        }
    }
})();
