
var State = {
    Idle: 1,
    AddForce: 2,
    ThrowOut: 3,
    CheckOut: 4,
};

export default class ball_ctrl extends Laya.Script3D {

    constructor() { 
        super(); 
    }
    
    onAwake() {
        this.body = this.owner.getComponent(Laya.Rigidbody3D);
        this.body.overrideGravity = true;
        this.body.gravity = new Laya.Vector3(0, 0, 0);
        
        this.state = State.Idle;
        this.group_speed = 2 / 3; // 
        this.add_speed = 0;

        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.on_click_down);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.on_click_up);
    }

    on_click_down() {
        if (this.state != State.Idle) {
            return;
        }

        this.state = State.AddForce;
    }

    throw_ball() {
        var speed = 4.5 + this.add_speed; // [4.5, 6.5]
        this.body.overrideGravity = true;
        this.body.gravity = new Laya.Vector3(0, -10, 0);


        var degree = 45;
        var vy = speed * Math.sin(45 * Math.PI / 180); 
        var vz = speed * Math.cos(45 * Math.PI / 180); 

        this.body.linearVelocity = new Laya.Vector3(0, vy, vz);

        Laya.timer.once(5000, this, this.destroy_self);
    }

    destroy_self() {
        this.state = State.CheckOut;

        this.owner.removeSelf();

        Laya.stage.event("new_next_ball", null);
    }

    on_click_up() {
        if (this.state != State.AddForce) {
            return;
        }

        this.state = State.ThrowOut;
        this.throw_ball();
    }

    onStart() {

    }

    onUpdate() {
        if (this.state != State.AddForce) {
            return;
        }

        var dt = Laya.timer.delta / 1000; // Time.deltaTime
        this.add_speed += (this.group_speed * dt);

        if (this.add_speed >= 2) {
            this.add_speed = 2;
        }

        var per = this.add_speed / 2;
        per = (per > 1) ? 1 : per;

        Laya.stage.event("update_per", per);
    }

    onTriggerEnter(other) {
        Laya.stage.event("goal", null);
    }

    onDestroy() {
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.on_click_down);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.on_click_up);
    }
}