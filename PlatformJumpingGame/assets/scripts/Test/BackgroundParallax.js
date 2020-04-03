// 背景视差

cc.Class({
    extends: cc.Component,

    properties: {
        backgrounds: {
            default: [],
            type: cc.Node,
            tooltip: '背景层列表'
        },

        parallaxScale: {
            default: 2,
            tooltip: '视差范围：相机移动背景的比例值'
        },

        parallaxReductionFactor: {
            default: 50,
            tooltip: '视察折减系数：每一层应减少多少视差'
        },

        smoothing: {
            default: 20,
            tooltip: '平滑度: 视差移动平滑度'
        },

        mainCamera: cc.Node,
    },

    start() {
        this.init();
    },
    
    init () {
        this._initData();
        this._cameraStartPos = this.mainCamera.position;

        // 前一帧值赋值为相机当前帧位置。
        this._previousCamPos = this.mainCamera.position;
        this._startPreviousCamPos = this._previousCamPos;
        this.recordStartPos();
    },

    _initData () {
        // 相机的前一帧中的位置: 用于记录上一帧相机的位置。
        this._previousCamPos = null;
        //是否打开视差滚动
        this.isOpenParallax = false;

        // 记录位置
        this._startPosList = [];
        this._cameraStartPos = null;
        this._startPreviousCamPos = null;

        // this.mainCamera = cc.find("Canvas/New Sprite(Splash)/Main Camera");
    },

    recordStartPos() {
        for(let i = 0; i < this.backgrounds.length; i++) {
            this._startPosList.push(this.backgrounds[i].position);
        }
    },

    update (dt) {
        // if(this.isOpenParallax) {
            // 计算视差值,视差值为从上一帧移动到当前帧的增量值的相反值。
            let parallax = (this._previousCamPos.x - this.mainCamera.position.x) * this.parallaxScale;

            // 处理每一层背景移动
            for(let i = 0; i < this.backgrounds.length; i++) {
                // 定义每一个背景目标x坐标值,计算视差移动后背景图新的位置(背景图的当前位置加上视差增量值)。
                let backgroundTargetPosX = this.backgrounds[i].position.x + parallax * (i * -this.parallaxReductionFactor + 1);

                // 定义二维的背景图目标坐标值，放入新计算出的x坐标，y坐标不变。
                let backgroundTargetPos = cc.v2(backgroundTargetPosX, this.backgrounds[i].y);

                // 在上一帧背景图坐标与视差偏移坐标间，取插值为背景图新位置坐标。
                this.backgrounds[i].position = this.backgrounds[i].position.lerp(backgroundTargetPos, this.smoothing * dt);
            }
            // 把当前帧相机位置赋值给 this._previousCamPos 用于下一次Update使用
            this._previousCamPos = this.mainCamera.position;
        // }
    },

    /**
     * 设置打开视差滚动,不传则关闭视差滚动,  在次游戏时使用
     */
    pubSetOpenParallax(isOpen = false) {
        this.isOpenParallax = isOpen;
    },

    /**
     * 重置视差数据
     */
    pubResetPanrallaxData() {
        this._previousCamPos = this._startPreviousCamPos;
    },  

    pubResetPos() {
        for(let i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].position = this._startPosList[i];
        } 
    },

});
