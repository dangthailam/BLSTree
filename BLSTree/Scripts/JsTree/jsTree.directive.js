/*
 * jstree.directive [http://www.jstree.com]
 * http://arvindr21.github.io/jsTree-Angular-Directive
 *
 * Copyright (c) 2014 Arvind Ravulavaru
 * Licensed under the MIT license.
 */

var ngJSTree = angular.module('jsTree.directive', []);
ngJSTree.directive('jsTree', ['$http', '$timeout', function ($http, $timeout) {

    //scope isolate
    var treeDir = {
        scope:true,
        restrict: 'EA',
        fetchResource: function (url, cb) {
            return $http.get(url).then(function (data) {
                if (cb) cb(data.data);
            });
        },

        managePlugins: function (s, e, a, config) {
            if (a.treePlugins) {
                config.plugins = a.treePlugins.split(',');
                config.core = config.core || {};
                config.core.check_callback = config.core.check_callback || true;
                if (config.plugins.indexOf('state') >= 0) {
                    config.state = config.state || {};
                    config.state.key = a.treeStateKey;
                }
                if (config.plugins.indexOf('search') >= 0) {
                    config.search = config.search || {};
                    config.search.show_only_matches = true;


                }

                if (config.plugins.indexOf('checkbox') >= 0) {
                    config.checkbox = config.checkbox || {};
                    config.checkbox.keep_selected_style = false;
                }

                if (config.plugins.indexOf('contextmenu') >= 0) {
                    if (a.treeContextmenu) {
                        config.contextmenu = config.contextmenu || {};

                        if (a.treeContextmenuaction != undefined) {
                            config.contextmenu.items = function (e) {
                                return s.$eval(a.treeContextmenuaction)(e);
                            }
                        } else {
                            config.contextmenu.items = function () {
                                return s[a.treeContextmenu];
                            }
                        }
                    }
                }

                if (config.plugins.indexOf('types') >= 0) {
                    if (a.treeTypes) {
                        config.types = s[a.treeTypes];
                    }
                }

                if (config.plugins.indexOf('dnd') >= 0) {
                    if (a.treeDnd) {
                        config.dnd = s[a.treeDnd];
                    }
                }
            }
            return config;
        },
        manageEvents: function (s, e, a) {
            if (a.treeEvents) {
                var evMap = a.treeEvents.split(';');
                for (var i = 0; i < evMap.length; i++) {
                    if (evMap[i].length > 0) {
                        // plugins could have events with suffixes other than '.jstree'
                        var evt = evMap[i].split(':')[0];
                        if (evt.indexOf('.') < 0) {
                            evt = evt + '.jstree';
                        }
                        var cb = evMap[i].split(':')[1];
                        s.tree.on(evt, s[cb]);
                    }
                }
            }
        },
        link: function (s, e, a) { // scope, element, attribute \O/
            var init = function (s, e, a, config) {
                treeDir.managePlugins(s, e, a, config);
                s.tree = $(e).jstree(config);
                treeDir.manageEvents(s, e, a);
            };
            $(function () {
                var config = {};

                // users can define 'core'
                config.core = {};
                if (a.treeCore) {
                    config.core = $.extend(config.core, s[a.treeCore]);
                }

                console.log(s[a.treeCore]);
                console.log(config.core);

                // clean Case
                a.treeData = a.treeData ? a.treeData.toLowerCase() : '';
                a.treeSrc = a.treeSrc ? a.treeSrc.toLowerCase() : '';
                            
                if (a.treeData == 'html') {
                    treeDir.fetchResource(a.treeSrc, function (data) {
                        e.html(data);
                        init(s, e, a, config);
                    });
                } else if (a.treeData == 'json') {
                    treeDir.fetchResource(a.treeSrc, function (data) {
                        config.core.data = data;
                        init(s, e, a, config);
                    });
                } else if (a.treeData == 'scope') {
                    s.$watch(a.treeModel, function (n, o) {
                        if (n) {

                            config.core.data = s[a.treeModel];
                            $(e).jstree('destroy');
                            init(s, e, a, config);
                        }
                    }, true);
                  
                    // Trigger it initally
                    // Fix issue #13
                    //config.core.data = s[a.treeModel];
                    //init(s, e, a, config);
                } else if (a.treeAjax) {
                    config.core.data = {
                        'url': a.treeAjax,
                    }
                    init(s, e, a, config);
                } else {
                    init(s, e, a, config);
                }
                s.$watch(a.treeCore, function(n, o) {
                    $timeout(function() {
                        if (n.searchedText !== o.searchedText) {
                            if (n.searchedText === null) n.searchedText = '';
                            //s.$emit('searchTree', n.searchedText);
                            s.tree.jstree(true).search(n.searchedText);
                        }
                    }, 250);
                }, true);
            });

        }
       
    };

    return treeDir;

}]);