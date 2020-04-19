let LogLv = {
    Online: 999,
    Test: 1,
}

let LogMng = {
    log(lv_, title_, content_) {
        if (lv_ >= LogLv.Online) {
            console.log('online log =>' + title_, content_);
        } else {
            console.log('test log =>' + title_, content_);
        }
    },
}

module.exports = {
    LogLv: LogLv,
    LogMng: LogMng,
}
