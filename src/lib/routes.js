import {Router} from 'wpe-lightning-sdk';


// we import all the pages that we want to add to our app
import {
    Home, Browse, Player, Search, Settings, Account, NotFound, Error
} from '../pages';


export default () =>{
    // First we define a root, this is the hash were the browser will point to
    // at the moment that you boot your app
    Router.root('home', Home);

    // Next we can define the rest of our routes via de route() function
    // this is a one level deep route.
    Router.route("settings", Settings);
    Router.route("account", Account);

    // we can specify deeper route levels, and as you can see we can define multiple
    // routes that lead to the same page.
    Router.route("home/browse/adventure", Browse);
    Router.route("home/browse/adventure/new", Browse);
    Router.route("home/search", Search);

    // We've created a route with a dynamic name (keyword), this translates to the following;
    // when the browser points to: 127.0.0.1:8080/#home/search/vikings the Router will load
    // the Search Page, and add the property keyword to the instance with the value=>vikings
    // you can add a set keyword(){...} and invoke logic if needed.
    Router.route("home/search/:keyword", Search);
    Router.route("account/details/:action", Account);

    // or multiple named groups, all follow the same patter.
    Router.route("home/search/:keyword/:amount/:filterId", Search);

    // The router has regular expression support, so by adding a pattern after the dynamic name
    // the router will match that pattern while testing if it's a successfull match.
    // in this example, 127.0.0.1:8080/#discover/player/12sf6321/play will match and show Player
    // (and add videoId property on the instance) 127.0.0.1:8080/#discover/player/12a/play will fail
    // because the pattern needs at least 6 characters {6,12}
    Router.route("discover/player/:videoId{/[0-9a-z]{2,12}/ig}", Player);

    // You're able to show something like a 'NotFound' page when the app (or a deeplink from a Ui)
    // tries to navigate to a url that can't be matched by the Router.
    // Navigating to 127.0.0.1:8080/#not/existing/route will show the NotFound page.
    Router.route("*", NotFound);

    // If a data-provider rejects a Promise during async request the Router will show the configured
    // error page and set the error property.
    Router.route("!", Error);

    // You can bind multiple functions to a route, these will be called when
    // the app navigates to the corresponding route. Url data will be passed as
    // an argument to the callback
    Router.route("home/search/:keyword", (application, {keyword})=>{
        console.log("respond to this route");
        console.log("do something with: ", application);
        console.log("or param: ", keyword);
    });

    // After you've defined all your routes you can start the routing process. This step
    // is required.
    Router.start();
}

