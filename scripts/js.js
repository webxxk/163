window.onload = function () {
	mTip();
	mLogin();
	banner();
	tab();
	video();
	topList();
	turn();
};

//工具-获取元素ID
function $(id) {
    return document.getElementById(id);
};

//工具-兼容ie9以下获取实际样式
var getStyle = function(obj,attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj,false)[attr];
	}
};

//工具-兼容低版本IE的事件注册
var addEvent = document.addEventListener ?
	function(elem,type,listener,useCapture) {
		elem.addEventListener(type,listener,useCapture);
	} :
	function(elem,type,listener,useCapture) {
		elem.attachEvent('on' + type,listener);
	};

//工具-兼容低版本IE的事件取消
var delEvent = document.removeEventListener ?
	function(elem,type,listener,useCapture) {
		elem.removeEventListener(type,listener,useCapture);
	} :
	function(elem,type,listener,useCapture) {
		elem.detachEvent('on' + type,listener);
	};

//工具-事件代理
function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement;
}

function editCell(e) {
	var target = getEventTarget(e);
	if(target.tagName.toLowerCase() =='td') {  //td为被代理元素节点
	// DO SOMETHING WITH THE CELL
	}
}

//工具-阻止事件冒泡
var stopBubble = function(obj) {
    //如果提供了事件对象，则这是一个非IE浏览器 
	if(obj && obj.stopPropagation) { //因此它支持W3C的stopPropagation()方法
		obj.stopPropagation()
	} else {
		//否则，我们需要使用IE的方式来取消事件冒泡
		window.event.cancelBubble = true; 
	} 
};

//工具-阻止浏览器的默认行为 
var stopDefault = function(obj) {
    //阻止默认浏览器动作(W3C) 
    if(obj && obj.preventDefault) {
    	obj.preventDefault(); 
    } else {
        //IE中阻止函数器默认动作的方式 
    	window.event.returnValue = false;
    	return false; 
    }
};

//组件-将Cookie转换为文本对象
var getCookie = function() {
	var cookie = {};
	var all = document.cookie;
	if (all === '')
		return cookie;
	var list = all.split('; ');
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

//组件-设置/修改cookie
var setCookie = function(name,value,expires,path,domain,secure) {
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

//组件-删除cookie
var removeCookie = function(name,path,domain) {
	document.cookie = name + '=' + '; path=' + path + '; domain=' + domain + '; max-age=0';
};

/**
 * 序列化查询字符串
 * @param  {Object} data 封装的查询字符串对象
 * @return {String}         查询字符串
 */
//组件-请求参数序列化
var serialize = function(data) {
	if (!data) return "";
	var pairs = [];
	for (var name in data) {
		if (!data.hasOwnProperty(name)) continue;
		if (typeof data[name] === "function") continue;
		var value = data[name].toString();
		name = encodeURIComponent(name);
		value = encodeURIComponent(value);
		pairs.push(name + "=" + value);
	}
	return pairs.join("&");
};

//组件-Ajax请求GET方法的封装
/**
 * 封装ajax异步get请求数据
 * @param  {String}   url      请求URL
 * @param  {Object}   options  封装的查询字符串对象
 * @param  {Function} callback 回调函数
 * @return {}            
 */
var get = function(url, options, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { // 方法中不要传入callback参数，会被覆盖为事件对象Event
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                callback(xhr.responseText);
            } else {
                alert("Request was unsuccessful" + xhr.status);
            }
        }
    }
    xhr.open("get", url + "?" + serialize(options), true);
    xhr.send(null);
};

//组件-Ajax请求POST方法的封装
var post = function(url, options, callback) {
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
};

//组件-阻止滚轮事件
var disabledMouseWheel = function () {
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

//组件-恢复滚轮事件
var mouseWheel = function () {
  if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollfunc, true);
  }//W3C
  window.onmousewheel = document.onmousewheel = scrollfunc;//IE/Opera/Chrome
}
function scrollfunc(evt) {
  evt = evt || window.event;
    if(evt.preventDefault) {
    // Firefox
      // evt.preventDefault();
      evt.stopPropagation();
    } else {
      // IE
      evt.cancelBubble=true;
      evt.returnValue = true;
  }
  return true;
};

//组件-淡入
var fadeIn = function(obj) {
	var icur = getStyle(obj,'opacity');
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
	},50);
};

