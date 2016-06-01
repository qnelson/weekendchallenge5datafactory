myApp.controller('PetsController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory)

            {
                var key = 'e305dff079f1bc66497b46f75d9a980f';
                var baseURL = 'http://api.petfinder.com/';

                $scope.dataFactory = DataFactory;
                $scope.currentPet = {};
                $scope.pets = [{
                    type: "bird",
                    label: "Birds"
                }, {
                    type: "cat",
                    label: "Cats"
                }, {
                    type: "dog",
                    label: "Dogs"
                }, {
                    type: "horse",
                    label: "Horses"
                }, {
                    type: "pig",
                    label: "Pigs"
                }, {
                    type: "reptile",
                    label: "Reptiles"
                }, {
                    type: "smallfurry",
                    label: "Small & Furry"
                }, {
                    type: "barnyard",
                    label: "Barnyard Animals"
                }];

                $scope.favorites = 0;

                if ($scope.dataFactory.factoryGetFavorites() === undefined) {
                    $scope.dataFactory.factoryRefreshFavoriteData().then(function() {
                        $scope.count = $scope.dataFactory.factoryGetFavorites().length;
                    });
                } else {
                    $scope.count = $scope.dataFactory.factoryGetFavorites().length;
                }


                $scope.getRandomPet = function() {

                    var query = 'pet.getRandom';
                    query += '?key=' + key;
                    query += '&animal=' + $scope.selectedPet.type;
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
                                description: $scope.animal.description.$t ? $scope.animal.description.$t.substr(0, 100) : "No description provided"
                            };
                            return $scope.currentPet;
                        }
                    );
                };

                $scope.addFavorite = function() {
                    var favorite = {
                        petID: $scope.animal.id.$t,
                        petName: $scope.animal.name.$t,
                        imageURL: $scope.animal.media.photos.photo[3].$t,
                        description: $scope.animal.description.$t.substring(0, 100)
                    };

                    if ($scope.animal.media.photos) {
                        if ($scope.animal.media.photos.photo[2].$t) {
                            favorite.petImageURL = $scope.animal.media.photos.photo[2].$t;
                        }
                    }

                    $scope.dataFactory.factorySaveFavorite(favorite).then(function() {
                        console.log('done saving');
                        $scope.count = $scope.dataFactory.factoryGetFavorites().length;
                    });
                };

}]);
