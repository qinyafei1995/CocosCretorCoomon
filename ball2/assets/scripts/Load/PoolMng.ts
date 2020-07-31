import NodePool from "../Common/NodePool";
import GameHelp from "../Common/GameHelp";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    _loadConfig: Array<Object> = [
        {url: "ball/ball", name: "ball"},
    ]

    _loadTime: number = 0;

    // 对象池加载完成回调
    _completeCB: Function = null;

    onLoad() {
        this.init(() => {
            console.log("对象池加载完成");
            cc.director.loadScene("fight");
        });
    }

    init(completeCB: Function) {
        this._completeCB = completeCB;
        this.putNodePool();
        return this;
    }

    /**
     * 放入对象池助手
     */
    private putNodePool() {
        for (let i = 0; i < this._loadConfig.length; i++) {
            GameHelp.LoadRes(this._loadConfig[i]["url"], cc.Prefab, (res) => {
                NodePool.create_pool(this._loadConfig[i]["name"], res);
                this.processComplete();
            })
        }
    }

    /**
     * 处理完成回调
     */
    private processComplete() {
        if (++this._loadTime >= this._loadConfig.length) {
            if (typeof(this._completeCB) == "function") {
                this._completeCB();
            }
        }
    }
}
