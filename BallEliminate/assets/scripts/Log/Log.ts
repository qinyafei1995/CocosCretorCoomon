import { LogConfig } from "./LogConfig";

export default class Log {
    /**
     * 打印
     * @param logLv log等级
     * @param configKey 成员代号
     * @param param 参数
     */
    public static log(logLv: number = 1, configKey: string, ...param: any) {
        let config = null;
        if (configKey) {
            if (Object.prototype.hasOwnProperty.call(LogConfig.member, configKey)) {
                config = LogConfig.member[configKey];
            }
        }
        
        if (config && config.isOpen && logLv >= LogConfig.logMinLv) {
            console.log(configKey, param);
        }
    }   

    /**
     * 错误
     * @param param 参数
     */
    public static error(...param: any) {
        console.error(param);
    }
}
