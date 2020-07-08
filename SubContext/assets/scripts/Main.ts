import SubTools from "./Common/SubTools";
import RanKTools from "./Common/RankTools";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    private _subTools: SubTools = new SubTools();
    // 定义排行榜是用的Key
    public static towerFriendRankKay = "towerFriendRank";
    public static friendRankData: Array<object> = new Array<object>();
    private _initTime: number = 0;
    private _userInfo: any = null;

    @property(cc.Node)
    towerFriendRankNode: cc.Node = null;

    @property(cc.Node)
    towerOverRankNode: cc.Node = null;

    onLoad() {
        console.log();

        // window["wx"].onMessage((data) => {
        //     // data["msgType"]
        //     // data["msgData"]
        //     switch (data["msgType"]) {
        //         case 1:
        //             // 初始化
        //             if (this._initTime == 0) {
        //                 this.initKey(data["msgData"]["isOnline"]);
        //                 this.getFriendRankData(null);
        //                 this._initTime++;
        //             } else {
        //                 console.error("子域初始化,应只初始化一次,请检查逻辑是否有问题")
        //             }

        //             this._subTools.getUserInfo((selfInfo) => {
        //                 this._userInfo = selfInfo.data[0];
        //             })

        //             break;

        //         case -1000:
        //             // 删除 塔好友排行数据
        //             if (this.isNext()) {
        //                 this._subTools.removeUserCloudStorage(Main.towerFriendRankKay, null);
        //             }
        //             break;

        //         case 1000:
        //             // 添加 塔好友排行数据
        //             if (this.isNext()) {
        //                 this._subTools.setUserCloudStorage(Main.towerFriendRankKay, data["msgData"]["score"], null);
        //             }
        //             break;

        //         case 1001:
        //             // 显示 塔好友排行
        //             this.getFriendRankData(() => {
        //                 this.towerFriendRankNode.active = true;
        //             });
        //             break;

        //         case 1002:
        //             // 隐藏 塔好友排行
        //             this.towerFriendRankNode.active = false;
        //             break;

        //         case 2000:
        //             // 显示 结束排行
        //             this.getFriendRankData(() => {
        //                 this.towerOverRankNode.active = true;
        //             });
        //             break;

        //         case 2001:
        //             // 隐藏 结束排行
        //             this.towerOverRankNode.active = false;
        //             break;
        //         default:
        //             break;
        //     }
        // })
    }

    /**
     * 是否下一步
     */
    private isNext() {
        let t = false;
        if (this._initTime > 0) {
            t = true;
        } else {
            console.error("子域没有初始化, 请先初始化msgType为1")
        }
        return t;
    }

    /**
     * 初始化使用Key
     * @param isOnline 
     */
    private initKey(isOnline: boolean) {
        if (isOnline) {
            Main.towerFriendRankKay += "_Online";
        } else {
            Main.towerFriendRankKay += "_Test";
        }
    }

    /**
     * 获取好友排行数据
     */
    // private getFriendRankData(cb: Function) {
    //     this._subTools.getFriendCloudStorage(Main.towerFriendRankKay, (friendData) => {
    //         Main.friendRankData = friendData;
    //         if (typeof (cb) == "function") {
    //             cb();
    //         }
    //     });
    // }

    /**
     * 获取结束数据
     * @param score 分数
     */
    public getOverData(score: number) {
        let overData: Array<object> = new Array<object>();

        if (!score) {
            score = 0;
        }

        if (Main.friendRankData.length) {
            // 排名低于自己
            for (let i: number = 0; i < Main.friendRankData.length; i++) {
                let data: any = Main.friendRankData[i]["KVDataList"][0];
                if (data["value"] < score && data.avatarUrl != this._userInfo.avatarUrl) {
                    overData.push(data);
                    break;
                }
            }

            // 排名高于自己
            for (let i: number = 0; i < Main.friendRankData.length; i++) {
                let data: any = Main.friendRankData[i]["KVDataList"][0];
                if (data["value"] > score && data.avatarUrl != this._userInfo.avatarUrl) {
                    overData.push(data);
                    break;
                }
            }
        }

        return overData;
    }
}
