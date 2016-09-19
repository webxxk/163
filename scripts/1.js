
window.onload = function() {
	// mv.app.banner();
	// mv.app.toTip();
	// mv.app.nav();
};

var mv = {};

//工具
mv.tools = {};

//兼容ie9以下获取实际样式
mv.tools.getstyle = function(obj,attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj,false)[attr];
	}
};

//实现获取指定类名的子元素列表
mv.tools.getElementsByClassName = function (element, names) {
	if (element.getElementsByClassName) {
		return element.getElementsByClassName(names); //如果浏览器支持getElementsByClassName方法，则直接调用
	} else {
		var children = element.getElementsByTagName('*');  //获取所有子节点
		var child, childname, flag;
		names = names.split(' ');  //将names拆分为子元素的类名数组
		for (i in children) {  //对每个子元素进行遍历
			var childname = children[i].className;  //获取每个子元素的类名
			flag = true;  //标志设为真
			for (j in names) {
				if (childname.indexOf(names[j]) == -1) {
					//对类名进行循环 判断names中所有出现过的类名是否都能在childname中找到
					flag = false;
					break;  //如果有的没有匹配成功 则该子元素不满足要求
				}
			}
			if (flag) {
				elements.push(children[i]);  //如果子元素满足要求 ，就把子元素添加到数组中
			}
		}
		return elements;
	}
};
//getElementsByClassName 低版本兼容
// mv.tools.getElementsByClassName = function(root,className) {
// 	if(root.getElementsByClassName) {
// 		return root.getElementsByClassName(className);
// 	} else {
// 		var elements = root.getElementsByTagName('*');
// 		var result = [];
// 		for (var i = 0,element; element = elements[i]; i++) {
// 			if (hasClassName(element,className)) {
// 				result.push(element);
// 			}
// 		}
// 		return result;
// 	}
// };

//组件
mv.ui = {};

//兼容低版本IE的事件注册
mv.ui.addEvent = document.addEventListener ?
	function(elem,type,listener,useCapture) {
		elem.addEventListener(type,listener,useCapture);
	} :
	function(elem,type,listener,useCapture) {
		elem.attachEvent('on' + type,listener);
	};

//兼容低版本IE的事件取消
mv.ui.delEvent = document.removeEventListener ?
	function(elem,type,listener,useCapture) {
		elem.removeEventListener(type,listener,useCapture);
	} :
	function(elem,type,listener,useCapture) {
		elem.detachEvent('on' + type,listener);
	};

//阻止事件冒泡
mv.ui.stopBubble = function(obj) {
    //如果提供了事件对象，则这是一个非IE浏览器 
	if(obj && obj.stopPropagation) { //因此它支持W3C的stopPropagation()方法
		obj.stopPropagation()
	} else {
		//否则，我们需要使用IE的方式来取消事件冒泡
		window.event.cancelBubble = true; 
	} 
};

//阻止浏览器的默认行为 
mv.ui.stopDefault = function(obj) {
    //阻止默认浏览器动作(W3C) 
    if(obj && obj.preventDefault) {
    	obj.preventDefault(); 
    } else {
        //IE中阻止函数器默认动作的方式 
    	window.event.returnValue = false;
    	return false; 
    }
};

//阻止滚轮事件
mv.ui.disabledMouseWheel = function () {
  if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
  }//W3C
  window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome
}
function scrollFunc(evt) {
  evt = evt || window.event;
    if(evt.preventDefault) {
    // Firefox
      evt.preventDefault();
      evt.stopPropagation();
    } else {
      // IE
      evt.cancelBubble=true;
      evt.returnValue = false;
  }
  return false;
};

//将Cookie转换为文本对象
mv.ui.getCookie = function() {
	var cookie = {};
	var all = document.cookie;
	if (all === '')
		return cookie;
	var list = all.split(';');
	for (var i = 0;i < list.length; i++) {
		var item = list[i];
		var p = item.indexOf('=');
		var name = item.substring(0,p);
		name = decodeURIComponent(name);
		var value = item.substring(p+1);
		value = decodeURIComponent(value);
		cookie[name] = value;
	}
	return cookie;
};

//设置/修改cookie
mv.ui.setCookie = function(name,value,expires,path,domain,secure) {
	var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	if (expires)
		cookie += ';expires=' + expires.toGMTString();
	if (path)
		cookie += ';path=' + path;
	if (domain)
		cookie += ';domain=' + domain;
	if (secure)
		cookie += ';secure=' + secure;
	document.cookie = cookie;
};

//删除cookie
mv.ui.removeCookie = function(name,path,domain) {
	document.cookie = name + '=' + '; path=' + path + '; domain=' + domain + '; max-age=0';
}

//组件-请求参数序列化
mv.ui.serialize = function(data) {
	if (!data) return '';
	var pairs = [];
	for (var name in data) {
		if (!data.hasOwnProperty(name)) continue;
		if (typeof data[name] === 'function') continue;
		var value = data[name].toString();
		name = encodeURIComponent(name);
		value = encodeURIComponent(value);
		pairs.push(name + '=' + value);
	}
	return pairs.join('&');
};