//组件-淡出
var fadeOut = function(obj) {
	var icur = getStyle(obj,'opacity');
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
	},50);
};

//模块-顶部弹窗
var mTip = function() {
	var mTipIndex = document.cookie.indexOf('mTip');
	var d = new Date();
	d.setTime(d.getTime() + 60*60*1000);
	
	//cookie存在不弹出顶部弹窗
	if (mTipIndex !== -1) {
		$('mtip').className += ' z-tip';
		$('gheader').className += ' z-header';
	} else {
		//cookie不存在设置cookie
		addEvent($('mtipbtn'),'click',function() {
			$('mtip').className += ' z-tip';
			$('gheader').className += ' z-header';
			setCookie('mTip','0',d);
		});
	}
};

//模块-登录弹窗
var mLogin = function() {
	var loginSucIndex = document.cookie.indexOf('loginSuc');
	var useName = $('form').usename;
	var passWord = $('form').password;
	var login = {};
	var d = new Date();
	d.setTime(d.getTime() + 60*60*1000);
	
    function showMessage(clazz,msg){
    	if (!clazz){
	    	nmsg.innerHTML = '';
	    	nmsg.classList.remove('j-suc');
	    	nmsg.classList.remove('j-err');
    	}else{
	    	nmsg.innerHTML = msg;
	    	nmsg.classList.add(clazz);
    	}
    }

    function disableSubmit(disabled){
    	$('form').loginBtn.disabled = !!disabled;
    	var method = !disabled?'remove':'add';
        $('form').loginBtn.classList[method]('j-disabled');
    }

    function invalidInput(node,msg){
    	showMessage('j-err',msg);
    	node.classList.add('j-error');
    	node.focus();
    }

    function clearInvalid(node){
    	showMessage();
    	node.classList.remove('j-error');
    }

    addEvent($('form'),'input',function(event){
    	// 还原错误状态
    	clearInvalid(event.target);
        // 还原登录按钮状态
        disableSubmit(false);
    });

	//cookie存在则不用登录
	if (loginSucIndex !== -1) {
		$('mloginacon').className += ' m-login z-login-acon';
	} else {
		//cookie不存在弹出登录弹窗
		addEvent($('mlogincon'),'click',function() {
			$('mloginmodal').className += ' z-loginmodal-show';
			disabledMouseWheel();	
		});
		//判断登录
		addEvent($('form'),'submit', function(event) {
			event.preventDefault();
			// 密码验证
            var input = passWord,
                pswd = input.value,
                emsg = '';
            if (pswd.length<6){
            	emsg = '密码长度必须大于6位';
            }else if(!/\d/.test(pswd)||!/[a-z]/i.test(pswd)){
            	emsg = '密码必须包含数字和字母';
            }

            // 密码验证不通过
            if (!!emsg){
            	event.preventDefault();
            	invalidInput(input,emsg);
    			return;
            }

            //登录账号：studyOnline 密码：study.163.com
            login.userName = useName.value;
        	login.password = passWord.value;
        	get('http://study.163.com/webDev/login.htm',login,function(){
        		setCookie('loginSuc','0',d);
        		useName.value = '';
        		passWord.value = '';
        		$('mloginmodal').className = 'm-loginmodal';
        		$('mloginacon').className += ' m-login z-login-acon';
        	});

            // 禁用提交按钮
            // disableSubmit(true);
		});
	}
	
	//关闭登录弹窗
	addEvent($('closelogin'),'click',function() {
		$('mloginmodal').className = 'm-loginmodal';
		mouseWheel();
	})

	//取消关注删除cookie
	addEvent($('mloginbtn'),'click',function() {
		$('mloginacon').className = 'm-login-acon';
		removeCookie('loginSuc','/163/','127.0.0.1');
	})
};

