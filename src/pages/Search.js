import {Lightning, Router} from "wpe-lightning-sdk";

export default class Search extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080,
            color: 0xff173f5f,
            Label:{
                x: 960, y: 540, mount: 0.5,
                text:{
                    text:' - Search - '
                }
            },
            Explanation:{
                x: 960, y: 630, mount: 0.5, alpha:0.5,
                text:{ fontSize:27, textAlign:'center', lineHeight:35,
                    text:'press left to focus on menu widget\npress Up to navigate to Settings Page\nPress right to Navigate to Search with different data provider'
                }
            }
        }
    }

    _handleUp(){
        Router.navigate("settings");
    }

    _handleLeft(){
        Router.handleRemote("widget", "Menu");
    }

    _handleRight(){
        Router.navigate("home/search/vikings/12/22")
    }
}