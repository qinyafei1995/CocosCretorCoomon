
export default class Msg{

    private static _handle_list: any = {};
    private static _once_handle_list: any = {};
    private static _check_msg_list: any = {};

    static on(type: string, handle: Function, obj?: any) :number {
        this._handle_list[type] = this._handle_list[type] || [];
        // handle = obj ? handle.bind(obj) : handle;
        // 先判断 是否有空的 位置
        for(let i = 0; i < this._handle_list[type].length; i++) {
            if(!this._handle_list[type][i]) {
                this._handle_list[type][i] = handle;
                return i;
            }
        }

        this._handle_list[type].push({
            func: handle,
            obj: obj,
        });
        return this._handle_list[type].length - 1;
    }

    static once(type: string, handle: Function, obj?: any): void {
        this._once_handle_list[type] = this._once_handle_list[type] || [];
        handle = obj ? handle.bind(obj) : handle;
        this._once_handle_list[type].push(handle);
    }

    static checkMsg(type: string, handle: Function, obj?: any): void {
        handle = obj ? handle.bind(obj) : handle;
        this._check_msg_list[type] = handle;
    }

    static off(type: string, id?: number) {
        if(id || id == 0) {
            if (this._handle_list[type]) {
                this._handle_list[type][id] = null;
            }
            return;
        }

        if(!!this._handle_list[type]) {
            delete this._handle_list[type];
        } else {
            for(let key in this._handle_list) {
                if(key.search(type) != -1) {
                    if(id || id == 0) {
                        if(this._handle_list[type]) {
                            this._handle_list[type][id] = null;
                        }
                    } else {
                        delete this._handle_list[key];
                    }
                }
            }
        }
    }

    static off2(type: string, handle: Function, obj?: any) {
        let handle_list = this._handle_list[type];

        if(!handle_list) return;
        handle_list.forEach((item: any, index: number) => {
            if(item && item.func && handle) {
                if(item.func == handle) {
                    this.off(type, index);
                } else if(item.obj == obj && item.func == handle) {
                    this.off(type, index);
                }
            }
        })
    }

    static emit(type: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) {
        
        if(this._check_msg_list[type]) {
            if(this._check_msg_list[type](arg1, arg2, arg3, arg4, arg5)) {
                // this._check_msg_list[type] = null;
                return;
            }
            // this._check_msg_list[type] = null;
        }

        if(this._once_handle_list[type]) {
            this._once_handle_list[type].forEach((handle: (arg0: any, arg1: any, arg2: any, arg3: any, arg4: any) => any) => {
                handle ? handle(arg1, arg2, arg3, arg4, arg5) : null;
            });
            this._once_handle_list[type] = [];
        }
        
        if(this._handle_list[type]) {
            this._handle_list[type].forEach((item: any) => {
                if(item && item.func) {
                    if(item.obj) {
                        item.func.call(item.obj, arg1, arg2, arg3, arg4, arg5)
                    } else {
                        item.func(arg1, arg2, arg3, arg4, arg5);
                    }
                }
            });
        }
        
    }
}
