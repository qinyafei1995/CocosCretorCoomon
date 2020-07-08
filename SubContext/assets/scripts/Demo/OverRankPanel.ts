import BasePanel from "./BasePanel";
import SubTools from "../Common/SubTools";
import RankKeyConfig from "../Data/RankKeyConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OverRankPanel extends BasePanel {
    @property({ displayName: "假数据范围", type: Array })
    fDataList: Array<number> = [100, 200];

    _selfData: any = null;

    public init() {
        SubTools.getUserInfo((selfData) => {
            this._selfData = selfData;
            let item: cc.Node = this.node.children[1];
            item.getChildByName("name").getComponent(cc.Label).string = this._selfData.nickName;
            SubTools.loadTexture(item.getChildByName("head"), this._selfData.avatarUrl);
        })
    }

    private showData() {
        SubTools.getUserCloudStorage(RankKeyConfig.overRank, (self) => {
            let item: cc.Node = this.node.children[1];
            item.getChildByName("score").getComponent(cc.Label).string = self.KVDataList[0].value;

            SubTools.getFriendCloudStorage(RankKeyConfig.overRank, (list) => {
                // console.log("自己", self, "列表", list);
                for (let index = 0; index < list.length; index++) {
                    if (this._selfData.avatarUrl == list[index].avatarUrl) {
                        // 前后
                        let dataF = list[index + 1];
                        let dataR = list[index - 1];

                        if (dataF) {
                            this.setItemKVData(this.node.children[0], dataF);
                        } else {
                            this.setFData(this.node.children[0], false, parseInt(self.KVDataList[0].value));
                        }

                        if (dataR) {
                            this.setItemKVData(this.node.children[2], dataR);
                        } else {
                            this.setFData(this.node.children[2], true, parseInt(self.KVDataList[0].value));
                        }
                    }
                }
            });
        });
    }

    private setItemKVData(item: cc.Node, data) {
        item.active = true;
        item.getChildByName("name").getComponent(cc.Label).string = data.nickName;
        item.getChildByName("score").getComponent(cc.Label).string = data.KVDataList[0].value;
        SubTools.loadTexture(item.getChildByName("head"), data.avatarUrl);
    }

    /**
     * 设置假数据
     * @param item 节点
     * @param t 是否大于自己
     * @param selfScore 自己分数
     */
    private setFData(item: cc.Node, t: boolean, selfScore: number) {
        let value = 0;
        if (t) {
            value = selfScore + Math.floor(this.fDataList[0] * Math.random());
        } else {
            value = selfScore - this.fDataList[1];
            if (value < 0) {
                value = selfScore + Math.floor(selfScore * Math.random());
            } else {
                value =  this.fDataList[1] + Math.floor(value * Math.random());
            }
        }

        SubTools.getFriendList((list) => {
            console.log("获取后的好友数据", list);
            for (let i = 0; i < 5; i++) {
                if (list[i]) {
                    item.active = true;
                    item.getChildByName("name").getComponent(cc.Label).string = list[i].nickname;
                    item.getChildByName("score").getComponent(cc.Label).string = value.toString();
                    SubTools.loadTexture(item.getChildByName("head"), list[i].avatarUrl);
                } else {
                    item.active = false;
                }
            }
        })
    }

    public open() {
        super.open();
        this.showData();
    }

    /**
     * 设置排行榜数据
     * @param score 分数
     */
    public setRankData(score: number) {
        SubTools.setUserCloudStorage(RankKeyConfig.overRank, score.toString(), null);
    }
}
