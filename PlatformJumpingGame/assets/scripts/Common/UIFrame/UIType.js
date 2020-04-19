/** 窗体类型
 * 
 */
import {UIFormType, UIFormShowMode, UIFormLucenyType} from 'SysDefine';

let UIType = cc.Class({
    name: "UIType",

    properties: () => ({
        IsClearReverseChange: {
            default: false,
            displayName: '是否需要清空反向切换',
        },
        UIForm_Type: {
            default: UIFormType.Normal,
            type: UIFormType,
            displayName: '窗体位置类型',
            tooltip: "Normal普通窗体\n Fixed固态窗体\n  PopUp弹出窗体",
        },

        UIForm_ShowMode: {
            default: UIFormShowMode.Normal,
            type: UIFormShowMode,
            displayName: '窗体显示类型',
            tooltip: "Normal普通\n ReverseChange反向切换\n HideOther隐藏其它",
        },

        UIForm_LucenyType: {
            default: UIFormLucenyType.Lucency,
            type: UIFormLucenyType,
            displayName: '窗体透明度类型',
            tooltip: "Lucency完全透明\n Translucence半透明,不能穿透\n ImPenetrable低透明度,不能穿透\n Pentrate可以穿透",
        },
    })
});

module.exports = UIType;
