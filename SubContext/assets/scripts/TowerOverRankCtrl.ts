const {ccclass, property} = cc._decorator;

@ccclass
export default class TowerOverRankCtrl extends cc.Component {
    
    public open() {
        this.node.active = true;
        for (let i: number = 0; i < 3; i++) {
            let itemNode: cc.Node = this.node.children[i];
            if (i == 0) {
                itemNode.getChildByName("head")
                itemNode.getChildByName("score")
            } else if (i == 1) {
                // 自己
                itemNode.getChildByName("head")
                itemNode.getChildByName("score")
            } else if (i == 2) {
                
            }
        }
        console.log();
    }

    public close() {
        this.node.active = false;
    }
}
