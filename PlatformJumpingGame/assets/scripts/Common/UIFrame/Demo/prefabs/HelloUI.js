import {LogLv, LogMng} from "LogCtrl";
import BaseUIForms from "BaseUIForms";

cc.Class({
    extends: BaseUIForms,

    properties: {
        nodeClose: cc.Node, 
    },

    onLoad() {
        this._initEvnet();
    },

    _initEvnet() {
        this.nodeClose.on("click", this._close, this);
    },

    _close() {
        UIManager.pubCloseOrReturnUIForms("HelloUI");
    },

});
