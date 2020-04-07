const { ccclass, property } = cc._decorator;

@ccclass
export default class InputCtrl extends cc.Component {
    // 摄像机
    @property(cc.Node)
    cameraNode: cc.Node = null;

    // 移动速度
    @property
    moveSpeed: number = 500;

    // 相机移动范围
    @property(cc.Vec2)
    cameraMoveSpace: cc.Vec2 [] = []; 

    // 方向 左右  1左 -1右
    _moveLRDic: number = 0;

    // 方向 上下 1上 -1下
    _moveUDDic: number = 0;

    start() {
        this.initEvent();
    }

    update(dt) {
        let nextX = this.cameraNode.x + this.moveSpeed * dt * this._moveLRDic;
        if (nextX >= this.cameraMoveSpace[0].x && nextX <= this.cameraMoveSpace[1].x) {
            this.cameraNode.x = nextX;
        }

        this.cameraNode.y += this.moveSpeed * dt * this._moveUDDic;
    }

    initEvent() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.cameraNode.on(cc.Node.EventType.TOUCH_START, this.clickCamera, this);
        this.cameraNode.on(cc.Node.EventType.TOUCH_END, this.closeDrection, this);
        this.cameraNode.on(cc.Node.EventType.TOUCH_CANCEL, this.closeDrection, this);
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this._moveLRDic = -1;
                break;

            case cc.macro.KEY.d:
                this._moveLRDic = 1;
                break;

            case cc.macro.KEY.w:
                this._moveUDDic = 1;
                break;

            case cc.macro.KEY.s:
                this._moveUDDic = -1;
                break;

            default:
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this._moveLRDic = 0;
                break;

            case cc.macro.KEY.d:
                this._moveLRDic = 0;
                break;

            case cc.macro.KEY.w:
                this._moveUDDic = 0;
                break;

            case cc.macro.KEY.s:
                this._moveUDDic = 0;
                break;

            default:
                break;
        }
    }

    clickCamera(et): void {
        if (et.getLocationX() < cc.winSize.width / 2) {
            //点击屏幕左边
            this._moveLRDic = -1;
        } else {
            //点击屏幕右边
            this._moveLRDic = 1;
        }
    }

    closeDrection(): void {
        this._moveLRDic = 0;
    }

}
