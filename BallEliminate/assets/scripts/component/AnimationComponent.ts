const { ccclass, property } = cc._decorator;
/**
 * 动画通用组件
 */
@ccclass
export default class AnimationComponent extends cc.Component {

    _sp: sp.Skeleton = null;
    _trackId: number = 1;

    onLoad() {
        this.init();
    }

    init() {
        this._sp = this.node.getChildByName("spine").getComponent(sp.Skeleton);
    }

    public play(cb: Function = null) {
        this._sp.setCompleteListener((a) => {
            if (typeof (cb) == "function") {
                cb();
            }
        })
        this._sp.setAnimation(this._trackId, "play", false);
    }
}
