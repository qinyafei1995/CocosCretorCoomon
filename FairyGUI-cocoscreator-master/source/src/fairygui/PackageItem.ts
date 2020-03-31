
namespace fgui {

    export class PackageItem {
        public owner: UIPackage;

        public type: PackageItemType;
        public objectType: ObjectType;
        public id: string;
        public name: string;
        public width: number = 0;
        public height: number = 0;
        public file: string;
        public decoded: boolean;
        public rawData: ByteBuffer;
        public asset: cc.Texture2D | cc.SpriteFrame | cc.AudioClip | cc.LabelAtlas;

        public highResolution: Array<string>;
        public branches: Array<string>;

        //image
        public scale9Grid: cc.Rect;
        public scaleByTile: boolean;
        public tileGridIndice: number = 0;
        public smoothing: boolean;
        public hitTestData: PixelHitTestData;

        //movieclip
        public interval: number = 0;
        public repeatDelay: number = 0;
        public swing: boolean;
        public frames: Array<Frame>;

        //componenet
        public extensionType: any;

        public constructor() {
        }

        public load(): any {
            return this.owner.getItemAsset(this);
        }

        public getBranch(): PackageItem {
            if (this.branches && this.owner._branchIndex != -1) {
                var itemId: string = this.branches[this.owner._branchIndex];
                if (itemId)
                    return this.owner.getItemById(itemId);
            }

            return this;
        }

        public getHighResolution(): PackageItem {
            if (this.highResolution && GRoot.contentScaleLevel > 0) {
                var itemId: string = this.highResolution[GRoot.contentScaleLevel - 1];
                if (itemId)
                    return this.owner.getItemById(itemId);
            }

            return this;
        }

        public toString(): string {
            return this.name;
        }
    }
}