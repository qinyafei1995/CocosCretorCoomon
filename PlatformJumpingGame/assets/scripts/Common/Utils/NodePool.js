let NodePool = {
    _pool_list: {},
    create_pool(name, perfab) {
        NodePool._pool_list[name] = {
            pool: new cc.NodePool(),
            perfab: perfab
        };
        //return NodePool._pool_list.length-1;
    },

    put_node(id, node) {
        if(!NodePool._check_id(id)) {
            return null;
        }

        NodePool._pool_list[id].pool.put(node);
    },

    get_node(id) {
        if(!NodePool._check_id(id)) {
            return null;
        }
        if(NodePool._pool_list[id].pool.size() > 0) {
            return NodePool._pool_list[id].pool.get();
        } else {
            return cc.instantiate(NodePool._pool_list[id].perfab);
        }
    },

    _check_id(id) {
        if(!NodePool._pool_list[id]) {
            return false;
        }
        return true;
    }
};

module.exports = NodePool;
