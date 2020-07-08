
import BasePanel from "./BasePanel";
import RankKeyConfig from "../Data/RankKeyConfig";
import SubTools from "../Common/SubTools";
import List from "../Common/list/List";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FriendRankPanel extends BasePanel {

    @property({displayName: "循环列表控件", type: List})
    listCtrl: List = null;

    _dataArr: any = null;

    private init() {

    }

    public scrollEvent(item: cc.Node, listId: number) {
        item.getChildByName("name").getComponent(cc.Label).string = this._dataArr[listId].nickname;
        item.getChildByName("score").getComponent(cc.Label).string = this._dataArr[listId].KVDataList[0].value;
        item.getChildByName("ranking").getComponent(cc.Label).string = (listId + 1).toString();;
        SubTools.loadTexture(item.getChildByName("head"), this._dataArr[listId].avatarUrl);
    }

    /**
     * 存储好友排行分数
     * @param score 分数
     */
    public setRankData(score: number) {
        SubTools.setUserCloudStorage(RankKeyConfig.friendRank, score.toString(), null);
    }

    public open() {
        super.open();
        SubTools.getFriendCloudStorage(RankKeyConfig.friendRank, (list) => {
            this._dataArr = list;  
            this.listCtrl.numItems = this._dataArr.length;
            this.listCtrl.updateAll();
        })
    }
}
