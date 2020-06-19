import {Router} from "wpe-lightning-sdk";
import {getToken, doSearch} from "./api"

/**
 *  bind a data request to a specific route
 *  https://github.com/rdkcentral/Lightning-SDK/blob/feature/router/docs/plugins/router.md#data-providing
 *  ---
 *  You can force the Router do an async request before or while showing the new page
 *  All providers need to resolve a Promise.
 */
export default () => {
    /**
     * The boot request will always be called when your app starts, normal launch
     * or deeplinked. All data and requests can be fetched and set in the boot request.
     * The Router will continue the loading of the app when boot promise is fulfilled
     */
    Router.boot(async()=>{
        let token = await getToken();
    });

    // .on() will show the loading page => do the request
    // when the promise fulfills show the new page.
    // page instance and url data will be mae available
    // to the callback.
    Router.on("home/search/:keyword", ({page, keyword})=>{
        return doSearch(keyword).then((results)=>{
            page.results = results;
        });
    }, 60 * 10 /* expires, in seconds */);

    // .before() will first do the request, current page stays visible
    // when the request resolves the router will show the new page
    // and hide old.
    Router.after("home/search/:keyword/:amount/:filterId", ({page, keyword, amount, filterId})=>{
        return doSearch(keyword).then((results)=>{
            page.results = results;
        });
    });

    Router.on("account/details/:action",({page, action})=>{
        // we fake that a asyn request went wrong and we're
        // rejecting the Promise.
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                reject("Something went wrong, ERROR 343011.22384.18765")
            },2000)
        });
    })


};