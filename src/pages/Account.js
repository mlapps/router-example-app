import {Lightning, Router} from "wpe-lightning-sdk";

export default class Account extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080,
            color: 0xff4c87b4,
            Label:{
                x: 960, y: 540, mount: 0.5,
                text:{
                    text:' - Account - '
                }
            },
            Explanation:{
                x: 960, y: 630, mount: 0.5, alpha:0.5,
                text:{ fontSize:27, textAlign:'center', lineHeight:35,
                    text:'press left to focus on menu widget\n\npress right to navigate to the Settings page\npress Up to navigate to Search Page'
                }
            }
        }
    }

    _handleRight(){
        Router.navigate("settings");
    }

    _handleLeft(){
        Router.handleRemote("widget","Menu");
    }

    _handleUp(){
        Router.navigate("home/search/vikings/12/22")
    }
}