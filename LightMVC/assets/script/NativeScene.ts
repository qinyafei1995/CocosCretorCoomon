import { Facade } from "../libs/lightMVC/core/Facade";
import PlayerModel from "./model/PlayerModel";
import DefaultSceneMediator from "./view/DefaultSceneMediator";
import DefaultScene from "./view/DefaultScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NativeScene extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    start() {
        this.label.string = "first scene is a native scene.";
        // initialize mvc framework
        Facade.getInstance().init(false, cc.size(1080, 2048), false, true);
    
        // initialize model regist
        this.initModel();
    }

    initModel(): void {
        // regist PlayerModel 
        Facade.getInstance().registerModel(PlayerModel);
        // regist other model ...
    }

    // 点击切换场景
    public onClick(): void {
        // run first mvc scene
        Facade.getInstance().runScene(DefaultSceneMediator, DefaultScene, "测试参数999");
    }

}
