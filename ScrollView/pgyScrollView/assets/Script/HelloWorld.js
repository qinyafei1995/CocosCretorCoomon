cc.Class({
    extends: cc.Component,

    properties: {
        // label: {
        //     default: null,
        //     type: cc.Label
        // },
        // // defaults, set visually when attaching this script to the Canvas
        // text: 'Hello, World!',

        // drag: {
        //     default: null,
        //     type: cc.Node
        // },
    },

    // use this for initialization
    onLoad: function () {
        // let mgr = cc.director.getCollisionManager();
        // mgr.enabled = true;

        // mgr.enabledDebugDraw = true;
        // mgr.enabledDrawBoundingBox = true;

        // this.cat.node.getComponent(cc.Animation).play();
        this.playMusic();
        cc.director.getScheduler().scheduleUpdate(this, 0, false);
        // this.scheduleUpdate();
        cc.log("music 1");
        // this.playMusic();
        // cc.log("music 2");
    },

    /**
     * 播放背景音乐
     *
     */
    playMusic(){
        cc.loader.loadRes("background", cc.AudioClip, function (err, clip) {
            cc.audioEngine.playMusic(clip, true);
        });
    },

    onClickCallback(event, customerEventData){
        this.playMusic();
        cc.log("dddddddddd");
    },

    // called every frame
    update: function (dt) {

    },
});
