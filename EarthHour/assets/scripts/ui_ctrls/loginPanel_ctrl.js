var UI_ctrl = require("UI_ctrl");
var UI_manager = require("UI_manager");
cc.Class({
	extends: UI_ctrl,

	properties: {
	},

	onLoad() {
		UI_ctrl.prototype.onLoad.call(this);
		this.init();
	},

	init() {
		this.initData();
		UI_manager.add_button_listen(this.view['startButton'], this, () => {
			cc.director.loadScene('game');
		});
	},

	initData() {

	},

	pubOpen() {

	},

	pubClose() {
		
	}
});