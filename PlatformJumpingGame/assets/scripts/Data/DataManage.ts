// 管理游戏中数据

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node) 
    arrNode: cc.Node[] = [];

    @property
    node1: cc.Node = null;

    @property
    text: string = 'hello';

    @property
    num: number = 1;

    start () {
        
    }
}