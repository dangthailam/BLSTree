myApp.controller("blsTreeController", ['$scope', function ($scope) {
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
          children: [
            { 
                id: 41,
                text: 'aaa',
                description: 'qsdqsd  qsdqsd qdqsd qsdqs',
                children: [
                  {
                      id: 411,
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
      }
        ];

    $scope.displayFn = function (node) {
        return node.text + " " + node.description;
    }
}]);