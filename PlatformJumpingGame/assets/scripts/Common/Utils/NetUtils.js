// 本地存储
cc.Class({
    statics: {
        storeLocal(k, d) {
            cc.sys.localStorage.setItem(k, JSON.stringify(d));
        },

        getLocal(k) {
            let data = cc.sys.localStorage.getItem(k);
            return data ? JSON.parse(data) : null;
        },

        delLocal(k) {
            cc.sys.localStorage.removeItem(k);
        },

        clearAllLocal() {
            cc.sys.localStorage.clear();
        }
    }
});
