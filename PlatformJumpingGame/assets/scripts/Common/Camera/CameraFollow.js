
let FollowEnum = cc.Enum({

})

// 相机跟随 类型
let FollowType = cc.Class({
    name: 'FollowType',
    properties: {

    }
})

cc.Class({
    extends: cc.Component,

    properties: {
        followTag: {
            default: null,
            type: cc.Node,
            displayName:'相机跟随的目标'
        },
        openGraphics: {
            default: true,
            displayName: '是否开启边界绘制'
        },
    },


    onLoad() {
        this.init();
    },

    init() {
        this._initData();
        this._initGraphics();
    },

    _initData() {
        this._graphics = this.node.getComponent(cc.Graphics);
    },

    //  初初始化绘制组件
    _initGraphics() {
        this._graphics.lineWidth = 3;
        this._graphicsSpace(cc.v2(-200, -200), 400, 400);
    },

    // 绘制边界 左下角为起点
    _graphicsSpace(ldPos, w, h) {
        if(!this.openGraphics) return;
        let lu = cc.v2(ldPos.x, ldPos.y + h);
        let ru = cc.v2(ldPos.x + w, ldPos.y + h);
        let rd = cc.v2(ldPos.x + w, ldPos.y);
        this._graphics.clear();
        this._graphics.moveTo(ldPos.x, ldPos.y);
        this._graphics.lineTo(lu.x, lu.y);
        this._graphics.lineTo(ru.x, ru.y);
        this._graphics.lineTo(rd.x, rd.y);
        this._graphics.lineTo(ldPos.x, ldPos.y);
        this._graphics.stroke();
    },

    update(dt) {
        this.node.position = this.followTag.position;
    }
});
