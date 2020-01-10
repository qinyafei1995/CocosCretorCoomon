"use strict";
cc._RF.push(module, '49ed1UIr7tD8oTfwKSyh6O8', 'TestPage');
// Script/TestPage.js

'use strict';

/******************************************
 * @author kL <klk0@qq.com>
 * @date 2019/6/15
 * @doc TestPage.
 * @end
 ******************************************/
var List = require('List');

cc.Class({
    extends: cc.Component,

    properties: {
        list: List,
        input: cc.EditBox
    },

    onLoad: function onLoad() {
        this.data = [];
        for (var n = 0; n < 20; n++) {
            this.data.push(n);
        }
        this.list.numItems = this.data.length;
    },

    onListRender: function onListRender(item, idx) {
        item.listItem.title.string = this.data[idx];
    },
    onListPageNumChange: function onListPageNumChange(pageNum) {
        cc.log('当前是第' + pageNum + '页');
    },

    //按钮事件
    btnEvent: function btnEvent(ev) {
        var name = ev.target.name;
        var t = this;
        switch (name) {
            case 'btn1':
                t.list.prePage(.5);
                break;
            case 'btn2':
                t.list.nextPage(.5);
                break;
            case 'btn3':
                t.list.skipPage(parseInt(t.input.string), .5);
                break;
        }
    }
});

cc._RF.pop();