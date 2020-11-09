const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property({displayName:"dragonbones节点", type: dragonBones.ArmatureDisplay})
    db: dragonBones.ArmatureDisplay = null;

    @property({displayName:"左胸", type: cc.Node})
    lNode: cc.Node = null;

    @property({displayName:"右胸", type: cc.Node})
    rNode: cc.Node = null;

    dbArmature: any = null;
    lBone: any = null;
    rBone: any = null;

    lStartPos: cc.Vec2 = null;
    rStartPos: cc.Vec2 = null;

    onLoad() {
        this.dbArmature = this.db.armature();
        this.lBone = this.dbArmature.getBone("l");
        this.rBone = this.dbArmature.getBone("r");

        this.lStartPos = this.lNode.position;
        this.rStartPos = this.rNode.position;
    }
    

    update(dt: number) {
        let lOffset = this.lNode.position.sub(this.lStartPos);
        let rOffset = this.rNode.position.sub(this.rStartPos);

        this.lBone.offset.x = lOffset.x;
        this.lBone.offset.y = lOffset.y;
        this.dbArmature.invalidUpdate("l", false);

        this.rBone.offset.x = rOffset.x;
        this.rBone.offset.y = rOffset.y;
        this.dbArmature.invalidUpdate("r", false);
    }

    updateBonesOffset() {

        
    }
}
