// 转盘基类, 定属性, 基本行为

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this._angleArr = [0,30,60,90,120,150,180,210,240,270,300,330];
    },
});
