import GameData from "../Data/GameData";
import Log from "../Log/Log";
import EditMng from "../GateEdit/EditMng";
import IdentityComponent from "../component/IdentityComponent";
import SkillComponent from "../component/SkillComponent";
import EliminateComponent from "../component/EliminateComponent";
import NodePool from "../common/NodePool";

const { ccclass, property } = cc._decorator;

/**
 * 关卡控制器
 */
@ccclass
export default class GateCtrl extends cc.Component {
    _editMng: EditMng = null;

    init() {
        this.loadGate("Prefabs/gate" + GameData.curGateLv, () => {
            for (let index = 0; index < this._editMng.posList.length; index++) {
                let data: cc.Vec2 = this._editMng.posList[index];
                // let ballNode: cc.Node = cc.instantiate(this.ballPrefab);
                let ballNode: cc.Node = NodePool.get_node("red");
                this.node.addChild(ballNode);
                ballNode.position = data;

                ballNode.getComponent(IdentityComponent).init(2, 1);
                ballNode.getComponent(SkillComponent).init();
                ballNode.getComponent(EliminateComponent).init();
            }
        });
    }

    /**
     * 加载关卡
     * @param curLv 关卡路径
     * @param cb 回调
     */
    private loadGate(curLv: string, cb: Function) {
        cc.loader.loadRes(curLv, cc.Prefab, (err, res) => {
            if (!!err) {
                if (err.message && err.message.search(/does not exist/) != -1) {
                    console.error("加载资源不存在 url ==>", curLv);
                    return;
                }
                this.loadGate(curLv, cb);
                return;
            }

            if (res) {
                let gateNode: cc.Node = cc.instantiate(res);
                this.node.addChild(gateNode);
                this._editMng = gateNode.getComponent(EditMng);
                this._editMng.init();

                if (typeof (cb) == "function") {
                    cb();
                }
            }
        })
    }
}
