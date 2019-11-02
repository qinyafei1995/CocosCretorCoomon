var UI_ctrl = require("UI_ctrl");
var UI_manager = require("UI_manager");
cc.Class({
	extends: UI_ctrl,

	properties: {
	},

	onLoad() {
		UI_ctrl.prototype.onLoad.call(this);
		// this.node.getChildByName('label0').getComponent(cc.Label).string = '哈哈哈思密达';
		this.view['label0'].getComponent(cc.Label).string = '哈哈哈思密达';
	},

	start() {
	},

});