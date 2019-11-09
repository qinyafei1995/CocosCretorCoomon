import UIManager from 'UI_manager';


cc.Class({
    extends: cc.Component,

    onLoad () {
        this.initWindow();
    },

    start () {
        cc.director.loadScene('login');
    },

    initWindow() {
        window.VDUIManager = UIManager;
    },
});
