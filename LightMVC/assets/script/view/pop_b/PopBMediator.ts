import BaseMediator from "../../../libs/lightMVC/core/base/BaseMediator";
import PopBView from "./PopBView";
import SecondSceneMediator from "../SecondSceneMediator";
import SecondScene from "../SecondScene";

export default class PopBMediator extends BaseMediator {

    public view: PopBView;

    public init(data?: any): void {
        this.view.drawView(data);
        this.bindEvent(PopBView.RUN_SECOND_SCENE, ()=>{
            this.runScene(SecondSceneMediator, SecondScene);
        }, this);
    }     
    
    public viewDidAppear(): void {

    }
    
    public destroy(): void {

    }



}
