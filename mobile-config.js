App.accessRule('*');
App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');

// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'br.com.plraphael.cordvida',
  name: 'CordVida',
  description: 'Aplicativo da CordVida.',
  version: "0.12"
});

// Set PhoneGap/Cordova preferences
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('hideKeyboardAccessoryBar', true);
App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#9a2d42');

// // Set up resources such as icons and launch screens.
App.icons({
  // iOS
  'iphone': 'resources/icons/ios/icon/Icon.png',
  'iphone_2x': 'resources/icons/ios/icon/Icon@2x.png',
  //'iphone_3x': 'resources/icons/ios/icon/Icon.png',
  'ipad': 'resources/icons/ios/icon/Icon-72.png',
  'ipad_2x': 'resources/icons/ios/icon/Icon-152.png',

  // Android
  'android_ldpi': 'resources/icons/android/res/drawable-ldpi/Icon.png',
  'android_mdpi': 'resources/icons/android/res/drawable-mdpi/Icon.png',
  'android_hdpi': 'resources/icons/android/res/drawable-hdpi/Icon.png',
  'android_xhdpi': 'resources/icons/android/res/drawable-xhdpi/Icon.png',
});

App.launchScreens({
  // iOS
  'iphone': 'resources/splash/ios/default/Default.png',
  'iphone_2x': 'resources/splash/ios/default/Default@2x.png',
  'iphone5': 'resources/splash/ios/default/Default-568h@2x.png',
  'ipad_portrait': 'resources/splash/ios/default/Default-Portrait.png',
  'ipad_portrait_2x': 'resources/splash/ios/default/Default-Portrait@2x.png',
  'ipad_landscape': 'resources/splash/ios/default/Default-Landscape.png',
  'ipad_landscape_2x': 'resources/splash/ios/default/Default-Landscape@2x.png',

  // Android
  'android_ldpi_portrait': 'resources/splash/android/res/drawable-ldpi/splash.png',
  'android_ldpi_landscape': 'resources/splash/android/res/drawable-ldpi/splash.png',
  'android_mdpi_portrait': 'resources/splash/android/res/drawable-mdpi/splash.png',
  'android_mdpi_landscape': 'resources/splash/android/res/drawable-mdpi/splash.png',
  'android_hdpi_portrait': 'resources/splash/android/res/drawable-hdpi/splash.png',
  'android_hdpi_landscape': 'resources/splash/android/res/drawable-hdpi/splash.png',
  'android_xhdpi_portrait': 'resources/splash/android/res/drawable-xhdpi/splash.png',
  'android_xhdpi_landscape': 'resources/splash/android/res/drawable-xhdpi/splash.png'
});