//模块-轮播
var banner = function() {
	var mBanner = $('m-banner');
	var aLi = $('m-b-wrap').getElementsByTagName('li');
	var aI = $('m-b-box').getElementsByTagName('i');
	var iNow = 0;
	var num = 0;

	//自动执行，5秒一次
	var timer = setInterval(auto,5000);

	//自动播放轮播
	function auto() {
		if (iNow == aLi.length-1) {
			iNow = 0;
		} else {
			iNow++;
		}

		for (var i = 0; i < aLi.length; i++) {
			//淡出全部
			fadeOut(aLi[i]);
			//索引全部清除
			aI[i].classList.remove('m-bactive');
		}
		//淡入当前
		fadeIn(aLi[iNow]);
		//给当前加入索引
		aI[iNow].classList.add('m-bactive');
	}

	for (var i = 0; i < aI.length; i++) {
		//给每个i标签加索引
		aI[i].index = i;
		//给每个i标签加点击事件
		addEvent(aI[i],'click',function() {
			if (this.className == 'm-bactive') {
				//如果当前鼠标点击的正在显示，iNow等于点击的索引
				iNow = this.index;
			} else {
				for (var i = 0; i < aI.length; i++) {
					//全部i标签淡出
					aI[i].classList.remove('m-bactive');
					fadeOut(aLi[i]);
				}
				//当前点击的i标签淡入
				this.classList.add('m-bactive');
				fadeIn(aLi[this.index]);
				iNow = this.index;
			}
		});
	}
	//鼠标移入清除自动播放
	addEvent(mBanner,'mouseover',function() {
		clearInterval(timer);
	})
	//鼠标移开恢复自动播放
	addEvent(mBanner,'mouseout',function() {
		timer = setInterval(auto,5000);
	})
};

//模块-视频
var video = function() {
	var mVideo = $('m-video');
	var mVideoModal = $('mvideomodal');
	var mVideoClose = $('mvideoclose');
	var video = $('video');
	
	addEvent(mVideo,'click',function(event) {
		stopDefault(event);
		mVideoModal.classList.add('z-videomodal-show');
	});

	addEvent(mVideoClose,'click',function(event) {
		stopDefault(event);
		mVideoModal.classList.remove('z-videomodal-show');
		video.pause();
	});
}

//模块-最新排行
var topList = function() {
	var mTWrap = $('m-t-wrap');
	get('http://study.163.com/webDev/hotcouresByCategory.htm',{},function(data) {
		var data = JSON.parse(data);
		for (var i = 0; i < data.length; i++) {
			var smallPhotoUrl = data[i].smallPhotoUrl;
			var name = data[i].name;
			var learnerCount = data[i].learnerCount;
			mTWrap.innerHTML += '<li>\
									<a href="" class="clearfix">\
										<img src="'+ smallPhotoUrl +'" alt="">\
										<dl>\
											<dt>'+ name +'</dt>\
											<dd>'+ learnerCount +'</dd>\
										</dl>\
									</a>\
								</li>';
		}
		var li = mTWrap.getElementsByTagName('li');
		var oneSize = li[0].offsetHeight + 20;
		var iNum = 1;
		var bBtn = true;

		function getWidth() {
			mTWrap.style.height = li.length * oneSize + 'px';
		}
		getWidth();

		function auto() {
			if (bBtn) {
				bBtn = false;
				for (var i = 0; i < iNum; i++) {
					var oLi = li[i].cloneNode(true);
					mTWrap.appendChild(oLi);
					getWidth();
				}
				for (var i = 0; i < iNum; i++) {
					mTWrap.removeChild(li[0]);
					mTWrap.style.top = 0;
					mTWrap.style.top += -iNum * oneSize + 'px';
				}
				bBtn = true;
			}
		};
		var timer = setInterval(auto,5000);
		//鼠标移入清除自动播放
		addEvent(mTWrap,'mouseover',function() {
			clearInterval(timer);
		})
		//鼠标移开恢复自动播放
		addEvent(mTWrap,'mouseout',function() {
			timer = setInterval(auto,5000);
		})
	})
};

//模块-TAB
var tab = function() {
	var h2 = $('m-tab').getElementsByTagName('h2');
	var ul = $('m-conlist').getElementsByTagName('ul');
	//初始化显示产品设计
	ul[0].className = ('clearfix m-c-w z-mcwarp-show');
	// z-mcwarp-show z-mcwarp-hide
	for (var i = 0; i < h2.length; i++) {
		//给每个tab添加索引
		h2[i].index = i;
		//给每个tab添加点击事件
		addEvent(h2[i],'click',function() {
			if (this.className == 'm-tactive') {
				return;
			} else {
				for (var i = 0; i < h2.length; i++) {
					//全部标签取消选中状态
					h2[i].classList.remove('m-tactive');
					//下面的全部列表隐藏
					ul[i].className = ('clearfix m-c-w z-mcwarp-hide');
				}
				//当前标签添加选中状态
				this.classList.add('m-tactive');
				//显示对应的列表
				ul[this.index].className = ('clearfix m-c-w z-mcwarp-show');
			}
		});
	}
};

