// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        prefabItem: {
            default: null,
            type: cc.Prefab,
            tooltip: "选项内容"
        },

        _datas:{
            default: [],
            visible: false,
        },

        _maxCount: 1,

        _idx: 0,
        _cells: [cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._datas = [
            {cell1: "1:1", cell2: "1:2"},
            {cell1: "2:1", cell2: "2:2"},
            {cell1: "3:1", cell2: "3:2"},
            {cell1: "4:1", cell2: "4:2"},
            {cell1: "5:1", cell2: "5:2"},
            {cell1: "6:1", cell2: "6:2"},
            {cell1: "7:1", cell2: "7:2"},
            {cell1: "8:1", cell2: "8:2"},
            {cell1: "9:1", cell2: "9:2"},
            {cell1: "10:1", cell2: "10:2"},
            {cell1: "11:1", cell2: "11:2"},
            {cell1: "12:1", cell2: "12:2"},
            {cell1: "13:1", cell2: "13:2"},
            {cell1: "14:1", cell2: "14:2"},
            {cell1: "15:1", cell2: "15:2"},
            {cell1: "16:1", cell2: "16:2"},
            {cell1: "17:1", cell2: "17:2"},
            {cell1: "18:1", cell2: "18:2"},
            {cell1: "19:1", cell2: "19:2"},
            {cell1: "20:1", cell2: "20:2"},
            {cell1: "21:1", cell2: "21:2"},
            {cell1: "22:1", cell2: "22:2"},
            {cell1: "23:1", cell2: "23:2"},
            {cell1: "24:1", cell2: "24:2"},
        ];

        this.pgyInit();
        this.pgyAddPrefab();
        
        this.reload();
    },

    pgyInit(){
        this._scrollView = this.node.getComponent(cc.ScrollView);
        this._itemHeight = this.prefabItem.data.height;
        this._maxCount = Math.floor(this._scrollView.node.height / this._itemHeight) + 2;

        if(this._datas.length > this._maxCount){
            this._scrollView.content.height = this._maxCount * this._itemHeight;
        }
        else{
            this._scrollView.content.height = this._scrollView.node.height;
        }

        this._scrollView.node.on("scrolling", this.onScrolling, this);
        cc.log("max:" + this._maxCount);
    },

    pgyAddPrefab(){
        this._cells = [];
        for(let i = 0; i < this._maxCount; i++){
            let node = cc.instantiate(this.prefabItem);
            this._scrollView.content.addChild(node);
            node.x = node.width * (node.anchorX - 0.5);
            node.y = -node.height * (1 - node.anchorY) - node.height * i;
            this._cells.push(node);
        }
    },

    onScrolling(event){
        let offset = event.getScrollOffset();
        if(offset.y <= 0 && this._idx > 0){
            // 上移一格
            offset.y += this._itemHeight;
            // event.scrollToOffset(offset);

            // 更新数据
            this._idx--;
            cc.log("idx--:" + this._idx);
            this.reload();
        }
        else if(offset.y >= event.getMaxScrollOffset().y && (this._idx < this._datas.length - this._maxCount)){
            // 下移一格
            offset.y -= this._itemHeight;
            // event.scrollToOffset(offset);

            // 更新数据
            this._idx++;
            cc.log("idx++:" + this._idx);
            this.reload();
        }
    },

    reload(){
        for(let i = 0; i < this._cells.length; i++){
            this.reloadCell(this._idx + i, this._cells[i]);
        }
    },

    reloadCell(idx, scrollViewCell){
        if(idx < 0 || idx >= this._datas.length){
            return;
        }

        scrollViewCell.getComponent("pgyScrollViewCell").reload(this._datas[idx]);
    },

    // update (dt) {},
});
