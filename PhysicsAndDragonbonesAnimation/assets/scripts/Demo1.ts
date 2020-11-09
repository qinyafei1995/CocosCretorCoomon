const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property({type: cc.Prefab})
    ponitNode: cc.Prefab = null;
    
    _phy: cc.PhysicsManager = null;
    _time: number = 0;
    _downFC: Function = null;
    onLoad() {
        this._phy = cc.director.getPhysicsManager();
        this._phy.enabled = true;
        // this._phy.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
    }

    down() {
        this._time = 0;
        this._downFC = () => {
            let downNode = cc.instantiate(this.ponitNode);
            downNode.position = cc.v2(-47, 350);
            this.node.addChild(downNode);
            

            this._time++;
            if (this._time > 20) {
                this.unschedule(this._downFC)
            } 
        }
        this.schedule(this._downFC, 0.1);
    }
}
