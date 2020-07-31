//  UI系统类定义: 窗体的类型

/**
 * UI窗体(位置)类型
 * 不同的类型,将添加到不同的节点下,从而控制不同类型的弹窗层级显示问题
 */
const UIFormType: any = cc.Enum({
    Normal: 0,      // 普通窗体     表示: 主界面的按钮弹窗      例子: 角色信息
    Fixed: 1,       // 固态窗体     表示: 非全屏非弹出窗体      例子: RPG游戏项目中的 英雄信息
    PopUp: 2,       // 弹出窗体     表示: 弹出的弹窗            例子: 点击角色信息
})

/**
 * UI窗体的显示类型
 * 描述: 表示窗体不同的显示方式
 */
const UIFormShowMode: any = cc.Enum({
    Normal: 0,              // 普通                  窗体与其他窗体可以并列显示
    ReverseChange: 1,       // 反向切换              主要应用与"弹出窗体"，维护多个弹出窗体的层级关系
    HideOther: 2,           // 隐藏其它              窗体显示的时候，隐藏所有其他窗体
})

/**
 * UI窗体透明度类型
 * 描述: 对遮罩透明度的控制
 */
const UIFormLucenyType: any = cc.Enum({
    Lucency: 0,             // 完全透明
    Translucence: 1,        // 半透明,不能穿透
    ImPenetrable: 2,        // 低透明度, 不能穿透
    Pentrate: 3,            // 可以穿透
})

export {
    UIFormType,
    UIFormShowMode,
    UIFormLucenyType
}
