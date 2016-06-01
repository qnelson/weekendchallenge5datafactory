myApp.controller('FavoritesController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
  console.log('favorite controller running');
  $scope.dataFactory = DataFactory;

  $scope.favorites = [];
  $scope.count = 0;

  if($scope.dataFactory.factoryGetFavorites() === undefined) {
    $scope.dataFactory.factoryRefreshFavoriteData().then(function() {
      $scope.favorites = $scope.dataFactory.factoryGetFavorites();
      $scope.count = $scope.favorites.length;
    });
  } else {
    $scope.favorites = $scope.dataFactory.factoryGetFavorites();
    $scope.count = $scope.favorites.length;
  }

}]);
