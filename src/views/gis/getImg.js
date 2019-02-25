let getImgFromJs = {
	zoom:18,
	getMarkerImgAndSize:function(obj,zoom,gisThemeSwitch){
			this.zoom = zoom;
			let {requireimg} = this;
			var imgPrev  =  gisThemeSwitch ? "" : "night_";
			let icon;
			let ipoleState = obj.ddldzt; // 单灯节点亮灯 1亮 0闭合
			let ipoleFault = obj.ddjdycbz; // 灯杆异常1 异常 0不异常
			let defaultFlah = obj.sjczbs; // 判断未知
			if(defaultFlah === "1") { // 有灯杆状态信息
				if(ipoleState == 1 && ipoleFault == 0) { // 正常
					icon = requireimg(imgPrev+'light_on.png');
				} else if(ipoleState == 1 && ipoleFault == 1) { // 异常
					icon = requireimg(imgPrev+'light_unusual.png');
				} else if(ipoleState == 0 && ipoleFault == 0) { // 关灯状态
					icon = requireimg(imgPrev+'light_off.png');
				} else if (obj.ddjddlycbz == 1 || obj.ddjdztycbz == 1) { // 故障
					icon = requireimg(imgPrev+'light_fault.png');
				} else {
					icon = requireimg(imgPrev+'light_off.png');
				}
			} else { // 关灯状态
				icon = requireimg(imgPrev+'light_off.png');
			}

			// if (defaultFlah === "1") { // 有灯杆状态信息
			// 	if (obj.ddjddlycbz == 1 || obj.ddjdztycbz == 1) {	//故障（继电器异常或电流异常显示为红色故障）
			// 		icon = requireimg(imgPrev+'light_unusual.png');
			// 	}
			// 	if (ipoleState == 1) {// 正常
			// 		icon = requireimg(imgPrev+'light_on.png');
			// 	} else if (ipoleState == 0) {// 关灯
			// 		icon = requireimg(imgPrev+'light_off.png');
			// 	} else if (ipoleState == 0 && ipoleFault == 1) {
			// 		icon = requireimg(imgPrev+'light_fault.png');
			// 	}
			// } else {	//关灯状态
			// 	icon = requireimg(imgPrev+'light_off.png');
			// }
			return icon;
	},
	requireimg:function(img,width,height){
		let zoom = getImgFromJs.zoom;
		let imgObj; 
		if(zoom == 19){
			imgObj = require('./images/zoom19/'+img);
			width = width ? width : 46;
			height = height ? height : 27;
		}else{
			imgObj = require('./images/zoom18/'+img);
			width = width ? width : 32;
			height = height ? height : 20;
		}
		let size = {
			width:width,
			height:height
		}
		let iconObj = {
			icon:imgObj,
			size:size
		}
		return iconObj;
	}
}

export default{
	getImgFromJs
}
