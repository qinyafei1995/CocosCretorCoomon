// 背景视差
const { ccclass, property } = cc._decorator;

@ccclass
export default class Backgroup extends cc.Component {

    @property(cc.Node)
    mainCameraNode: cc.Node = null;

    // 背景列表
    @property(cc.Node)
    backgroupList: cc.Node[] = [];

    // 偏移速度比例
    @property
    offsetSpeedRatio: number = 1;

    // 每个层级偏移速度
    @property(cc.Vec2)
    offsetSpeedList: cc.Vec2[] = [];

    // 上一帧摄像机位置
    _lastPos: cc.Vec2 = null;

    // 0 为不动, -1为左, 1为右
    _moveDirectionLR: number = 0;

    // 0 为不动, -1为下, 1为上
    _moveDirectionUD: number = 0;

    // 存储每层偏移量    
    _offsetList: cc.Vec2[] = [];

    // 起始位置
    _initPostList: cc.Vec2[] = [];
    
    start() {
        this.init();
    }

    init() {
        this._lastPos = this.mainCameraNode.position;

        for (let index = 0; index < this.backgroupList.length; index++) {
            this._initPostList[index] = this.backgroupList[index].position;
            this._offsetList[index] = cc.v2(0, 0);
        }
    }

    update(dt) {
        this._countDirection();

        // X轴计算
        for (let i = 0; i < this.offsetSpeedList.length; i++) {
            // 偏移量 = 速度 * dt * 方向 * 速度比
            this._offsetList[i].x += this.offsetSpeedList[i].x * dt * this._moveDirectionLR * this.offsetSpeedRatio;
            // 移动后位置 = 初始位置 + 偏移量
            this.backgroupList[i].x = this._initPostList[i].x + this._offsetList[i].x;
        }

        // Y轴计算
        for (let i = 0; i < this.offsetSpeedList.length; i++) {
            this._offsetList[i].y += this.offsetSpeedList[i].y * dt * this._moveDirectionUD * this.offsetSpeedRatio;
            this.backgroupList[i].y = this._initPostList[i].y + this._offsetList[i].y;
        }

        this._lastPos = this.mainCameraNode.position;
    }

    // 计算方向
    _countDirection(): void {
        // 左右 方向判断
        if (this.mainCameraNode.x - this._lastPos.x > 0) {
            this._moveDirectionLR = 1;
        } else if (this.mainCameraNode.x - this._lastPos.x < 0) {
            this._moveDirectionLR = -1;
        } else if (this.mainCameraNode.x - this._lastPos.x == 0) {
            this._moveDirectionLR = 0;
        }

        // 上下方向判断
        if (this.mainCameraNode.y - this._lastPos.y > 0) {
            this._moveDirectionUD = 1;
        } else if (this.mainCameraNode.y - this._lastPos.y < 0) {
            this._moveDirectionUD = -1;
        } else if (this.mainCameraNode.y - this._lastPos.y == 0) {
            this._moveDirectionUD = 0;
        }
    }
}
