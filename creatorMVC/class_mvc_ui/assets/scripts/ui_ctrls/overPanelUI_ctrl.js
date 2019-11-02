var UI_ctrl = require("UI_ctrl");
var UI_manager = require("UI_manager");
cc.Class({
	extends: UI_ctrl,

	properties: {
	},

	onLoad() {
		UI_ctrl.prototype.onLoad.call(this);
		UI_manager.add_button_listen(this.view['aginBtn'], this, () => {
			console.log('游戏结束');
		});
	},

	start() {
	},

});