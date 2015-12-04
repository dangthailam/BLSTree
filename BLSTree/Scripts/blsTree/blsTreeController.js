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

        var template = '<ul>' + 
                '<li ng-repeat="node in node.children">' +
                    '<div ng-click="selectNode(node)" ng-class="{active: selectedNode === node}">' +
                        '<i ng-if="node.children != null" class="glyphicon" ng-class="{\'glyphicon-plus\': !node.state.opened, \'glyphicon-minus\': node.state.opened}" ng-click="toggleChildren(node)"></i>' +
                        '<span tree-transclude></span>' +
                    '</div>' +
                    '<tree-item ng-if="node.state.opened && node.children != null && node.children.length > 0"></tree-item>' +
                '</li>' +
            '</ul>';


        this.template = $compile(template);
    }];

    var link = function (scope, element, attrs) {
        
    };

    return {
        restrict: 'E',
        controller: controller,
        compile: function (element, attrs, childTranscludeFn) {
            return function (scope, element, attrs, blsTreeCtrl) {
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
        },
        scope: {
            ngModel: '=',
            onSelect: '&'
        },
        link: link,
        transclude: true
    };

}]).directive("treeItem", function () {
    return {
        restrict: 'E',
        require: "^blsTree",
        link: function (scope, element, attrs, blsTreeCtrl) {
            // Rendering template for the current node
            blsTreeCtrl.template(scope, function (clone) {
                element.html('').append(clone);
            });
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
            //if (!scope.options.isLeaf(scope.node)) {
            //    angular.forEach(scope.expandedNodesMap, function (node, id) {
            //        if (scope.options.equality(node, scope.node)) {
            //            scope.expandedNodesMap[scope.$id] = scope.node;
            //            scope.expandedNodesMap[id] = undefined;
            //        }
            //    });
            //}
            //if (!scope.options.multiSelection && scope.options.equality(scope.node, scope.selectedNode)) {
            //    scope.selectedNode = scope.node;
            //} else if (scope.options.multiSelection) {
            //    var newSelectedNodes = [];
            //    for (var i = 0; (i < scope.selectedNodes.length) ; i++) {
            //        if (scope.options.equality(scope.node, scope.selectedNodes[i])) {
            //            newSelectedNodes.push(scope.node);
            //        }
            //    }
            //    scope.selectedNodes = newSelectedNodes;
            //}

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