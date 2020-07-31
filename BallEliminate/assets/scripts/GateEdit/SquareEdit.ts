// 方形区域内点随机

import Log from "../Log/Log";
import GateEditBase from "./GateEditBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SquareEdit extends GateEditBase {

    // 随机范围列表
    _randomSpaceList: Array<any> = new Array<any>();

    // 范围内的个数
    _spaceNumList: Array<any> = new Array<any>();

    _graphics: cc.Graphics = null;

    init() {
        super.init();
        this._graphics = this.node.getComponent(cc.Graphics);

        this.countAllRandomSpace();
        this.countAllSpaceNum();
        this.countAllPos();
    }

    /**
     * 根据节点计算随机范围
     * @param area 范围节点
     */
    private countRandmoSpace(areaNode: cc.Node) {
        let halfW = areaNode.width / 2;
        let halfH = areaNode.height / 2;
        return {
            lu: cc.v2(areaNode.x - halfW, areaNode.y + halfH),
            ld: cc.v2(areaNode.x - halfW, areaNode.y - halfH),
            ru: cc.v2(areaNode.x + halfW, areaNode.y + halfH),
            rd: cc.v2(areaNode.x + halfW, areaNode.y - halfH)
        }
    }

    /**
    * 计算面积
    * @param areaNode 面积节点
    */
    private countArea(areaNode: cc.Node) {
        return areaNode.width * areaNode.height;
    }

    /**
     * 计算所有随机范围
     */
    private countAllRandomSpace() {
        for (let i = 0; i < this.node.children.length; i++) {
            let item = this.node.children[i];
            let spaceData: any = this.countRandmoSpace(item);
            this._randomSpaceList.push(spaceData);
        }
    }

    /**
     * 计算范围内的个数
     */
    private countAllSpaceNum() {
        // 总面积
        let allArea: number = 0;
        // 面积
        let areaList: Array<number> = [];
        // 权重
        let weightsList: Array<number> = [];
        for (let index = 0; index < this.node.children.length; index++) {
            let area: number = this.countArea(this.node.children[index]);
            areaList.push(area);
            allArea += area;
        }

        // 根据面积计算权重
        for (let a = 0; a < areaList.length; a++) {
            let weight: number = areaList[a] / allArea;
            weightsList[a] = weight;
        }

        // 计算区域内球的个数
        let numArr: Array<number> = [];
        let allNum: number = 0;
        for (let v = 0; v < weightsList.length; v++) {
            let m = (weightsList[v] * this._allBallNum).toString().split(".");
            numArr[v] = parseInt(m[0]);
            allNum += numArr[v];
        }

        if (allNum < this._allBallNum) {
            for (let i = 0; i < this._allBallNum - allNum; i++) {
                numArr[i] += 1;
            }
        }

        this._spaceNumList = numArr;
    }

    /**
     * 计算所有位置
     */
    private countAllPos() {
        for (let index: number = 0; index < this._spaceNumList.length; index++) {
            for (let v: number = 0; v < this._spaceNumList[index]; v++) {
                let data: object = this._randomSpaceList[index];
                let randomGridX: number = 0 + Math.floor(Math.random() * this.countGridNum(data).xNum);
                let randomGridY: number = 0 + Math.floor(Math.random() * this.countGridNum(data).yNum);
                let ballUnit: cc.Vec2 = cc.v2(randomGridX * this.ballR * 2, randomGridY * this.ballR * 2);
                let ballSpaceRandom: cc.Vec2 = this.getBallSpaceRandom();
                let pos: cc.Vec2 = cc.v2(data["lu"].x + ballUnit.x + ballSpaceRandom.x, data["lu"].y - ballUnit.y + ballSpaceRandom.y);
                this._posList.push(pos);
            }
        }

        // this.test();
    }

    /**
     * 计算格子数量
     * @param spaceData 范围数据
     */
    private countGridNum(spaceData: any) {
        let xSpace: number = spaceData["ru"].x - spaceData["lu"].x;
        let ySpace: number = spaceData["lu"].y - spaceData["ld"].y;

        let xNum: number = Math.floor(xSpace / (this.ballR * 2)) + 1;
        let yNum: number = Math.floor(ySpace / (this.ballR * 2)) + 1;

        return {
            xNum: xNum,
            yNum: yNum
        };
    }

    /**
     * 球的范围随机
     */
    private getBallSpaceRandom() {
        let xIsPlus = Math.random() > 0.5 ? 1 : -1 ;
        let yIsPlus = Math.random() > 0.5 ? 1 : -1 ;
        let x: number = Math.floor(Math.random() * this.ballR) * xIsPlus;
        let y: number = Math.floor(Math.random() * this.ballR) * yIsPlus;
        return cc.v2(x,y);
    }


    private test() {
        Log.log(1, "q", this._randomSpaceList);

        for (let index = 0; index < this._randomSpaceList.length; index++) {
            let data: any = this._randomSpaceList[index];
            let xyData: any = this.countGridNum(data);
            let xNum: number = xyData.xNum;
            let yNum: number = xyData.yNum;
            
            for (let x = 0; x < xNum; x++) {
                for (let y = 0; y < yNum; y++) {
                    let pos: cc.Vec2 = cc.v2(data["lu"].x + x * this.ballR * 2, data["lu"].y - y * this.ballR * 2);
                    this._graphics.circle(pos.x, pos.y, 15);
                    this._graphics.fill();
                }
            }

        }
    }
}
