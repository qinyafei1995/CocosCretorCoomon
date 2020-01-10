(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/TestLack.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '94cd9mzTXdKF4KEA1q+QJff', 'TestLack', __filename);
// Script/TestLack.js

'use strict';

/******************************************
 * @author kL <klk0@qq.com>
 * @date 2019/7/20
 * @doc TestLack.
 * @end
 ******************************************/
var List = require('List');

cc.Class({
    extends: cc.Component,

    properties: {
        listH: List,
        listV: List
    },

    onLoad: function onLoad() {
        this.data = [];
        for (var n = 0; n < 3; n++) {
            this.data.push(n);
        }
        this.listH.numItems = this.data.length;
        this.listV.numItems = this.data.length;
    },

    onListRender: function onListRender(item, idx) {
        item.listItem.title.string = this.data[idx];
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
        //# sourceMappingURL=TestLack.js.map
        