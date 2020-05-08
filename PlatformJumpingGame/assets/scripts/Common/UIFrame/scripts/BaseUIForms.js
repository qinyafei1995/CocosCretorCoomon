/*  基础UI窗体
    定义4个生命周期: 显示 冻结 在显示 隐藏
    封装子类方法
*/
import UIType from 'UIType';
import {UIFormType, UIFormShowMode, UIFormLucenyType} from 'SysDefine';

cc.Class({
    extends: cc.Component,

    properties: {
        currentUIType: {
            default: null,
            type: UIType,
            displayName: '窗体类型',
        },
    },

    // 显示
    display(zIndex) {
        if (zIndex) {
            this.node.zIndex = zIndex;
        }
        this.node.active = true;
        
        if (this.currentUIType.UIForm_Type == UIFormType.PopUp) {
           
            UIMaskMgr.setMaskWindow(this.currentUIType.UIForm_LucenyType);
        }
    },

    // 页面隐藏(不在“栈”集合中)
    hiding() {
        this.node.active = false;
        if (this.currentUIType.UIForm_Type == UIFormType.PopUp) {
            UIMaskMgr.cancelMaskWindow();
        }
    },

    // 页面重新显示
    redisplay() {
        this.node.active = true;
        if (this.currentUIType.UIForm_Type == UIFormType.PopUp) {
            UIMaskMgr.setMaskWindow(this.currentUIType.UIForm_LucenyType);
        }
    },
    
    // 页面冻结(还在“栈”集合中)
    freeze() {
        this.node.active = true;
    },
});
