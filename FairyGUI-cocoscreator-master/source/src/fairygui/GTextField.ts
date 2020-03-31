
namespace fgui {

    export class GTextField extends GObject {
        public _label: cc.Label;

        protected _font: string;
        protected _realFont: string | cc.Font;
        protected _fontSize: number = 0;
        protected _color: cc.Color;
        protected _strokeColor: cc.Color;
        protected _leading: number = 0;
        protected _text: string;
        protected _ubbEnabled: boolean;
        protected _templateVars: any;
        protected _autoSize: AutoSizeType;
        protected _updatingSize: boolean;
        protected _sizeDirty: boolean;
        protected _outline: cc.LabelOutline;

        public constructor() {
            super();

            this._node.name = "GTextField";
            this._touchDisabled = true;

            this._text = "";
            this._color = cc.Color.WHITE;
            this._strokeColor = cc.Color.BLACK;
            this._templateVars = null;

            this.createRenderer();

            this.fontSize = 12;
            this.leading = 3;
            this.singleLine = false;

            this._sizeDirty = false;

            this._node.on(cc.Node.EventType.SIZE_CHANGED, this.onLabelSizeChanged, this);
        }

        protected createRenderer() {
            this._label = this._node.addComponent(cc.Label);
            this.autoSize = AutoSizeType.Both;
        }

        public set text(value: string) {
            this._text = value;
            if (this._text == null)
                this._text = "";
            this.updateGear(6);

            this.markSizeChanged();
            this.updateText();
        }

        public get text(): string {
            return this._text;
        }

        public get font(): string {
            return this._font;
        }

        public set font(value: string) {
            if (this._font != value || !value) {
                this._font = value;

                this.markSizeChanged();

                let newFont: any = value ? value : UIConfig.defaultFont;

                if (ToolSet.startsWith(newFont, "ui://")) {
                    var pi: PackageItem = UIPackage.getItemByURL(newFont);
                    if (pi)
                        newFont = <cc.Font>pi.owner.getItemAsset(pi);
                    else
                        newFont = UIConfig.defaultFont;
                }
                this._realFont = newFont;
                this.updateFont();
            }
        }

        public get fontSize(): number {
            return this._fontSize;
        }

        public set fontSize(value: number) {
            if (value < 0)
                return;

            if (this._fontSize != value) {
                this._fontSize = value;

                this.markSizeChanged();
                this.updateFontSize();
            }
        }

        public get color(): cc.Color {
            return this._color;
        }

        public set color(value: cc.Color) {
            if (this._color != value) {
                this._color = value;
                this.updateGear(4);

                this.updateFontColor();
            }
        }

        public get align(): cc.Label.HorizontalAlign {
            return this._label.horizontalAlign;
        }

        public set align(value: cc.Label.HorizontalAlign) {
            this._label.horizontalAlign = value;
        }

        public get verticalAlign(): cc.Label.VerticalAlign {
            return this._label.verticalAlign;
        }

        public set verticalAlign(value: cc.Label.VerticalAlign) {
            this._label.verticalAlign = value;
        }

        public get leading(): number {
            return this._leading;
        }

        public set leading(value: number) {
            if (this._leading != value) {
                this._leading = value;

                this.markSizeChanged();
                this.updateFontSize();
            }
        }

        public get letterSpacing(): number {
            return this._label["spacingX"];
        }

        public set letterSpacing(value: number) {
            if (this._label["spacingX"] != value) {

                this.markSizeChanged();
                this._label["spacingX"] = value;
            }
        }

        public get underline(): boolean {
            return false
        }

        public set underline(value: boolean) {
        }

        public get bold(): boolean {
            return false;
        }

        public set bold(value: boolean) {
        }

        public get italic(): boolean {
            return false;
        }

        public set italic(value: boolean) {
        }

        public get singleLine(): boolean {
            return !this._label.enableWrapText;
        }

        public set singleLine(value: boolean) {
            this._label.enableWrapText = !value;
        }

        public get stroke(): number {
            return (this._outline && this._outline.enabled) ? this._outline.width : 0;
        }

        public set stroke(value: number) {
            if (value == 0) {
                if (this._outline)
                    this._outline.enabled = false;
            }
            else {
                if (!this._outline) {
                    this._outline = this._node.addComponent(cc.LabelOutline);
                    this.updateStrokeColor();
                }
                else
                    this._outline.enabled = true;
                this._outline.width = value;
            }
        }

