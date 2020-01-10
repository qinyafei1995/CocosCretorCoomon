import UIManager from 'UI_manager';
import NodeCache from 'NodeCache';

cc.Class({
    extends: cc.Component,

    onLoad () {
        this.initWindow();
        this.initPrefab();
    },

    start () {
        cc.director.loadScene('login');
    },

    initWindow() {
        window.VDUIManager = UIManager;
        window.VDNodeCache = NodeCache;
    },

    initPrefab() {
        VDNodeCache.preLoadPrefabs(VDNodeCache.prefabInfos, (res) => {
            console.log('对象池加载是否完成', res);
        });
    },
});
