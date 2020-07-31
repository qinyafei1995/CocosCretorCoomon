import NodePool from "../Common/NodePool";
import IdentityCom from "../Components/IdentityCom";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    _phy: cc.PhysicsManager = null;
    onLoad() {
        this.initPhy();
        // 测试
        for (let index = 0; index < 8; index++) {
            let nodeItme = NodePool.get_node("ball");
            this.node.addChild(nodeItme);
            nodeItme.getComponent(IdentityCom).init();
        }
    }

    private initPhy() {
        this._phy = cc.director.getPhysicsManager();
        this._phy.enabled = true;
        // 取消重力
        this._phy.gravity = cc.Vec2.ZERO;
        this._phy.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits["e_pairBit"] |
            cc.PhysicsManager.DrawBits["e_centerOfMassBit"] |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit;
    }
}