        public get strokeColor(): cc.Color {
            return this._strokeColor;
        }

        public set strokeColor(value: cc.Color) {
            if (this._strokeColor != value) {
                this._strokeColor = value;
                this.updateGear(4);
                this.updateStrokeColor();
            }
        }

        public set ubbEnabled(value: boolean) {
            if (this._ubbEnabled != value) {
                this._ubbEnabled = value;

                this.markSizeChanged();
                this.updateText();
            }
        }

        public get ubbEnabled(): boolean {
            return this._ubbEnabled;
        }

        public set autoSize(value: AutoSizeType) {
            if (this._autoSize != value) {
                this._autoSize = value;

                this.markSizeChanged();
                this.updateOverflow();
            }
        }

        public get autoSize(): AutoSizeType {
            return this._autoSize;
        }

        protected parseTemplate(template: string): string {
            var pos1: number = 0, pos2: number, pos3: number;
            var tag: string;
            var value: string;
            var result: string = "";
            while ((pos2 = template.indexOf("{", pos1)) != -1) {
                if (pos2 > 0 && template.charCodeAt(pos2 - 1) == 92)//\
                {
                    result += template.substring(pos1, pos2 - 1);
                    result += "{";
                    pos1 = pos2 + 1;
                    continue;
                }

                result += template.substring(pos1, pos2);
                pos1 = pos2;
                pos2 = template.indexOf("}", pos1);
                if (pos2 == -1)
                    break;

                if (pos2 == pos1 + 1) {
                    result += template.substr(pos1, 2);
                    pos1 = pos2 + 1;
                    continue;
                }

                tag = template.substring(pos1 + 1, pos2);
                pos3 = tag.indexOf("=");
                if (pos3 != -1) {
                    value = this._templateVars[tag.substring(0, pos3)];
                    if (value == null)
                        result += tag.substring(pos3 + 1);
                    else
                        result += value;
                }
                else {
                    value = this._templateVars[tag];
                    if (value != null)
                        result += value;
                }
                pos1 = pos2 + 1;
            }

            if (pos1 < template.length)
                result += template.substr(pos1);

            return result;
        }

        public get templateVars(): any {
            return this._templateVars;
        }

        public set templateVars(value: any) {
            if (this._templateVars == null && value == null)
                return;

            this._templateVars = value;
            this.flushVars();
        }

        public setVar(name: string, value: string): GTextField {
            if (!this._templateVars)
                this._templateVars = {};
            this._templateVars[name] = value;

            return this;
        }

        public flushVars(): void {
            this.markSizeChanged();
            this.updateText();
        }

        public get textWidth(): number {
            this.ensureSizeCorrect();

            return this._node.width;
        }

        public ensureSizeCorrect(): void {
            if (this._sizeDirty) {
                if (this._label["_forceUpdateRenderData"]) //2.1 above
                    this._label["_forceUpdateRenderData"]();
                else
                    this._label["_updateRenderData"](true);
                this._sizeDirty = false;
            }
        }

        protected updateText(): void {
            var text2: string = this._text;
            if (this._templateVars != null)
                text2 = this.parseTemplate(text2);

            if (this._ubbEnabled) //不支持同一个文本不同样式
                text2 = UBBParser.inst.parse(ToolSet.encodeHTML(text2), true);

            this._label.string = text2;
        }

        protected assignFont(label: any, value: string | cc.Font): void {
            if (value instanceof cc.Font)
                label.font = value;
            else {
                let font = getFontByName(<string>value);
                if (!font) {
                    label.fontFamily = <string>value;
                    label.useSystemFont = true;
                }
                else
                    label.font = font;
            }
        }

        protected assignFontColor(label: any, value: cc.Color): void {
            let font: any = label.font;
            if ((font instanceof cc.BitmapFont) && !((<any>font)._fntConfig.canTint))
                value = cc.Color.WHITE;

            if (this._grayed)
                value = ToolSet.toGrayed(value);
            label.node.color = value;
        }

        protected updateFont() {
            this.assignFont(this._label, this._realFont);
        }

        protected updateFontColor() {
            this.assignFontColor(this._label, this._color);
        }

