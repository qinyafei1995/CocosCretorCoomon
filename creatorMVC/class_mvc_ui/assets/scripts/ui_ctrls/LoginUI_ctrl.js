var UI_ctrl = require("UI_ctrl");
var UI_manager = require("UI_manager");

cc.Class({
	extends: UI_ctrl,

	properties: {
	},

	onLoad() { // view;
		UI_ctrl.prototype.onLoad.call(this);
		UI_manager.add_button_listen(this.view["start_button"], this, this.on_start_click);
		this.view["version"].getComponent(cc.Label).string = "2.0.0";
	},

	on_start_click() {
		console.log("on_start_click !!!!!");
	},

	start() {
		
	},

});