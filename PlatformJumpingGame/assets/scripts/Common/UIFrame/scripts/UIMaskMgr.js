/** UI遮罩管理器
 *  
 *  描述: 实现"模拟窗态"
 *  实现: 完全透明 => 不可穿透 
 *        半透明  => 不可穿透 
 *        低透明  => 不可穿透 
 *        透明且  => 可以穿透
 */
import { UIFormType, UIFormShowMode, UIFormLucenyType } from 'SysDefine';

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    /**
     * 设置遮罩状态
     * @param {UIFormLucenyType} formLucenyType 透明度属性
     */
    setMaskWindow(formLucenyType = UIFormLucenyType.Lucency) {
        this._setIndex();

        //启用遮罩窗体以及设置透明度
        switch (formLucenyType) {
            //完全透明，不能穿透
            case UIFormLucenyType.Lucency:
                console.log("完全透明，不能穿透");
                this.node.active = true;
                this.node.opacity = 0;
                break;

            //半透明，不能穿透
            case UIFormLucenyType.Translucence:
                console.log("半透明，不能穿透");
                this.node.active = true;
                this.node.opacity = 130;
                break;

            //低透明，不能穿透
            case UIFormLucenyType.ImPenetrable:
                console.log("低透明，不能穿透");
                this.node.active = true;
                this.node.opacity = 50;
                break;
            
            //可以穿透    
            case UIFormLucenyType.Pentrate:
                console.log("可以穿透");
                this.node.active = false;
                break;
            default:
                break;
        }
    },

    /**
     * 取消遮罩
     */
    cancelMaskWindow() {
        this._setIndex();
        if (this.node.zIndex == 0) {
            this.node.active = false;
        }
    },

    /**
     * 设置自身zIndex, 同级索引
     */
    _setIndex() {
        // 遮罩窗体与窗体节点zIndex同级, 再将自身的同级索引设为最底层
        let maskZIndex = UIManager.pubGetShowUIFromZIndex();
        
        this.node.zIndex = maskZIndex;
        this.node.setSiblingIndex(0);
    }
});

