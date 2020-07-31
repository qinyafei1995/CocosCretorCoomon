import GateEditBase from "./GateEditBase";
import Log from "../Log/Log";
import GameData from "../Data/GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EditMng extends cc.Component {

    // 位置列表
    posList: Array<cc.Vec2> = Array<cc.Vec2>();

    // 所有关卡编辑组件
    allGateEdit: Array<GateEditBase> = [];

    init() {
        this.gateEdit();
        this.updatePosList();
    }

    /**
     * 获取所有编辑器
     */
    private gateEdit() {
        for (let i = 0; i < this.node.children.length; i++) {
            let gateItem: cc.Node = this.node.children[i];
            let gateEdit: GateEditBase = gateItem.getComponent(GateEditBase);
            this.allGateEdit.push(gateEdit);
        }
    }

    /**
     * 更新位置列表
     */
    private updatePosList() {
        let posData: Array<cc.Vec2> = Array<cc.Vec2>();
        for (let index = 0; index < this.node.children.length; index++) {
            let gateItem: cc.Node = this.node.children[index];
            let gateEdit: GateEditBase = gateItem.getComponent(GateEditBase);
            gateEdit.init();

            posData = posData.concat(gateEdit._posList);
        }
        this.posList = [];
        this.posList = posData;
    }
}
