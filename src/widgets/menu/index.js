import {Lightning} from "wpe-lightning-sdk";

export default class Menu extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 400, h: 1920, color: 0xff6999b8, x:-80,
            Label:{
                x: 180, y: 200, mount: 0.5,
                text:{
                    text:'menu widget', fontSize: 29
                }
            },
            Status:{
                x: 180, y: 230, alpha:0.8, mount: 0.5,
                text:{
                    text:'not focused', fontSize: 23
                }
            }
        }
    }

    _focus(){
        this.patch({
            smooth:{
                color: 0xff3298d9, x: 0
            },
            Status:{
                text:{
                    text:'has focus'
                }
            }
        })
    }

    _unfocus(){
        this.patch({
            smooth:{
                color: 0xff016db1, x: -80
            },
            Status:{
                text:{
                    text:'not focussed'
                }
            }
        })
    }
}