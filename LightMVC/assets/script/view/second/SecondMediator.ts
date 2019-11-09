import BaseMediator from "../../../libs/lightMVC/core/base/BaseMediator";
import PlayerModel from "../../model/PlayerModel";
import SecondView from "./SecondView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SecondMediator extends BaseMediator {

    public view: SecondView;

    public init(data?: any): void {
        this.bindEvent(SecondView.BACK_SCENE, ()=>{
            let flag = this.backScene();
            if (!flag) {
                console.log("不存在上一个场景！");
            }
        }, this);
    }    
    
    public viewDidAppear(): void {
        let playerModel = this.getModel(PlayerModel);
        let lv = playerModel.getPlayerLv();
        this.view.setData(lv);
    }
    
    public destroy(): void {
    }



}
