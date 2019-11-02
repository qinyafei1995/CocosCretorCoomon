var nav_agent = require("nav_agent");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        player: {
            type: nav_agent, 
            default: null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
            var w_pos = e.getLocation();
            this.player.nav_to_map(w_pos);
        }.bind(this));
    },

    // update (dt) {},
});
