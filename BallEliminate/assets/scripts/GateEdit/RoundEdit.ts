// 原型区域的随机创建

import Log from "../Log/Log";
import GateEditBase from "./GateEditBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoundEdit extends GateEditBase {

    @property({ displayName: "半径r", type: cc.Integer})
    roundR: number = 100;

    @property({ displayName: "生成的数量", type: cc.Integer})
    coreatorNum: number = 6;

    // 位置列表
    _posList: Array<cc.Vec2> = new Array<cc.Vec2>();

    // 随机的区间
    _randomSpace: Array<number> = [0, 360];

    // 单个球所占的角度
    _ballAngle: number = null;

    onLoad() {
        this.init();
    }

    init() {
        super.init();
        
        this.countOneBallAngle();
        this.countPos();
    }

    /**
     * 计算一个球所占的角度
     */
    countOneBallAngle() {
        this._ballAngle = (Math.tan(this.ballR / this.roundR) * 180 / Math.PI) * 2;
    }

    countPos() {
        let min: number = 0;
        let max: number = 360;
        let one: number = 360 / this.coreatorNum;
        
        for (let index = 0; index < this.coreatorNum; index++) {
            min = one * index - one + this._ballAngle / 2;
            max = one * index - one - this._ballAngle / 2;

            let angle: number = min + Math.random() * (max - min);
            this._posList.push(this.countAnglrRToPos(angle, this.roundR));
        }
    }
}
