

cc.Class({
    extends: cc.Component,

    properties: {
        layoutNode: cc.Node,
        speed: 200,
    },

    onLoad () {
        this.init();
    },

    init() {
        this.initData();
        this._start_vec = this.layoutNode.position;
        this._node_arr = this.layoutNode.children;
    },

    initData() {
        this._node_arr = [];
        this._start_vec = null;
    }, 

    pubRandom() {
        this.layoutNode.position = this._start_vec;

        let distance_num = this.layoutNode.y + (this._node_arr.length - 1) * 100;
        let to_pos = cc.v2(this.layoutNode.x, distance_num);
        let time_num = to_pos.y / this.speed;
        let move_act = cc.moveTo(time_num, to_pos);
        this.layoutNode.runAction(move_act);
    },
});
