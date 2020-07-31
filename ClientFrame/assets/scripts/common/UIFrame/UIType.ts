import { UIFormType, UIFormShowMode, UIFormLucenyType } from "./UISysDefine";

const {ccclass, property} = cc._decorator;

@ccclass("UIType")
export default class UIType {
    @property({displayName: "UI窗体(位置)类型", type: UIFormType, tooltip: "Normal普通窗体\n Fixed固态窗体\n  PopUp弹出窗体"})
    UIFormType: Number = UIFormType.Normal;

    @property({displayName: "窗体显示类型", type: UIFormShowMode, tooltip: "Normal普通\n ReverseChange反向切换\n HideOther隐藏其它"})
    UIFormShowMode: Number = UIFormShowMode.Normal;

    @property({displayName: "窗体透明度类型", type: UIFormLucenyType, tooltip: "Lucency完全透明\n Translucence半透明,不能穿透\n ImPenetrable低透明度,不能穿透\n Pentrate可以穿透"})
    UIFormLucenyType: Number = UIFormLucenyType.Lucency;
}
