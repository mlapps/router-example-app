import { getToken, doSearch } from "./lib/api"

// we import all the pages that we want to add to our app
import {
    Home, Browse, Player, Search, Settings, Account, NotFound, Error
} from './pages';

export default {
    async boot() {
        let token = await getToken();
    },
    root: 'home', // defaults to 'home'
    routes: [
        {
            path: 'home',
            component: Home,
            before() {
                console.log('before home!')
                return Promise.resolve()
            },
            // to think about: support multiple 'events' per route
            // on() {
            //     console.log('on')
            //     return Promise.resolve()
            // },
            // after() {
            //     console.log('after home')
            //     return Promise.resolve()
            // }
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
            path: 'bla/:keyword',
            hook(application, {keyword}) {
                console.log("respond to this route");
                console.log("do something with: ", application);
                console.log("or param: ", keyword);
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
