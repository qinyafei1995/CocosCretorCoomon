/**
 * 定义视差的3种方向
 */
let parallxEnum = cc.Enum({
    HORIZONTAL: 0,         // 横向
    VERTICEL: 1,           // 纵向
    OMNIBERING: 2         // 全方向
})

cc.Class({
    extends: cc.Component,

    properties: {
        typeParallx: {
            default: parallxEnum.HORIZONTAL,
            type: parallxEnum,
            tooltip: "HORIZONTAL 横向\n VERTICEL 纵向\n OMNIBERING 双向\n ",
            displayName: "视差类型",
        },

        arrCameraNode: {
            default: [],
            type: cc.Node,
            tooltip: "个数与视差层数对应",
            displayName: "视差摄像机列表"
        },

        arrCameraOffsetSpeed: {
            default: [],
            type: cc.Vec2,
            tooltip: "个数与相机个数对应",
            displayName: "相机偏移速度列表"
        },
        numberOffsetSpeedRatio: {
            default: 1,
            tooltip: "乘以速度列表中所有元素",
            displayName: "偏移速度比例"
        }
    },

    onLoad() {
        this.init();
    },

    init() {
        if (!this._isRun()) {
            return
        }
        this._initData();
    },

    _initData() {
        // 方向
        this._numberCameraMoveDirectionLR = 0;
        this._numberCameraMoveDirectionUD = 0;
        // 上一帧摄像机位置
        this._vecCameraLastMovePos = this.arrCameraNode[0].position;
        // 所有相机移动时的偏移量
        this._arrVecCameraOffset = [];
        // 所有相机起始位置
        this._arrVecCamereStartPositon = this._getAllCameraPos();
    },


    /**
     * 是否可运行视差
     */
    _isRun() {
        let run = false;
        if (this.arrCameraNode.length >= 1 && this.arrCameraOffsetSpeed.length >= 1 && this.arrCameraNode.length == this.arrCameraOffsetSpeed.length) {
            run = true;
        } else {
            console.error("运行视差条件不满住,检查参数是否符合", "arrCameraNode===>", this.arrCameraNode.length, "arrCameraOffsetSpeed===>", this.arrCameraOffsetSpeed.length);
        }
        return run;
    },

    /**
     * 计算相机移动方向
     */
    _countCameraMoveDirection() {
        switch (this.typeParallx) {
            case parallxEnum.HORIZONTAL:
                this._countHorizontal();
                break;

            case parallxEnum.VERTICEL:
                this._countVerticel();
                break;

            case parallxEnum.OMNIBERING:
                this._countHorizontal();
                this._countVerticel();
                break;
            default:
                break;
        }
    },

    /**
     * 计算HORIZONTAL(左右)类型方向
     */
    _countHorizontal() {
        // 左右 方向判断
        if (this.arrCameraNode[0].x - this._vecCameraLastMovePos.x > 0) {
            this._numberCameraMoveDirectionLR = 1;
        } else if (this.arrCameraNode[0].x - this._vecCameraLastMovePos.x < 0) {
            this._numberCameraMoveDirectionLR = -1;
        } else if (this.arrCameraNode[0].x - this._vecCameraLastMovePos.x == 0) {
            this._numberCameraMoveDirectionLR = 0;
        }
    },

    /**
     * 计算VERTICEL(上下)类型方向
     */
    _countVerticel() {
        // 上下 方向判断
        if (this.arrCameraNode[0].y - this._vecCameraLastMovePos.y > 0) {
            this._numberCameraMoveDirectionUD = 1;
        } else if (this.arrCameraNode[0].y - this._vecCameraLastMovePos.y < 0) {
            this._numberCameraMoveDirectionUD = -1;
        } else if (this.arrCameraNode[0].y - this._last_vecCameraLastMovePosPos.y == 0) {
            this._numberCameraMoveDirectionUD = 0;
        }
    },

    /**
     * 摄像机 移动
     */
    _cameraMove(dt) {
        switch (this.typeParallx) {
            case parallxEnum.HORIZONTAL:
                this._cameraMoveHorizontal(dt);
                break;

            case parallxEnum.VERTICEL:
                this._cameraMoveVerticel(dt);
                break;

            case parallxEnum.OMNIBERING:
                this._cameraMoveHorizontal(dt);
                this._cameraMoveVerticel(dt);
                break;
            default:
                break;
        }
    },

    /**
     * 摄像机 左右 移动
     */
    _cameraMoveHorizontal(dt) {
        // X轴计算
        for (let i = 0; i < this.arrCameraOffsetSpeed.length; i++) {
            // 偏移量 = dt * 速度 * 方向 * 速度比
            this._arrVecCameraOffset[i].x += dt * this.arrCameraOffsetSpeed[i].x * this._numberCameraMoveDirectionLR * this.numberOffsetSpeedRatio;
            // 移动后位置 = 初始位置 + 偏移量
            this.arrCameraNode[i].x = this._arrVecCamereStartPositon[i].x + this._arrVecCameraOffset[i].x;
        }
    },

    /**
     * 摄像机 上下 移动
     */
    _cameraMoveVerticel(dt) {
        // Y轴计算
        for (let i = 0; i < this.arrCameraOffsetSpeed.length; i++) {
            this._arrVecCameraOffset[i].y += dt * this.arrCameraOffsetSpeed[i].y * this._numberCameraMoveDirectionUD * this.numberOffsetSpeedRatio;
            this.arrCameraNode[i].y = this._arrVecCamereStartPositon[i].y + this._arrVecCameraOffset[i].y;
        }
    },

    /**
     * 获取所有相机起始位置
     */
    _getAllCameraPos() {
        let arrPos = [];
        for (let i = 0; i < this.arrCameraNode.length; i++) {
            arrPos[i] = this.arrCameraNode[i].position;
        }
        return arrPos;
    },

    update(dt) {
        if (!this._isRun) {
            return
        }

        this._countCameraMoveDirection();
        
        this._cameraMove(dt);
    },
});
