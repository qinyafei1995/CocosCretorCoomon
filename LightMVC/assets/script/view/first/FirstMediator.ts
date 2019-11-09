import BaseMediator from "../../../libs/lightMVC/core/base/BaseMediator";
import FirstView from "./FirstView";
import PopAMediator from "../pop_a/PopAMediator";
import PopAView from "../pop_a/PopAView";
import PopBMediator from "../pop_b/PopBMediator";
import PopBView from "../pop_b/PopBView";


export default class FirstMediator extends BaseMediator {

    public view: FirstView;
    
    public init(data?: any): void {
        console.log("FirstMediator::init===>>>", data);
        this.view.setData(data);

        this.bindEvent(FirstView.OPEN_A, (str: string)=>{
            this.popView(PopAMediator, PopAView, str);
        }, this);

        this.bindEvent(FirstView.OPEN_B, (str: string)=>{
            this.popView(PopBMediator, PopBView, str);
        }, this);
    }    
    
    public viewDidAppear(): void {

    }

    public destroy(): void {

    }
 
}
