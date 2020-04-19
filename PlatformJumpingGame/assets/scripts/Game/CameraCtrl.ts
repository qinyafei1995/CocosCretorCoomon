const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraCtrl extends cc.Component {
    @property(cc.Node)
    tager: cc.Node = null;

    // 
    _offsetPos: cc.Vec2 = null;
    
    start () {
        this._offsetPos = this.node.position.sub(this.tager.position);
        // console.log('offsetPos ----->', this._offsetPos);
        let tset = this.node.position.lerp(this.node.position.add(cc.v2(10,10)), 0.1); 
        console.log(tset)
    }

    update (dt) {
        // this.node.position = this.tager.position.add(this._offsetPos);
        // this.node.position.lerp()
    }
}
