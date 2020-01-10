"use strict";
cc._RF.push(module, 'f9e8dSA4rFKIYLHZnrxJ36j', 'TestBag');
// Script/TestBag.js

'use strict';

/******************************************
 * @author kL <klk0@qq.com>
 * @date 2019/9/27
 * @doc TestBag.
 * @end
 ******************************************/
var List = require('List');

cc.Class({
    extends: cc.Component,

    properties: {
        list: List,
        bagItem: cc.Prefab,
        curPage: cc.Label
    },

    onLoad: function onLoad() {
        this.totalItemNum = 90; //总Item数
        this.pagePreNum = 16; //每页Item数量
        this.pageTotalNum = Math.ceil(this.totalItemNum / this.pagePreNum); //总页数
        this.list.numItems = this.pageTotalNum;
        this.onPageChange();
    },

    onListRender: function onListRender(item, idx) {
        if (item.childrenCount) {
            for (var n = 0; n < item.childrenCount; n++) {
                var bi = item.children[n];
                var exactIdx = idx * this.pagePreNum + n;
                bi.getComponentInChildren(cc.Label).string = exactIdx < this.totalItemNum ? exactIdx + 1 : '';
            }
        } else {
            // 我这里就不考虑性能了，直接实例化。
            for (var _n = 0; _n < this.pagePreNum; _n++) {
                var _bi = cc.instantiate(this.bagItem);
                item.addChild(_bi);
                var _exactIdx = idx * this.pagePreNum + _n;
                _bi.getComponentInChildren(cc.Label).string = _exactIdx < this.totalItemNum ? _exactIdx + 1 : '';
            }
        }
    },
    onPageChange: function onPageChange(pageNum) {
        var pageN = pageNum == null ? this.list.curPageNum : pageNum;
        this.curPage.string = '当前页数：' + (pageN + 1);
    }
});

cc._RF.pop();