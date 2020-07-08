const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    _dataContext: any = null;

    onLoad () {
        this._dataContext = window["wx"].getOpenDataContext();
        
    }

    inviteOpen() {
        this._dataContext.postMessage({
            msgType: 100,
            msgData: 200,
        })
    }

    inviteClose() {
        this._dataContext.postMessage({
            msgType: 101,
        })
    }

    inviteUpdate() {
        this._dataContext.postMessage({
            msgType: 102,
        })
    }

    overOpen() {
        this._dataContext.postMessage({
            msgType: 300,
        })
    }

    overClose() {
        this._dataContext.postMessage({
            msgType: 301,
        })
    }

    overSetData() {
        this._dataContext.postMessage({
            msgType: 302,
            msgData: 500,
        })
    }

    friendOpen() {
        this._dataContext.postMessage({
            msgType: 200,
        })
    }

    friendClose() {
        this._dataContext.postMessage({
            msgType: 201,
        })
    }

    friendSetData() {
        this._dataContext.postMessage({
            msgType: 202,
            msgData: 500,
        })
    }
}
