App.accessRule('*');
App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');

// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.cordvida.app',
  name: 'CordVida',
  description: 'Aplicativo da CordVida.',
  version: "0.0.6"
});

// Set PhoneGap/Cordova preferences
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('hideKeyboardAccessoryBar', true);
App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#A53B3F');

// Transistor software background geolocation info
App.setPreference('cordova-background-geolocation-license', '247aa055af8afef2453dc119e97c6a42dd9f2eb2cdfecf58f5df2eb0c0edbd19');
App.setPreference('cordova-background-geolocation-orderId', '2543133377');

// // Set up resources such as icons and launch screens.
App.icons({
  // iOS
  'iphone': 'resources/iOS/Resources/icons/Icon.png',
  'iphone_2x': 'resources/iOS/Resources/icons/Icon@2x.png',
  //'iphone_3x': 'resources/iOS/Resources/icons/Icon.png',
  'ipad': 'resources/iOS/Resources/icons/Icon-72.png',
  'ipad_2x': 'resources/iOS/Resources/icons/Icon-152.png',

  // Android
  'android_ldpi': 'resources/Android/res/drawable-ldpi/icon.png',
  'android_mdpi': 'resources/Android/res/drawable-mdpi/icon.png',
  'android_hdpi': 'resources/Android/res/drawable-hdpi/icon.png',
  'android_xhdpi': 'resources/Android/res/drawable-xhdpi/icon.png',
});

App.launchScreens({
  // iOS
  'iphone': 'resources/iOS/Resources/splash/Default~iphone.png',
  'iphone_2x': 'resources/iOS/Resources/splash/Default@2x~iphone_640x960.png',
  'iphone5': 'resources/iOS/Resources/splash/Default-568h@2x~iphone_640x1136.png',
  'ipad_portrait': 'resources/iOS/Resources/splash/Default-Portrait~ipad_768x1024.png',
  'ipad_portrait_2x': 'resources/iOS/Resources/splash/Default-Portrait@2x~ipad_1536x2048.png',
  'ipad_landscape': 'resources/iOS/Resources/splash/Default-Landscape~ipad_1024x748.png',
  'ipad_landscape_2x': 'resources/iOS/Resources/splash/Default-Landscape@2x~ipad_2048x1536.png',

  // Android
  'android_ldpi_portrait': 'resources/Android/res/drawable-ldpi/screen.png',
  'android_ldpi_landscape': 'resources/Android/res/drawable-land-ldpi/screen.png',
  'android_mdpi_portrait': 'resources/Android/res/drawable-mdpi/screen.png',
  'android_mdpi_landscape': 'resources/Android/res/drawable-land-mdpi/screen.png',
  'android_hdpi_portrait': 'resources/Android/res/drawable-hdpi/screen.png',
  'android_hdpi_landscape': 'resources/Android/res/drawable-land-hdpi/screen.png',
  'android_xhdpi_portrait': 'resources/Android/res/drawable-xhdpi/screen.png',
  'android_xhdpi_landscape': 'resources/Android/res/drawable-land-xhdpi/screen.png'
});
