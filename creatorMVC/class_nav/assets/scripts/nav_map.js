var astar = require("astar");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        is_debug: true,
    },

    // use this for initialization
    onLoad: function () {
        // this.draw_node = new cc.DrawNode();
        // this.node._sgNode.addChild(this.draw_node);
        this.graphics = this.node.addComponent(cc.Graphics);
        this.graphics.fillColor = cc.color(255, 0, 0, 255);

        // this.graphics_blue = this.node.addComponent(cc.Graphics);
        // this.graphics_blue.fillColor = cc.color(0, 0, 255, 255);
    },

    map_degbu_draw: function() {
        this.graphics.clear();
        // this.graphics_blue.clear();
        var x_line = this.map.item_size * 0.5;
        var ypos = this.map.item_size * 0.5;

        

        for(var i = 0; i < this.map.height; i ++) {
            var xpos = x_line;
            for(var j = 0; j < this.map.width; j ++) {

                if (this.map.data[i * this.map.width + j] === 0) {
                    this.graphics.moveTo(xpos - 2, ypos + 2);
                    this.graphics.lineTo(xpos - 2, ypos - 2);
                    this.graphics.lineTo(xpos + 2, ypos - 2);
                    this.graphics.lineTo(xpos + 2, ypos + 2);
                    this.graphics.close(); // 组成一个封闭的路径
                    
                }
                else {
                    /*this.graphics_blue.moveTo(xpos - 1, ypos + 1);
                    this.graphics_blue.lineTo(xpos - 1, ypos - 1);
                    this.graphics_blue.lineTo(xpos + 1, ypos - 1);
                    this.graphics_blue.lineTo(xpos + 1, ypos + 1);
                    this.graphics_blue.close(); // 组成一个封闭的路径*/
                }
                
                xpos += this.map.item_size;
            }

            ypos += this.map.item_size;
        }
        this.graphics.fill();
        // this.graphics_blue.fill();
    },

    map_degbu_draw_obs: function() {
        // this.graphics.clear();
        // this.graphics_blue.clear();

        var x_line = this.map.item_size * 0.5;
        var ypos = this.map.item_size * 0.5;
        this.graphics.fillColor = cc.color(0, 0, 255, 255);

        for(var i = 0; i < this.map.height; i ++) {
            var xpos = x_line;
            for(var j = 0; j < this.map.width; j ++) {

                if (this.map.data[i * this.map.width + j] === 0) {
                    /*this.graphics.moveTo(xpos - 1, ypos + 1);
                    this.graphics.lineTo(xpos - 1, ypos - 1);
                    this.graphics.lineTo(xpos + 1, ypos - 1);
                    this.graphics.lineTo(xpos + 1, ypos + 1);
                    this.graphics.close(); */// 组成一个封闭的路径
                    
                }
                else {
                    this.graphics.moveTo(xpos - 2, ypos + 2);
                    this.graphics.lineTo(xpos - 2, ypos - 2);
                    this.graphics.lineTo(xpos + 2, ypos - 2);
                    this.graphics.lineTo(xpos + 2, ypos + 2);
                    this.graphics.close(); // 组成一个封闭的路径
                }
                
                xpos += this.map.item_size;
            }

            ypos += this.map.item_size;
        }
        this.graphics.fill();
        // this.graphics_blue.fill();
    },

    start: function() {
        this.map = require("game_map_" + this.node.name);
        if(this.is_debug) {
            this.map_degbu_draw();
            this.map_degbu_draw_obs();
        }


    },

    astar_search: function(src_w, dst_w) {
        var src = this.node.convertToNodeSpaceAR(src_w);
        var dst = this.node.convertToNodeSpaceAR(dst_w);

        var src_mx = Math.floor((src.x) / this.map.item_size);
        var src_my = Math.floor((src.y) / this.map.item_size);

        var dst_mx = Math.floor((dst.x) / this.map.item_size);
        var dst_my = Math.floor((dst.y) / this.map.item_size);
        
        var path = astar.search(this.map, src_mx, src_my, dst_mx, dst_my);
        
        var world_offset = this.node.convertToWorldSpaceAR(cc.p(this.map.item_size * 0.5, this.map.item_size * 0.5));
        var path_pos = [];
        // console.log(path_pos);

        for(var i = 0; i < path.length; i ++) {
            var x = path[i].x * this.map.item_size;
            var y = path[i].y * this.map.item_size;

            var pos = cc.p(world_offset.x + x, world_offset.y + y);
            path_pos.push(pos);
        }

        return path_pos;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
