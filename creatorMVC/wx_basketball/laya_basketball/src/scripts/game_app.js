import ball_ctrl from "./ball_ctrl";

export default class game_app extends Laya.Script { // MonoBehaviour
    /** @prop {name:progress_bar, tips:"进度条", type:Node, default:null}*/

    constructor() { 
        super(); 
        this.progress_bar = null;
    }
    
    onAwake() {
        // this ---> 当前组件实例;
        // this.gameObejct --->所在节点---> this.owener;
        this.set_per(0);
        Laya.stage.on("update_per", this, this.set_per);
        Laya.stage.on("goal", this, this.on_goal_event);
        Laya.stage.on("new_next_ball", this, this.on_new_ball);
        Laya.Scene3D.load("res/scene3D/LayaScene_game/Conventional/game.ls", Laya.Handler.create(this, this.on_scene3D_loaded));
        
    }

    on_new_ball() {
        var ball = Laya.Sprite3D.instantiate(this.ball_prefab);
        this.scene3d.addChild(ball);
        this.set_per(0);
    }

    on_goal_event() {
        this.ps.play();
    }

    set_per(per) {
        if (per < 0 || per > 1) {
            return;
        }

        var width = per * 136;
        this.progress_bar.width = width;
    }

    on_scene3D_loaded(scene3d) {
        Laya.stage.addChild(scene3d);
        scene3d.zOrder = -1;
        this.scene3d = scene3d;

        var ps = scene3d.getChildByName("Particle").particleSystem;
        ps.stop();
        this.ps = ps;
        var ball = scene3d.getChildByName("ball");
        ball.addComponent(ball_ctrl);

        this.ball_prefab = Laya.Sprite3D.instantiate(ball);
    }

    onStart() {

    }

    onUpdate() {

    }
}