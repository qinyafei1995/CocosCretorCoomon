/** 
 * UI系统定义类
 * 系统常量
 * 系统枚举: 窗体类型 窗体透明类型 窗体显示类型
 * 事件定义
 * 全局变量
 */

/**
 * UI窗体(位置)类型 
 * 描述: 表示Unity层级视图中挂载不同类型窗体的空节点
 */
let UIFormType = cc.Enum({
    Normal: 0,      // 普通窗体
    Fixed: 1,       // 固态窗体  表示:非全屏非弹出窗体, 例子: RPG游戏项目中的 英雄信息
    PopUp: 2,       // 弹出窗体
})

/**
 * UI窗体的显示类型
 * 描述: 表示窗体不同的显示方式
 */
let UIFormShowMode = cc.Enum({
    Normal: 0,              // 普通                  窗体与其他窗体可以并列显示
    ReverseChange: 1,       // 反向切换              主要应用与"弹出窗体"，维护多个弹出窗体的层级关系
    HideOther: 2,           // 隐藏其它              窗体显示的时候，隐藏所有其他窗体
})

/**
 * UI窗体透明度类型
 * 描述: 
 */
let UIFormLucenyType = cc.Enum({
    Lucency: 0,             // 完全透明
    Translucence: 1,        // 半透明,不能穿透
    ImPenetrable: 2,        // 低透明度, 不能穿透
    Pentrate: 3,            // 可以穿透
})

module.exports = {
    "UIFormType": UIFormType,
    "UIFormShowMode": UIFormShowMode,
    "UIFormLucenyType": UIFormLucenyType,
}