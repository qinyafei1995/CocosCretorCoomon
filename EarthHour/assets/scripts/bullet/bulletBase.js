// 子弹基类, 定义子弹属性, 基本行为
cc.Class({
    extends: cc.Component,

    properties: {
        attack: 0,
        speed: 0,
        isMove: false,
        initPos: cc.v2(0, -300)
    },

    update (dt) {
        if(this.isMove) {
            this.node.y += this.node.y + dt * this.speed;
        }   
    },
});
