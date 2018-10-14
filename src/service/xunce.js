import api from './data.js'

export default {
    uuid(len, radix) {   //生成uuid
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid = [], i;
		radix = radix || chars.length;
		if (len) {
			for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
		}else{
			var r;
			for(i = 0; i < 12; i++){if(!uuid[i]) {
				r=0|Math.random()*16; uuid[i]=chars[(i == 19) ? (r & 0x3) | 0x8 : r];}
			}
		}
		return uuid.join('');
    },
    setDataSend(result,sblx,kzlx,cbfun){  //设置 发送数据
        let _this = this
        for(let i=0;i<result.length;i++){
            let data = result[i].data
            let dataSend = {}
            dataSend.sblx = sblx;//设备类型 dd jzq
            dataSend.kzlx = kzlx;//控制类型 ds(对时) xc(巡测) kd(开灯) gd(关灯) dataSend.func = kdCallBack;//回调函数
            dataSend.func = cbfun;//回调函数
            dataSend.kzsc = "15";//开关灯时长
            if(sblx == 'dd'){
                dataSend.bwid = result[i].bwid;//报文id
                dataSend.zzdz = result[i].zzdz;//子站地址
                dataSend.txfs = result[i].txfs;//通讯方式
            }

            if(sblx == 'jzq'){
                dataSend.bwid = data[i].bwid;//报文id
                dataSend.zzdz = data[i].zzdz;//子站地址
                dataSend.txfs = data[i].txfs;//通讯方式
                dataSend.jzkzqId = data[i].jzkzqId;//集中器id
                dataSend.zcbh = data[i].zcbh;//资产编号
            }
            // dataSend.status = 1;//巡测单击为1召测设备信息双击为2召测内存信
            dataSend.opType = 1;
            api.sendMessage(dataSend).then(function(result){
            })
            if(sblx == 'dd'){
                dataSend.func(result[i].bwid,dataSend.kzlx=='kd'?'1':'0')
            }
            if(sblx == 'jzq'){
                dataSend.func(data[i].bwid,dataSend.kzlx=='kd'?'1':'0')
            }
        }
    },

}