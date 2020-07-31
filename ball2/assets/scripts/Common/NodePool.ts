
export default class NodePool {
    
    private static _pool_list: any = {};

    public static create_pool(name: string, perfab: cc.Prefab) {
        if(!NodePool.check_id(name)) {
            NodePool._pool_list[name] = {
                pool: new cc.NodePool(),
                perfab: perfab
            };
        }
        //return NodePool._pool_list.length-1;
    }

    public static put_node(id: string, node: cc.Node) {
        if(!NodePool.check_id(id)) {
            return null;
        }

        NodePool._pool_list[id].pool.put(node);
    }

    public static get_node(id: string): cc.Node {
        if(!NodePool.check_id(id)) {
            return null;
        }
        if(NodePool._pool_list[id].pool.size() > 0) {
            return NodePool._pool_list[id].pool.get();
        } else {
            return cc.instantiate(NodePool._pool_list[id].perfab);
        }
    }

    public static check_id(id: string): boolean {
        if(!NodePool._pool_list[id]) {
            return false;
        }
        return true;
    }
}