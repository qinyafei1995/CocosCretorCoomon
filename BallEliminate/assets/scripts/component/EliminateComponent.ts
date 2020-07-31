import IdentityComponent from "./IdentityComponent";
import { Identity } from "./IdentityConfig";
import Log from "../Log/Log";
import Msg from "../common/Msg";
import NodePool from "../common/NodePool";
import GameData from "../Data/GameData";
import GameDataHelp from "../Data/GameDataHelp";

// 消除组件
const { ccclass, property } = cc._decorator;

@ccclass
export default class EliminateComponent extends cc.Component {
    _rig: cc.RigidBody = null;
    _isPut: boolean = true;
    _idCom: IdentityComponent = null;
    _isOpen: boolean = true;
    _lastPos: cc.Vec2 = null;

    public init() {
        this.initMsg();

        this._isPut = true;
        this._isOpen = true;
        this._lastPos = null;

        this._idCom = this.node.getComponent(IdentityComponent);
        return this;
    }

    // 初始化消息
    private initMsg() {
        Msg.on("elininate-ball-all", this.putNode, this);
    }

    /**
     * 计时回收
     */
    private put() {
        this.scheduleOnce(this.putNode, 2);
    }

    /**
     * 直接回收
     */
    public putNode() {
        if (this._isPut) {
            this._isPut = false;
            NodePool.put_node(this.node.name, this.node);
            this.unschedule(this.putNode);
            
            // 如果身份发生变化， 或者本身是blue色, 添加到发射容器中
            if (this._idCom.selfIdentity == Identity.blue) {
                this.addGameData();    
            } 

            if (this._idCom.selfIdentity == Identity.red) {
                
            } 

            if (this._idCom.selfIdentity == Identity.gray) {
                
            } 

            // 添加数据后在, 在减数据
            GameDataHelp.subCurGateBall(this._idCom.selfIdentity);
        }
    }

    /**
     * 添加游戏数据
     */
    private addGameData() {
        let daraArr: Array<number> = [1, this._idCom.selfSkill];
        GameData.shootContainer.push(daraArr);
    }
    /**
     * 开启回收计时
     */
    public openPutSchedule() {
        if (this._isOpen) {
            this._isOpen = false;
            this.put();
        }
    }
}
