import ComBase from "./ComBase";
import NodePool from "../Common/NodePool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MoveCom extends ComBase {
    
    @property({ displayName: "半径", type: cc.Integer })
    r: number = 200;

    @property({ displayName: "转动时的移动速度", type: cc.Integer })
    rotationSpeed: number = 50;

    @property({ displayName: "发射时的移动速度", type: cc.Integer })
    shootSpeed: number = 200;

    @property({ displayName: "诞生时的角度", type: cc.Integer })
    initRotation: number = 0;

    // 是否可以发射
    _isShoot: boolean = false;

    // 约束回收
    _isPut: boolean = true;

    /**
     * 初始化
     * @param initAngle 初始化时的角度
     */
    public init(initAngle: number = this.initRotation) {
        this.initRotation = initAngle;

        // 重置时
        this._isShoot = false;
        this._isPut = false;

        return this;
    }

    update(dt: number) {
        this.circleMove(dt);
        // this.putBall();
    }

    /**
     * 旋转
     * @param dt 
     */
    private circleMove(dt: number) {
        // 计算球移动时的向量
        if (this._isShoot) {
            // 旋转角度
            this.initRotation += this.rotationSpeed * dt;

            // 线性速度
            let x: number = Math.cos(this.initRotation * Math.PI / 180) * this.r;
            let y: number = Math.sin(this.initRotation * Math.PI / 180) * this.r;
            this.node.position = cc.v2(x, y);
        }
    }

    /**
     * 回收球
     */
    private putBall() {
        if (this._isShoot == false && Math.abs(this._selfRig.linearVelocity.x) < 1 && Math.abs(this._selfRig.linearVelocity.y) < 1 && this._isPut) {
            this._isPut = false;
            NodePool.put_node(this.node.name, this.node);
        }
    }

    /**
     * 旋转
     */
    public rotate() {
        this._isShoot = true;
    }

    /**
     * 发射
     */
    public shoot() {
        this._isShoot = false;

        let dic = this.node.position.sub(cc.Vec2.ZERO).normalize();
        this._selfRig.linearVelocity = cc.v2(dic.x * this.shootSpeed, dic.y * this.shootSpeed);
    }
}
