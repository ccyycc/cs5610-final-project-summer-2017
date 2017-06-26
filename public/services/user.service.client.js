(function () {
    angular
        .module('FinalProject')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findMe: findMe,
            findAllUsers: findAllUsers,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            updateProfile: updateProfile,

            login: login,
            logout: logout,
            loggedin: loggedin,
            register: register,
            checkAdmin: checkAdmin,
            unregister: unregister,

            // populateRecipesAndProducts: populateRecipesAndProducts,
            follow: follow,
            unfollow: unfollow,
            addLikedRecipe: addLikedRecipe,
            deleteLikedRecipe: deleteLikedRecipe,
            sendMessage: sendMessage,
            deleteMessage: deleteMessage,
            // renderMessage: renderMessage,
            populateArr: populateArr,
            countBmi: countBmi
            // showFollowings: showFollowings,
            // showFollowers: showFollowers
        };
        return api;

        function sendMessage(userId, message) {
            var url='/api/message/' + userId;
            return $http.put(url, message)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteMessage(messageId) {
            var url='/api/association/comment/' + messageId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }


        function follow(followingId) {
            var url='/api/follow/' + followingId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function unfollow(followingId) {
            var url='/api/unfollow/' + followingId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function addLikedRecipe(rId) {
            getHelper('/api/addLikedRecipe/' + rId);
        }

        function deleteLikedRecipe(rId) {
            getHelper('/api/deleteLikeRecipe/' + rId);
        }

        function getHelper(url) {
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function showFollowings(userId) {
            var url='/api/showFollowings/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function showFollowers(userId) {
            var url='/api/showFollowers/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function unregister() {
            var url = "/api/unregister";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function register(user) {
            var url = "/api/register";
            console.log('user.service.client user: ' + user);
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
            console.log(url + '--url--uesr.service.client');
            return $http.get(url)
                .then(function (response) {
                    // console.log(response);
                    return response.data;
                });
        }

        function findMe() {
            var url = '/api/user/findme';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
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

        function populateArr(userId, arrName) {
            var url = '/api/user/populate/' + arrName +'/' + userId;
            return $http.get(url)
                .then(function (response) {
                    // console.log(response.data);
                    // console.log("--- user.service.client -- populateArr(" + arrName);
                    return response.data;
                })
        }

        function countBmi(figure) {
            // console.log(figure);
            return $http.post('/api/account/bmiCal', figure)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();