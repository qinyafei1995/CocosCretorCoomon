
namespace fgui {

    export class GMovieClip extends GObject {
        public _content: MovieClip;

        public constructor() {
            super();

            this._node.name = "GMovieClip";
            this._touchDisabled = true;
            this._content = this._node.addComponent(MovieClip);
        }

        public get color(): cc.Color {
            return cc.Color.WHITE;
        }

        public set color(value: cc.Color) {
            if (this._node.color != value) {
                this._node.color = value;
                this.updateGear(4);
            }
        }

        public get playing(): boolean {
            return this._content.playing;
        }

        public set playing(value: boolean) {
            if (this._content.playing != value) {
                this._content.playing = value;
                this.updateGear(5);
            }
        }

        public get frame(): number {
            return this._content.frame;
        }

        public set frame(value: number) {
            if (this._content.frame != value) {
                this._content.frame = value;
                this.updateGear(5);
            }
        }

        public get timeScale(): number {
            return this._content.timeScale;
        }

        public set timeScale(value: number) {
            this._content.timeScale = value;
        }

        public rewind(): void {
            this._content.rewind();
        }

        public syncStatus(anotherMc: GMovieClip): void {
            this._content.syncStatus(anotherMc._content);
        }

        public advance(timeInMiniseconds: number): void {
            this._content.advance(timeInMiniseconds);
        }

        //从start帧开始，播放到end帧（-1表示结尾），重复times次（0表示无限循环），循环结束后，停止在endAt帧（-1表示参数end）
        public setPlaySettings(start?: number, end?: number, times?: number, endAt?: number, endCallback?: Function, callbackObj?: any): void {
            this._content.setPlaySettings(start, end, times, endAt, endCallback, callbackObj);
        }

        protected handleGrayedChanged(): void {
            this._content.grayed = this._grayed;
        }

        public getProp(index: number): any {
            switch (index) {
                case ObjectPropID.Color:
                    return this.color;
                case ObjectPropID.Playing:
                    return this.playing;
                case ObjectPropID.Frame:
                    return this.frame;
                case ObjectPropID.TimeScale:
                    return this.timeScale;
                default:
                    return super.getProp(index);
            }
        }

        public setProp(index: number, value: any): void {
            switch (index) {
                case ObjectPropID.Color:
                    this.color = value;
                    break;
                case ObjectPropID.Playing:
                    this.playing = value;
                    break;
                case ObjectPropID.Frame:
                    this.frame = value;
                    break;
                case ObjectPropID.TimeScale:
                    this.timeScale = value;
                    break;
                case ObjectPropID.DeltaTime:
                    this.advance(value);
                    break;
                default:
                    super.setProp(index, value);
                    break;
            }
        }

        public constructFromResource(): void {
            var contentItem: PackageItem = this.packageItem.getBranch();
            this.sourceWidth = contentItem.width;
            this.sourceHeight = contentItem.height;
            this.initWidth = this.sourceWidth;
            this.initHeight = this.sourceHeight;

            this.setSize(this.sourceWidth, this.sourceHeight);

            contentItem = contentItem.getHighResolution();
            contentItem.load();

            this._content.interval = contentItem.interval;
            this._content.swing = contentItem.swing;
            this._content.repeatDelay = contentItem.repeatDelay;
            this._content.frames = contentItem.frames;
            this._content.smoothing = contentItem.smoothing;
        }

        public setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void {
            super.setup_beforeAdd(buffer, beginPos);

            buffer.seek(beginPos, 5);

            if (buffer.readBool())
                this.color = buffer.readColor();
            buffer.readByte(); //flip
            this._content.frame = buffer.readInt();
            this._content.playing = buffer.readBool();
        }
    }
}