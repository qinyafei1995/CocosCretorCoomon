(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/TestCyclic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cf9d05u6sdN8rlYzMX04cDo', 'TestCyclic', __filename);
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
        //# sourceMappingURL=TestCyclic.js.map
        