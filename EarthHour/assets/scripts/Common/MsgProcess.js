let MSG_MAP = {
    // clienConfig     : "clienConfig",        // 客户端配置
    // businessConfig  : "businessConfig",     // 商家配置
    // login           : "login",              // 登录
    // shareScheme     : "shareScheme",        // 通知服务器分享成功
    // uploadIntegral1 : "uploadIntegral1",    // 上传分数
    // uploadRank      : "uploadRank",          // 上传排行榜分数
}

/**
 * 注入全局消息监听机制
 */
let MSG = {
    _funcList: [],

    on(msg,func,obj) {
        if(!msg && !func) return -1;
        if(func && obj) {
            func = func.bind(obj);
        }
        this._funcList[msg] ? this._funcList[msg].push(func) : (()=>{this._funcList[msg]=[];this._funcList[msg].push(func);})();
        return this._funcList[msg].length - 1;
    },

    off(msg) {
        if(mag && this._funcList[msg]) {
            this._funcList[msg] = null;
        }
    },

    offAllMsg() {
        for (let key in this._funcList) {
            this.off(key);
        }
    },

    removeFuncByIndex(msg, index) {
        if(msg && this._funcList[msg]) {
            if(index != undefined && index > -1 && this._funcList[msg][index]) {
                // this._funcList[msg].splice(index,1);
                this._funcList[msg][index] = null;
            }
        }
    },

    clear(msg) {
        if(msg && this._funcList[msg]) {
            this._funcList[msg] = [];
        }
    },

    
    sendMsg(msg,data) {
        if(msg && this._funcList[msg]) {
            this._funcList[msg].forEach(func => {
                func ? func(data) : null;
            });
        }
    }
};

MSG.sendMsg_ = MSG.sendMsg;

MSG.sendMsg = (sign, ...data)=> {
    console.log(`---------发送${sign}消息开始---------`);
    let data_ = [...data];
    let cb_ = null;
    typeof(data_[data_.length-1]) == "function" ? cb_ = data_.pop() : null;
    MSG.sendMsg_(sign, {
        data: data_,
        cb : cb_,
    });
}

module.exports = {
    MSG_MAP : MSG_MAP,
    MSG : MSG,
};