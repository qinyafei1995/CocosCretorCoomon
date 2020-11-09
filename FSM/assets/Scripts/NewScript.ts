const {ccclass, property} = cc._decorator;

@ccclass
export default class FSM {
    // 定义状态
    // 每个[]使用 [当前状态, 输入字符, 下个状态] 来表示
    private transGraph: Array<Object> = [
        [1, "a", 2],
    ]

    /***
     * 回到初始状态
     */
    public reset() {
        
    }

    /**
     * 过度到的状态
     * @param char 切换状态使用的字符
     */
    public advance(char: string = "") {

    }

    public endState() {

    }

    public doomState() {

    }
}