//模块-获取和创建课程列表
function getAjax(id,obj,callback) {
	get('http://study.163.com/webDev/couresByCategory.htm',obj,function(data) {
		//把JSON转换成实用对象
		var data = JSON.parse(data);
		for (var i = 0; i < data.list.length; i++) {
			//获得每项数据
			var bigPhotoUrl = data.list[i].bigPhotoUrl;
			var name = data.list[i].name;
			var provider = data.list[i].provider;
			var learnerCount = data.list[i].learnerCount;
			var price = data.list[i].price;
			var categoryName = data.list[i].categoryName;
			var description = data.list[i].description;
			if (price == 0) {
				price = '免费'
			}
			//插入产品设计html结构
			id.innerHTML += '<li>\
									<a href="#" class="m-c-box">\
										<div class="m-con">\
											<img src="'+ bigPhotoUrl +'" alt="">\
											<dl>\
												<dt>'+ name +'</dt>\
												<dd>'+ provider +'</dd>\
												<dd class="m-stus">'+ learnerCount +'</dd>\
												<dd class="m-price">￥<span>'+ price +'</span></dd>\
											</dl>\
										</div>\
										<div class="m-contip">\
											<div class="m-c-title clearfix">\
												<img src="'+ bigPhotoUrl +'" alt="">\
												<dl>\
													<dt>'+ name +'</dt>\
													<dd class="m-c-stus"><span>'+ learnerCount +'</span>人在学</dd>\
													<dd class="m-c-prom">发布者：<span>'+ provider +'</span></dd>\
													<dd class="m-c-clas">分类：<span>'+ categoryName +'</span></dd>\
												</dl>\
											</div>\
											<div class="m-c-content">\
												<p>'+ description +'</p>\
											</div>\
										</div>\
									</a>\
								</li>';
		}
		var li = id.getElementsByTagName('li');
		for (var i = 0; i < li.length; i++) {
			var timer;
			addEvent(li[i],'mouseenter',function(e) {
				//给每个li添加鼠标移入事件代理，不用mouseover是因为li下有多个标签，防止冒泡
				var e = e||window.event;
				var target = e.target||e.srcElement;
				if (target.nodeName.toLowerCase() == 'li') {
					//获取li下的目标div
					var div = target.getElementsByTagName('div');
					function mouseIn() {
						//给div添加样式
						div[1].classList.add('z-contip');
					}
				//鼠标移入设置1秒后弹出设置的样式
				timer = setTimeout(mouseIn,1000);
				}
			});
			addEvent(li[i],'mouseleave',function(e) {
				//给每个li添加鼠标移入事件代理，不用mouseout是因为li下有多个标签，防止冒泡
				var e = e||window.event;
				var target = e.target||e.srcElement;
				if (target.nodeName.toLowerCase() == 'li') {
					var div = target.getElementsByTagName('div');
					div[1].classList.remove('z-contip');
				}
				//鼠标移开弹出层
				clearTimeout(timer);
			});
		}
	});
}