        protected updateStrokeColor() {
            if (!this._outline)
                return;
            if (this._grayed)
                this._outline.color = ToolSet.toGrayed(this._strokeColor)
            else
                this._outline.color = this._strokeColor;
        }

        protected updateFontSize() {
            let font: any = this._label.font;
            if (font instanceof cc.BitmapFont) {
                let fntConfig = (<any>font)._fntConfig;
                if (fntConfig.resizable)
                    this._label.fontSize = this._fontSize;
                else
                    this._label.fontSize = fntConfig.fontSize;
                this._label.lineHeight = fntConfig.fontSize + (this._leading + 4) * fntConfig.fontSize / this._label.fontSize;
            }
            else {
                this._label.fontSize = this._fontSize;
                this._label.lineHeight = this._fontSize + this._leading;
            }
        }

        protected updateOverflow() {
            if (this._autoSize == AutoSizeType.Both)
                this._label.overflow = cc.Label.Overflow.NONE;
            else if (this._autoSize == AutoSizeType.Height) {
                this._label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
                this._node.width = this._width;
            }
            else if (this._autoSize == AutoSizeType.Shrink) {
                this._label.overflow = cc.Label.Overflow.SHRINK;
                this._node.setContentSize(this._width, this._height);
            }
            else {
                this._label.overflow = cc.Label.Overflow.CLAMP;
                this._node.setContentSize(this._width, this._height);
            }
        }

        protected markSizeChanged(): void {
            if (this._underConstruct)
                return;

            if (this._autoSize == AutoSizeType.Both || this._autoSize == AutoSizeType.Height) {
                if (!this._sizeDirty) {
                    this._node.emit(Event.SIZE_DELAY_CHANGE, this);
                    this._sizeDirty = true;
                }
            }
        }

        protected onLabelSizeChanged(): void {
            this._sizeDirty = false;

            if (this._underConstruct)
                return;

            if (this._autoSize == AutoSizeType.Both || this._autoSize == AutoSizeType.Height) {
                this._updatingSize = true;
                this.setSize(this._node.width, this._node.height);
                this._updatingSize = false;
            }
        }

        protected handleSizeChanged(): void {
            if (this._updatingSize)
                return;

            if (this._autoSize == AutoSizeType.None || this._autoSize == AutoSizeType.Shrink) {
                this._node.setContentSize(this._width, this._height);
            }
            else if (this._autoSize == AutoSizeType.Height)
                this._node.width = this._width;
        }

        protected handleGrayedChanged(): void {
            this.updateFontColor();
            this.updateStrokeColor();
        }

        public getProp(index: number): any {
            switch (index) {
                case ObjectPropID.Color:
                    return this.color;
                case ObjectPropID.OutlineColor:
                    return this.strokeColor;
                case ObjectPropID.FontSize:
                    return this.fontSize;
                default:
                    return super.getProp(index);
            }
        }

        public setProp(index: number, value: any): void {
            switch (index) {
                case ObjectPropID.Color:
                    this.color = value;
                    break;
                case ObjectPropID.OutlineColor:
                    this.strokeColor = value;
                    break;
                case ObjectPropID.FontSize:
                    this.fontSize = value;
                    break;
                default:
                    super.setProp(index, value);
                    break;
            }
        }

        public setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void {
            super.setup_beforeAdd(buffer, beginPos);

            buffer.seek(beginPos, 5);

            this.font = buffer.readS();
            this.fontSize = buffer.readShort();
            this.color = buffer.readColor();
            this.align = buffer.readByte();
            this.verticalAlign = buffer.readByte();
            this.leading = buffer.readShort();
            this.letterSpacing = buffer.readShort();
            this._ubbEnabled = buffer.readBool();
            this.autoSize = buffer.readByte();
            this.underline = buffer.readBool();
            this.italic = buffer.readBool();
            this.bold = buffer.readBool();
            this.singleLine = buffer.readBool();
            if (buffer.readBool()) {
                this.strokeColor = buffer.readColor();
                this.stroke = buffer.readFloat();
            }

            if (buffer.readBool()) //shadow
                buffer.skip(12);

            if (buffer.readBool())
                this._templateVars = {};
        }

        public setup_afterAdd(buffer: ByteBuffer, beginPos: number): void {
            super.setup_afterAdd(buffer, beginPos);

            buffer.seek(beginPos, 6);

            var str: string = buffer.readS();
            if (str != null)
                this.text = str;
        }
    }
}