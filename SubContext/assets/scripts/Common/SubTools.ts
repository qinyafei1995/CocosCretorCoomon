const {ccclass, property} = cc._decorator;

@ccclass
export default class SubTools {
    /**
     * 设置托管数据
     * @param key_ 托管Key值
     * @param value_ 数据
     * @param cb 完成回调
     */
    public static setUserCloudStorage(key_: string, value_: string, cb: Function) {
        window["wx"].setUserCloudStorage({
            KVDataList: [{ key: key_, value: value_}],
            success: function (res) {
                console.log('托管数据成功,key为:', key_, '数据vakue为:', value_);
                if (typeof cb == "function") {
                    cb(res);
                }
            },
            fail: function (res) {
            },
            complete: function (res) {

            }
        });
    }

    /**
     * 设置排行榜更新时间锉
     * @param key 当前榜Key值
     */
    public static setUserCloudUpdateTime(key: string) {
        let updateTime = new Date().valueOf().toString();
        key += "_UpdateTime";
        this.setUserCloudStorage(key, updateTime, () => {
            console.log("设置排行榜时间锉成功", "key==>", key, "时间锉===>", updateTime);
        });
    }

    /**
     * 获取当前用户托管数据
     * @param key_ 排行榜Key值
     * @param cb 
     */
    public static getUserCloudStorage(key_: string, cb: Function) {
        window["wx"].getUserCloudStorage({
            // 以key/value形式存储
            keyList: [key_],
            success: function (getres) {
                if (typeof cb == "function") {
                    cb(getres);
                }
                console.log('托管数据获取成功, key为:', key_);
            },

            fail: function (res) {
            },

            complete: function (res) {
            }
        });
    }

    /**
     * 获取好友的托管数据
     * @param key_ 排行榜Key
     * @param cb 
     */
    public static getFriendCloudStorage(key_: string, cb: Function) {
        window["wx"].getFriendCloudStorage({
            keyList: [key_],
            success: res => {
                let data = res.data;
                data.sort((a, b) => {
                    if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                        return 0;
                    }
                    if (a.KVDataList.length == 0) {
                        return 1;
                    }
                    if (b.KVDataList.length == 0) {
                        return -1;
                    }
                    return b.KVDataList[0].value - a.KVDataList[0].value;
                });
                console.log('获取key为:', key_, '的好友数据==>', data);

                let data2 = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].KVDataList[0]) {
                        if (!!data[i].KVDataList[0].value) {
                            data2.push(data[i])
                        }
                    }
                }
                // console.log('好友数据 2次筛选', data2);

                if (typeof cb == 'function') {
                    cb(data2);
                }
            },
            fail: res => {
            },
        });
    }

    
    /**
     * 删 托管数据
     * @param key_ 
     * @param cb 
     */
    public static removeUserCloudStorage (key_: string, cb: Function) {
        window["wx"].removeUserCloudStorage({
            keyList: [key_],
            success: res => {
                if (typeof cb == 'function') {
                    cb();
                }
                console.log('移除托管数据, key为:' + key_);
            },
            fail: res => {
            },
        })
    }

    /**
     * 查 自身信息
     * @param cb 完成回调
     */
    public static getUserInfo (cb: Function) {
        window["wx"].getUserInfo({
            openIdList: ['selfOpenId'],
            success: function (res) {
                // if (res.errMsg()) 
                cb(res.data[0]);
            }
        })
    }

    /**
     * 获取好友列表(5个)
     * @param cb 
     */
    public static getFriendList (cb: Function) {
        window["wx"].getPotentialFriendList({
            success: (res) => {
                console.log("获取好友列表", res.list);
                if (typeof cb == "function") {
                    cb(res.list);
                }
            },

            fail: res => {
                console.error("获取好友数据失败====>", res);
            },
        });
    }

    // 加载图片
    public static loadTexture (node: cc.Node, url: string) {
        let _node = node;
        if (typeof(url) == "string" && url) {
            let _url = url;
            cc.loader.load({ url: _url, type: 'png' }, (err, tex) => {
                if (!err) {
                    if (!node || !node.parent || !node.isValid) {
                        return
                    }
                    let sp = new cc.SpriteFrame(tex);
                    _node ? _node.getComponent(cc.Sprite).spriteFrame = sp : null;
                }
            })
        } else {
            console.error("没有获取到好友头像地址", url);
            _node.getComponent(cc.Sprite).spriteFrame = null;
        }    
    }
}