//模块-产品设计分页器和编程语言分页器
var turn = function() {
	var mTurn = $('m-turn');
	var mTab1 = $('m-tab1');
	var mTab2 = $('m-tab2');

	//产品设计及分页器
	function tab1() {
		var conList = {pageNo:1,psize:20,type:10};
		var totlePageCount = null;
		//获取产品设计总页码
		get('http://study.163.com/webDev/couresByCategory.htm',conList,function(data) {
			//把JSON转换成实用对象
			var data = JSON.parse(data);
			var totlePageCount = data.pagination.totlePageCount;
		})

		if (mTab1.className == 'm-tactive') {
			//清空分页器
			mTurn.innerHTML = '';
			page({
				id : 'm-turn',
				nowNum : 1,
				allNum : totlePageCount,
				callBack : function(now,all) {
					var bBtn = true;
					var mCWrap1 = $('m-c-wrap1');
					var conList1 = {pageNo:now,psize:20,type:10};
					if (bBtn) {
						bBtn = false;
						mCWrap1.innerHTML = '';
						getAjax(mCWrap1,conList1,function() {
							bBtn = true;
						});	
					}
				}
			},8)
		}
	};

	//编程语言及分页器
	function tab2() {
		var conList = {pageNo:1,psize:20,type:20};
		var totlePageCount = null;
		//获取编程语言总页码
		get('http://study.163.com/webDev/couresByCategory.htm',conList,function(data) {
			//把JSON转换成实用对象
			var data = JSON.parse(data);
			var totlePageCount = data.pagination.totlePageCount;
		})
		if (mTab2.className == 'm-tactive') {
			//清空分页器
			mTurn.innerHTML = '';
			page({
				id : 'm-turn',
				nowNum : 1,
				allNum : totlePageCount,
				callBack : function(now,all) {
					var bBtn = true;
					var mCWrap2 = $('m-c-wrap2');
					var conList2 = {pageNo:now,psize:20,type:20};
					if (bBtn) {
						bBtn = false;
						mCWrap2.innerHTML = '';
						getAjax(mCWrap2,conList2,function() {
							bBtn = true;
						});	
					}
				}
			},8)
		}
	};

	//页面加载后生成产品设计
	var timer = setTimeout(tab1(),0);
	//添加点击事件生成产品设计及对应分页器
	addEvent(mTab1,'click',function() {
		tab1();
	})
	//添加点击事件生成编程语言及对应分页器
	addEvent(mTab2,'click',function() {
		tab2();
	})

	//模块-分页器
	function page(opt,num) {
		if (!opt.id) {return false};
		var obj = $('m-turn');
		var num = num;
		var nowNum = opt.nowNum || 1;
		var allNum = opt.allNum || num;
		var callBack = opt.callBack || function() {};

		//上一页
		if (nowNum >= 2) {
			var oA = document.createElement('a');
			oA.href = '#' + (nowNum - 1);
			oA.className = 'm-t-left';
			obj.appendChild(oA);
		}

		//当前页和其他页
		if (allNum <= num) {
			for (var i = 1; i <= allNum; i++) {
				var oA = document.createElement('a');
				oA.href = '#' + i;
				if(nowNum == i) {
					oA.innerHTML = i;
					oA.className = 'z-t-active';
				} else {
					oA.innerHTML = i;
				}
				obj.appendChild(oA);
			}
		} else {
			for (var i = 1; i <= num; i++) {
				var oA = document.createElement('a');
				if (nowNum == 1 || nowNum == 2 ||nowNum == 3) {
					oA.href = '#' + i;
					if (nowNum == i) {
						oA.innerHTML = i;
						oA.className = 'z-t-active';
					} else {
						oA.innerHTML = i;
					}
				} else if ((allNum - nowNum) == 0 ||(allNum - nowNum) == 1 ||(allNum - nowNum) == 2 ||(allNum - nowNum) == 3) {
					oA.href = '#' + (allNum - num + i);
					if ((allNum - nowNum) == 0 && i == num) {
						oA.innerHTML = (allNum - num + i);
						oA.className = 'z-t-active';
					} else if ((allNum - nowNum) == 1 && i == (num - 1)) {
						oA.innerHTML = (allNum - num + i);
						oA.className = 'z-t-active';
					} else if ((allNum - nowNum) == 2 && i == (num - 2)) {
						oA.innerHTML = (allNum - num + i);
						oA.className = 'z-t-active';
					} else if ((allNum - nowNum) == 3 && i == (num - 3)) {
						oA.innerHTML = (allNum - num + i);
						oA.className = 'z-t-active';
					} else {
						oA.innerHTML = (allNum - num + i);
					}
				} else {
					oA.href = '#' + (nowNum - num/2 + i);
					if (i == num/2) {
						oA.innerHTML = (nowNum - num/2 + i);
						oA.className = 'z-t-active';
					} else {
						oA.innerHTML = (nowNum - num/2 + i);
					}
				}
				obj.appendChild(oA);
			}
		}

		//下一页
		if ((allNum - nowNum) >= 1) {
			var oA = document.createElement('a');
			oA.href = '#' + (nowNum + 1);
			oA.className = 'm-t-right';
			obj.appendChild(oA);
		}

		callBack(nowNum,allNum);
		var aA = obj.getElementsByTagName('a');
		//给每个按钮添加点击事件
		for (var i = 0; i < aA.length; i++) {
			addEvent(aA[i],'click',function(event) {
				var nowNum = parseInt(this.getAttribute('href').substring(1));
				obj.innerHTML = '';
				page({
					id : opt.id,
					nowNum : nowNum,
					allNum : allNum,
					callBack : callBack
				},8)
				event.preventDefault();
			})
		}
	}
};