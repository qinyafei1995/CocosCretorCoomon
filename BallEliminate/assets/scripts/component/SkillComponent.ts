import { Identity } from "./IdentityConfig";
import IdentityComponent from "./IdentityComponent";
import { SkillConfig } from "../Skill/SkillConfig";
import SkillBase from "../Skill/SkillBase";
import SkillAdsorb from "../Skill/SkillAdsorb";
import SkillInfext from "../Skill/SkillInfext";
import SkillExplode from "../Skill/SkillExplode";
import SkillMove from "../Skill/SkillMove";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkillComponent extends cc.Component {
    _selfSkillEnum: number = null;
    _selfIdentity: number = null;
    _selfSkill: SkillBase = null;

    init() {
        this.addSkill();
        return this;
    }

    private addSkill() {
        let idCom: IdentityComponent = this.node.getComponent(IdentityComponent);
        this._selfSkillEnum = idCom.selfSkill;
        this._selfIdentity = idCom.selfIdentity;
        this._selfSkill = this.node.getComponent(SkillBase);

        switch (this._selfIdentity) {
            case Identity.blue:
                let move: SkillMove = this.node.getComponent(SkillMove);
                if (!move) {
                    this.node.addComponent(SkillMove);
                }
                break;

            case Identity.red:
                let remove: SkillMove = this.node.getComponent(SkillMove);
                if (remove) {
                    this.node.removeComponent(SkillMove);
                }
                break;

            case Identity.gray:
                break;
        }


        switch (this._selfSkillEnum) {
            case SkillConfig.adsorb:
                let adsorb: SkillAdsorb = this.node.getComponent(SkillAdsorb);
                if (!adsorb) {
                    this._selfSkill = this.node.addComponent(SkillAdsorb);
                } else {
                    this._selfSkill = adsorb;
                }
                this.removeSkill("SkillAdsorb");
                break;

            case SkillConfig.infext:
                let infext: SkillInfext = this.node.getComponent(SkillInfext);
                if (!infext) {
                    this._selfSkill = this.node.addComponent(SkillInfext);
                } else {
                    this._selfSkill = infext;
                }
                this.removeSkill("SkillInfext");
                break;

            case SkillConfig.explode:
                let explode: SkillExplode = this.node.getComponent(SkillExplode);
                if (!explode) {
                    this._selfSkill = this.node.addComponent(SkillExplode);
                } else {
                    this._selfSkill = explode;
                }
                this.removeSkill("SkillExplode");
                break;

            default:
                break;
        }
        this._selfSkill.init();
    }

    /**
     * 移除技能组件
     * 不能处理移动技能
     * @param selfSkill 
     */
    private removeSkill(skillName: string) {
        let coms: any = this.node.getComponents(SkillBase);
        for (let index = 0; index < coms.length; index++) {
            let name: string = this.getClassName(coms[index].name);
            if (name != "SkillMove" && name != skillName) {
                this.node.removeComponent(name);
            }
        }
    }

    /**
     * 获取类名
     * @param str 节点<类名>
     */
    private getClassName(str: string) {
        let start: number = str.indexOf("<");
        let over: number = str.indexOf(">");
        let name: string = str.slice(start + 1, over);
        return name;
    }
}
