var UI_manager = require("UI_manager");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 初始化其它的全局框架模块
        // end ;
    },

    start () {
        this.enter_login_scene();
    },

    // 编写代码来new login场景数据;
    enter_login_scene() {
        // 创建地图，释放怪物

        // end 

        // 生成UI视图
        // UI_manager.show_ui_at(this.node, "LoginUI");
        // UI_manager.show_ui_at(this.node, 'overPanelUI');
        UI_manager.show_ui_at(this.node, 'labelMng');
        // end 
    },

    update (dt) {},
});
