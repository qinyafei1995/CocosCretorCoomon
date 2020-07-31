
import SkillBase from "./SkillBase";
import { Identity } from "../component/IdentityConfig";

const { ccclass, property } = cc._decorator;
/**
 * 爆炸
 */
@ccclass
export default class SkillExplode extends SkillBase {

    init() {
        super.init();
        return this;
    }

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact: any, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        super.onBeginContact(contact, selfCollider, otherCollider);

        if (this._selfIdCom.selfIdentity == Identity.blue && this._otherIdCom.selfIdentity != Identity.blue) {
            this._selfRig.linearVelocity = cc.Vec2.ZERO;

            // this._anim.play(() => {
                // 吸收动画 更新碰撞盒子
                this.setCollider(selfCollider, 100, null, () => {
                    this._isRelease = true;
                    this._selfEliminate.openPutSchedule();
                })
            // })

            if (this._otherIdCom.selfIdentity == Identity.red) {
                this._otherIdCom.setIdentity(Identity.blue);
                let velocity = otherCollider.node.position.sub(this.node.position).normalize();
                this._otherRig.linearVelocity = cc.v2(this._otherRig.linearVelocity.x + velocity.x * 300, this._otherRig.linearVelocity.y + velocity.y * 300);

                if (this._otherIdCom.selfIdentity == Identity.gray) {

                }
            }
        }
    }
}
