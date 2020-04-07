
const {ccclass, property} = cc._decorator;

@ccclass
export default class World extends cc.Component {

    @property
    WorldFallG: number = -1000;

    @property
    WorldWalkA: number = 300;

    static G: number = 0;
    static WalkA: number = 0;

    onLoad () {
        World.G = this.WorldFallG;
        World.WalkA = this.WorldWalkA;
    }

    start () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    }
}
