myApp.controller("blsTreeController", ['$scope', '$q', function ($scope, $q) {
    $scope.data = [
      {
          id: 1,
          text: 'aaabb',
          description: 'qsdqsd  qsdqsd qdqsd qsdqs ',
          children: [
            {
                id: 11,
                text: 'aaacccdeef',
                description: 'qsdqsd  qsdqsd qdqsd qsdqs 567',
                children: [
                  {
                      id: 111,
                      text: 'aaa',
                      description: 'qsdqsd  qsdqsd qdqsd qsdqs',
                      children: [
                        {
                            id: 111,
                            text: 'aaa',
                            description: 'qsdqsd  qsdqsd qdqsd qsdqs',
                            children: []
                        },
                        {
                            id: 111,
                            text: 'aaa',
                            description: 'qsdqsd  qsdqsd qdqsd qsdqs',
                            children: null
                        }
                      ]
                  },
                  {
                      id: 111,
                      text: 'aaa',
                      description: 'qsdqsd  qsdqsd qdqsd qsdqs'
                  }
                ]
            }
          ]
      },
      {
          id: 2,
          text: 'aaa',
          description: 'qsdqsd  qsdqsd qdqsd qsdqs',
          children: [
            {
                id: 21,
                text: 'aaa',
                description: 'qsdqsd  qsdqsd qdqsd qsdqs',
                children: [
                  {
                      id: 211,
                      text: 'aaa',
                      description: 'qsdqsd  qsdqsd qdqsd qsdqs'
                  },
                  {
                      id: 111,
                      text: 'aaa',
                      description: 'qsdqsd  qsdqsd qdqsd qsdqs'
                  }
                ]
            }
          ]
      },
      {
          id: 3,
          text: 'aaa',
          description: 'qsdqsd  qsdqsd qdqsd qsdqs',
          children: [
            {
                id: 31,
                text: 'aaa',
                description: 'qsdqsd  qsdqsd qdqsd qsdqs',
                children: [
                  {
                      id: 311,
                      text: 'aaa',
                      description: 'qsdqsd  qsdqsd qdqsd qsdqs',
                      children: [
                        {
                            id: 111,
                            text: 'aaa',
                            description: 'qsdqsd  qsdqsd qdqsd qsdqs'
                        },
                        {
                            id: 111,
                            text: 'aaa',
                            description: 'qsdqsd  qsdqsd qdqsd qsdqs'
                        }
                      ]
                  },
                  {
                      id: 111,
                      text: 'aaa',
                      description: 'qsdqsd  qsdqsd qdqsd qsdqs'
                  }
                ]
            }
          ]
      },
      {
          id: 4,
          text: 'aaa',
          description: 'qsdqsd  qsdqsd qdqsd qsdqs',
          children: []
      }
    ];

    $scope.selectNode = function (node) {
        console.log(node);
    }

    $scope.loadAsync = function (node) {
        var deferred = $q.defer();

        setTimeout(function () {
            deferred.resolve([
                    {
                        id: 4,
                        text: 'Lam 1',
                        description: 'Test of Lam 1',
                        children: []
                    },
                    {
                        id: 4,
                        text: 'Lam 2',
                        description: 'Test of Lam 2',
                        children: null
                    }
            ]);
        }, 1000);

        return deferred.promise;

    }
}]);