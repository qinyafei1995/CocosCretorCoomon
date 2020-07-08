/**
 * 排行榜助手类
 * 与wechat搭配使用
 * @author  Qin
 * Date:2020-6-11
 */ 
export default class RankTools {
    private static instance: RankTools;
    public static getInstance(): RankTools
    {
        if (!this.instance) {
            this.instance = new RankTools();
        }
        return this.instance;
    }


    // 好友排行
    

    // 结束排行榜





}
