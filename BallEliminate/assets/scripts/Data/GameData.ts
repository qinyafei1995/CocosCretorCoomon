// 游戏数据

export default class GameData {
    // 关卡
    private static _curGateLv: number = 1;
    static set curGateLv(v: number) {
        GameData._curGateLv = v;
    }
    static get curGateLv(): number {
        return GameData._curGateLv;
    }


    // 当前关卡球       index => 0 为蓝球
    //                 index => 1 为红球
    //                 index => 2 障碍物
    static curGateBall: Array<number> = [0,0,0];

    // 射击容器 [[颜色,技能]] 例子:[[1,1]]
    static shootContainer: Array<Array<number>> = [];  

    // container     容器
    // bout          回合 
}
