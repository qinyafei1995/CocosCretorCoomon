// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ComBase from "./ComBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PoolCom extends ComBase {
    init() {
        
        return this;
    }
}
