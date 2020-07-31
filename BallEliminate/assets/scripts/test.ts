
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    testNode: cc.Node = null;

    @property(cc.SpriteFrame)
    testSF: cc.SpriteFrame = null;

    _s: cc.Sprite = null;

    onLoad () {
        this.testNode.destroy();
        this._s = this.testNode.getComponent(cc.Sprite);
        this.scheduleOnce(() => {
            
            this._s.spriteFrame = this.testSF;
        }, 1)  
    }
}
