

//var attributes = [
//    ['children', 'text'],
//    ['user', 'textUser']];

angular.module("blsTreeComponent", [])
.directive('blsTree', ['$log', '$compile', '$timeout', function ($log, $compile, $timeout) {
    var controller = ['$scope', function ($scope) {
        $scope.selectedNode = null;

        this.getSelectedNode = function () {
            return $scope.selectedNode;
        }

        this.setSelectedNode = function (node) {
            $scope.selectedNode = node;
        }

        $scope.node = {
            children: $scope.ngModel
        };
    }];

    var link = function (scope, element, attrs) {
        
    };

    return {
        restrict: 'E',
        controller: controller,
        template: '<ul><member ng-repeat="member in collection" ng-model="member"></member></ul>',
        replace: true,
        scope: {
            ngModel: '=',
            displayFn: '&'
        },
        link: link
    };

}]).directive('member', ['$compile', '$timeout', function ($compile, $timeout) {
    return {
        restrict: "E",
        require: '^blsTree',
        replace: true,
        link: function (scope, element, attrs, blsTreeCtrl) {
            //var template = '<ul>';

            //template += '<li ng-repeat="node in ngModel.children">' +
            //                '<div ng-click="selectNode(node)"><span ng-class="{\'jstree-clicked\': blsTreeCtrl.getSelectedNode() === node}">{{displayFn()(node)}}</span></div>' +
            //                '<tree-item ng-model="node" display-fn="displayFn()"></tree-item>' +
            //            '</li>';

            //template += '</ul>';

            var template = ''

            var elementTemplate = angular.element(template);
            element.append(elementTemplate);
            $compile(elementTemplate)(scope);


            scope.selectNode = function (node) {
                blsTreeCtrl.setSelectedNode(node);
                console.log(blsTreeCtrl.getSelectedNode());
            }

            blsTreeCtrl.getSelectedNode()

        },
        controller: ['$scope', function ($scope) {

        }],
        template: '<span></span>',
        scope: {
            ngModel: '=',
            displayFn: '&'
        }
    }
}]);