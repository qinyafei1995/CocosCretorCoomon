
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        VDUIManager.show_ui_at(this.node, 'loginPanel');
    },
});
