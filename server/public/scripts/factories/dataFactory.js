myApp.factory('DataFactory', ['$http', function($http) {
  console.log('dataFactory running');

  // PRIVATE
  var favorites = undefined;

  function getFavoriteData() {
    var promise = $http.get('/pets').then(function(response) {
      console.log('Async data returned: ', response.data);
      favorites = response.data;
    });

    return promise;
  }

  function saveFavorite(newFav) {
    var promise = $http.post('/pets', newFav).then(function(response) {
      if(response.status == 201) {
        console.log('Favorite Saved');
        return getFavoriteData();
      } else {
        console.log('Boo!', response.data);
      }
    });

    return promise;
  }

  // PUBLIC
  var publicApi = {
    factorySaveFavorite: function(newFavorite) {
      return saveFavorite(newFavorite);
    },
    factoryRefreshFavoriteData: function() {
      return getFavoriteData();
    },
    factoryGetFavorites: function() {
      // return our array
      return favorites;
    }
  };

  return publicApi;

}]);
