
let Msg = {
    _handle_list: {},
    on(type, handle, obj) {
        Msg._handle_list[type] = Msg._handle_list[type] || [];
        handle = obj ? handle.bind(obj) : handle;
        // 先判断 是否有空的 位置
        for(let i = 0; i < Msg._handle_list[type].length; i++) {
            if(!Msg._handle_list[type][i]) {
                Msg._handle_list[type][i] = handle;
                return i;
            }
        }
        Msg._handle_list[type].push(handle);
        return Msg._handle_list[type].length - 1;
    },

    off(type, id) {
        if(id || id == 0) {
            if (Msg._handle_list[type]) {
                Msg._handle_list[type][id] = null;
            }
            return;
        }

        if(!!Msg._handle_list[type]) {
            delete Msg._handle_list[type];
        } else {
            for(let key in Msg._handle_list) {
                if(key.search(type) != -1) {
                    delete Msg._handle_list[key];
                }
            }
        }
    },

    emit(type, arg1, arg2, arg3, arg4, arg5) {
        if(Msg._handle_list[type]) {
            Msg._handle_list[type].forEach(handle => {
                handle ? handle(arg1, arg2, arg3, arg4, arg5) : null;
            });
        }
    }
};

module.exports = Msg;