let bulletBase = require('bulletBase');

cc.Class({
    extends: bulletBase,

    init(attack_, speed_, initPos_) {
        if(typeof attack_ === 'number' && attack_ > 0) {
            this.attack = attack_;
        } else {
            console.log('没有攻击力--->', attack_);
        }

        if(typeof speed_ === 'number' && speed_ > 0) {
            this.speed = speed_;
        } else {
            console.log('没有速度--->', speed_);
        }

        if(initPos_ instanceof cc.Vec2) {
            this.initPos = initPos_;
            this.node.position = this.initPos;
        } else {
            this.node.position = this.initPos;
        }

        this.isMove = true;
    },


    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function (other, self) {
        // 回收节点

        this.isMove = false;
    },
});
