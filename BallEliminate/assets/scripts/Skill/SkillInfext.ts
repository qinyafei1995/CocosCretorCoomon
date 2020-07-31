import SkillBase from "./SkillBase";
import { Identity } from "../component/IdentityConfig";

const { ccclass, property } = cc._decorator;

// 技能 感染
@ccclass
export default class SkillInfext extends SkillBase {

    init() {
        super.init();
        return this;
    }

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact: any, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        super.onBeginContact(contact, selfCollider, otherCollider);


        // 碰到边界框, 直接回收
        if (this._otherIdCom.selfIdentity == Identity.border) {
            this._selfRig.linearVelocity = cc.Vec2.ZERO;

            // this._anim.play(() => {
                this._selfEliminate.putNode();
            // })

            return;
        }

        // 自己是蓝色,碰到红色,感染红色
        if (this._selfIdCom.selfIdentity == Identity.blue) {
            this._selfEliminate.openPutSchedule();
            // this._anim.play(null);

            if (this._otherIdCom.selfIdentity == Identity.red) {
                this._otherIdCom.setIdentity(Identity.blue);
                this._otherEliminate.openPutSchedule();
                return;
            }
        }
    }
}
