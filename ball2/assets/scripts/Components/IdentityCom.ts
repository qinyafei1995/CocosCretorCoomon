import ComBase from "./ComBase";
import GameHelp from "../Common/GameHelp";

const {ccclass, property} = cc._decorator;

/**
 * 身份组件
 * 根据球的信息,给予球的长相与行为
 */
@ccclass
export default class IdentityCom extends ComBase {
    // 实例化
    @property({displayName: "身份Sprite", type: cc.Sprite})
    colorSprite: cc.Sprite = null;

    @property({displayName: "技能节点", type: cc.Node})
    skillNode: cc.Node = null;


    // 数据
    // 颜色ID
    private _colorId: number = null;
    public set colorId(v : number) {
        this._colorId = v;
        this.updateColorSF();
    }
    public get colorId() : number {
        return this._colorId;
    }
    
    // 技能ID
    private _skillId: number = null;
    public set skillId(v : number) {
        this._skillId = v;
        this.updateSkill();
    }
    public get skillId() : number {
        return this._skillId;
    }

    private _ballData: Array<number> = null;


    public init(ballData: any = [1, 1]) {
        this._ballData = ballData;
        this.colorId = this._ballData[0];
        this.skillId = this._ballData[1];

        this._selfMoveCom.init();
        this._selfPoolCom.init();
        this._selfSkill.init();
        this._selfAnimCpm.init();
        
        return this;
    }

    /**
     * 更新颜色图片
     */
    private updateColorSF() {
        GameHelp.LoadRes("color/" + this.colorId, cc.SpriteFrame, (res) => {
            this.colorSprite.spriteFrame = res;
        })
    }

    /**
     * 更新技能
     */
    private updateSkill() {
        console.error("技能更新没写");
    }
}
