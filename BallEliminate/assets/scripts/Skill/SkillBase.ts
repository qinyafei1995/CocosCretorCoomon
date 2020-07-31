import IdentityComponent from "../component/IdentityComponent";
import EliminateComponent from "../component/EliminateComponent";
import AnimationComponent from "../component/AnimationComponent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkillBase extends cc.Component {
    _selfRig: cc.RigidBody = null;
    _selfIdCom: IdentityComponent = null;
    _selfEliminate: EliminateComponent = null;
    _selfCollider: cc.Collider = null;
    // 是否释放
    _isRelease: boolean = false;

    _otherRig: cc.RigidBody = null;
    _otherIdCom: IdentityComponent = null;
    _otherEliminate: EliminateComponent = null;

    _anim: AnimationComponent = null;

    init() {
        this._selfRig = this.node.getComponent(cc.RigidBody);
        this._selfRig.enabledContactListener = true;
        this._selfIdCom = this.node.getComponent(IdentityComponent);
        this._selfEliminate = this.node.getComponent(EliminateComponent);
        this._selfCollider = this.node.getComponent(cc.Collider);

        // 重置碰撞数据
        this._selfCollider["radius"] = 15;
        this._selfCollider["sensor"] = false;
        this._selfCollider["apply"]();

        this._anim = this.node.getComponent(AnimationComponent);
    }

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact: any, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        this._otherRig = otherCollider.node.getComponent(cc.RigidBody);
        this._otherIdCom = otherCollider.node.getComponent(IdentityComponent);
        this._otherEliminate = otherCollider.node.getComponent(EliminateComponent);

        // if (this._otherIdCom.selfIdentity == Identity.border) {
        //     this._selfRig.linearVelocity == cc.Vec2.ZERO;
        //     this._selfEliminate.putNode();
        //     return;
        // }
    }

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact(contact: any, selfCollider: cc.Collider, otherCollider: cc.Collider) {
    }

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve(contact: any, selfCollider: cc.Collider, otherCollider: cc.Collider) {
    }

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve(contact: any, selfCollider: cc.Collider, otherCollider: cc.Collider) {
    }

    /**
     * 设置collider大小
     * @param selfCollider 设置的Collider
     * @param updateRadius 更新
     * @param startCB 
     * @param endCB 
     */
    setCollider(selfCollider: cc.Collider, updateRadius: number, startCB: Function = null, endCB: Function = null) {
        if(!selfCollider.node.isValid) return;

        if (typeof (startCB) == "function") {
            startCB();
        }
        
        (<any>selfCollider).radius = updateRadius;
        (<any>selfCollider).sensor = true;
        (<any>selfCollider).apply();

        if (typeof (endCB) == "function") {
            endCB();
        }
    }
}
