(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Main.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '909f1lfF59IwKwOGAXybpgj', 'Main', __filename);
// Script/Main.js

'use strict';

/******************************************
 * @author kL <klk0@qq.com>
 * @date 2019/1/5
 * @doc Main.
 * @end
 ******************************************/
var List = require('List');

cc.Class({
    extends: cc.Component,

    properties: {
        //垂直列表
        listV: List,
        // //水平列表
        // listH: List,
        // //网格列表
        // listG: List,
        // //网格列表2
        // listG2: List,
        // //输入框
        // input: cc.EditBox,
        //信息Labal
        info: cc.Label
    },

    onLoad: function onLoad() {
        this.data = [];
        for (var n = 0; n < 999; n++) {
            this.data.push(n);
        }
        this.listV.numItems = this.data.length;
        // this.listH.numItems = this.data.length;
        // this.listG.numItems = this.data.length;
        // this.listG2.numItems = this.data.length;
    },
    //垂直列表渲染器
    onListVRender: function onListVRender(item, idx) {
        item.listItem.title.string = this.data[idx];
        var lab = item.getChildByName('label2');
        var label2 = void 0;
        if (lab) label2 = lab.getComponent(cc.Label);
        if (label2) label2.string = 'height=' + item.height;
        this.info.string = 'ListV当前渲染总数 = ' + this.listV.displayItemNum;
    },

    //水平列表渲染器
    onListHRender: function onListHRender(item, idx) {
        item.listItem.title.string = this.data[idx];
        var lab = item.getChildByName('label2');
        var label2 = void 0;
        if (lab) label2 = lab.getComponent(cc.Label);
        if (label2) label2.string = 'width=' + item.width;
        this.info.string = 'ListH当前渲染总数 = ' + this.listH.displayItemNum;
    },

    //网格列表渲染器
    onListGridRender: function onListGridRender(item, idx) {
        item.listItem.title.string = this.data[idx];
        this.info.string = 'ListG当前渲染总数 = ' + this.listG.displayItemNum;
    },

    //网格列表2渲染器
    onListGrid2Render: function onListGrid2Render(item, idx) {
        item.listItem.title.string = this.data[idx];
        this.info.string = 'ListG2当前渲染总数 = ' + this.listG2.displayItemNum;
    },

    //当列表项被选择...
    onListSelected: function onListSelected(item, selectedId, lastSelectedId, val) {
        if (!item) return;
        var list = item.listItem._list;
        var str = '当前操作List为：' + list.node.name + '，当前选择的是：' + selectedId + '，上一次选择的是：' + lastSelectedId;
        if (list.selectedMode == 2) {
            //如果是多选模式
            str += '，当前值为：' + val;
        }
        console.log(str);
    },

    //按钮事件
    btnEvent: function btnEvent(ev) {
        var name = ev.target.name;
        var t = this;
        var callFunc = function callFunc(idx) {
            if (idx != null) {
                t.data.splice(idx, 1);
                console.log('------删除完毕！', idx);
                t.listV.numItems = t.data.length;
                t.listH.numItems = t.data.length;
                t.listG.numItems = t.data.length;
                t.listG2.numItems = t.data.length;
            }
        };
        switch (name) {
            case 'btn1':
                t.listV.aniDelItem(1, callFunc, 3);
                break;
            case 'btn2':
                t.listH.aniDelItem(t.listH.selectedId, callFunc, 0);
                break;
            case 'btn3':
                t.listG.aniDelItem(1, callFunc);
                break;
            case 'btn4':
                t.listV.scrollTo(parseInt(t.input.string), .5);
                t.listH.scrollTo(parseInt(t.input.string), .5);
                t.listG.scrollTo(parseInt(t.input.string), .5);
                t.listG2.scrollTo(parseInt(t.input.string), .5);
                break;
        }
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
        //# sourceMappingURL=Main.js.map
        