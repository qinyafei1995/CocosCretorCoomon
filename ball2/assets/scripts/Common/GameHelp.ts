/**
 * 游戏助手类
 */
export default class GameHelp {
    public static LoadRes(url: string, type: any, cb?: Function) {
        cc.loader.loadRes(url, type, (err: Error, assets: any) => {
            if(!!err) {
                if(err.message && err.message.search(/does not exist/) != -1) {
                    console.error("加载资源不存在 url ==>", url);
                    return;
                }
                this.LoadRes(url, type, cb);
                return;
            }

            cb ? cb(assets) : null;
        });
    }
}
