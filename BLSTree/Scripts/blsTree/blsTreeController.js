angular.module("blsTreeComponent", [])
.directive('blsTree', ['$log', '$compile', '$timeout', function ($log, $compile, $timeout) {
    var controller = ['$scope', function ($scope) {
        $scope.parentScopeOfTree = $scope.$parent;

        $scope.selectedNode = null;

        $scope.selectNode = function (node) {
            $scope.selectedNode = node;

            /* Call on select event */
            if ($scope.onSelect()) {
                $scope.onSelect()(node);
            }
        }

        $scope.toggleChildren = function (node) {
            node.state.opened = !node.state.opened;
        };

        var hasChildrenExpr = 'true ';
        for (var i = 0; i < $scope.childrenProperty.length; i++) {
            hasChildrenExpr += '&& node.' + $scope.childrenProperty[i] + ' == null';
        }

        var template = '<ul>';

        for (var i = 0; i < $scope.childrenProperty.length; i++) {
            template += '<li ng-repeat="node in node.' + $scope.childrenProperty[i] + '" class="tree-node">' +
                            '<i class="glyphicon" ng-class="{\'glyphicon-expand\': !node.state.opened, \'glyphicon-collapse-down\': node.state.opened, \'no-icon\': ' + hasChildrenExpr + '}" ng-click="toggleChildren(node)"></i>' +
                            '<span ng-click="selectNode(node)" ng-class="{active: selectedNode === node}" tree-transclude></span>' +
                            '<bls-tree-item ng-if="node.state.opened"></bls-tree-item>' +
                        '</li>';
        }
        template += '</ul>';

        this.template = $compile(template);
    }];

    var compile = function (element, attrs, childTranscludeFn) {
        return {
            pre: function preLink(scope, element, attributes) {

            },
            post: function postLink(scope, element, attributes, blsTreeCtrl) {
                scope.$watch('ngModel', function (newVal) {
                    if (angular.isArray(newVal)) {
                        for (var i = 0; i < newVal.length; i++) {
                            newVal[i].state = {
                                opened: false
                            };
                        };

                        scope.node = {
                            children: newVal
                        };
                    } else {
                        scope.node = newVal
                    }
                });

                blsTreeCtrl.template(scope, function (clone) {
                    element.html('').append(clone);
                });

                scope.$treeTransclude = childTranscludeFn;
            }
        }
    };

    return {
        restrict: 'E',
        controller: controller,
        compile: compile,
        scope: {
            ngModel: '=',
            onSelect: '&',
            asyncLoad: '&',
            childrenProperty: '='
        },
        transclude: true
    };

}]).directive("blsTreeItem", function () {
    return {
        restrict: 'E',
        require: "^blsTree",
        link: function (scope, element, attrs, blsTreeCtrl) {
            // Rendering template for the current node

            if (scope.asyncLoad() && scope.node.children != null && scope.node.children.length == 0) {

                scope.asyncLoad()().then(function (data) {
                    scope.node.children = data;

                    blsTreeCtrl.template(scope, function (clone) {
                        element.html('').append(clone);
                    });
                });
            } else {
                blsTreeCtrl.template(scope, function (clone) {
                    element.html('').append(clone);
                });
            }
        },
        transclude: true,
        replace: true
    };
}).directive("treeTransclude", function () {
    return {
        link: function (scope, element, attrs, controller) {
            if (!scope.node.state) {
                scope.node.state = {
                    opened: false
                };
            }

            // create a scope for the transclusion, whos parent is the parent of the tree control
            scope.transcludeScope = scope.parentScopeOfTree.$new();
            scope.transcludeScope.node = scope.node;
            scope.transcludeScope.$parentNode = (scope.$parent.node === scope.synteticRoot) ? null : scope.$parent.node;
            scope.transcludeScope.$index = scope.$index;
            scope.transcludeScope.$first = scope.$first;
            scope.transcludeScope.$middle = scope.$middle;
            scope.transcludeScope.$last = scope.$last;
            scope.transcludeScope.$odd = scope.$odd;
            scope.transcludeScope.$even = scope.$even;

            scope.$on('$destroy', function () {
                scope.transcludeScope.$destroy();
            });

            scope.$treeTransclude(scope.transcludeScope, function (clone) {
                element.empty();
                element.append(clone);
            });
        }
    };
});