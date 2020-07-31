import NodePoolMng from "./game/NodePoolMng";

const {ccclass, property} = cc._decorator;

/**
 * 
 */
@ccclass
export default class Load extends cc.Component {
    @property({displayName: "对象池管理", type: NodePoolMng})
    nodePoolMng: NodePoolMng = null;

    onLoad() {
        this.initNodePool();
    }

    initNodePool() {
        this.nodePoolMng.init(() => {
            console.log("对象池加载完成");
            this.toFight();
        });
    }

    private toFight() {
        cc.director.loadScene("fight");
    }

}
