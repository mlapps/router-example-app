// first thing is we import the Router from the SDK
import {Lightning, Settings, Router} from 'wpe-lightning-sdk';
// import all the data providers
import provider from "./lib/data-provider";
// import all the configured routes
import routes from "./lib/routes";
// import all the configured widgets
import widgets from "./lib/widgets";
// import the actual Widget Components
import {Notification, Menu} from "./widgets";

export default class App extends Lightning.Component {
    // define which fonts are used in the App
    static getFonts() {
        return [
        ];
    }

    /**
     * First thing we do (in the setup hook) is start the Router and provide with:
     * - appInstance (so we have a reference to this App)
     * - provider function (that will register all the data-providers)
     * - routes function (that will register all routes we can navigate to)
     * - widgets function (that will register all widgets we want to show per route)
     */
    _setup() {
        Router.startRouter({
            appInstance: this, provider, routes, widgets
        });
    }

    /**
     * Now we define our template and it must at least
     * have the following Components
     */
    static _template() {
        return {
            /**
             * The location where the Router will host all
             * the Pages that it creates and destroys (if lazyDestroy: true)
             */
            Pages: {
                forceZIndexContext: true
            },
            /**
             * Location where you add your widgets to, the visibility will be handled by
             * the router is there is widget configuration
             */
            Widgets:{
                Menu:{
                    type: Menu
                },
                Notification:{
                    type: Notification
                }
            },
            /**
             * The Loading Component. If you're using .on() data-providers the Router will automatically
             * show the Loading Component. This is different some .after() and .before() data-providers.
             */
            Loading: {
                rect: true, w: 1920, h: 1080, colorBottom: 0xff000000, visible: false,
                zIndex: 99,
                Label: {
                    mount: 0.5, x: 960, y: 540,
                    text: {
                        text: 'Loading..'
                    }
                }
            }
        };
    }

    /**
     * Next we define our StateMachine, it must at least have the following states
     */
    static _states() {
        return [
            /**
             * When we navigate to a page that has .on() data-provider configured, the Router forces
             * the App to go in to the Loading state. So you can tweak the Loading page behaviour here
             */
            class Loading extends this {
                $enter() {
                    this.tag("Loading").visible = true;
                }

                $exit() {
                    this.tag("Loading").visible = false;
                }
            },

            /**
             * When you want to delegate focus (so it listens to remote control keypresses) to a widget
             * the Router forces the App to go in Widget state.
             */
            class Widgets extends this {
                $enter(args, widget) {
                    // store widget reference
                    this._widget = widget;

                    // since it's possible that this behaviour
                    // is non-remote driven we force a recalculation
                    // of the focuspath
                    this._refocus();
                }

                _getFocused() {
                    // we delegate focus to selected widget
                    // so it can consume remotecontrol presses
                    return this._widget;
                }

                // if we want to widget to widget focus delegation
                reload(widget){
                    this._widget = widget;
                    this._refocus();
                }

                // this will delegate the focus back to page we got it from
                // on every key that is not being handled by the widget.
                _handleKey(){
                    Router.restoreFocus();
                }
            }
        ];
    }

    /**
     * This property will be access by the Page Router so it knows
     * where to store the Pages.
     */
    get pages() {
        return this.tag("Pages");
    }

    /**
     * This property will be access by the Page Router so it knows
     * where the Widgets are stored
     */
    get widgets(){
        return this.tag("Widgets");
    }

    /**
     * You must declare _handleBack in your app so the
     * router can override the behaviour
     */
    _handleBack(){
        return false;
    }

    /**
     * Delegate focus to the Active page returned by the Router
     */
    _getFocused() {
        return Router.getActivePage();
    }
}
