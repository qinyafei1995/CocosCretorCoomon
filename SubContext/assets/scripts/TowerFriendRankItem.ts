import ListItem from "./Common/list/ListItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TowerFriendRankItem extends ListItem {
    @property(cc.Label)
    lvLabel: cc.Label = null;

    @property(cc.Label)
    scoreLabel: cc.Label = null;
}
