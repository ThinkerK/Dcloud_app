
export function dateFormat(dateTime) {
    var formatStr = '{Y}-{MM}-{DD}'
    let parseNumber = function(num) {
        return num < 10 ? "0" + num : num;
    };
    let dateObj = {};
    let rStr = /\{([^}]+)\}/;
    let mons = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    dateObj["Y"] = dateTime.getFullYear();
    dateObj["M"] = dateTime.getMonth() + 1;
    dateObj["MM"] = parseNumber(dateObj["M"]);
    dateObj["Mon"] = mons[dateObj['M'] - 1];
    dateObj["D"] = dateTime.getDate();
    dateObj["DD"] = parseNumber(dateObj["D"]);
    dateObj["h"] = dateTime.getHours();
    dateObj["hh"] = parseNumber(dateObj["h"]);
    dateObj["t"] = dateObj["h"] > 12 ? dateObj["h"] - 12 : dateObj["h"];
    dateObj["tt"] = parseNumber(dateObj["t"]);
    dateObj["A"] = dateObj["h"] > 12 ? '下午' : '上午';
    dateObj["i"] = dateTime.getMinutes();
    dateObj["ii"] = parseNumber(dateObj["i"]);
    dateObj["s"] = dateTime.getSeconds();
    dateObj["ss"] = parseNumber(dateObj["s"]);
    while(rStr.test(formatStr)){
        formatStr = formatStr.replace(rStr, dateObj[RegExp.$1]);
    }
    return formatStr;
}
export function hoursFormat(dateTime,formatStr) {
    var formatStr = formatStr
    let parseNumber = function(num) {
        return num < 10 ? "0" + num : num;
    };
    let dateObj = {};
    let rStr = /\{([^}]+)\}/;
    let mons = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    dateObj["Y"] = dateTime.getFullYear();
    dateObj["M"] = dateTime.getMonth() + 1;
    dateObj["MM"] = parseNumber(dateObj["M"]);
    dateObj["Mon"] = mons[dateObj['M'] - 1];
    dateObj["D"] = dateTime.getDate();
    dateObj["DD"] = parseNumber(dateObj["D"]);
    dateObj["h"] = dateTime.getHours();
    dateObj["hh"] = parseNumber(dateObj["h"]);
    dateObj["t"] = dateObj["h"] > 12 ? dateObj["h"] - 12 : dateObj["h"];
    dateObj["tt"] = parseNumber(dateObj["t"]);
    dateObj["A"] = dateObj["h"] > 12 ? '下午' : '上午';
    dateObj["i"] = dateTime.getMinutes();
    dateObj["ii"] = parseNumber(dateObj["i"]);
    dateObj["s"] = dateTime.getSeconds();
    dateObj["ss"] = parseNumber(dateObj["s"]);
    while(rStr.test(formatStr)){
        formatStr = formatStr.replace(rStr, dateObj[RegExp.$1]);
    }
    return formatStr;
}
export function getFirstDayOfMonth () {
    var date = new Date();
    date.setDate(1);
    return date
}

export function getFirstDayOfYear () {
    var date = new Date();
    date.setDate(1);
    date.setMonth(0);
    return date
 }

export function getBeforSeven () {
    var date = new Date();
    date.setDate(date.getDate() - 6);
    return date
}