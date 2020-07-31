import SkillBase from "./SkillBase";


import { Identity } from "../component/IdentityConfig";

const { ccclass, property } = cc._decorator;

// 技能 吸收
@ccclass
export default class SkillAdsorb extends SkillBase {
    init() {
        super.init();
        return this;
    }

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact: any, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        super.onBeginContact(contact, selfCollider, otherCollider);

        // 停止吸收
        if (this._selfIdCom.selfIdentity == Identity.blue && this._otherIdCom.selfIdentity != Identity.blue) {
            this._selfRig.linearVelocity = cc.Vec2.ZERO;

            // this._anim.play(() => {
                // 吸收动画 更新碰撞盒子
                this.setCollider(selfCollider, 50, null, () => {
                    this._isRelease = true;
                    this._selfEliminate.openPutSchedule();
                })
            // })
            
            
            if (this._otherIdCom.selfIdentity == Identity.red) {
                this._otherIdCom.setIdentity(Identity.blue);
                this._otherEliminate.putNode();
                return;
            }
        }
    }
}
