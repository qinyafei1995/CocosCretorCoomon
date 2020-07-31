import UIType from "./UIType";

const {ccclass, property} = cc._decorator;

/**
 *  基础UI窗体
 *  定义4个常用生命周期: 显示 冻结 在显示 隐藏
 *  封装子类方法
 */
@ccclass
export default class UIBasePanel extends cc.Component {
    @property({displayName: "UI弹窗配置", type: UIType})
    UIType: UIType = new UIType();

    public init() {

    }

    // 显示
    public display() {

    }

    // 页面隐藏(不在“栈”集合中)
    public hiding() {
        
    }

    // 页面重新显示
    public redisplay() {
        
    }

    // 页面冻结(还在“栈”集合中)
    public freeze() {
        
    }
}
