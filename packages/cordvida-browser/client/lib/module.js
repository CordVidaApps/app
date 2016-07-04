angular.module('cordvida.browser', [
  'uiGmapgoogle-maps',
  'ngMaterial',
]);

angular.module('cordvida.browser').config(
  ($mdThemingProvider, $mdIconProvider, $mdDateLocaleProvider) => {
    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('red');
    
    const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';
 
    $mdIconProvider
      .iconSet('social',
        iconPath + 'svg-sprite-social.svg')
      .iconSet('action',
        iconPath + 'svg-sprite-action.svg')
      .iconSet('communication',
        iconPath + 'svg-sprite-communication.svg')
      .iconSet('content',
        iconPath + 'svg-sprite-content.svg')
      .iconSet('toggle',
        iconPath + 'svg-sprite-toggle.svg')
      .iconSet('navigation',
        iconPath + 'svg-sprite-navigation.svg')
      .iconSet('image',
        iconPath + 'svg-sprite-image.svg');

    $mdDateLocaleProvider.formatDate = (date) => {
      return moment(date).format('DD/MM/YYYY');
    };
  }
);