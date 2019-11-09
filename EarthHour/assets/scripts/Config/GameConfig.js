// 子弹配置
let bulletConfig = {
    general: {                      // 普通子弹
        attack: 1,                  // 攻击力
        speed: 130,                 // 移动速度
    },

    seckill: {                      // 穿透(秒杀)
        attack: 9999,               // 攻击力
        speed: 130,                 // 移动速度
    },
}

// 武器配置
let weaponConfig = {
    general: {                      // 普通武器
        isContinuous: false,        // 连续发射
        interval: 0,                // 发射间隔时间
    },

    continuous: {                   // 机枪(连续)
        isContinuous: false,        // 连续发射
        interval: 0,                // 发射间隔时间
    },
}

// 转盘配置
let turntableConfig = {
    round: 0                        // 圆行
}

// 转盘元素
let turntableItem = {
    item1: {                        
        name: '',
        hp: 0,
    },

    item2: {
        name: '',
        hp: 0,
    },

    item3: {
        name: '',
        hp: 0,
    },

    item4: {
        name: '',
        hp: 0,
    },

    item5: {
        name: '',
        hp: 0,
    },
}

// 关卡类型
let CustomsType = {
    general: 0,                 // 普通关卡
    infinite: 1                 // 无限火力
}
