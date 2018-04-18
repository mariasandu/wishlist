// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // Initialize Firebase
  firebaseConfig : {
    apiKey: 'AIzaSyBRUuuOYHR1U3UWztZvlRSe2vEnLL_GBX4',
    authDomain: 'my-wishlist-datastore.firebaseapp.com',
    databaseURL: 'https://my-wishlist-datastore.firebaseio.com',
    projectId: 'my-wishlist-datastore',
    storageBucket: 'my-wishlist-datastore.appspot.com',
    messagingSenderId: '799712116794'
  }
};
