import GameData from "../Data/GameData";
import IdentityComponent from "../component/IdentityComponent";
import SkillComponent from "../component/SkillComponent";
import SkillMove from "../Skill/SkillMove";
import EliminateComponent from "../component/EliminateComponent";
import NodePool from "../common/NodePool";
import Msg from "../common/Msg";

const { ccclass, property } = cc._decorator;
/**
 * 射击容器控制
 */
@ccclass
export default class ShootContainerCtrl extends cc.Component {
    @property({ displayName: "半径配置", type: cc.Integer })
    rConfig: Array<number> = new Array<number>();

    @property({ displayName: "球个数配置", type: cc.Integer })
    ballNumberConfig: Array<number> = new Array<number>();

    @property({ displayName: "球转速配置", type: cc.Integer })
    ballRotateConfig: Array<number> = new Array<number>();

    @property({ displayName: "球发射速度配置", type: cc.Integer })
    ballShootSpeedConfig: Array<number> = new Array<number>();

    _ballMoveArr: Array<SkillMove> = [];
    // 球初始化完成个数
    _ballInitNum: number = 0;

    init() {
        // 测试数据 
        GameData.shootContainer = [[1, 1]];
        this.initMsg();
        this.creatorBall();
    }

    /**
     * 初始化事件
     */
    initMsg() {
        Msg.on("fight-container-creator", this.creatorBall, this);
        Msg.on("fight-container-ball-init-number-add", this.addBallInitNum, this);
    }

    /**
     * 创建球
     */
    creatorBall() {
        this._ballInitNum = 0;

        let index: number = 0;
        let angle: number = 0;
        let r: number = 0;
        let rotateSpeed: number = 0;
        let shootSpeed: number = 0;
        for (let i = 0; i < GameData.shootContainer.length; i++) {
            // 第1层数据
            if (index < this.ballNumberConfig[0]) {
                angle = this.getBallAngle(i, 0);

                r = this.rConfig[0];
                rotateSpeed = this.ballRotateConfig[0];
                shootSpeed = this.ballShootSpeedConfig[0];
            } else if (this.ballNumberConfig[0] <= index && index <= this.ballNumberConfig[0] + this.ballNumberConfig[1]) {
                // 第2层数据
                let v = i % this.ballNumberConfig[0];
                angle = this.getBallAngle(v, 1);

                r = this.rConfig[1];
                rotateSpeed = this.ballRotateConfig[1];
                shootSpeed = this.ballShootSpeedConfig[1];
            }
            index++;

            let ballNode = cc.instantiate(NodePool.get_node("blue"));
            this.node.addChild(ballNode);

            let idCom: IdentityComponent = ballNode.getComponent(IdentityComponent).init(GameData.shootContainer[i][0], GameData.shootContainer[i][1]);

            let skillCom: SkillComponent = ballNode.getComponent(SkillComponent).init();

            let moveCom: SkillMove = ballNode.getComponent(SkillMove);
            moveCom.init(angle, r, rotateSpeed, shootSpeed);
            this._ballMoveArr.push(moveCom);
            

            let eilnimate: EliminateComponent = ballNode.getComponent(EliminateComponent).init();
        }
    }

    public addBallInitNum() {
        this._ballInitNum++;

        console.log("身份变化 与 初始化时 ==>", this._ballInitNum);
    }

    /**
     * 获取球对应层的角度
     * @param index 第几个求
     * @param group 第几层
     */
    getBallAngle(index: number, group: number) {
        let angle = 360 / this.ballNumberConfig[group];
        return angle * index;
    }

    /**
     * 发射
     */
    public shoot() {
        console.log("shootContainerCtrl ==> 蓝球数量 ==>", this._ballInitNum, GameData.shootContainer);
        if (this._ballInitNum == this._ballMoveArr.length) {
            for (let i = 0; i < this._ballMoveArr.length; i++) {
                this._ballMoveArr[i].shoot();
            }
            this._ballMoveArr = [];
            GameData.shootContainer = [];
        }
    }
}
