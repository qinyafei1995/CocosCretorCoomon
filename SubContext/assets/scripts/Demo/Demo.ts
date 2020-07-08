import BasePanel from "./BasePanel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Demo extends cc.Component {
    @property({ displayName: "开启 >邀请< 界面" })
    isInvite: boolean = true;

    @property({ displayName: "开启 >历史< 排行" })
    isHistoryRank: boolean = true;

    @property({ displayName: "开启 >好友< 排行" })
    isFriendRank: boolean = true;

    @property({ displayName: "开启 >结束< 排行" })
    isOverRank: boolean = true;

    _panelMng: object = {};

    onLoad() {
        this.initPanel();
        this.initMsg();
    }

    /**
     * 初始要显示的界面
     */
    private initPanel() {
        // 开启邀请
        if (this.isInvite) {
            this.loadPanel("invitePanel", null);
        }

        // 开启历史
        if (this.isHistoryRank) {
            this.loadPanel("historyPanel", null);
        }

        // 开启好友排行
        if (this.isFriendRank) {
            this.loadPanel("friendRankPanel", null);
        }

        // 开启结束
        if (this.isOverRank) {
            this.loadPanel("overRankPanel", null);
        }
    }

    /**
     * 加载界面
     * @param panelName 界面名称
     * @param cb 回调函数
     */
    private loadPanel(panelName: string, cb: Function) {
        cc.loader.loadRes("prefabs/" + panelName, cc.Prefab, (err, res) => {
            if (err) {
                console.error("加载资源错误, panelName ===>", panelName);
                return;
            }

            if (res) {
                let panelNode: cc.Node = cc.instantiate(res);
                this.node.addChild(panelNode);
                panelNode.active = false;

                this._panelMng[panelName] = panelNode.getComponent(BasePanel);
                this._panelMng[panelName].init();
                if (typeof (cb) == "function") {
                    cb(panelNode);
                }
            }
        })
    }

    /**
     * 初始化消息
     */
    private initMsg() {
        if (!window["wx"]) return;
        window["wx"].onMessage((data) => {
            //  data["msgType"] 类型
            //  data["msgData"] 数据
            let id: number = data["msgType"];
            if (typeof (id) == "string") {
                id = parseInt(id);
            }

            //  100 - 199   邀请
            if (this.isInvite && id >= 100 && id <= 199) {
                switch (id) {
                    case 100:
                        // 开启
                        this._panelMng["invitePanel"].open();
                        break;

                    case 101:
                        // 关闭
                        this._panelMng["invitePanel"].close();
                        break;

                    case 102:
                        //更新
                        this._panelMng["invitePanel"].updateInvite();
                        break;
                    default:
                        break;
                }
            }

            //  200 - 299 好友
            if (this.isFriendRank && id >= 200 && id <= 299) {
                switch (id) {
                    case 200:
                        // 开启
                        this._panelMng["friendRankPanel"].open();
                        break;

                    case 201:
                        // 关闭
                        this._panelMng["friendRankPanel"].close();
                        break;

                    case 202:
                        // 上传
                        this._panelMng["friendRankPanel"].setRankData(data["msgData"]);
                        break;
                    default:
                        break;
                }
            }

            //  300 - 399  结束
            if (this.isOverRank && id >= 300 && id <= 399) {
                switch (id) {
                    case 300:
                        // 开启
                        this._panelMng["overRankPanel"].open();
                        break;

                    case 301:
                        // 关闭
                        this._panelMng["overRankPanel"].close();
                        break;

                    case 302:
                        // 上传
                        this._panelMng["overRankPanel"].setRankData(data["msgData"]);
                        break;
                    default:
                        break;
                }
            }

            // //  200 - 299   历史
            // if (this.isHistoryRank && id >= 200 && id <= 299) {
            //     switch (id) {
            //         case 100:
            //             // 开启
            //             this._panelMng["invitePanel"].open();
            //             break;

            //         case 101:
            //             // 关闭
            //             this._panelMng["invitePanel"].close();
            //             break;

            //         case 102:
            //             // 上传
            //             this._panelMng["invitePanel"].close();
            //             break;
            //         default:
            //             break;
            //     }
            // }
        });
    }
}
