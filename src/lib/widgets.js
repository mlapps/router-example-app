import {Router} from 'wpe-lightning-sdk';

/**
 * Define the widgets that we need to show per route
 * https://github.com/rdkcentral/Lightning-SDK/blob/feature/router/docs/plugins/router.md#widget-support
 */

export default () =>{
    // When the router matches: this route, it will set
    // visibility of Menu widget to true
    Router.widget("account", ["Menu"]);
    Router.widget("discover/player/:videoId{/[0-9a-z]{2,12}/ig}", ["Notification"]);

    // When the router matches: this route, it will set visibility
    // of Menu and notification widget to true
    Router.widget("home/search/:keyword", ["Menu", "Notification"]);
}