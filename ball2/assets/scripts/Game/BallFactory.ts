import NodePool from "../Common/NodePool";

/**
 * 球 工厂
 */
export default class BallFactory {

    static getBall(data: any, cb: Function) {
        let itemNode: cc.Node = NodePool.get_node("ball");

        let idCom: any = itemNode.getComponent("IdentityCom").init();
        let moveCom: any = itemNode.getComponent("MoveCom").init();
        let pCom: any = itemNode.getComponent("PoolCom").init();
        let skCom: any = itemNode.getComponent("SkillCom").init();
        let aniCom: any = itemNode.getComponent("AnimationCom").init();

        if (typeof(cb) == "function") {
            cb(itemNode);
        }
    }
}
