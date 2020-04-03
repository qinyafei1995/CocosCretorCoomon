
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    mainCameraNode: cc.Node = null;

    @property(cc.Node)
    backgroupList: cc.Node[] = [];

    // 每个层级偏移量
    @property(cc.Vec2)
    offsetXList: cc.Vec2[] = [];

    start () {
        this.init();
    }

    init() {
    }

    // 计算每个成绩的
    countGroupOffset() {
        
    }

    update (dt) {
        for (let i = 0; i < this.backgroupList.length; i++) {
            this.backgroupList[i].x += this.offsetXList[i].x * dt;
        }

        this.mainCameraNode.x += this.offsetXList[0].x * dt;
    }
}
