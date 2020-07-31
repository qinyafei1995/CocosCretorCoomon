import { Identity } from "./IdentityConfig";
import { SkillConfig } from "../Skill/SkillConfig";
import Log from "../Log/Log";
import GameData from "../Data/GameData";
import GameDataHelp from "../Data/GameDataHelp";
import Msg from "../common/Msg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class IdentityComponent extends cc.Component {

    @property({ displayName: "身份", type: Identity })
    selfIdentity: number = Identity.red;

    @property({ displayName: "技能", type: cc.Enum(SkillConfig) })
    selfSkill: number = SkillConfig.infext;

    _selfSF: cc.Sprite = null;

    // 初始时的身份
    _initIdentity: number = null;


    init(id: number, skill: number) {
        this._selfSF = this.node.getChildByName("image").getComponent(cc.Sprite);

        this.setIdentity(id);
        this.setSkill(skill);
        this.addGameData();

        // 记录初始化时的身份
        this._initIdentity = id;
        
        return this;
    }

    private loadIcon(url: string, icon: cc.Node, cb: Function = null) {
        cc.loader.loadRes(url, cc.SpriteFrame, (err, res) => {
            if (!!err) {
                if (err.message && err.message.search(/does not exist/) != -1) {
                    console.error("加载资源不存在 url ==>", url);
                    return;
                }
                this.loadIcon(url, icon, cb);
                return;
            }

            if (res && icon.isValid) {
                icon.getComponent(cc.Sprite).spriteFrame = res;
            }

            if (typeof (cb) == "function") {
                cb();
            }
        })
    }

    /**
     * 是否包含当前身份图片
     * @param id 身份
     */
    private isHaveIdSF(id: number) {
        let t = false;
        switch (id) {
            case Identity.blue:
                t = true;
                break;

            case Identity.red:
                t = true;
                break;

            case Identity.border:
                t = false;
                break;

            case Identity.gray:
                t = false;
                break;
            default:
                break;
        }
        return t;
    }


    /**
     * 添加游戏数据
     */
    private addGameData() {
        if (this.selfIdentity == Identity.blue) {
            GameDataHelp.addCurGateBall(this.selfIdentity);
            Msg.emit("fight-container-ball-init-number-add");
        }
    }

    /**
     * 身份是否发生变化
     */
    public isIdentityChang() {
        let f = false;
        if (this.selfIdentity != this._initIdentity) {
            f = true;
        }
        return f;
    }

    /**
     * 设置身份
     * @param otherId Identity枚举中身份
     */
    public setIdentity(otherId: number) {
        this.selfIdentity = otherId;
        if (this.isHaveIdSF(this.selfIdentity)) {
            let url = "IdentityImage/" + this.selfIdentity;
            this.loadIcon(url, this.node.getChildByName("image"));
        }
    }

    /**
     * 设置技能
     * @param skillId 
     */
    public setSkill(skillId: number) {
        this.selfSkill = skillId;
        let url = "SkillImage/" + this.selfSkill;
        this.loadIcon(url, this.node.getChildByName("skillImage"));
    }
}
