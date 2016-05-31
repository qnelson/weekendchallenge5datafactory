myApp.controller('FavoritesController', ['$scope', '$http', function($scope, $http)

    {
        $scope.favorites = [];
        $scope.counter = 0;

        getFavorites();

        function getFavorites() {
            $http.get('/pets')
                .then(function(response) {
                    response.data.forEach(function(pet) {

                    });

                    $scope.favorites = response.data;
                    console.log('GET /pets ', response.data);
                    $scope.counter = $scope.favorites.length
                    console.log($scope.counter);
                });

        }

    }

]);
