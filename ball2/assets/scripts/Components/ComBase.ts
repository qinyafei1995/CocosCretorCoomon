import IdentityCom from "./IdentityCom";
import MoveCom from "./MoveCom";
import PoolCom from "./PoolCom";
import SkillCom from "./SkillCom";
import AnimationCom from "./AnimationCom";

const {ccclass, property} = cc._decorator;

/**
 * 组件基类
 */
@ccclass
export default class ComBase extends cc.Component {
    _selfIdCom: IdentityCom = null;
    _selfMoveCom: MoveCom = null;
    _selfPoolCom: PoolCom = null;
    _selfSkill: SkillCom = null;
    _selfAnimCpm: AnimationCom = null;

    _selfRig: cc.RigidBody = null;

    onLoad() {
        this._selfIdCom = this.node.getComponent("IdentityCom");
        this._selfMoveCom = this.node.getComponent("MoveCom");
        this._selfPoolCom = this.node.getComponent("PoolCom");
        this._selfSkill = this.node.getComponent("SkillCom");
        this._selfAnimCpm = this.node.getComponent("AnimationCom");
        this._selfRig = this.node.getComponent(cc.RigidBody);
    }
}
