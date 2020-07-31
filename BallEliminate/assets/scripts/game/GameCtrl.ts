import ShootContainerCtrl from "./ShootContainerCtrl";
import GateCtrl from "./GateCtrl";
import NodePoolMng from "./NodePoolMng";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCtrl extends cc.Component {
    @property({displayName: "", type: cc.Node})
    centreNode: cc.Node = null;

    @property({displayName: "", type: cc.Node})
    gateNode: cc.Node = null;

    _phy: cc.PhysicsManager = null;
    _shootCtrl: ShootContainerCtrl = null;
    _gateCtrl: GateCtrl = null;
    onLoad() {
        console.log(sp["spine"]);
        this.initPhy();
        this.initCentreCtrl();
        this.initGateCtrl();
    }

    private initPhy() {
        this._phy = cc.director.getPhysicsManager();
        this._phy.enabled = true;
        this._phy.gravity = cc.Vec2.ZERO;
        // this._phy.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits["e_pairBit"] |
        //     cc.PhysicsManager.DrawBits["e_centerOfMassBit"] |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;
    }

    // 中心控制
    private initCentreCtrl() {
        this._shootCtrl = this.centreNode.getComponent(ShootContainerCtrl);
        this._shootCtrl.init();
    }

    // 关卡控制
    private initGateCtrl() {
        this._gateCtrl = this.gateNode.getComponent(GateCtrl);
        this._gateCtrl.init();
    }
}
