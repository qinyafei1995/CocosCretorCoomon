"use strict";
cc._RF.push(module, 'cf9d05u6sdN8rlYzMX04cDo', 'TestCyclic');
// Script/TestCyclic.js

'use strict';

/******************************************
 * @author kL <klk0@qq.com>
 * @date 2019/12/2
 * @doc TestCyclic.
 * @end
 ******************************************/
var List = require('List');

cc.Class({
    extends: cc.Component,

    properties: {
        listV: List,
        listV2: List,
        listH: List,
        listH2: List
    },

    onLoad: function onLoad() {
        this.listV.numItems = this.listV2.numItems = this.listH.numItems = this.listH2.numItems = 3;
    },
    onListRender: function onListRender(item, idx) {
        item.getComponentInChildren(cc.Label).string = idx;
    }
});

cc._RF.pop();