
var app = angular.module('waddup',[]);
//$rootScope.user=$scope.user.name;
//$rootScope.recpt=$scope.user.recipient;

app.controller('mainController',function ($scope, $http){

	$scope.messages = [];
	$scope.goOn = function(){
		console.log($scope.user);
		$http.post('/verify',$scope.user).success(function(res){
			if (res=='failUser'){
				alert('User doesn\'t exist');
			}
			
			else if(res=='failPassword'){
				alert('Wrong password');
			}
			
			else if (res=='failRecipient'){
				alert('Recipient doesn\'t exist');
			}
			else if (res=='done'){
				$http.post('/fetchMessages',$scope.user).success(function(res){
					
					res.forEach(function(x){
						$scope.messages.push(x);

					});
					console.log($scope.messages);
					

					});
					
				};
			

		});

	}

	$scope.sendMessage= function(){
		console.log($scope.newMessage);
		$http.post('/send', [$scope.user.username,$scope.user.recipient,$scope.newMessage]).success(function(res){

			console.log(res);

			
		});
	}




});
