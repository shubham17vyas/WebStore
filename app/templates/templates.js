angular.module("templateStore.templates", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/templates', {
        controller:'TemplatesCtrl',
        templateUrl: 'templates/templates.html'
    })
    .when('/templates/:templateId', {
        controller:'TemplateDetailsCtrl',
        templateUrl: 'templates/template-details.html'
    });
}])

.controller('TemplatesCtrl', ['$scope', '$http', function($scope, $http){
    $http 
    .get('json/templates.json')
        .success(function(data){
            $scope.templates = data;
        })
        .error(function(data){
        return data;
    });
}])
.controller('TemplateDetailsCtrl', ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
    var templateId = $routeParams.templateId; 
    $http 
    .get('json/templates.json')
        .success(function(data){
            $scope.template = $filter('filter')(data, function(d){
                return d.id == templateId;
            })[0];
        $scope.mainImage = $scope.template.images[0].name;
        })
        .error(function(data){
        return data;
    });
    
    $scope.setImage=function(image){
        $scope.mainImage = image.name;
    }
}]);