/**
 * 封装ajax异步get请求数据
 * @param  {String}   url      请求URL
 * @param  {Object}   options  封装的查询字符串对象
 * @param  {Function} callback 回调函数
 * @return {}            
 */
function get(url, options, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { // 方法中不要传入callback参数，会被覆盖为事件对象Event
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || 
                xhr.status == 304) {
                callback(xhr.responseText);
            } else {
                alert("Request was unsuccessful" + xhr.status);
            }
        }
    }
    xhr.open("get", url + "?" + serialize(options), true);
    xhr.send(null);
}

//Ajax请求POST方法的封装
function post(url, options, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || 
                xhr.status == 304) {
                callback(xhr.responseText);
            } else {
                alert("Request was unsuccessful" + xhr.status);
            }
        }
    }
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(serialize(options));
}

//组件-淡入
mv.ui.fadein = function(obj) {
	var icur = mv.tools.getstyle(obj,'opacity');
	if(icur == 1) {return false;}
	var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var ispeed = 10;
		if(value == 100) {
			clearInterval(obj.timer);
		} else {
			value += ispeed;
			obj.style.opacity = value/100;
		}
	},30);
};

//组件-淡出
mv.ui.fadeout = function(obj) {
	var icur = mv.tools.getstyle(obj,'opacity');
	if(icur == 0) {return false;}
	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var ispeed = -10;
		if(value == 0) {
			clearInterval(obj.timer);
		} else {
			value += ispeed;
			obj.style.opacity = value/100;
		}
	},30);
};

//组件-默认框变化
mv.ui.textChange = function(obj,str) {
	obj.onfocus = function() {
		if(this.value == str) {
			this.value = '';
		}
	};
	obj.onblur = function() {
		if(this.value == '') {
			this.value = str;
		}
	};
};

//应用
mv.app = {};

//应用-默认提示
mv.app.toTip = function() {
	var oText1 = document.getElementById('xm');
	var oText2 = document.getElementById('dh');
	var oText3 = document.getElementById('nr');
	var oText4 = document.getElementById('k-search');
	var oText5 = document.getElementById('e-add');

	mv.ui.textChange(oText1,'您的尊称 Name');
	mv.ui.textChange(oText2,'您的电话 Phone');
	mv.ui.textChange(oText3,'您要留言的内容 Content');
	mv.ui.textChange(oText4,'输入关键词 Keyword');
	mv.ui.textChange(oText5,'Email Address');
};

//应用-轮播图
mv.app.banner = function() {
	//轮播器图片初始化
	var pre = document.getElementById('pre');
	var next = document.getElementById('next');
	var banner = document.getElementById('bannerbox');
	var li = banner.getElementsByTagName('li');
	var l = li.length;
	var i = 0;
	var p = 0;
	var f = function () {  //遍历数组
		for (i = 0; i < l; i++) {
		mv.ui.fadeout(li[i]);
	}};

	//显示第一页，隐藏其他页
	f();
	li[0].style.opacity = '1';

	//下一页
	next.onclick = function() {
		if (p == l-1) {
			p = 0;
		} else {
			p++;
		}
		f();
		mv.ui.fadein(li[p]);
	};

	//上一页
	pre.onclick = function() {
		if (p == 0) {
			p = l-1;
		} else {
			p--;
		}
		f();
		mv.ui.fadeout(li[p]);
	};

	//自动
	var timer = setInterval(auto,5000);
	function auto() {
		next.onclick();
	};

	//鼠标移入停止自动播放
	pre.onmouseover = function() {
		clearInterval(timer);
	};
	next.onmouseover = function() {
		clearInterval(timer);
	};

	//鼠标移出开始自动播放
	pre.onmouseout = function() {
		timer = setInterval(auto,3000);
	};
	next.onmouseout = function() {
		timer = setInterval(auto,3000);
	};
};

//应用-导航栏收缩
mv.app.nav = function() {
	var header = document.getElementById('header');
	if (document.body && document.body.scrollTop) {
		var top = document.body.scrollTop;
	} else if (document.documentElement && document.documentElement.scrollTop) {
		var top = document.documentElement.scrollTop;
	};

	document.onscroll = function() {
		if (document.body && document.body.scrollTop) {
		var topNow = document.body.scrollTop;
	} else if (document.documentElement && document.documentElement.scrollTop) {
		var topNow = document.documentElement.scrollTop;
	};
		if (topNow > top) {
			header.delete = 'position';
			header.style.zIndex = '1';
			header.style.top = '-100px';
		} else if(topNow == 0) {
			header.delete = 'position';
		} else {
			header.style.position = 'fixed';
		    header.style.zIndex = '9999';
		    header.style.top = '0';
		};
		top = topNow;
	};
		
};