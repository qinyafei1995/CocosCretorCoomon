
cc.Class({
    extends: cc.Component,

    properties: {
        touchNode: {
            default: null,
            type: cc.Node,
            tooltip: '触摸节点'
        },

        btnNode: {
            default: null,
            type: cc.Node,
            tooltip: '按钮节点'
        },

        touchRNum: {
            default: 125,
            tooltip: '触摸半径'
        },

        ctrlObj: {
            default: null,
            type: cc.Node,
            tooltip: '被控制对象'
        },

        objSpeed: {
            default: 200,
            tooltip: '被控制对象移动速度'
        }
    },

    onLoad () {
        this.init();
    },

    init() {
        this.initData();
        this._regTouch();
    },

    initData() {
        this._obj_move_dir = null;
        this._obj_rotate_num = null;
    },

    _regTouch() {
        this.touchNode.on(cc.Node.EventType.TOUCH_START, this._touchStart, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_END, this._touchEnd, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancel, this);
    },

    _touchStart(e) {
        this._updateBtnPos(e);
        this._updateDirAndRot(e);
    },

    _touchMove(e) {
        // 是否超过指定半径
        this._moveBtn(e);
        this._updateDirAndRot(e);
    },

    _touchEnd(e) {
        this._resetBtnPos();
        this._resetDirAndRot();
    },

    _touchCancel(e) {
        this._resetBtnPos();
        this._resetDirAndRot();
    },

    // 更新Btn位置
    _updateBtnPos(event_type) {
        this.btnNode.position = this._worldToNodeVec(event_type);
    },

    // 重置Btn位置
    _resetBtnPos() {
        this.btnNode.position = cc.Vec2.ZERO;
    },

    _worldToNodeVec(event_type) {
        let touch_world_vec = event_type.getLocation();
        return this.node.convertToNodeSpaceAR(touch_world_vec);
    },

    // 移动btn
    _moveBtn(event_type) {
        let touch_node_vec = this._worldToNodeVec(event_type);
        let dis_num = touch_node_vec.sub(cc.Vec2.ZERO).mag();
        if(dis_num > this.touchRNum) {
            let unit_vec = touch_node_vec.normalize();
            this.btnNode.position = cc.v2(unit_vec.x * this.touchRNum, unit_vec.y * this.touchRNum);
        } else {
            // 更新位置
            this._updateBtnPos(event_type);
        }
    },  

    // 更新方向与角度
    _updateDirAndRot(event_type) {
        let node_vec = this._worldToNodeVec(event_type);
        let angle = Math.acos(node_vec.x / node_vec.mag()) * 180 / Math.PI;
        this._obj_move_dir = node_vec.normalize();
        if(this.btnNode.y > 0) {
            angle = angle * -1;
        }
        this._obj_rotate_num = angle;
    },

    // 置null 方向与速度
    _resetDirAndRot() {
        this._obj_move_dir = null;
        this._obj_rotate_num = null;
    },

    update(dt) {
        if(this.ctrlObj) {
            if(this._obj_move_dir) {
                this.ctrlObj.position = cc.v2(this.ctrlObj.x + this._obj_move_dir.x * this.objSpeed * dt, this.ctrlObj.y + this._obj_move_dir.y * this.objSpeed * dt);
                this.ctrlObj.rotation = this._obj_rotate_num;
            }
        }
    },
});
