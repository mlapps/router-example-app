import {Lightning, Router} from "wpe-lightning-sdk";

export default class Browse extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080,
            color: 0xff3caea3,
            Label:{
                x: 960, y: 540, mount: 0.5,
                text:{
                    text:'Browse page'
                }
            },
            Details: {
                x: 960, y: 590, mount: 0.5, alpha: 0.5,
                text: {
                    fontSize: 27, textColor: 0xdd000000,
                    text: 'press up to navigate to the Player page'
                }
            }
        }
    }

    _init(){

    }

    _handleUp(){
        const videoId = Math.floor(Math.random()*300000)+800000;
        Router.navigate(`discover/player/${videoId}`);
    }

    easing(){
        return "fade";
    }


}