var app = angular.module('igSearch', ['ngAnimate','angular-velocity']);

app.controller('instaController', function($scope, $http, $q, $timeout){

	function wait(){
		return $q(function(resolve, reject){
			$timeout(function(){
				resolve();
			}, 6000);
		});
	}



	$scope.searchGo = function(searchTerm){
		if($scope.searchIg.$valid){
			$scope.searchTermModel = '';

			$scope.resultModel = searchTerm;
			$scope.searchStatus = true;
			$scope.searchDone = false;

			$scope.searchIg.$pristine = true;

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

				$scope.searchStatus = false;
		      	$scope.results = data;
		      	$scope.searchDone = true;
		      	$('.notify > div').velocity('stop');
		      	
		    })
		    .then(wait)
		    .then(function(){
		    	$scope.searchDone = false;


		    });
		    return $scope.searchDone;
		}
	};

});