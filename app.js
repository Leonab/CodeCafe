angular.module('MyApp', ['ngMaterial', 'angular-loading-bar', 'ngAnimate'])

.config(function($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('pink')
        .accentPalette('orange');


})



.controller('main', ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav) {
    $scope.$watch('search', function() {
        fetch();
    });

    $scope.toggleSidenav = function(menuId) {
      
        $mdSidenav(menuId).toggle();
    };
	


    function fetch() {

        $http.get("http://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_submissions&page=1")
            .then(function(response) {
             
			    
                $scope.details = response.data;
				console.log($scope.details);
				
				$http.get("http://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_compiler_image")
                    .then(function(response) {
						
						$scope.url = response.data;
						console.log($scope.url);
						
										
				var size1 = $scope.details.websites.length;
                var size2 = $scope.url.length;   
				/*if(localStorage.num)
					console.log("yum");
				else
				{*/
			    
				for (var i = 0; i < size1; ++i)
				{
					if($scope.details.websites[i].compiler_status[0]==='A')
						$scope.details.websites[i].cstatus = 1;
					else if($scope.details.websites[i].compiler_status[0]==='S')
						$scope.details.websites[i].cstatus = 2;
					else if($scope.details.websites[i].compiler_status[0]==='T')
						$scope.details.websites[i].cstatus = 3;
					else if($scope.details.websites[i].compiler_status[0]==='C')
						$scope.details.websites[i].cstatus = 4;
					else if($scope.details.websites[i].compiler_status[0]==='W')
						$scope.details.websites[i].cstatus = 5;
				}
				
				for (var i = 0; i < size1; ++i) 
				{
					for(var j=0; j < size2; j++)
					{
						
					
					if($scope.url[j].language===$scope.details.websites[i].language)
					$scope.details.websites[i].icon = $scope.url[j].icon;
					}
				}
					});
					
				
	$scope.selected = []; 
	$scope.options = [];
	 
     $scope.toggle = function (item, list) {
       var idx = list.indexOf(item);
       if (idx > -1) list.splice(idx, 1);
       else list.push(item);
     };
     
     // is item exists in list
     $scope.exists = function (item, list) {
       return list.indexOf(item) > -1;
     };
     
     // process user data and prepare whole places
     angular.forEach($scope.details.websites, function(item, key) {
        if($scope.options.indexOf(item.compiler_status) == -1) {
            $scope.options.push(item.compiler_status);
        }     
     });

				
				console.log($scope.details);

            });


    }
	
	
	
	
	$scope.store = function() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
        document.getElementById("result").innerHTML = "Total Upvotes:" + localStorage.clickcount;
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}


	 
	 
 
	

}])



.filter('selectedTags', function() {
    // filter to check array of elements
    return function(item,tags) {
        return item.filter(function(item) {
            if (tags.indexOf(item.compiler_status) != -1) {
                return true;
            } else if(tags.length == 0) {
                return true;
            }
            return false;

        });
    };
});
