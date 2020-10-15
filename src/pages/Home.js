import {Lightning, Router, Utils} from "@lightningjs/sdk";

export default class Home extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080,
            color: 0xff20639B,
            Label:{
                x: 960, y: 540, mount: 0.5,
                text:{
                    text:'Home'
                }
            },
            I:{ x: 200, y: 300,
                src: Utils.asset("1.webp"), w: 300, h: 300
            },
            Details: {
                x: 960, y: 590, mount: 0.5, alpha: 0.5,
                text: {
                    fontSize: 27, textColor: 0xdd000000,
                    text: 'press up to go to the browse page'
                }
            }
        }
    }

    _init(){
    }
    set id(v){
        console.log("ID", v)
    }

    set persist(args){
        console.log("we received data:", args);
    }

    _handleUp(){
        Router.navigate("home/browse/adventure");
    }
}