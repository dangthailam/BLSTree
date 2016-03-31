angular.module("blsTreeComponent", [])
.directive('blsTree', ['$log', '$compile', '$timeout', function ($log, $compile, $timeout) {
    var controller = ['$scope', function ($scope) {
        $scope.parentScopeOfTree = $scope.$parent;

        $scope.selectedNode = null;

        $scope.clickOnNode = function (node) {
            $scope.selectedNode = node;

            /* Call on select event */
            if ($scope.onSelect()) {
                $scope.onSelect()(node);
            }
        }

        $scope.toggleChildren = function (node) {
            node.state.opened = !node.state.opened;
        };

        setOpenState($scope.ngModel, $scope.childrenProperty, $scope.openAll);

        var template = '<div class="jstree jstree-1 jstree-default"><ul>';

        template += '<li ng-repeat="node in node.' + $scope.childrenProperty + ' | orderBy: \'' + $scope.orderProperty + '\'" class="tree-node" ng-class="{\'tree-closed\': !node.state.opened, \'tree-open\': node.state.opened, \'tree-last\': $last, \'tree-leaf\': node.' + $scope.childrenProperty + ' == null}">' +
                        '<div class="tree-node-row">' +
                            '<i class="tree-icon tree-ocl" ng-click="toggleChildren(node)"></i>' +
                            '<div class="" ng-click="clickOnNode(node)" ng-right-click="clickOnNode(node)" ng-class="{active: selectedNode === node}" tree-transclude></div>' +
                        '</div>' +
                        '<bls-tree-item ng-if="node.state.opened"></bls-tree-item>' +
                    '</li>';

        template += '</ul></div>';

        this.template = $compile(template);
    }];

    var compile = function (element, attrs, childTranscludeFn) {
        return {
            pre: function preLink(scope, element, attributes) {

            },
            post: function postLink(scope, element, attributes, blsTreeCtrl) {
                scope.$watch('ngModel', function (newVal) {
                    if (angular.isArray(newVal)) {
                        scope.node = {};
                        scope.node[scope.childrenProperty] = newVal;
                    } else {
                        scope.node = newVal;
                    }
                }, true);

                blsTreeCtrl.template(scope, function (clone) {
                    element.html('').append(clone);
                });

                scope.$treeTransclude = childTranscludeFn;
            }
        }
    };

    function setOpenState(nodeArr, childrenProperty, allOpened) {
        for (var i = 0; i < nodeArr.length; i++) {
            nodeArr[i].state = {
                opened: allOpened ? true : false
            };

            if (nodeArr[i][childrenProperty]) {
                setOpenState(nodeArr[i][childrenProperty], childrenProperty, allOpened);
            }
        };
    }

    return {
        restrict: 'E',
        controller: controller,
        compile: compile,
        scope: {
            ngModel: '=',
            onSelect: '&',
            asyncLoad: '&',
            childrenProperty: '@',
            openAll: '=',
            orderProperty: '@'
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