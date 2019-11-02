var map_gen = require("map_gen");

// 组件类模板
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200,

        road_index: 0, // 放到第几条路上的怪物;   
        
        map: {
            type: map_gen,
            default: null,
        }      
    },

    // 初始化入口;
    start () {
        this.is_walking = false;
        var road_set = this.map.get_road_set();
        if (this.road_index < 0 || this.road_index >= road_set.length) {
            return;
        }

        this.road_data = road_set[this.road_index];
        this.walk_on_road();
    },

    walk_on_road() {
        if (this.road_data.length <= 1) { // 只有一个点，不是一条路，直接return;
            return;
        }

        this.node.setPosition(this.road_data[0]);
        this.next_step = 1;
        this.walk_to_next();
    },

    walk_to_next() {
        if (this.next_step >= this.road_data.length) {
            this.is_walking = false;
            return;
        }

        var src = this.node.getPosition();
        var dst = this.road_data[this.next_step];
        var dir = dst.sub(src); // dst - src;
        var len = dir.mag(); // 方向的模;向量的长度;

        this.walk_time = len / this.speed;
        this.passed_time = 0;
        this.vx = this.speed * dir.x / len;
        this.vy = this.speed * dir.y / len;
        this.is_walking = true;
    },

    // 编写我们的更新代码;
    update (dt) {
        if (this.is_walking === false) {
            return;
        }

        this.passed_time += dt;
        if (this.passed_time > this.walk_time) {
            dt -= (this.passed_time - this.walk_time);
        }

        this.node.x += (this.vx * dt);
        this.node.y += (this.vy * dt);

        if (this.passed_time >= this.walk_time) {
            this.next_step = this.next_step + 1;
            this.walk_to_next();
        }
    },
});
