/*  UI窗体管理器

    窗体预设加载管理
    窗体缓存管理
    窗体的"栈"数据结构管理
    窗体"生命周期"管理(显示、隐藏、重新显示、冻结）
*/

import { UIFormType, UIFormShowMode, UIFormLucenyType } from 'SysDefine';
import UIPathConfig from 'UIPathConfig';

let uiManager = cc.Class({
    extends: cc.Component,

    properties: {
        uiMaskPanelNode: cc.Node,
    },

    onLoad() {
        window.UIManager = this;
        window.UIMaskMgr = this.uiMaskPanelNode.getComponent("UIMaskMgr");
        this._init();

        // test 
        this.pubShowUIFroms('HelloUI');
        this.pubShowUIFroms("HelloUI2");
    },

    // 初始化核心数据，加载“UI窗体路径”到集合中
    _init() {
        this._initData();
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
        // "栈"结构表示的"当前UI窗体"集合
        this._staCurrentUIForms = [];
        // 当前显示UI的zIndex值
        this._uiNodeZIndex = 0;
    },

    /**
     * 显示(打开)UI窗体
     * 功能: 
     * 1: 根据UI窗体的名称，加载到“所有UI窗体”缓存集合中 
     * 2: 根据不同的UI窗体的“显示模式”，分别作不同的加载处理 
     * @param {String} uiFromsName UI预制体弹窗名字
     */
    pubShowUIFroms(uiFromsName) {
        let baseUIForms = null;
        //参数的检查
        if (typeof uiFromsName != 'string') {
            return console.log('显示UI窗体,参数需为Sring');
        }
        //根据UI窗体的名称，加载到“所有UI窗体”缓存集合中
        this._loadFormsToAllUIFormsCatch(uiFromsName, (baseUI) => {
            baseUIForms = baseUI;
            if (baseUIForms == null) return;
            //根据不同的UI窗体的显示模式，分别作不同的加载处理
            switch (baseUIForms.currentUIType.UIForm_ShowMode) {
                case UIFormShowMode.Normal:                             //“普通显示”窗口模式
                    //把当前窗体加载到“当前窗体”集合中。
                    this._enterUIToCurrentCache(uiFromsName);
                    break;
                case UIFormShowMode.ReverseChange:                      //需要“反向切换”窗口模式
                    this._pushUIFrom(uiFromsName);
                    break;
                case UIFormShowMode.HideOther:                          //“隐藏其他”窗口模式
                    this._enterUIFormsToCacheHideOther(uiFromsName);
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
    _loadFormsToAllUIFormsCatch(uiFromsName, callBack) {
        let baseUI = this._dicAllUIForms[uiFromsName] ? this._dicAllUIForms[uiFromsName] : null;
        if (baseUI == null) {
            this._loadUIForms(uiFromsName, (baseUI_) => {
                baseUI = baseUI_;
                if (typeof callBack == "function") {
                    callBack(baseUI);
                }
            });
        } else {
            if (typeof callBack == "function") {
                callBack(baseUI);
            }
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
    _loadUIForms(uiFromsName, callBack) {
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
    _enterUIToCurrentCache(uiFromsName) {
        //如果“正在显示”的集合中，存在这个UI窗体，则直接返回
        let baseUIFroms = this._dicCurrentShowUIForms.hasOwnProperty(uiFromsName) ? this._dicCurrentShowUIForms[uiFromsName] : null;
        if (baseUIFroms) return;
        //把当前窗体，加载到“正在显示”集合中
        let baseUIFormFormAllCache = this._dicAllUIForms.hasOwnProperty(uiFromsName) ? this._dicAllUIForms[uiFromsName] : null;
        if (baseUIFormFormAllCache != null) {
            this._dicCurrentShowUIForms[uiFromsName] = baseUIFormFormAllCache;
            baseUIFormFormAllCache.display();
        }
    },

    /**
     * UI窗体入栈
     * 功能 1：判断栈里是否已经有窗体，有则“冻结”
     *      2: 先判断"UI预设缓存集合"是否有指定的UI窗体,有则处理
     *      3: 指定窗体入"栈"
     * @param {String} uiFromsName UI预制体弹窗名字 
     */
    _pushUIFrom(uiFromsName) {
        let baseUI = null;
        // 判断栈里是否已经有窗体,有则"冻结"
        if (this._staCurrentUIForms.length) {
            this._staCurrentUIForms[this._staCurrentUIForms.length - 1].freeze();
        }

        // 先判断"UI预设缓存集合"是否有指定的UI窗体, 有则处理
        baseUI = this._dicAllUIForms[uiFromsName];
        if (baseUI) {
            // 自增zIndex,用于显示层级
            baseUI.display(++this._uiNodeZIndex);
        } else {
            console.error('/_pushUIFrom()/this._dicAllUIForms[uiFromsName] == null 请检查uiFromsName = {}', uiFromsName);
        }

        // 指定窗体入"栈"
        this._staCurrentUIForms.push(baseUI);
    },

    /**
     * 获取显示节点的zIdex值,控制显示层级
     */
    pubGetShowUIFromZIndex() {
        return this._uiNodeZIndex;
    },

    /**
     * 加载UI窗体到"当前显示窗体集合"缓存中，且隐藏其他正显示的页面
     * @param {String} uiFromsName UI预制体弹窗名字
     */
    _enterUIFormsToCacheHideOther(uiFromsName) {
        // "正在显示UI窗体缓存"集合中记录,则直接返回
        if (this._dicCurrentShowUIForms.hasOwnProperty(uiFromsName)) return;

        // "正在显示UI窗体缓存"与 "栈缓存"集合中,所有窗体进行隐藏处理
        for (const key in this._dicCurrentShowUIForms) {
            if (this._dicCurrentShowUIForms.hasOwnProperty(key)) {
                let baseUIForms = this._dicCurrentShowUIForms[key];
                baseUIForms.hiding();
            }
        }
        this._staCurrentUIForms.forEach(uiForms => {
            uiForms.hiding();
        });

        // 把当前窗体,加载到"正在显示UI窗体缓存"集合里
        let baseUIFromsFrimAllCache = this._dicAllUIForms[uiFromsName] ? this._dicAllUIForms[uiFromsName] : null;
        if (baseUIFromsFrimAllCache) {
            this._dicCurrentShowUIForms[uiFromsName] = baseUIFromsFrimAllCache;
            baseUIFromsFrimAllCache.display();
        }
    },


    /**
     * 关闭返回上一个UI窗体（关闭当前弹窗）
     * @param {String} uiFromsName UI预制体弹窗名字
     */
    pubCloseOrReturnUIForms(uiFromsName) {
        if (typeof uiFromsName != 'string') return;
        // '所有窗体缓存'如果没有记录，则直接返回
        if (!this._dicAllUIForms.hasOwnProperty(uiFromsName)) return;

        // 判断不同类型的窗体显示模式，分别进行处理
        switch (this._dicAllUIForms[uiFromsName].currentUIType.UIForm_ShowMode) {
            case UIFormShowMode.Normal:
                this._exitUiFormsCache(uiFromsName);
                break;
            case UIFormShowMode.ReverseChange:
                this._popUIForms();
                break;
            case UIFormShowMode.HideOther:
                this._exitUIFormsFromCacheAndShowOther(uiFromsName);
                break;
            default:
                break;
        }
    },

    /**
     * 卸载UI窗体冲当前'显示窗体集合'缓存中
     * @param {String} uiFromsName UI预制体弹窗名字
     */
    _exitUiFormsCache(uiFromsName) {
        // 正在显示UI窗体缓存，集合没有记录，直接返回
        if (!this._dicCurrentShowUIForms.hasOwnProperty(uiFromsName)) return;
        this._dicCurrentShowUIForms[uiFromsName].hiding();
        // 指定UI窗体，运行隐藏状态，且从“正在显示UI窗体缓存”集合中移除
        // js 中删除对象性能不好，之后改为undefined处理
        delete this._dicCurrentShowUIForms[uiFromsName];
    },

    /**
     * UI窗体出栈
     */
    _popUIForms() {
        if (this._staCurrentUIForms.length >= 2) {
            // 减少隐藏计数
            --this._uiNodeZIndex;

            // 出栈逻辑
            let topUIFroms = this._staCurrentUIForms.pop();
            // 隐藏处理
            topUIFroms.hiding();
            // 下一个窗体逻辑,重新显示处理
            this._staCurrentUIForms[this._staCurrentUIForms.length - 1].redisplay();
        } else if (this._staCurrentUIForms.length == 1) {
            // 减少隐藏计数
            --this._uiNodeZIndex;

            let topUIFroms = this._staCurrentUIForms.pop();
            topUIFroms.hiding();
        }
    },

    /**
     * 卸载UI窗体从“当前显示窗体集合”缓存中，且显示其他原本需要显示的页面
     * @param {String} uiFromsName UI预制体弹窗名字
     */
    _exitUIFormsFromCacheAndShowOther(uiFromsName) {
        // "正在显示UI窗体缓存"集合中没有记录,则直接返回
        let baseUIForms = this._dicCurrentShowUIForms.hasOwnProperty(uiFromsName) ? this._dicCurrentShowUIForms[uiFromsName] : null;
        if (!baseUIForms) {
            return;
        }

        // 指定UI窗体, 运行隐藏状态,且从"正在显示UI窗体缓存"集合中移除
        baseUIForms.hiding();
        delete this._dicCurrentShowUIForms[uiFromsName];

        // 正在"显示UI窗体缓存"与"栈缓存"集合里所有窗台进行再次显示处理
        for (const key in this._dicCurrentShowUIForms) {
            if (this._dicCurrentShowUIForms.hasOwnProperty(key)) {
                let uiForms = this._dicCurrentShowUIForms[key];
                uiForms.display();
            }
        }

        for (let i = 0; i < this._staCurrentUIForms.length; i++) {
            this._staCurrentUIForms[i].display();
        }
    },

    /**
     * 清空"栈"结构集合
     */
    _clearStacjArray() {
        if (this._staCurrentUIForms != null && this._staCurrentUIForms.length >= 1) {
            this._staCurrentUIForms = null;
            return true;
        }
        return false;
    },
});

module.exports = uiManager;
