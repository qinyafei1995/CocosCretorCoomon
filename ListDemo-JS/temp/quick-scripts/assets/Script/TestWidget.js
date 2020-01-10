(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/TestWidget.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7fe91UYE/NC3q2E2g83JCEw', 'TestWidget', __filename);
// Script/TestWidget.js

'use strict';

/******************************************
 * @author kL <klk0@qq.com>
 * @date 2019/12/2
 * @doc TestPage.
 * @end
 ******************************************/
var List = require('List');

cc.Class({
    extends: cc.Component,

    properties: {
        list: List
    },

    onLoad: function onLoad() {
        this.data = [];
        for (var n = 0; n < 100; n++) {
            this.data.push(n);
        }
        this.list.numItems = this.data.length;
    },

    onListRender: function onListRender(item, idx) {
        item.getComponentInChildren(cc.Label).string = this.data[idx];
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
        //# sourceMappingURL=TestWidget.js.map
        