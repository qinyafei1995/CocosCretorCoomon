import BaseMediator from "../../libs/lightMVC/core/base/BaseMediator";
import FirstMediator from "./first/FirstMediator";
import FirstView from "./first/FirstView";
import SecondMediator from "./second/SecondMediator";
import SecondView from "./second/SecondView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SecondSceneMediator extends BaseMediator {

    
    public init(data?: any): void {
        console.log("打开场景SecondSceneMediator");
    }    
    
    public viewDidAppear(): void {
        // 打开第二个UI
        this.addLayer(SecondMediator, SecondView, 1);
    }

    public destroy(): void {

    }

}
