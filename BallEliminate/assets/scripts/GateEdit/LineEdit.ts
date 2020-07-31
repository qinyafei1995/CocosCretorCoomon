import GateEditBase from "./GateEditBase";

const {ccclass, property} = cc._decorator;

/**
 * 线编辑
 */
@ccclass
export default class LineEdit extends GateEditBase {

    @property({displayName: "开始点", type: cc.Node})
    startPos: cc.Node = null;

    @property({displayName: "结束点", type: cc.Node})
    endPos: cc.Node = null;

    @property({ displayName: "生成的数量", type: cc.Integer})
    coreatorNum: number = 6;
}
