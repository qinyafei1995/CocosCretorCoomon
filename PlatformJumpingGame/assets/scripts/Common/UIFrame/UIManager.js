/*  UI窗体管理器

    窗体预设加载管理
    窗体缓存管理
    窗体的"栈"数据结构管理
    窗体"生命周期"管理(显示、隐藏、重新显示、冻结）
*/

import { UIFormType, UIFormShowMode, UIFormLucenyType } from 'SysDefine';
import UIPathConfig from 'UIPathConfig';

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        window.QUIMgr = this;
        this._initData();
        this._init();
        this.showUIFroms('HolloUI');
    },

    // 初始化核心数据，加载“UI窗体路径”到集合中
    _init() {
        // 场景跳转时不销毁当前节点, 挂载节点与Canvas同级
        cc.game.addPersistRootNode(this.node);
        this.node.x = cc.winSize.width / 2;
        this.node.y = cc.winSize.height / 2;

        // 获取 全屏幕显示节点 固定显示节点 弹出节点 ui脚本管理节点
        this._normalNode = this.node.getChildByName("normal");
        this._fixedNode = this.node.getChildByName("fixed");
        this._popUpNode = this.node.getChildByName("popUp");
        this._scriptMgrNode = this.node.getChildByName("scriptMgr");

        // 初始化"UI窗体预制体"路径数据
        for (const key in UIPathConfig) {
            if (UIPathConfig.hasOwnProperty(key)) {
                this._dicFormsPaths[key] = UIPathConfig[key];
            }
        }
    },

    _initData() {
        // 表示“UI窗体预设路径”集合，负责缓存所有UI窗体预设的名称与对应资源路径的关系。
        this._dicFormsPaths = {};
        // 表示“所有UI窗体”集合，负责缓存已经加载过的所有UI窗体名称以及与之对应的UI窗体。
        this._dicAllUIForms = {};
        // 表示“当前正在显示”集合，负责控制正在显示UI窗体的内部逻辑。
        this._dicCurrentShowUIForms = {};
    },

    /**
     * 显示(打开)UI窗体
     * 功能: 
     * 1: 根据UI窗体的名称，加载到“所有UI窗体”缓存集合中 
     * 2: 根据不同的UI窗体的“显示模式”，分别作不同的加载处理 
     * @param {String} uiFromsName UI预制体弹窗名字
     */
    showUIFroms(uiFromsName) {
        let baseUIForms = null;
        //参数的检查
        if (typeof uiFromsName != 'string') {
            return console.log('显示UI窗体,参数需为Sring');
        }
        //根据UI窗体的名称，加载到“所有UI窗体”缓存集合中
        this.loadFormsToAllUIFormsCatch(uiFromsName, (baseUI) => {
            baseUIForms = baseUI;
            if (baseUIForms == null) return;
            //根据不同的UI窗体的显示模式，分别作不同的加载处理
            switch (baseUIForms.currentUIType.UIForm_ShowMode) {
                case UIFormShowMode.Normal:                             //“普通显示”窗口模式
                    //把当前窗体加载到“当前窗体”集合中。
                    this.loadUIToCurrentCache(uiFromsName);
                    break;
                case UIFormShowMode.ReverseChange:                      //需要“反向切换”窗口模式

                    break;
                case UIFormShowMode.HideOther:                          //“隐藏其他”窗口模式

                    break;
                default:
                    break;
            }
        });
    },

    /**
     * 根据UI窗体的名称，加载到“所有UI窗体”缓存集合中
     * 功能:
     * 1: 检查“所有UI窗体”集合中，是否已经加载过，否则才加载
     * @param {String} uiFromsName UI预制体弹窗名字
     * @returns {BaseUIFroms} BaseUIFroms UI窗体基类
     */
    loadFormsToAllUIFormsCatch(uiFromsName, callBack) {
        let baseUI = this._dicAllUIForms[uiFromsName] ? this._dicAllUIForms[uiFromsName] : null;
        if (baseUI == null) {
            this.loadUIForm(uiFromsName, (baseUI_) => {
                baseUI = baseUI_;
                if (typeof callBack == "function") {
                    callBack(baseUI);
                }
            });
        }
    },

    /**
     * 加载指定名称的“UI窗体”
     * 功能：
     * 1：根据“UI窗体名称”，加载预设克隆体。
     * 2：根据不同预设克隆体中带的脚本中不同的“位置信息”，加载到“根窗体”下不同的节点。
     * 3：隐藏刚创建的UI克隆体。
     * 4：把克隆体，加入到“所有UI窗体”（缓存）集合中。
     * @param {String} uiFromsName UI预制体弹窗名字
     */
    loadUIForm(uiFromsName, callBack) {
        let prefabPath = this._dicFormsPaths[uiFromsName] ? this._dicFormsPaths[uiFromsName] : null;
        if (typeof prefabPath != "string") {
            console.error("窗体路径配置错误", uiFromsName);
            return;
        }

        cc.loader.loadRes(prefabPath, cc.Prefab, (err, prefab) => {
            if (err) {
                console.error(err);
                return;
            }
            let uiNode = cc.instantiate(prefab);
            let baseUI = uiNode.getComponent('BaseUIForms');

            switch (baseUI.currentUIType.UIForm_Type) {
                case UIFormType.Normal:
                    this._normalNode.addChild(uiNode);
                    break;

                case UIFormType.Fixed:
                    this._fixedNode.addChild(uiNode);
                    break;

                case UIFormType.PopUp:
                    this._popUpNode.addChild(uiNode);
                    break;
                default:
                    break;
            }
            uiNode.active = false;
            this._dicAllUIForms[uiFromsName] = baseUI;

            if (typeof callBack == "function") {
                callBack(baseUI);
            }
        });
    },

    /**
     * 把当前窗体加载到“当前窗体”集合中
     * @param {String} uiFromsName UI预制体弹窗名字
     */
    loadUIToCurrentCache(uiFromsName) {
        //如果“正在显示”的集合中，存在这个UI窗体，则直接返回
        let baseUIFroms = this._dicCurrentShowUIForms.hasOwnProperty(uiFromsName) ? this._dicCurrentShowUIForms[uiFromsName] : null;
        if (baseUIFroms) return;
        //把当前窗体，加载到“正在显示”集合中
        let baseUIFormFormAllCache = this._dicAllUIForms.hasOwnProperty(uiFromsName) ? this._dicAllUIForms[uiFromsName] : null;
        if (baseUIFormFormAllCache != null) {
            this._dicCurrentShowUIForms[uiFromsName] = baseUIFormFormAllCache;
            baseUIFormFormAllCache.display();
        }
    }
});
