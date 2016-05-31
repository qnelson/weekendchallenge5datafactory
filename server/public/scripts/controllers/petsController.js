myApp.controller('PetsController', ['$scope', '$http', function($scope, $http)

    {
        var key = 'e305dff079f1bc66497b46f75d9a980f';
        var baseURL = 'http://api.petfinder.com/';

        $scope.pets = ["barnyard", "bird", "cat", "dog", "horse", "pig", "reptile", "smallfurry"];
        $scope.favorites = [];
        $scope.currentPet = {};
        $scope.counter = 0;

        $scope.getRandomPet = function() {

            var query = 'pet.getRandom';
            query += '?key=' + key;
            query += '&animal=' + $scope.selectedPet;
            query += '&output=basic';
            query += '&format=json';

            var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

            console.log(request);

            $http.jsonp(request).then(
                function(response) {
                    $scope.animal = response.data.petfinder.pet;
                    $scope.currentPet = {
                        petID: $scope.animal.id.$t,
                        petName: $scope.animal.name.$t,
                        imageURL: $scope.animal.media.photos.photo[3].$t,
                        description: $scope.animal.description.$t.substr(0, 100)
                    };
                    return $scope.currentPet;
                }
            );
        };

        $scope.favoritePet = function() {
            var data = $scope.currentPet;
            $http.post('/pets', data)
                .then(function() {
                    console.log('POST /pets');
                });

            $scope.counter++;
        };
    }
]);
