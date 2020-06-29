import { getToken, doSearch } from "./api"

// we import all the pages that we want to add to our app
import {
    Home, Browse, Player, Search, Settings, Account, NotFound, Error
} from '../pages';

export default {
    async boot(){
        // boot request will always fire
        // on root and deeplink
    },
    root: 'home',
    routes: [
        {
            path: 'home',
            component: Home,
            before() {
                console.log('before home!')
                return Promise.resolve()
            }
        },
        {
            path: 'settings',
            component: Settings,
            options: {
                preventStorage: false,
            }
        },
        {
            path: 'account',
            component: Account,
            widgets: ['Menu']
        },
        {
            path: 'home/browse/adventure',
            component: Browse
        },
        {
            path: 'home/browse/adventure/new',
            component: Browse,
        },
        {
            path: 'home/search',
            component: Search,
        },
        {
            path: 'home/search/:keyword',
            component: Search,
            on(page, { keyword }) {
                return doSearch(keyword).then((results)=>{
                    page.results = results;
                })
            },
            widgets: ['Menu', 'Notification'],
            cache: 10
        },
        {
            path: 'account/details/:action',
            component: Account,
            on(page, { action }) {
                // we fake that a async request went wrong and we're
                // rejecting the Promise.
                return new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        reject("Something went wrong, ERROR 343011.22384.18765")
                    },2000)
                });
            }
        },
        {
            path: 'home/search/:keyword/:amount/:filterId',
            component: Search,
            after(page, {keyword, amount, filterId}) {
                return doSearch(keyword, amount, filterId).then((results)=>{
                    page.results = results;
                });
            }
        },
        {
            path: 'discover/player/:videoId{/[0-9a-z]{2,12}/ig}',
            component: Player,
            widgets: ['Notification']
        },
        {
            path: 'home',
            hook(application) {
                console.log("respond to this route");
                console.log("do something with: ", application);
                console.log("or param: ");
            },
        },
        {
            path: '*',
            component: NotFound,
        },
        {
            path: '!',
            component: Error
        }
    ]
}