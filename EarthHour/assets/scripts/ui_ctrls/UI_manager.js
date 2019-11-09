var UI_manager = {
    add_button_listen(view_node, caller, func) {
        var button = view_node.getComponent(cc.Button);
        if (!button) {
            return;
        }
        view_node.on("click", func, caller);
    },

    show_ui_at(parent, ui_name) {
        cc.loader.loadRes("ui_prefabs/" + ui_name, function(err, prefab) {
            var item = cc.instantiate(prefab);
            parent.addChild(item);
            item.addComponent(ui_name + "_ctrl");
        });
    },
};

module.exports = UI_manager;

