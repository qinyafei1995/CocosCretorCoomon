import GateEditBase from "./GateEditBase";

const { ccclass, property } = cc._decorator;


/**
 * 圆弧编辑
 */
@ccclass
export default class RadianEdit extends GateEditBase {

    @property({ displayName: "半径", type: cc.Integer })
    roundR: number = 100;

    @property({ displayName: "生成角度范围", type: cc.Integer })
    angleSpace: number = 180;

    // 单个球所占的角度
    _ballAngle: number = null;

    // 最小角度
    _minAngle: number = null;

    // 最大角度"
    _maxAngle: number = null;

    init() {
        super.init();
        this.countAngleSpace();
        this.countPos();
    }

    /**
     * 计算一个球所占的角度
     */
    private countOneBallAngle() {
        this._ballAngle = (Math.tan(this.ballR / this.roundR) * 180 / Math.PI) * 2;
    }

    /**
     * 计算角度范围
     */
    private countAngleSpace() {
        this._minAngle = Math.random() * 360;
        this._maxAngle = this._minAngle + this.angleSpace;
    }

    private countPos() {
        let one: number = (this._maxAngle - this._minAngle) / this._allBallNum;

        for (let index = 0; index < this._allBallNum; index++) {
            this._minAngle = one * index - one + this._ballAngle / 2;
            this._maxAngle = one * index - one - this._ballAngle / 2;

            let angle: number = this._minAngle + Math.random() * (this._maxAngle - this._minAngle);
            this._posList.push(this.countAnglrRToPos(angle, this.roundR));
        }
    }
}
