import List from "./Common/list/List";
import ListItem from "./Common/list/ListItem";
import Main from "./Main";
import SubTools from "./Common/SubTools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TowerFriendRankCtrl extends cc.Component {
    @property(List)
    private listCtrl: List = null;

    private _subTools: SubTools = new SubTools();
    @property(cc.Node)
    upNode: cc.Node = null;

    @property(cc.Node)
    amidNode: cc.Node = null;

    @property(cc.Node)
    downNode: cc.Node = null

    public init() {
        this.updateUp();
        this.updateList();
    }

    /**
     * 更新上方3个
     */
    private updateUp() {
        for (let i: number = 0; i < 3; i++) {
            let data: object = Main.friendRankData[i];
            let itemNode: cc.Node = this.upNode.children[i];
            if (data) {
                itemNode.active = true;
                itemNode.getChildByName("score").getComponent(cc.Label).string = data["KVDataList"][0].value + '';
                this._subTools.loadTexture(itemNode.getChildByName("head"), data["avatarUrl"]);
            } else {
                itemNode.active = false;
            }
        }
    }


    /**
     * updateDown 更新下方自己信息
     */
    public updateDown() {
        let itemNode: cc.Node = this.downNode.getChildByName("towerRankItem")
        itemNode.getChildByName("lv");
        itemNode.getChildByName("name");
        itemNode.getChildByName("score");
        itemNode.getChildByName("head");

        this._subTools.getUserInfo((data) => {
            console.log('获取玩家自身信息===>', data);
        });
    }

    /**
     * 更新虚拟列表
     */
    private updateList() {
        this.listCtrl.numItems = Main.friendRankData.length;
    }

    //垂直列表渲染器
    public onListVRender(item: cc.Node, idx: number) {
        let data: object = Main.friendRankData[idx + 3];
        if (data) {
            // 名字
            item.getComponent(ListItem).title.getComponent(cc.Label).string = data["nickname"];
            // 名次
            item.getComponent(ListItem)["lv"].string = idx + 4 + '';
            // 分数
            item.getComponent(ListItem).title.getComponent(cc.Label).string = data["KVDataList"][0].value + '';
            // 头像
            this._subTools.loadTexture(item.getComponent(ListItem).icon.node, data["avatarUrl"]);
        }
    }

    /**
     * 开启排行
     */
    public openRank() {
        this.node.active = true;
        this.updateUp();
        this.updateList();
    }

    /**
     * 关闭排行
     */
    public closeRank() {
        this.node.active = false;
    }
}
