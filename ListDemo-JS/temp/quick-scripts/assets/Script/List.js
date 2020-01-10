(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/List.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5132c1xKI5En6Qjk/W16Qt+', 'List', __filename);
// Script/List.js

'use strict';

/******************************************
 * @author kL <klk0@qq.com>
 * @date 2019/1/5
 * @doc 列表组件.
 * @end
 ******************************************/
var TemplateType = cc.Enum({
    'NODE': 1,
    'PREFAB': 2
});
var SlideType = cc.Enum({
    'NORMAL': 1, //普通
    'ADHERING': 2, //粘附模式，将强制关闭滚动惯性
    'PAGE': 3 //页面模式，将强制关闭滚动惯性
});
var SelectedType = cc.Enum({
    'NONE': 0,
    'SINGLE': 1, //单选
    'MULT': 2 //多选
});

var ListItem = require('ListItem');

cc.Class({
    extends: cc.Component,

    editor: {
        disallowMultiple: false,
        menu: '自定义组件/List',
        requireComponent: cc.ScrollView,
        //脚本生命周期回调的执行优先级。小于 0 的脚本将优先执行，大于 0 的脚本将最后执行。该优先级只对 onLoad, onEnable, start, update 和 lateUpdate 有效，对 onDisable 和 onDestroy 无效。
        executionOrder: -5000
    },

    properties: {
        templateType: {
            default: TemplateType.NODE,
            type: TemplateType
        },
        tmpNode: {
            default: null,
            type: cc.Node,
            tooltip: CC_DEV && 'Item模版，type:cc.Node',
            visible: function visible() {
                var bool = this.templateType == TemplateType.NODE;
                if (!bool) this.tmpNode = null;
                return bool;
            }
        },
        tmpPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: CC_DEV && 'Item模版，type:cc.Prefab',
            visible: function visible() {
                var bool = this.templateType == TemplateType.PREFAB;
                if (!bool) this.tmpPrefab = null;
                return bool;
            }
        },
        _slideMode: 1,
        slideMode: {
            type: SlideType,
            tooltip: CC_DEV && '滑动模式',
            get: function get() {
                return this._slideMode;
            },
            set: function set(val) {
                if (val != null) this._slideMode = val;
            }
        },
        pageDistance: {
            default: .3,
            type: cc.Float,
            range: [0, 1, .1],
            tooltip: CC_DEV && '翻页作用距离',
            slide: true,
            visible: function visible() {
                return this._slideMode == SlideType.PAGE;
            }
        },
        pageChangeEvent: {
            default: null,
            type: cc.Component.EventHandler,
            tooltip: CC_DEV && '页面改变事件',
            visible: function visible() {
                var bool = this._slideMode == SlideType.PAGE;
                if (!bool) this.pageChangeEvent = null;
                return bool;
            }
        },
        _virtual: true,
        virtual: {
            tooltip: CC_DEV && '是否为虚拟列表（动态列表）',
            get: function get() {
                return this._virtual;
            },
            set: function set(val) {
                if (val != null) this._virtual = val;
                if (!CC_DEV && this._numItems != 0) {
                    this._onScrolling();
                }
            }
        },
        cyclic: {
            default: false,
            tooltip: CC_DEV && '是否为循环列表',
            visible: function visible() {
                var val = this.virtual && this.slideMode == SlideType.NORMAL;
                if (!val) this.cyclic = false;
                return val;
            }
        },
        lackCenter: {
            default: false,
            tooltip: CC_DEV && 'Item数量不足以填满Content时，是否居中显示Item（不支持Grid布局）',
            visible: function visible() {
                return this.virtual;
            }
        },
        lackSlide: {
            default: false,
            tooltip: CC_DEV && 'Item数量不足以填满Content时，是否可滑动',
            visible: function visible() {
                var val = this.virtual && !this.lackCenter;
                if (!val) this.lackSlide = false;
                return val;
            }
        },
        _updateRate: 0,
        updateRate: {
            type: cc.Integer,
            range: [0, 6, 1],
            tooltip: CC_DEV && '刷新频率（值越大刷新频率越低、性能越高）',
            slide: true,
            get: function get() {
                return this._updateRate;
            },
            set: function set(val) {
                if (val >= 0 && val <= 6) {
                    this._updateRate = val;
                }
            }
        },
        frameByFrameRenderNum: {
            default: 0,
            type: cc.Integer,
            range: [0, 12, 1],
            tooltip: CC_DEV && '逐帧渲染时，每帧渲染的Item数量（<=0时关闭分帧渲染）',
            slide: true
        },
        renderEvent: {
            default: null,
            type: cc.Component.EventHandler,
            tooltip: CC_DEV && '渲染事件（渲染器）'
        },
        selectedMode: {
            default: SelectedType.NONE,
            type: SelectedType,
            tooltip: CC_DEV && '选择模式'
        },
        repeatEventSingle: {
            default: false,
            tooltip: CC_DEV && '是否重复响应单选事件',
            visible: function visible() {
                return this.selectedMode == SelectedType.SINGLE;
            }
        },
        selectedEvent: {
            default: null,
            type: cc.Component.EventHandler,
            tooltip: CC_DEV && '触发选择事件',
            visible: function visible() {
                var bool = this.selectedMode > 0;
                if (!bool) this.selectedEvent = null;
                return bool;
            }
        },
        _selectedId: -1,
        selectedId: {
            visible: false,
            get: function get() {
                return this._selectedId;
            },
            set: function set(val) {
                var t = this;
                var item = void 0;
                switch (t.selectedMode) {
                    case SelectedType.SINGLE:
                        {
                            if (!t.repeatEventSingle && val == t._selectedId) return;
                            item = t.getItemByListId(val);
                            // if (!item && val >= 0)
                            //     return;
                            if (t._selectedId >= 0) t._lastSelectedId = t._selectedId;else //如果＜0则取消选择，把_lastSelectedId也置空吧，如果以后有特殊需求再改吧。
                                t._lastSelectedId = null;
                            t._selectedId = val;
                            if (item) item.listItem.selected = true;
                            if (t._lastSelectedId >= 0 && t._lastSelectedId != t._selectedId) {
                                var lastItem = t.getItemByListId(t._lastSelectedId);
                                if (lastItem) {
                                    lastItem.listItem.selected = false;
                                }
                            }
                            if (t.selectedEvent) {
                                cc.Component.EventHandler.emitEvents([t.selectedEvent], item, val % this._actualNumItems, t._lastSelectedId % this._actualNumItems);
                            }
                            break;
                        }
                    case SelectedType.MULT:
                        {
                            item = t.getItemByListId(val);
                            if (!item) return;
                            if (t._selectedId >= 0) t._lastSelectedId = t._selectedId;
                            t._selectedId = val;
                            var bool = !item.listItem.selected;
                            item.listItem.selected = bool;
                            var sub = t.multSelected.indexOf(val);
                            if (bool && sub < 0) {
                                t.multSelected.push(val);
                            } else if (!bool && sub >= 0) {
                                t.multSelected.splice(sub, 1);
                            }
                            if (t.selectedEvent) {
                                cc.Component.EventHandler.emitEvents([t.selectedEvent], item, val % this._actualNumItems, t._lastSelectedId % this._actualNumItems, bool);
                            }
                            break;
                        }
                }
            }
        },
        _numItems: {
            default: 0,
            serializable: false
        },
        numItems: {
            visible: false,
            get: function get() {
                return this._actualNumItems;
            },
            set: function set(val) {
                var t = this;
                if (!t.checkInited()) return;
                if (val == null || val < 0) {
                    cc.error('numItems set the wrong::', val);
                    return;
                }
                t._actualNumItems = t._numItems = val;
                t._forceUpdate = true;

                if (t._virtual) {
                    t._resizeContent();
                    if (t.cyclic) {
                        t._numItems = t._cyclicNum * t._numItems;
                    }
                    t._onScrolling();
                    if (!t.frameByFrameRenderNum && t.slideMode == SlideType.PAGE) t.curPageNum = t.nearestListId;
                } else {
                    var layout = t.content.getComponent(cc.Layout);
                    if (layout) {
                        layout.enabled = true;
                    }
                    t._delRedundantItem();

                    t.firstListId = 0;
                    if (t.frameByFrameRenderNum > 0) {
                        //先渲染几个出来
                        var len = t.frameByFrameRenderNum > t._numItems ? t._numItems : t.frameByFrameRenderNum;
                        for (var n = 0; n < len; n++) {
                            t._createOrUpdateItem2(n);
                        }
                        if (t.frameByFrameRenderNum < t._numItems) {
                            t._updateCounter = t.frameByFrameRenderNum;
                            t._updateDone = false;
                        }
                    } else {
                        for (var _n = 0; _n < val; _n++) {
                            t._createOrUpdateItem2(_n);
                        }
                        t.displayItemNum = val;
                    }
                }
            }
        }
    },

    onLoad: function onLoad() {
        this._init();
    },
    onDestroy: function onDestroy() {
        if (this._itemTmp && this._itemTmp.isValid) this._itemTmp.destroy();
        // let total = this._pool.size();
        while (this._pool.size()) {
            var node = this._pool.get();
            node.destroy();
        }
        // if (total)
        //     cc.log('-----------------' + this.node.name + '<List> destroy node total num. =>', total);
    },
    onEnable: function onEnable() {
        // if (!CC_EDITOR)
        this._registerEvent();
        this._init();
    },
    onDisable: function onDisable() {
        // if (!CC_EDITOR)
        this._unregisterEvent();
    },

    //注册事件
    _registerEvent: function _registerEvent() {
        var t = this;
        t.node.on(cc.Node.EventType.TOUCH_START, t._onTouchStart, t, true);
        t.node.on('touch-up', t._onTouchUp, t, true);
        t.node.on(cc.Node.EventType.TOUCH_CANCEL, t._onTouchCancelled, t, true);
        t.node.on('scroll-began', t._onScrollBegan, t, true);
        t.node.on('scroll-ended', t._onScrollEnded, t, true);
        t.node.on('scrolling', t._onScrolling, t, true);
        t.node.on(cc.Node.EventType.SIZE_CHANGED, t._onSizeChanged, t);
    },

    //卸载事件
    _unregisterEvent: function _unregisterEvent() {
        var t = this;
        t.node.off(cc.Node.EventType.TOUCH_START, t._onTouchStart, t, true);
        t.node.off('touch-up', t._onTouchUp, t, true);
        t.node.off(cc.Node.EventType.TOUCH_CANCEL, t._onTouchCancelled, t, true);
        t.node.off('scroll-began', t._onScrollBegan, t, true);
        t.node.off('scroll-ended', t._onScrollEnded, t, true);
        t.node.off('scrolling', t._onScrolling, t, true);
        t.node.off(cc.Node.EventType.SIZE_CHANGED, t._onSizeChanged, t);
    },

    //初始化各种..
    _init: function _init() {
        var t = this;
        if (t._inited) return;

        t._scrollView = t.node.getComponent(cc.ScrollView);

        t.content = t._scrollView.content;
        if (!t.content) {
            cc.error(t.node.name + "'s cc.ScrollView unset content!");
            return;
        }

        t._layout = t.content.getComponent(cc.Layout);

        t._align = t._layout.type; //排列模式
        t._resizeMode = t._layout.resizeMode; //自适应模式
        t._startAxis = t._layout.startAxis;

        t._topGap = t._layout.paddingTop; //顶边距
        t._rightGap = t._layout.paddingRight; //右边距
        t._bottomGap = t._layout.paddingBottom; //底边距
        t._leftGap = t._layout.paddingLeft; //左边距

        t._columnGap = t._layout.spacingX; //列距
        t._lineGap = t._layout.spacingY; //行距

        // console.log('顶边距---->', t._topGap, '右边距---->', t._rightGap, '底边距---->', t._bottomGap, '左边距---->', t._leftGap, '列距---->', t._columnGap, '行距---->', t._lineGap);

        t._colLineNum; //列数或行数（非GRID模式则=1，表示单列或单行）;

        t._verticalDir = t._layout.verticalDirection; //垂直排列子节点的方向
        t._horizontalDir = t._layout.horizontalDirection; //水平排列子节点的方向

        t.setTemplateItem(cc.instantiate(t.templateType == TemplateType.PREFAB ? t.tmpPrefab : t.tmpNode));

        if (t._slideMode == SlideType.ADHERING || t._slideMode == SlideType.PAGE) //特定的滑动模式需要关闭惯性
            t._scrollView.inertia = false;
        if (!t.virtual) // lackCenter 仅支持 Virtual 模式
            t.lackCenter = false;

        t._lastDisplayData = []; //最后一次刷新的数据
        t.displayData = []; //当前数据
        t._pool = new cc.NodePool(); //这是个池子..
        t._forceUpdate = false; //是否强制更新
        t._updateCounter = 0; //当前分帧渲染帧数
        t._updateDone = true; //分帧渲染是否完成

        t.curPageNum = 0; //当前页数

        if (t.cyclic) {
            // 如果是循环列表，覆写一些cc.ScrollView的函数
            t._scrollView._processAutoScrolling = this._processAutoScrolling.bind(t);
            t._scrollView._startBounceBackIfNeeded = function () {
                return false;
            };
            // t._scrollView._scrollChildren = function () {
            //     return false;
            // }
        }

        switch (t._align) {
            case cc.Layout.Type.HORIZONTAL:
                {
                    switch (t._horizontalDir) {
                        case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
                            t._alignCalcType = 1;
                            break;
                        case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
                            t._alignCalcType = 2;
                            break;
                    }
                    break;
                }
            case cc.Layout.Type.VERTICAL:
                {
                    switch (t._verticalDir) {
                        case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
                            t._alignCalcType = 3;
                            break;
                        case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
                            t._alignCalcType = 4;
                            break;
                    }
                    break;
                }
            case cc.Layout.Type.GRID:
                {
                    switch (t._startAxis) {
                        case cc.Layout.AxisDirection.HORIZONTAL:
                            switch (t._verticalDir) {
                                case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
                                    t._alignCalcType = 3;
                                    break;
                                case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
                                    t._alignCalcType = 4;
                                    break;
                            }
                            break;
                        case cc.Layout.AxisDirection.VERTICAL:
                            switch (t._horizontalDir) {
                                case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
                                    t._alignCalcType = 1;
                                    break;
                                case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
                                    t._alignCalcType = 2;
                                    break;
                            }
                            break;
                    }
                    break;
                }
        }
        // 清空 content
        t.content.children.forEach(function (child) {
            child.removeFromParent();
            if (child.isValid) child.destroy();
        });
        t._inited = true;
    },

    /**
     * 为了实现循环列表，必须覆写cc.ScrollView的某些函数
     * @param {Number} dt
     */
    _processAutoScrolling: function _processAutoScrolling(dt) {
        // let isAutoScrollBrake = this._scrollView._isNecessaryAutoScrollBrake();
        var brakingFactor = 1;
        this._scrollView._autoScrollAccumulatedTime += dt * (1 / brakingFactor);
        // console.log('??????', dt);
        var percentage = Math.min(1, this._scrollView._autoScrollAccumulatedTime / this._scrollView._autoScrollTotalTime);
        if (this._scrollView._autoScrollAttenuate) {
            var time = percentage - 1;
            percentage = time * time * time * time * time + 1;
        }

        var newPosition = this._scrollView._autoScrollStartPosition.add(this._scrollView._autoScrollTargetDelta.mul(percentage));
        var EPSILON = this._scrollView.getScrollEndedEventTiming();
        var reachedEnd = Math.abs(percentage - 1) <= EPSILON;
        // cc.log(reachedEnd, Math.abs(percentage - 1), EPSILON)

        var fireEvent = Math.abs(percentage - 1) <= this._scrollView.getScrollEndedEventTiming();
        if (fireEvent && !this._scrollView._isScrollEndedWithThresholdEventFired) {
            this._scrollView._dispatchEvent('scroll-ended-with-threshold');
            this._scrollView._isScrollEndedWithThresholdEventFired = true;
        }

        // if (this._scrollView.elastic && !reachedEnd) {
        //     let brakeOffsetPosition = newPosition.sub(this._scrollView._autoScrollBrakingStartPosition);
        //     if (isAutoScrollBrake) {
        //         brakeOffsetPosition = brakeOffsetPosition.mul(brakingFactor);
        //     }
        //     newPosition = this._scrollView._autoScrollBrakingStartPosition.add(brakeOffsetPosition);
        // } else {
        //     let moveDelta = newPosition.sub(this._scrollView.getContentPosition());
        //     let outOfBoundary = this._scrollView._getHowMuchOutOfBoundary(moveDelta);
        //     if (!outOfBoundary.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
        //         newPosition = newPosition.add(outOfBoundary);
        //         reachedEnd = true;
        //     }
        // }

        if (reachedEnd) {
            this._scrollView._autoScrolling = false;
        }

        var deltaMove = newPosition.sub(this._scrollView.getContentPosition());
        // cc.log(deltaMove)
        this._scrollView._moveContent(this._scrollView._clampDelta(deltaMove), reachedEnd);
        this._scrollView._dispatchEvent('scrolling');

        // scollTo API controll move
        if (!this._scrollView._autoScrolling) {
            this._scrollView._isBouncing = false;
            this._scrollView._scrolling = false;
            this._scrollView._dispatchEvent('scroll-ended');
        }
    },

    //设置模板Item
    setTemplateItem: function setTemplateItem(item) {
        if (!item) return;
        var t = this;
        t._itemTmp = item;

        if (t._resizeMode == cc.Layout.ResizeMode.CHILDREN) t._itemSize = t._layout.cellSize;else t._itemSize = new cc.size(item.width, item.height);

        //获取ListItem，如果没有就取消选择模式
        var com = item.getComponent(ListItem);
        var remove = false;
        if (!com) remove = true;
        if (com) {
            if (!com._btnCom && !item.getComponent(cc.Button)) {
                remove = true;
            }
        }
        if (remove) {
            t.selectedMode = SelectedType.NONE;
        }
        com = item.getComponent(cc.Widget);
        if (com && com.enabled) {
            t._needUpdateWidget = true;
        }
        if (t.selectedMode == SelectedType.MULT) t.multSelected = [];

        switch (t._align) {
            case cc.Layout.Type.HORIZONTAL:
                t._colLineNum = 1;
                t._sizeType = false;
                break;
            case cc.Layout.Type.VERTICAL:
                t._colLineNum = 1;
                t._sizeType = true;
                break;
            case cc.Layout.Type.GRID:
                switch (t._startAxis) {
                    case cc.Layout.AxisDirection.HORIZONTAL:
                        //计算列数
                        var trimW = t.content.width - t._leftGap - t._rightGap;
                        t._colLineNum = Math.floor((trimW + t._columnGap) / (t._itemSize.width + t._columnGap));
                        t._sizeType = true;
                        break;
                    case cc.Layout.AxisDirection.VERTICAL:
                        //计算行数
                        var trimH = t.content.height - t._topGap - t._bottomGap;
                        t._colLineNum = Math.floor((trimH + t._lineGap) / (t._itemSize.height + t._lineGap));
                        t._sizeType = false;
                        break;
                }
                break;
        }
    },

    /**
     * 检查是否初始化
     * @param {Boolean} printLog 是否打印错误信息
     * @returns
     */
    checkInited: function checkInited(printLog) {
        printLog = printLog == null ? true : printLog;
        if (!this._inited) {
            if (printLog) {
                cc.error('List initialization not completed!');
            }
            return false;
        }
        return true;
    },

    //禁用 Layout 组件，自行计算 Content Size
    _resizeContent: function _resizeContent() {
        var t = this;
        var result = void 0;
        switch (t._align) {
            case cc.Layout.Type.HORIZONTAL:
                {
                    if (t._customSize) {
                        var fixed = t._getFixedSize();
                        result = t._leftGap + fixed.val + t._itemSize.width * (t._numItems - fixed.count) + t._columnGap * (t._numItems - 1) + t._rightGap;
                    } else {
                        result = t._leftGap + t._itemSize.width * t._numItems + t._columnGap * (t._numItems - 1) + t._rightGap;
                    }
                    break;
                }
            case cc.Layout.Type.VERTICAL:
                {
                    if (t._customSize) {
                        var _fixed = t._getFixedSize();
                        result = t._topGap + _fixed.val + t._itemSize.height * (t._numItems - _fixed.count) + t._lineGap * (t._numItems - 1) + t._bottomGap;
                    } else {
                        result = t._topGap + t._itemSize.height * t._numItems + t._lineGap * (t._numItems - 1) + t._bottomGap;
                    }
                    break;
                }
            case cc.Layout.Type.GRID:
                {
                    //网格模式不支持居中
                    if (t.lackCenter) t.lackCenter = false;
                    switch (t._startAxis) {
                        case cc.Layout.AxisDirection.HORIZONTAL:
                            var lineNum = Math.ceil(t._numItems / t._colLineNum);
                            result = t._topGap + t._itemSize.height * lineNum + t._lineGap * (lineNum - 1) + t._bottomGap;
                            break;
                        case cc.Layout.AxisDirection.VERTICAL:
                            var colNum = Math.ceil(t._numItems / t._colLineNum);
                            result = t._leftGap + t._itemSize.width * colNum + t._columnGap * (colNum - 1) + t._rightGap;
                            break;
                    }
                    break;
                }
        }

        var layout = t.content.getComponent(cc.Layout);
        if (layout) layout.enabled = false;

        t._allItemSize = result;
        t._allItemSizeNoEdge = t._allItemSize - (t._sizeType ? t._topGap + t._bottomGap : t._leftGap + t._rightGap);
        if (t.cyclic) {
            var totalSize = t._sizeType ? t.node.height : t.node.width;

            t._cyclicPos1 = 0;
            totalSize -= t._cyclicPos1;
            t._cyclicNum = Math.ceil(totalSize / t._allItemSizeNoEdge) + 1;
            var spacing = t._sizeType ? t._lineGap : t._columnGap;
            t._cyclicPos2 = t._cyclicPos1 + t._allItemSizeNoEdge + spacing;
            t._cyclicAllItemSize = t._allItemSize + t._allItemSizeNoEdge * (t._cyclicNum - 1) + spacing * (t._cyclicNum - 1);
            t._cycilcAllItemSizeNoEdge = t._allItemSizeNoEdge * t._cyclicNum;
            t._cycilcAllItemSizeNoEdge += spacing * (t._cyclicNum - 1);
            // cc.log('_cyclicNum ->', t._cyclicNum, t._allItemSizeNoEdge, t._allItemSize, t._cyclicPos1, t._cyclicPos2);
        }

        t._lack = !t.cyclic && t._allItemSize < (t._sizeType ? t.node.height : t.node.width);
        var slideOffset = (!t._lack || !t.lackCenter) && t.lackSlide ? 0 : .1;
        var targetWH = t._lack ? (t._sizeType ? t.node.height : t.node.width) - slideOffset : t.cyclic ? t._cyclicAllItemSize : t._allItemSize;
        if (targetWH < 0) targetWH = 0;

        if (t._sizeType) {
            t.content.height = targetWH;
        } else {
            t.content.width = targetWH;
        }
        // cc.log('_resizeContent()  numItems =', t._numItems, '，content =', t.content);
    },

    //滚动进行时...
    _onScrolling: function _onScrolling(ev) {
        if (this.frameCount == null) this.frameCount = this._updateRate;
        if (!this._forceUpdate && ev && ev.type != 'scroll-ended' && this.frameCount > 0) {
            this.frameCount--;
            return;
        } else this.frameCount = this._updateRate;

        if (this._aniDelRuning) return;

        //循环列表处理
        if (this.cyclic) {
            var scrollPos = this.content.getPosition();
            scrollPos = this._sizeType ? scrollPos.y : scrollPos.x;

            var addVal = this._allItemSizeNoEdge + (this._sizeType ? this._lineGap : this._columnGap);
            var add = this._sizeType ? cc.v2(0, addVal) : cc.v2(addVal, 0);

            switch (this._alignCalcType) {
                case 1:
                    //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                    if (scrollPos > -this._cyclicPos1) {
                        this.content.x = -this._cyclicPos2;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.sub(add);
                        }
                        // if (this._beganPos) {
                        //     this._beganPos += add;
                        // }
                    } else if (scrollPos < -this._cyclicPos2) {
                        this.content.x = -this._cyclicPos1;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.add(add);
                        }
                        // if (this._beganPos) {
                        //     this._beganPos -= add;
                        // }
                    }
                    break;
                case 2:
                    //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                    if (scrollPos < this._cyclicPos1) {
                        this.content.x = this._cyclicPos2;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.add(add);
                        }
                    } else if (scrollPos > this._cyclicPos2) {
                        this.content.x = this._cyclicPos1;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.sub(add);
                        }
                    }
                    break;
                case 3:
                    //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                    if (scrollPos < this._cyclicPos1) {
                        this.content.y = this._cyclicPos2;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.add(add);
                        }
                    } else if (scrollPos > this._cyclicPos2) {
                        this.content.y = this._cyclicPos1;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.sub(add);
                        }
                    }
                    break;
                case 4:
                    //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                    if (scrollPos > -this._cyclicPos1) {
                        this.content.y = -this._cyclicPos2;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.sub(add);
                        }
                    } else if (scrollPos < -this._cyclicPos2) {
                        this.content.y = -this._cyclicPos1;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.add(add);
                        }
                    }
                    break;
            }
        }

        this._calcViewPos();

        console.log('this.frameCount----->', this.frameCount, 'this._updateRate----->', this._updateRate, 'this._sizeType----->', this._sizeType);

        var vTop = void 0,
            vRight = void 0,
            vBottom = void 0,
            vLeft = void 0;
        if (this._sizeType) {
            vTop = this.viewTop;
            vBottom = this.viewBottom;
            console.log('vTop======', vTop, 'vBottom======', vBottom);
        } else {
            vRight = this.viewRight;
            vLeft = this.viewLeft;
        }

        if (this._virtual) {
            this.displayData = [];
            var itemPos = void 0;

            var curId = 0;
            var endId = this._numItems - 1;
            if (this._customSize) {
                var breakFor = false;
                //如果该item的位置在可视区域内，就推入displayData
                for (; curId <= endId && !breakFor; curId++) {
                    itemPos = this._calcItemPos(curId);
                    switch (this._align) {
                        case cc.Layout.Type.HORIZONTAL:
                            if (itemPos.right >= vLeft && itemPos.left <= vRight) {
                                this.displayData.push(itemPos);
                            } else if (curId != 0 && this.displayData.length > 0) {
                                breakFor = true;
                            }
                            break;
                        case cc.Layout.Type.VERTICAL:
                            if (itemPos.bottom <= vTop && itemPos.top >= vBottom) {
                                this.displayData.push(itemPos);
                            } else if (curId != 0 && this.displayData.length > 0) {
                                breakFor = true;
                            }
                            break;
                        case cc.Layout.Type.GRID:
                            switch (this._startAxis) {
                                case cc.Layout.AxisDirection.HORIZONTAL:
                                    if (itemPos.bottom <= vTop && itemPos.top >= vBottom) {
                                        this.displayData.push(itemPos);
                                    } else if (curId != 0 && this.displayData.length > 0) {
                                        breakFor = true;
                                    }
                                    break;
                                case cc.Layout.AxisDirection.VERTICAL:
                                    if (itemPos.right >= vLeft && itemPos.left <= vRight) {
                                        this.displayData.push(itemPos);
                                    } else if (curId != 0 && this.displayData.length > 0) {
                                        breakFor = true;
                                    }
                                    break;
                            }
                            break;
                    }
                }
            } else {
                var ww = this._itemSize.width + this._columnGap;
                var hh = this._itemSize.height + this._lineGap;
                switch (this._alignCalcType) {
                    case 1:
                        //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                        curId = (vLeft + this._leftGap) / ww;
                        endId = (vRight + this._rightGap) / ww;
                        break;
                    case 2:
                        //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                        curId = (-vRight - this._rightGap) / ww;
                        endId = (-vLeft - this._leftGap) / ww;
                        break;
                    case 3:
                        //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                        curId = (-vTop - this._topGap) / hh;
                        endId = (-vBottom - this._bottomGap) / hh;
                        break;
                    case 4:
                        //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                        curId = (vBottom + this._bottomGap) / hh;
                        endId = (vTop + this._topGap) / hh;
                        break;
                }
                curId = Math.floor(curId) * this._colLineNum;
                endId = Math.ceil(endId) * this._colLineNum;
                console.log('00000000000000', 'hh -->', hh);
                console.log('11111111111111', '-vTop ==>', -vTop, 'this._topGap ==>', this._topGap, 'curId ==>', curId);
                console.log('22222222222222', '-vBottom >>>', -vBottom, 'this._bottomGap >>>', this._bottomGap, 'endId >>>', endId);
                endId--;
                if (curId < 0) curId = 0;
                if (endId >= this._numItems) endId = this._numItems - 1;
                // cc.log(curId, endId);
                for (; curId <= endId; curId++) {
                    this.displayData.push(this._calcItemPos(curId));
                }
            }
            if (this.displayData.length <= 0 || !this._numItems) {
                //if none, delete all.
                this._lastDisplayData = [];
                this._delRedundantItem();
                return;
            }
            this.firstListId = this.displayData[0].id;
            this.displayItemNum = this.displayData.length;
            var len = this._lastDisplayData.length;
            //判断数据是否与当前相同，如果相同，return。
            //因List的显示数据是有序的，所以只需要判断数组长度是否相等，以及头、尾两个元素是否相等即可。
            if (this._forceUpdate || this.displayItemNum != len || this.firstListId != this._lastDisplayData[0] || this.displayData[this.displayItemNum - 1].id != this._lastDisplayData[len - 1]) {
                this._lastDisplayData = [];
                if (this.frameByFrameRenderNum > 0) {
                    //逐帧渲染
                    if (this._numItems > 0) {
                        if (!this._updateDone) {
                            this._doneAfterUpdate = true;
                        } else {
                            this._updateCounter = 0;
                        }
                        this._updateDone = false;
                    } else {
                        this._delRedundantItem();
                        this._updateCounter = 0;
                        this._updateDone = true;
                    }
                    // cc.log('List Display Data I::', this.displayData);
                } else {
                    //直接渲染
                    // cc.log('List Display Data II::', this.displayData);
                    for (var c = 0; c < this.displayItemNum; c++) {
                        this._createOrUpdateItem(this.displayData[c]);
                    }
                    this._delRedundantItem();
                    this._forceUpdate = false;
                }
            }
            this._calcNearestItem();
        }
    },

    //计算View位置
    _calcViewPos: function _calcViewPos() {
        var scrollPos = this.content.getPosition();
        switch (this._alignCalcType) {
            case 1:
                //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                this.elasticLeft = scrollPos.x > 0 ? scrollPos.x : 0;
                this.viewLeft = (scrollPos.x < 0 ? -scrollPos.x : 0) - this.elasticLeft;
                this.viewRight = this.viewLeft + this.node.width;
                this.elasticRight = this.viewRight > this.content.width ? Math.abs(this.viewRight - this.content.width) : 0;
                this.viewRight += this.elasticRight;
                // cc.log(this.elasticLeft, this.elasticRight, this.viewLeft, this.viewRight);
                break;
            case 2:
                //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                this.elasticRight = scrollPos.x < 0 ? -scrollPos.x : 0;
                this.viewRight = (scrollPos.x > 0 ? -scrollPos.x : 0) + this.elasticRight;
                this.viewLeft = this.viewRight - this.node.width;
                this.elasticLeft = this.viewLeft < -this.content.width ? Math.abs(this.viewLeft + this.content.width) : 0;
                this.viewLeft -= this.elasticLeft;
                // cc.log(this.elasticLeft, this.elasticRight, this.viewLeft, this.viewRight);
                break;
            case 3:
                //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                this.elasticTop = scrollPos.y < 0 ? Math.abs(scrollPos.y) : 0;
                this.viewTop = (scrollPos.y > 0 ? -scrollPos.y : 0) + this.elasticTop;
                this.viewBottom = this.viewTop - this.node.height;
                this.elasticBottom = this.viewBottom < -this.content.height ? Math.abs(this.viewBottom + this.content.height) : 0;
                this.viewBottom += this.elasticBottom;
                // cc.log(this.elasticTop, this.elasticBottom, this.viewTop, this.viewBottom);
                console.log('计算当前显示位置', 'elasticTop====', this.elasticTop, 'viewTop====', this.viewTop, 'viewBottom====', this.viewBottom, 'elasticBottom====', this.elasticBottom);
                break;
            case 4:
                //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                this.elasticBottom = scrollPos.y > 0 ? Math.abs(scrollPos.y) : 0;
                this.viewBottom = (scrollPos.y < 0 ? -scrollPos.y : 0) - this.elasticBottom;
                this.viewTop = this.viewBottom + this.node.height;
                this.elasticTop = this.viewTop > this.content.height ? Math.abs(this.viewTop - this.content.height) : 0;
                this.viewTop -= this.elasticTop;
                // cc.log(this.elasticTop, this.elasticBottom, this.viewTop, this.viewBottom);
                break;
        }
    },

    //计算位置 根据id
    _calcItemPos: function _calcItemPos(id) {
        var width = void 0,
            height = void 0,
            top = void 0,
            bottom = void 0,
            left = void 0,
            right = void 0,
            itemX = void 0,
            itemY = void 0;
        switch (this._align) {
            case cc.Layout.Type.HORIZONTAL:
                switch (this._horizontalDir) {
                    case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
                        {
                            if (this._customSize) {
                                var fixed = this._getFixedSize(id);
                                left = this._leftGap + (this._itemSize.width + this._columnGap) * (id - fixed.count) + (fixed.val + this._columnGap * fixed.count);
                                var cs = this._customSize[id];
                                width = cs > 0 ? cs : this._itemSize.width;
                            } else {
                                left = this._leftGap + (this._itemSize.width + this._columnGap) * id;
                                width = this._itemSize.width;
                            }
                            right = left + width;
                            if (this.lackCenter) {
                                var offset = this.content.width / 2 - this._allItemSizeNoEdge / 2;
                                left += offset;
                                right += offset;
                            }
                            return {
                                id: id,
                                left: left,
                                right: right,
                                x: left + this._itemTmp.anchorX * width,
                                y: this._itemTmp.y
                            };
                        }
                    case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
                        {
                            if (this._customSize) {
                                var _fixed2 = this._getFixedSize(id);
                                right = -this._rightGap - (this._itemSize.width + this._columnGap) * (id - _fixed2.count) - (_fixed2.val + this._columnGap * _fixed2.count);
                                var _cs = this._customSize[id];
                                width = _cs > 0 ? _cs : this._itemSize.width;
                            } else {
                                right = -this._rightGap - (this._itemSize.width + this._columnGap) * id;
                                width = this._itemSize.width;
                            }
                            left = right - width;
                            if (this.lackCenter) {
                                var _offset = this.content.width / 2 - this._allItemSizeNoEdge / 2;
                                left -= _offset;
                                right -= _offset;
                            }
                            return {
                                id: id,
                                right: right,
                                left: left,
                                x: left + this._itemTmp.anchorX * width,
                                y: this._itemTmp.y
                            };
                        }
                }
                break;
            case cc.Layout.Type.VERTICAL:
                {
                    switch (this._verticalDir) {
                        case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
                            {
                                if (this._customSize) {
                                    var _fixed3 = this._getFixedSize(id);
                                    top = -this._topGap - (this._itemSize.height + this._lineGap) * (id - _fixed3.count) - (_fixed3.val + this._lineGap * _fixed3.count);
                                    var _cs2 = this._customSize[id];
                                    height = _cs2 > 0 ? _cs2 : this._itemSize.height;
                                    bottom = top - height;
                                } else {
                                    top = -this._topGap - (this._itemSize.height + this._lineGap) * id;
                                    height = this._itemSize.height;
                                }
                                bottom = top - height;
                                if (this.lackCenter) {
                                    var _offset2 = this.content.height / 2 - this._allItemSizeNoEdge / 2;
                                    top -= _offset2;
                                    bottom -= _offset2;
                                }
                                // cc.log({
                                //     id: id,
                                //     top: top,
                                //     bottom: bottom,
                                //     x: this._itemTmp.x,
                                //     y: bottom + (this._itemTmp.anchorY * height),
                                // });
                                return {
                                    id: id,
                                    top: top,
                                    bottom: bottom,
                                    x: this._itemTmp.x,
                                    y: bottom + this._itemTmp.anchorY * height
                                };
                            }
                        case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
                            {
                                if (this._customSize) {
                                    var _fixed4 = this._getFixedSize(id);
                                    bottom = this._bottomGap + (this._itemSize.height + this._lineGap) * (id - _fixed4.count) + (_fixed4.val + this._lineGap * _fixed4.count);
                                    var _cs3 = this._customSize[id];
                                    height = _cs3 > 0 ? _cs3 : this._itemSize.height;
                                } else {
                                    bottom = this._bottomGap + (this._itemSize.height + this._lineGap) * id;
                                    height = this._itemSize.height;
                                }
                                top = bottom + height;
                                if (this.lackCenter) {
                                    var _offset3 = this.content.height / 2 - this._allItemSizeNoEdge / 2;
                                    top += _offset3;
                                    bottom += _offset3;
                                }
                                return {
                                    id: id,
                                    top: top,
                                    bottom: bottom,
                                    x: this._itemTmp.x,
                                    y: bottom + this._itemTmp.anchorY * height
                                };
                                break;
                            }
                    }
                }
            case cc.Layout.Type.GRID:
                {
                    var colLine = Math.floor(id / this._colLineNum);
                    switch (this._startAxis) {
                        case cc.Layout.AxisDirection.HORIZONTAL:
                            {
                                switch (this._verticalDir) {
                                    case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
                                        {
                                            top = -this._topGap - (this._itemSize.height + this._lineGap) * colLine;
                                            bottom = top - this._itemSize.height;
                                            itemY = bottom + this._itemTmp.anchorY * this._itemSize.height;
                                            break;
                                        }
                                    case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
                                        {
                                            bottom = this._bottomGap + (this._itemSize.height + this._lineGap) * colLine;
                                            top = bottom + this._itemSize.height;
                                            itemY = bottom + this._itemTmp.anchorY * this._itemSize.height;
                                            break;
                                        }
                                }
                                itemX = this._leftGap + id % this._colLineNum * (this._itemSize.width + this._columnGap);
                                switch (this._horizontalDir) {
                                    case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
                                        {
                                            itemX += this._itemTmp.anchorX * this._itemSize.width;
                                            itemX -= this.content.anchorX * this.content.width;
                                            break;
                                        }
                                    case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
                                        {
                                            itemX += (1 - this._itemTmp.anchorX) * this._itemSize.width;
                                            itemX -= (1 - this.content.anchorX) * this.content.width;
                                            itemX *= -1;
                                            break;
                                        }
                                }
                                return {
                                    id: id,
                                    top: top,
                                    bottom: bottom,
                                    x: itemX,
                                    y: itemY
                                };
                            }
                        case cc.Layout.AxisDirection.VERTICAL:
                            {
                                switch (this._horizontalDir) {
                                    case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
                                        {
                                            left = this._leftGap + (this._itemSize.width + this._columnGap) * colLine;
                                            right = left + this._itemSize.width;
                                            itemX = left + this._itemTmp.anchorX * this._itemSize.width;
                                            itemX -= this.content.anchorX * this.content.width;
                                            break;
                                        }
                                    case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
                                        {
                                            right = -this._rightGap - (this._itemSize.width + this._columnGap) * colLine;
                                            left = right - this._itemSize.width;
                                            itemX = left + this._itemTmp.anchorX * this._itemSize.width;
                                            itemX += (1 - this.content.anchorX) * this.content.width;
                                            break;
                                        }
                                }
                                itemY = -this._topGap - id % this._colLineNum * (this._itemSize.height + this._lineGap);
                                switch (this._verticalDir) {
                                    case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
                                        {
                                            itemY -= (1 - this._itemTmp.anchorY) * this._itemSize.height;
                                            itemY += (1 - this.content.anchorY) * this.content.height;
                                            break;
                                        }
                                    case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
                                        {
                                            itemY -= this._itemTmp.anchorY * this._itemSize.height;
                                            itemY += this.content.anchorY * this.content.height;
                                            itemY *= -1;
                                            break;
                                        }
                                }
                                return {
                                    id: id,
                                    left: left,
                                    right: right,
                                    x: itemX,
                                    y: itemY
                                };
                            }
                    }
                    break;
                }
        }
    },

    //计算已存在的Item的位置
    _calcExistItemPos: function _calcExistItemPos(id) {
        var item = this.getItemByListId(id);
        if (!item) return null;
        var data = {
            id: id,
            x: item.x,
            y: item.y
        };
        if (this._sizeType) {
            data.top = item.y + item.height * (1 - item.anchorY);
            data.bottom = item.y - item.height * item.anchorY;
        } else {
            data.left = item.x - item.width * item.anchorX;
            data.right = item.x + item.width * (1 - item.anchorX);
        }
        return data;
    },

    //获取Item位置
    getItemPos: function getItemPos(id) {
        if (this._virtual) return this._calcItemPos(id);else {
            if (this.frameByFrameRenderNum) return this._calcItemPos(id);else return this._calcExistItemPos(id);
        }
    },

    //获取固定尺寸
    _getFixedSize: function _getFixedSize(listId) {
        if (!this._customSize) return null;
        if (listId == null) listId = this._numItems;
        var fixed = 0;
        var count = 0;
        for (var id in this._customSize) {
            if (parseInt(id) < listId) {
                fixed += this._customSize[id];
                count++;
            }
        }
        return {
            val: fixed,
            count: count
        };
    },

    //滚动开始时..
    _onScrollBegan: function _onScrollBegan() {
        this._beganPos = this._sizeType ? this.viewTop : this.viewLeft;
    },

    //滚动结束时..
    _onScrollEnded: function _onScrollEnded() {
        var t = this;
        if (t.scrollToListId != null) {
            var item = t.getItemByListId(t.scrollToListId);
            t.scrollToListId = null;
            if (item) {
                item.runAction(new cc.sequence(new cc.scaleTo(.1, 1.06), new cc.scaleTo(.1, 1))
                //new cc.callFunc(function (runNode) {

                // })
                );
            }
        }
        t._onScrolling();

        if (t._slideMode == SlideType.ADHERING && !t.adhering) {
            //cc.log(t.adhering, t._scrollView.isAutoScrolling(), t._scrollView.isScrolling());
            t.adhere();
        } else if (t._slideMode == SlideType.PAGE) {
            if (t._beganPos != null) {
                this._pageAdhere();
            } else {
                t.adhere();
            }
        }
    },

    // 触摸时
    _onTouchStart: function _onTouchStart(ev, captureListeners) {
        if (this._scrollView._hasNestedViewGroup(ev, captureListeners)) return;
        var isMe = ev.eventPhase === cc.Event.AT_TARGET && ev.target === this.node;
        if (!isMe) {
            var itemNode = ev.target;
            while (itemNode._listId == null && itemNode.parent) {
                itemNode = itemNode.parent;
            }this._scrollItem = itemNode._listId != null ? itemNode : ev.target;;
        }
    },

    //触摸抬起时..
    _onTouchUp: function _onTouchUp() {
        var t = this;
        t._scrollPos = null;
        if (t._slideMode == SlideType.ADHERING) {
            if (t.adhering) t._adheringBarrier = true;
            t.adhere();
        } else if (t._slideMode == SlideType.PAGE) {
            if (t._beganPos != null) {
                t._pageAdhere();
            } else {
                t.adhere();
            }
        }
        this._scrollItem = null;
    },
    _onTouchCancelled: function _onTouchCancelled(ev, captureListeners) {
        var t = this;
        if (t._scrollView._hasNestedViewGroup(ev, captureListeners) || ev.simulate) return;

        t._scrollPos = null;
        if (t._slideMode == SlideType.ADHERING) {
            if (t.adhering) t._adheringBarrier = true;
            t.adhere();
        } else if (t._slideMode == SlideType.PAGE) {
            if (t._beganPos != null) {
                t._pageAdhere();
            } else {
                t.adhere();
            }
        }
        this._scrollItem = null;
    },

    //当尺寸改变
    _onSizeChanged: function _onSizeChanged() {
        if (this.checkInited(false)) this._onScrolling();
    },

    //当Item自适应
    _onItemAdaptive: function _onItemAdaptive(item) {
        var _this = this;

        if (this.checkInited(false)) {
            if (!this._sizeType && item.width != this._itemSize.width || this._sizeType && item.height != this._itemSize.height) {
                if (!this._customSize) this._customSize = {};
                var val = this._sizeType ? item.height : item.width;
                if (this._customSize[item._listId] != val) {
                    this._customSize[item._listId] = val;
                    this._resizeContent();
                    this.content.children.forEach(function (child) {
                        _this._updateItemPos(child);
                    });
                    // 如果当前正在运行 scrollTo，肯定会不准确，在这里做修正
                    if (!isNaN(this._scrollToListId)) {
                        this._scrollPos = null;
                        this.unschedule(this._scrollToSo);
                        this.scrollTo(this._scrollToListId, Math.max(0, this._scrollToEndTime - new Date().getTime() / 1000));
                    }
                }
            }
        }
    },

    //PAGE粘附
    _pageAdhere: function _pageAdhere() {
        var t = this;
        if (!t.cyclic && (t.elasticTop > 0 || t.elasticRight > 0 || t.elasticBottom > 0 || t.elasticLeft > 0)) return;
        var curPos = t._sizeType ? t.viewTop : t.viewLeft;
        var dis = (t._sizeType ? t.node.height : t.node.width) * t.pageDistance;
        var canSkip = Math.abs(t._beganPos - curPos) > dis;
        if (canSkip) {
            var timeInSecond = .5;
            switch (t._alignCalcType) {
                case 1: //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                case 4:
                    //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                    if (t._beganPos > curPos) {
                        t.prePage(timeInSecond);
                        // cc.log('_pageAdhere   PPPPPPPPPPPPPPP');
                    } else {
                        t.nextPage(timeInSecond);
                        // cc.log('_pageAdhere   NNNNNNNNNNNNNNN')
                    }
                    break;
                case 2: //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                case 3:
                    //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                    if (t._beganPos < curPos) {
                        t.prePage(timeInSecond);
                    } else {
                        t.nextPage(timeInSecond);
                    }
                    break;
            }
        } else if (t.elasticTop <= 0 && t.elasticRight <= 0 && t.elasticBottom <= 0 && t.elasticLeft <= 0) {
            t.adhere();
        }
        t._beganPos = null;
    },

    //粘附
    adhere: function adhere() {
        var t = this;
        if (!t.checkInited()) return;
        if (t.elasticTop > 0 || t.elasticRight > 0 || t.elasticBottom > 0 || t.elasticLeft > 0) return;
        t.adhering = true;
        // if (!t._virtual)
        t._calcNearestItem();
        var offset = (t._sizeType ? t._topGap : t._leftGap) / (t._sizeType ? t.node.height : t.node.width);
        var timeInSecond = .7;
        t.scrollTo(t.nearestListId, timeInSecond, offset);
    },

    //Update..
    update: function update() {
        if (this.frameByFrameRenderNum <= 0 || this._updateDone) return;
        // cc.log(this.displayData.length, this._updateCounter, this.displayData[this._updateCounter]);
        if (this._virtual) {
            var len = this._updateCounter + this.frameByFrameRenderNum > this.displayItemNum ? this.displayItemNum : this._updateCounter + this.frameByFrameRenderNum;
            for (var n = this._updateCounter; n < len; n++) {
                var data = this.displayData[n];
                if (data) this._createOrUpdateItem(data);
            }

            if (this._updateCounter >= this.displayItemNum - 1) {
                //最后一个
                if (this._doneAfterUpdate) {
                    this._updateCounter = 0;
                    this._updateDone = false;
                    if (!this._scrollView.isScrolling()) this._doneAfterUpdate = false;
                } else {
                    this._updateDone = true;
                    this._delRedundantItem();
                    this._forceUpdate = false;
                    this._calcNearestItem();
                    if (this.slideMode == SlideType.PAGE) this.curPageNum = this.nearestListId;
                }
            } else {
                this._updateCounter += this.frameByFrameRenderNum;
            }
        } else {
            if (this._updateCounter < this._numItems) {
                var _len = this._updateCounter + this.frameByFrameRenderNum > this._numItems ? this._numItems : this._updateCounter + this.frameByFrameRenderNum;
                for (var _n2 = this._updateCounter; _n2 < _len; _n2++) {
                    this._createOrUpdateItem2(_n2);
                }
                this._updateCounter += this.frameByFrameRenderNum;
            } else {
                this._updateDone = true;
                this._calcNearestItem();
                if (this.slideMode == SlideType.PAGE) this.curPageNum = this.nearestListId;
            }
        }
    },

    /**
     * 创建或更新Item（虚拟列表用）
     * @param {Object} data 数据
     */
    _createOrUpdateItem: function _createOrUpdateItem(data) {
        var item = this.getItemByListId(data.id);
        if (!item) {
            //如果不存在
            var canGet = this._pool.size() > 0;
            if (canGet) {
                item = this._pool.get();
                // cc.log('从池中取出::   旧id =', item._listId, '，新id =', data.id, item);
            } else {
                item = cc.instantiate(this._itemTmp);
                // cc.log('新建::', data.id, item);
            }
            if (item._listId != data.id) {
                item._listId = data.id;
                item.setContentSize(this._itemSize);
            }
            item.setPosition(new cc.v2(data.x, data.y));
            this._resetItemSize(item);
            this.content.addChild(item);
            if (canGet && this._needUpdateWidget) {
                var widget = item.getComponent(cc.Widget);
                if (widget) widget.updateAlignment();
            }
            item.setSiblingIndex(this.content.childrenCount - 1);

            var listItem = item.getComponent(ListItem);
            item.listItem = listItem;
            if (listItem) {
                listItem._list = this;
                listItem._registerEvent();
            }
            if (this.renderEvent) {
                cc.Component.EventHandler.emitEvents([this.renderEvent], item, data.id % this._actualNumItems);
            }
        } else if (this._forceUpdate && this.renderEvent) {
            //强制更新
            item.setPosition(new cc.v2(data.x, data.y));
            this._resetItemSize(item);
            // cc.log('ADD::', data.id, item);
            if (this.renderEvent) {
                cc.Component.EventHandler.emitEvents([this.renderEvent], item, data.id % this._actualNumItems);
            }
        }
        this._resetItemSize(item);

        this._updateListItem(item.listItem);
        if (this._lastDisplayData.indexOf(data.id) < 0) {
            this._lastDisplayData.push(data.id);
        }
    },

    //创建或更新Item（非虚拟列表用）
    _createOrUpdateItem2: function _createOrUpdateItem2(listId) {
        var item = this.content.children[listId];
        if (!item) {
            //如果不存在
            item = cc.instantiate(this._itemTmp);
            item._listId = listId;
            this.content.addChild(item);
            var listItem = item.getComponent(ListItem);
            item.listItem = listItem;
            if (listItem) {
                listItem._list = this;
                listItem._registerEvent();
            }
            if (this.renderEvent) {
                cc.Component.EventHandler.emitEvents([this.renderEvent], item, listId);
            }
        } else if (this._forceUpdate && this.renderEvent) {
            //强制更新
            item._listId = listId;
            if (this.renderEvent) {
                cc.Component.EventHandler.emitEvents([this.renderEvent], item, listId);
            }
        }
        this._updateListItem(item.listItem);
        if (this._lastDisplayData.indexOf(listId) < 0) {
            this._lastDisplayData.push(listId);
        }
    },
    _updateListItem: function _updateListItem(listItem) {
        if (!listItem) return;
        if (this.selectedMode > SelectedType.NONE) {
            switch (this.selectedMode) {
                case SelectedType.SINGLE:
                    listItem.selected = this.selectedId == listItem.node._listId;
                    break;
                case SelectedType.MULT:
                    listItem.selected = this.multSelected.indexOf(listItem.node._listId) >= 0;
                    break;
            }
        }
    },

    //仅虚拟列表用
    _resetItemSize: function _resetItemSize(item) {
        return;
        var size = void 0;
        if (this._customSize && this._customSize[item._listId]) {
            size = this._customSize[item._listId];
        } else {
            if (this._colLineNum > 1) item.setContentSize(this._itemSize);else size = this._sizeType ? this._itemSize.height : this._itemSize.width;
        }
        if (size) {
            if (this._sizeType) item.height = size;else item.width = size;
        }
    },

    /**
     * 更新Item位置
     * @param {Number||Node} listIdOrItem
     */
    _updateItemPos: function _updateItemPos(listIdOrItem) {
        var item = isNaN(listIdOrItem) ? listIdOrItem : this.getItemByListId(listIdOrItem);
        var pos = this.getItemPos(item._listId);
        item.setPosition(pos.x, pos.y);
    },

    /**
     * 设置多选
     * @param {Array} args 可以是单个listId，也可是个listId数组
     * @param {Boolean} bool 值，如果为null的话，则直接用args覆盖
     */
    setMultSelected: function setMultSelected(args, bool) {
        var t = this;
        if (!t.checkInited()) return;
        if (!Array.isArray(args)) {
            args = [args];
        }
        if (bool == null) {
            t.multSelected = args;
        } else {
            var listId = void 0,
                sub = void 0;
            if (bool) {
                for (var n = args.length - 1; n >= 0; n--) {
                    listId = args[n];
                    sub = t.multSelected.indexOf(listId);
                    if (sub < 0) {
                        t.multSelected.push(listId);
                    }
                }
            } else {
                for (var _n3 = args.length - 1; _n3 >= 0; _n3--) {
                    listId = args[_n3];
                    sub = t.multSelected.indexOf(listId);
                    if (sub >= 0) {
                        t.multSelected.splice(sub, 1);
                    }
                }
            }
        }
        t._forceUpdate = true;
        t._onScrolling();
    },

    /**
     * 更新指定的Item
     * @param {Array} args 单个listId，或者数组
     * @returns
     */
    updateItem: function updateItem(args) {
        if (!this.checkInited()) return;
        if (!Array.isArray(args)) {
            args = [args];
        }
        for (var n = 0, len = args.length; n < len; n++) {
            var listId = args[n];
            var item = this.getItemByListId(listId);
            if (item) {
                cc.Component.EventHandler.emitEvents([this.renderEvent], item, listId % this._actualNumItems);
            }
        }
    },

    /**
     * 更新全部
     */
    updateAll: function updateAll() {
        if (!this.checkInited()) return;
        this.numItems = this.numItems;
    },

    /**
     * 根据ListID获取Item
     * @param {Number} listId
     * @returns
     */
    getItemByListId: function getItemByListId(listId) {
        for (var n = this.content.childrenCount - 1; n >= 0; n--) {
            if (this.content.children[n]._listId == listId) return this.content.children[n];
        }
    },

    /**
     * 获取在显示区域外的Item
     * @returns
     */
    _getOutsideItem: function _getOutsideItem() {
        var item = void 0,
            isOutside = void 0;
        var result = [];
        for (var n = this.content.childrenCount - 1; n >= 0; n--) {
            item = this.content.children[n];
            isOutside = true;
            if (isOutside) {
                for (var c = this.displayItemNum - 1; c >= 0; c--) {
                    if (!this.displayData[c]) continue;
                    var listId = this.displayData[c].id;
                    if (item._listId == listId) {
                        isOutside = false;
                        break;
                    }
                }
            }
            if (isOutside) {
                result.push(item);
            }
        }
        return result;
    },

    //删除显示区域以外的Item
    _delRedundantItem: function _delRedundantItem() {
        if (this._virtual) {
            var arr = this._getOutsideItem();
            for (var n = arr.length - 1; n >= 0; n--) {
                var item = arr[n];
                if (this._scrollItem && item._listId == this._scrollItem._listId) continue;
                this._pool.put(item);
            }
            // cc.log('存入::', str, '    pool.length =', this._pool.length);
        } else {
            while (this.content.childrenCount > this._numItems) {
                this._delSingleItem(this.content.children[this.content.childrenCount - 1]);
            }
        }
    },

    //删除单个Item
    _delSingleItem: function _delSingleItem(item) {
        // cc.log('DEL::', item._listId, item);
        item.removeFromParent();
        if (item.destroy) item.destroy();
        item = null;
    },

    /**
     * 动效删除Item（此方法只适用于虚拟列表，即_virtual=true）
     * 一定要在回调函数里重新设置新的numItems进行刷新，毕竟本List是靠数据驱动的。
     */
    aniDelItem: function aniDelItem(listId, callFunc, aniType) {
        var t = this;

        if (!t.checkInited() || t.cyclic || !t._virtual) return cc.error('This function is not allowed to be called!');

        if (t._aniDelRuning) return cc.warn('Please wait for the current deletion to finish!');

        var item = t.getItemByListId(listId);
        if (!item) {
            callFunc(listId);
            return;
        }
        t._aniDelRuning = true;
        var curLastId = t.displayData[t.displayData.length - 1].id;
        var resetSelectedId = item.listItem.selected;
        item.listItem.showAni(aniType, function () {
            //判断有没有下一个，如果有的话，创建粗来
            var newId = void 0;
            if (curLastId < t._numItems - 2) {
                newId = curLastId + 1;
            }
            if (newId != null) {
                var newData = t._calcItemPos(newId);
                t.displayData.push(newData);
                if (t._virtual) t._createOrUpdateItem(newData);else t._createOrUpdateItem2(newId);
            } else t._numItems--;
            if (t.selectedMode == SelectedType.SINGLE) {
                if (resetSelectedId) {
                    t._selectedId = -1;
                } else if (t._selectedId - 1 >= 0) {
                    t._selectedId--;
                }
            } else if (t.selectedMode == SelectedType.MULT && t.multSelected.length) {
                var sub = t.multSelected.indexOf(listId);
                // let tmp;
                if (sub >= 0) {
                    t.multSelected.splice(sub, 1);
                }
                //多选的数据，在其后的全部减一
                for (var n = t.multSelected.length - 1; n >= 0; n--) {
                    var id = t.multSelected[n];
                    if (id >= listId) t.multSelected[n]--;
                }
            }
            if (t._customSize) {
                if (t._customSize[listId]) delete t._customSize[listId];
                var newCustomSize = {};
                var size = void 0;
                for (var _id in t._customSize) {
                    size = t._customSize[_id];
                    _id = parseInt(_id);
                    newCustomSize[_id - (_id >= listId ? 1 : 0)] = size;
                }
                t._customSize = newCustomSize;
            }
            //后面的Item向前怼的动效
            var sec = .2333;
            var acts = void 0,
                haveCB = void 0;
            for (var _n4 = newId != null ? newId : curLastId; _n4 >= listId + 1; _n4--) {
                item = t.getItemByListId(_n4);
                if (item) {
                    var posData = t._calcItemPos(_n4 - 1);
                    acts = [new cc.moveTo(sec, new cc.v2(posData.x, posData.y))];
                    if (_n4 <= listId + 1) {
                        haveCB = true;
                        acts.push(new cc.CallFunc(function () {
                            t._aniDelRuning = false;
                            callFunc(listId);
                        }));
                    }
                    if (acts.length > 1) item.runAction(new cc.Sequence(acts));else item.runAction(acts[0]);
                }
            }
            if (!haveCB) {
                t._aniDelRuning = false;
                callFunc(listId);
            }
        }, true);
    },

    /**
     * 滚动到..
     * @param {Number} listId 索引（如果<0，则滚到首个Item位置，如果>=_numItems，则滚到最末Item位置）
     * @param {Number} timeInSecond 时间
     * @param {Number} offset 索引目标位置偏移，0-1
     * @param {Boolean} overStress 滚动后是否强调该Item（这只是个实验功能）
     */
    scrollTo: function scrollTo(listId, timeInSecond, offset, overStress) {
        var t = this;
        if (!t.checkInited()) return;
        t._scrollView.stopAutoScroll();
        if (timeInSecond == null) //默认0.5
            timeInSecond = .5;else if (timeInSecond < 0) timeInSecond = 0;
        if (listId < 0) listId = 0;else if (listId >= t._numItems) listId = t._numItems - 1;
        // 以防设置了numItems之后layout的尺寸还未更新
        if (!t._virtual && t._layout && t._layout.enabled) t._layout.updateLayout();

        var pos = t.getItemPos(listId);
        var targetX = void 0,
            targetY = void 0;

        switch (t._alignCalcType) {
            case 1:
                //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                targetX = pos.left;
                if (offset != null) targetX -= t.node.width * offset;else targetX -= t._leftGap;
                pos = new cc.v2(targetX, 0);
                break;
            case 2:
                //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                targetX = pos.right - t.node.width;
                if (offset != null) targetX += t.node.width * offset;else targetX += t._rightGap;
                pos = new cc.v2(targetX + t.content.width, 0);
                break;
            case 3:
                //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                targetY = pos.top;
                if (offset != null) targetY += t.node.height * offset;else targetY += t._topGap;
                pos = new cc.v2(0, -targetY);
                break;
            case 4:
                //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                targetY = pos.bottom + t.node.height;
                if (offset != null) targetY -= t.node.height * offset;else targetY -= t._bottomGap;
                pos = new cc.v2(0, -targetY + t.content.height);
                break;
        }
        var viewPos = t.content.getPosition();
        viewPos = Math.abs(t._sizeType ? viewPos.y : viewPos.x);

        var comparePos = t._sizeType ? pos.y : pos.x;
        var runScroll = Math.abs((t._scrollPos != null ? t._scrollPos : viewPos) - comparePos) > .5;
        // cc.log(runScroll, t._scrollPos, viewPos, comparePos)

        t._scrollView.stopAutoScroll();

        if (runScroll) {
            t._scrollPos = comparePos;
            t._scrollToListId = listId;
            t._scrollToEndTime = new Date().getTime() / 1000 + timeInSecond;
            t._scrollView.scrollToOffset(pos, timeInSecond);
            // cc.log(listId, t.content.width, t.content.getPosition(), pos);
            t._scrollToSo = t.scheduleOnce(function () {
                if (!t._adheringBarrier) {
                    t.adhering = t._adheringBarrier = false;
                }
                t._scrollPos = t._scrollToListId = t._scrollToEndTime = t._scrollToSo = null;
                //cc.log('2222222222', t._adheringBarrier)
                if (overStress) {
                    // t.scrollToListId = listId;
                    var item = t.getItemByListId(listId);
                    if (item) {
                        item.runAction(new cc.sequence(new cc.scaleTo(.1, 1.05), new cc.scaleTo(.1, 1)));
                    }
                }
            }, timeInSecond + .1);

            if (timeInSecond <= 0) {
                t._onScrolling();
            }
        }
    },

    /**
     * 计算当前滚动窗最近的Item
     */
    _calcNearestItem: function _calcNearestItem() {
        var t = this;
        t.nearestListId = null;
        var data = void 0,
            center = void 0;

        if (t._virtual) t._calcViewPos();

        var vTop = void 0,
            vRight = void 0,
            vBottom = void 0,
            vLeft = void 0;
        vTop = t.viewTop;
        vRight = t.viewRight;
        vBottom = t.viewBottom;
        vLeft = t.viewLeft;

        var breakFor = false;
        for (var n = 0; n < t.content.childrenCount && !breakFor; n += t._colLineNum) {
            data = this._virtual ? this.displayData[n] : this._calcExistItemPos(n);
            center = this._sizeType ? (data.top + data.bottom) / 2 : center = (data.left + data.right) / 2;
            switch (this._alignCalcType) {
                case 1:
                    //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                    if (data.right >= vLeft) {
                        this.nearestListId = data.id;
                        if (vLeft > center) this.nearestListId += this._colLineNum;
                        breakFor = true;
                    }
                    break;
                case 2:
                    //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                    if (data.left <= vRight) {
                        this.nearestListId = data.id;
                        if (vRight < center) this.nearestListId += this._colLineNum;
                        breakFor = true;
                    }
                    break;
                case 3:
                    //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                    if (data.bottom <= vTop) {
                        this.nearestListId = data.id;
                        if (vTop < center) this.nearestListId += this._colLineNum;
                        breakFor = true;
                    }
                    break;
                case 4:
                    //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                    if (data.top >= vBottom) {
                        this.nearestListId = data.id;
                        if (vBottom > center) this.nearestListId += this._colLineNum;
                        breakFor = true;
                    }
                    break;
            }
        }
        //判断最后一个Item。。。（哎，这些判断真心恶心，判断了前面的还要判断最后一个。。。一开始呢，就只有一个布局（单列布局），那时候代码才三百行，后来就想着完善啊，艹..这坑真深，现在这行数都一千五了= =||）
        data = this._virtual ? this.displayData[this.displayItemNum - 1] : this._calcExistItemPos(this._numItems - 1);
        if (data && data.id == t._numItems - 1) {
            center = t._sizeType ? (data.top + data.bottom) / 2 : center = (data.left + data.right) / 2;
            switch (t._alignCalcType) {
                case 1:
                    //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                    if (vRight > center) t.nearestListId = data.id;
                    break;
                case 2:
                    //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                    if (vLeft < center) t.nearestListId = data.id;
                    break;
                case 3:
                    //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                    if (vBottom < center) t.nearestListId = data.id;
                    break;
                case 4:
                    //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                    if (vTop > center) t.nearestListId = data.id;
                    break;
            }
        }
        // cc.log('t.nearestListId =', t.nearestListId);
        // console.log('计算当前滚动窗最近的Item');
    },

    //上一页
    prePage: function prePage(timeInSecond) {
        // cc.log('👈');
        if (!this.checkInited()) return;
        if (timeInSecond == null) timeInSecond = .5;
        this.skipPage(this.curPageNum - 1, timeInSecond);
    },

    //下一页
    nextPage: function nextPage(timeInSecond) {
        // cc.log('👉');
        if (!this.checkInited()) return;
        if (timeInSecond == null) timeInSecond = .5;
        this.skipPage(this.curPageNum + 1, timeInSecond);
    },

    //跳转到第几页
    skipPage: function skipPage(pageNum, timeInSecond) {
        var t = this;
        if (!t.checkInited()) return;
        if (t._slideMode != SlideType.PAGE) return cc.error('This function is not allowed to be called, Must SlideMode = PAGE!');
        if (pageNum < 0 || pageNum >= t._numItems) return;
        if (t.curPageNum == pageNum) return;
        // cc.log(pageNum);
        t.curPageNum = pageNum;
        if (t.pageChangeEvent) {
            cc.Component.EventHandler.emitEvents([t.pageChangeEvent], pageNum);
        }
        t.scrollTo(pageNum, timeInSecond);
    },

    //计算 CustomSize（这个函数还是保留吧，某些罕见的情况的确还是需要手动计算customSize的）
    calcCustomSize: function calcCustomSize(numItems) {
        var t = this;
        if (!t.checkInited()) return;
        if (!t._itemTmp) return cc.error('Unset template item!');
        if (!t.renderEvent) return cc.error('Unset Render-Event!');
        t._customSize = {};
        var temp = cc.instantiate(t._itemTmp);
        t.content.addChild(temp);
        for (var n = 0; n < numItems; n++) {
            cc.Component.EventHandler.emitEvents([t.renderEvent], temp, n);
            if (temp.height != t._itemSize.height || temp.width != t._itemSize.width) {
                t._customSize[n] = t._sizeType ? temp.height : temp.width;
            }
        }
        if (!Object.keys(t._customSize).length) t._customSize = null;
        temp.removeFromParent();
        if (temp.destroy) temp.destroy();
        return t._customSize;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=List.js.map
        