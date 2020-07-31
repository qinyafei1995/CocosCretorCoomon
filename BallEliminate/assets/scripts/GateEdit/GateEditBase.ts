// 关卡编辑基类

const { ccclass, property } = cc._decorator;

@ccclass
export default class GateEditBase extends cc.Component {

    @property({ displayName: "感染球", type: cc.Integer})
    redInfextNum: number = 0;

    @property({ displayName: "吸收球", type: cc.Integer})
    redAdsorbNum: number = 0;

    @property({ displayName: "爆炸球", type: cc.Integer})
    redExplodeNum: number = 0;
    
    @property({ displayName: "障碍物", type: cc.Integer })
    grayNum: number = 0;

    @property({ displayName: "球半径", type: cc.Integer })
    ballR: number = 25;

    // 位置列表
    _posList: Array<cc.Vec2> = new Array<cc.Vec2>();

    // 球总数量
    _allBallNum: number = 0;

    init() {
        this._allBallNum = this.redInfextNum + this.redAdsorbNum + this.redExplodeNum + this.grayNum;
    }

    /**
     * 根据角度与半径, 计算点位置
     * @param angle 角度
     * @param r 半径
     */
    public countAnglrRToPos(angle: number, r: number) {
        // 线性速度
        let x: number = Math.cos(angle * Math.PI / 180) * r;
        let y: number = Math.sin(angle * Math.PI / 180) * r;
        return cc.v2(x, y);
    }
}
