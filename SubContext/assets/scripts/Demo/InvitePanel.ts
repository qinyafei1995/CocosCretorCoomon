import BasePanel from "./BasePanel";
import SubTools from "../Common/SubTools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends BasePanel {
    _itemList: Array<cc.Node> = Array<cc.Node>();

    public init() {
        this._itemList = this.node.children;
        this.updateInvite();
    }   

    private clickEvent(openid) {
        console.log("好友openId", openid);
    }

    public updateInvite() {
        SubTools.getFriendList((list) => {
            console.log("获取后的好友数据", list);
            for (let i = 0; i < 5; i++) {
                if (list[i]) {
                    this._itemList[i].active = true;
                    this._itemList[i].getChildByName("name").getComponent(cc.Label).string = list[i].nickname;
                    this._itemList[i].getChildByName("btn").on(cc.Node.EventType.TOUCH_END, () => {
                        this.clickEvent(list[i].openid);
                    }, this)

                    if (list[i].avatarUrl) {
                        SubTools.loadTexture(this._itemList[i].getChildByName("head"), list[i].avatarUrl);
                    } else {
                        console.error("当前好友没有头像,请设置默认头像");
                    }
                    
                } else {
                    this._itemList[i].active = false;
                }
            }
        })
    }
}
