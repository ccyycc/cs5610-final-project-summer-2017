(function () {
    angular
        .module('FinalProject')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            findUserByUsername: findUserByUsername,
            populateRecipesAndProducts: populateRecipesAndProducts,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            updateProfile: updateProfile,

            login: login,
            logout: logout,
            loggedin: loggedin,
            register: register,
            checkAdmin: checkAdmin,
            unregister: unregister
        };
        return api;


        function unregister() {
            var url = "/api/unregister";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function register(user) {
            var url = "/api/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/checkname?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    // console.log(response);
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = '/api/user/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    if (response.status == undefined) {
                        return null;
                    } else {
                        return response.data;
                    }
                })
        }

        function updateProfile(user) {
            // console.log(user);
            var url = '/api/update';
            // console.log(user);
            return $http.put(url, user)
                .then(function (response) {
                    // console.log(response.data);
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            // console.log(user);
            var url = '/api/user/' + userId;
            console.log(user);
            return $http.put(url, user)
                .then(function (response) {
                    // console.log(response.data);
                    return response.data;
                });
        }


        function deleteUser(userId) {
            var url = '/api/user/' + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findAllUsers() {
            var url='/api/user';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function populateRecipesAndProducts(userId) {
            var url = '/api/userpop/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();