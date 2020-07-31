import { Identity } from "../component/IdentityConfig";
import GameData from "./GameData";
import Msg from "../common/Msg";

/**
 * GameData助手
 */
export default class GameDataHelp {
    /**
     * 添加当前关卡球统计中, 球的数据
     * @param id 身份
     */
    static addCurGateBall(id: number) {
        switch (id) {
            case Identity.blue:
                GameData.curGateBall[0] += 1;
                break;

            case Identity.red:
                GameData.curGateBall[1] += 1;
                break;

            case Identity.gray:
                GameData.curGateBall[2] += 1;
                break;

            default:
                break;
        }
    }

    /**
     * 减少当前关卡球统计中, 球的数据
     * @param id 身份
     */
    static subCurGateBall(id: number) {
        switch (id) {
            case Identity.blue:
                GameData.curGateBall[0] -= 1;
                break;

            case Identity.red:
                GameData.curGateBall[1] -= 1;
                break;

            case Identity.gray:
                GameData.curGateBall[2] -= 1;
                break;

            default:
                break;
        }

        // if (GameData.curGateBall[0] == 0) {
        //     // 创建球的消息
        //     Msg.emit("fight-container-creator");
        // } 
    }
}
