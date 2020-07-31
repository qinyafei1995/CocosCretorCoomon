import NodePool from "../common/NodePool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NodePoolMng extends cc.Component {
    _loadConfig: Array<Object> = [
        {url: "Prefabs/blue", name: "blue"},
        {url: "Prefabs/red", name: "red"}
    ]

    _loadTime: number = 0;

    _completeCB: Function = null;

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
            this.loadPrefab(this._loadConfig[i]["url"], (pfb: cc.Prefab) => {
                NodePool.create_pool(this._loadConfig[i]["name"], pfb);
                this.processComplete();
            })
        }
    }

    /**
     * 加载关卡
     * @param curLv 关卡路径
     * @param cb 回调
     */
    private loadPrefab(curLv: string, cb: Function) {
        cc.loader.loadRes(curLv, cc.Prefab, (err, res) => {
            if (!!err) {
                if (err.message && err.message.search(/does not exist/) != -1) {
                    console.error("加载资源不存在 url ==>", curLv);
                    return;
                }
                this.loadPrefab(curLv, cb);
                return;
            }

            if (res) {
                if (typeof (cb) == "function") {
                    cb(res);
                }
            }
        })
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
