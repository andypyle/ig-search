var app = angular.module('igSearch', []);

app.controller('instaController', function($scope, $http, $q, $timeout){

	/*
	function wait(){
		return $q(function(resolve, reject){
			$timeout(function(){
				resolve();
			}, 2000);
		});
	};
	*/



	$scope.searchGo = function(searchTerm){
		$scope.searchTermModel = searchTerm;

		var url = 'https://api.instagram.com/v1/tags/' + searchTerm + '/media/recent?callback=JSON_CALLBACK';
		var req = {
			client_id		: "bae40bc9101a4dab9b01d676adecc2a1",
			client_secret 	: "4f7d96476e4046eaa3e135861b5f0c50",
			count			: 20
		};

		$http({
			method:'jsonp',
			url: url,
			params: req
		})
		.success(function(data){
	      	$scope.results = data;
	    });
	};

});