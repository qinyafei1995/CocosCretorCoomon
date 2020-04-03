const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // 摄像机
    @property(cc.Node)
    cameraNode: cc.Node = null;

    // 移动速度
    @property
    moveSpeed: number = 500;

    // 方向 左右  1左 -1右
    moveLRDic: number = 0;

    // 方向 上下 1上 -1下
    moveUDDic: number = 0;

    start() {
        this.initEvent();
    }

    update(dt) {
        this.cameraNode.x += this.moveSpeed * dt * this.moveLRDic;
        this.cameraNode.y += this.moveSpeed * dt * this.moveUDDic;
    }

    initEvent() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.moveLRDic = -1;
                break;

            case cc.macro.KEY.d:
                this.moveLRDic = 1;
                break;

            // case cc.macro.KEY.w:
            //     this.moveUDDic = 1;
            //     break;

            // case cc.macro.KEY.s:
            //     this.moveUDDic = -1;
            //     break;

            default:
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.moveLRDic = 0;
                break;

            case cc.macro.KEY.d:
                this.moveLRDic = 0;
                break;

            // case cc.macro.KEY.w:
            //     this.moveUDDic = 0;
            //     break;

            // case cc.macro.KEY.s:
            //     this.moveUDDic = 0;
            //     break;

            default:
                break;
        }
    }
}
