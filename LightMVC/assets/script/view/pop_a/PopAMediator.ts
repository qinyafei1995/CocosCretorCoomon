import BaseMediator from "../../../libs/lightMVC/core/base/BaseMediator";
import PopAView from "./PopAView";
import PlayerModel from "../../model/PlayerModel";
import { UpdateExpCommand } from "../../command/PlayerCommand";
import Notification from "../../Notification";

export default class PopAMediator extends BaseMediator {

    public view: PopAView;

    public init(data?: any): void {
        this.view.drawView(data);

        let playerModel = this.getModel(PlayerModel);
        this.view.setLevelDisplay(playerModel.getPlayerLv());

        // 监听修改经验事件
        this.bindEvent(PopAView.UPDATE_LEVEL, (exp)=>{
            this.sendCmd(UpdateExpCommand, exp);
        }, this);

        this.registerNoti(Notification.UPDATE_EXP_FINISH, ()=>{
            this.view.setLevelDisplay(playerModel.getPlayerLv());
        }, this);
    }    
    
    public viewDidAppear(): void {

    }
    
    public destroy(): void {

    }



}
