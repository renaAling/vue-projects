export const RULES = {
    require: {require: true, message: "请输入", trigger: ["blur", "change"]}, //
    tenNumStrChar: {validator: tenNumStr, trigger: ['blur', 'change']},   
}

export const VALIDATION = {
    "ten_num_str": {
        value: /^([A-Za-z0-9]{5,10})$/i,
        label: "仅支持5-10个字符"
    }
}

export function tenNumStr(rule, value, callback) {
    if (value && !VALIDATION.ten_num_str.value.test(value)) {
        callback(new Error(VALIDATION.ten_num_str.label))
    }else {
        callback()
    }
}

