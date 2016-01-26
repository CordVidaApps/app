angular.module('cordvida.browser').directive('userItem', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/users/user-item/user-item.html',
    controllerAs: 'userItem',
    scope: {
      user: '='
    },
    controller: function($scope, $reactive, $state) {
      $reactive(this).attach($scope);
 
      this.helpers({
        user: function () {
          return $scope.user;
        }
      });

      this.goToUser = (user) => {
        $state.go('userDetails', {userId: this.user._id});
      };

      this.goToEditpage = (user) => {
        console.log('going to edit user page');
        $state.go('editUser', {userId: this.user._id});
      }

      this.userStatus = () => {
        return this.user && this.user.profile.status;
      }

      this.estimateBornDate = () => {
        return this.user && moment(this.user.profile.estimateBornDate).format('DD/MM/YYYY');
      };

      this.timeFromLastLocation = () => {
        if(!this.user || this.user.lastLocationTime) return 'never';
        return moment(this.user.lastLocationTime).fromNow();
      }

      this.aggregatedScore = () => {
        if(!this.user || !this.user.aggregatedScore) return 0;
        return this.user.aggregatedScore.toFixed(2);
      }
    }
  }
});