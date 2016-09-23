window.onload=function(){cssWidth();mTip();mLogin();banner();news();tab();video();topList()};window.onresize=function(){window.location.reload();window.location.href=window.location.href};var $=function(id){return typeof id==="string"?document.getElementById(id):id};var getStyle=function(obj,attr){if(obj.currentStyle){return obj.currentStyle[attr]}else{return getComputedStyle(obj,false)[attr]}};if(!Array.prototype.indexOf){Array.prototype.indexOf=function(searchElement,fromIndex){var k;if(this==null){throw new TypeError('"this" is null or not defined')}var o=Object(this);var len=o.length>>>0;if(len===0){return -1}var n=+fromIndex||0;if(Math.abs(n)===Infinity){n=0}if(n>=len){return -1}k=Math.max(n>=0?n:len-Math.abs(n),0);while(k<len){if(k in o&&o[k]===searchElement){return k}k++}return -1}}if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}}var cl=("classList" in document.createElement("a"));function ctrlClass(opts){if(!opts.ele||!opts.c){return false}var c=null;typeof(opts.c)==="string"?c=opts.c.trim().replace(/\s+/g," ").split(" "):c=opts.c;return opts.fun({ele:opts.ele,c:c});opts.ele=null}var hasClass=function(ele,c){return ctrlClass({ele:ele,c:c,fun:function(opts){var cln=opts.ele.className.split(" ");var c=opts.c;for(var i=0;i<c.length;i++){if(cln.indexOf(c[i])!==-1){return true}}return false}})};var addClass=function(ele,c){ctrlClass({ele:ele,c:c,fun:function(opts){var ele=opts.ele,c=opts.c;for(var i=0;i<c.length;i++){if(!hasClass(ele,c[i])){ele.className=ele.className!==""?(ele.className+" "+c[i]):c[i]}}}})};var removeClass=function(ele,c){ctrlClass({ele:ele,c:c,fun:function(opts){var ele=opts.ele,c=opts.c,cln=ele.className.split(" ");for(var i=0;i<c.length;i++){if(hasClass(ele,c[i])){cln.splice(cln.indexOf(c[i]),1)}}ele.className=cln.join(" ")}})};var toggleClass=function(ele,c){ctrlClass({ele:ele,c:c,fun:function(opts){var ele=opts.ele,c=opts.c;for(var i=0;i<c.length;i++){!!hasClass(ele,c[i])?removeClass(ele,c[i]):addClass(ele,c[i])}}})};var getEventTarget=function(e){e=e||window.event;return e.target||e.srcElement};var editCell=function(e){var target=getEventTarget(e);if(target.tagName.toLowerCase()=="td"){}};var addEvent=function(object,type,handler,remove){if(typeof object!="object"||typeof handler!="function"){return}try{object[remove?"removeEventListener":"addEventListener"](type,handler,false)}catch(e){var xc="_"+type;object[xc]=object[xc]||[];if(remove){var l=object[xc].length;for(var i=0;i<l;i++){if(object[xc][i].toString()===handler.toString()){object[xc].splice(i,1)}}}else{var l=object[xc].length;var exists=false;for(var i=0;i<l;i++){if(object[xc][i].toString()===handler.toString()){exists=true}}if(!exists){object[xc].push(handler)}}object["on"+type]=function(){var l=object[xc].length;for(var i=0;i<l;i++){object[xc][i].apply(object,arguments)}}}};var delEvent=function(object,type,handler){addEvent(object,type,handler,true)};var stopBubble=function(obj){if(obj&&obj.stopPropagation){obj.stopPropagation()}else{window.event.cancelBubble=true}};var stopDefault=function(obj){if(obj&&obj.preventDefault){obj.preventDefault()}else{window.event.returnValue=false;return false}};var getCookie=function(){var cookie={};var all=document.cookie;if(all===""){return cookie}var list=all.split("; ");for(var i=0;i<list.length;i++){var item=list[i];var p=item.indexOf("=");var name=item.substring(0,p);name=decodeURIComponent(name);var value=item.substring(p+1);value=decodeURIComponent(value);cookie[name]=value}return cookie};var setCookie=function(name,value,expires,path,domain,secure){var cookie=encodeURIComponent(name)+"="+encodeURIComponent(value);if(expires){cookie+=";expires="+expires.toGMTString()}if(path){cookie+=";path="+path}if(domain){cookie+=";domain="+domain}if(secure){cookie+=";secure="+secure}document.cookie=cookie};var removeCookie=function(name,path,domain){document.cookie=name+"="+"; path="+path+"; domain="+domain+"; max-age=0"};var serialize=function(data){if(!data){return""}var pairs=[];for(var name in data){if(!data.hasOwnProperty(name)){continue}if(typeof data[name]==="function"){continue}var value=data[name].toString();name=encodeURIComponent(name);value=encodeURIComponent(value);pairs.push(name+"="+value)}return pairs.join("&")};var get=function(url,options,callback){function createXmlHttpRequest(){if(window.ActiveXObject){return new ActiveXObject("Microsoft.XMLHTTP")}else{if(window.XMLHttpRequest){return new XMLHttpRequest()}}}var xhr=createXmlHttpRequest();xhr.onreadystatechange=function(){if(xhr.readyState==4){if((xhr.status>=200&&xhr.status<300)||xhr.status==304){callback(xhr.responseText)}else{alert("Request was unsuccessful"+xhr.status)}}};xhr.open("get",url+"?"+serialize(options),true);xhr.send(null)};var post=function(url,options,callback){function createXmlHttpRequest(){if(window.ActiveXObject){return new ActiveXObject("Microsoft.XMLHTTP")}else{if(window.XMLHttpRequest){return new XMLHttpRequest()}}}var xhr=createXmlHttpRequest();
xhr.onreadystatechange=function(){if(xhr.readyState==4){if((xhr.status>=200&&xhr.status<300)||xhr.status==304){callback(xhr.responseText)}else{alert("Request was unsuccessful"+xhr.status)}}};xhr.open("post",url,true);xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");xhr.send(serialize(options))};var disabledMouseWheel=function(){if(document.addEventListener){document.addEventListener("DOMMouseScroll",scrollFunc,false)}window.onmousewheel=document.onmousewheel=scrollFunc};function scrollFunc(evt){evt=evt||window.event;if(evt.preventDefault){evt.preventDefault();evt.stopPropagation()}else{evt.cancelBubble=true;evt.returnValue=false}return false}var mouseWheel=function(){if(document.addEventListener){document.addEventListener("DOMMouseScroll",scrollfunc,true)}window.onmousewheel=document.onmousewheel=scrollfunc};function scrollfunc(evt){evt=evt||window.event;if(evt.preventDefault){evt.stopPropagation()}else{evt.cancelBubble=true;evt.returnValue=true}return true}var fadeIn=function(obj,callback){var icur=getStyle(obj,"opacity");if(icur==1){return false}var value=0;clearInterval(obj.timer);obj.timer=setInterval(function(){var ispeed=10;if(value==100){clearInterval(obj.timer)}else{value+=ispeed;obj.style.opacity=value/100;obj.style.filter="alpha(opacity="+value+")"}},50)};var fadeOut=function(obj,callback){var icur=getStyle(obj,"opacity");if(icur==0){return false}var value=100;clearInterval(obj.timer);obj.timer=setInterval(function(){var ispeed=-10;if(value==0){clearInterval(obj.timer)}else{value+=ispeed;obj.style.opacity=value/100;obj.style.filter="alpha(opacity="+value+")"}},50)};var cssWidth=function(){if(window.innerWidth){var winWidth=window.innerWidth}else{if((document.body)&&(document.body.clientWidth)){var winWidth=document.body.clientWidth}}if(winWidth<1205){console.log("小屏幕");var sheet=document.styleSheets;var rules=sheet[1].cssRules||sheet[1].rules;var limit=rules[0];limit.style.width=962+"px";var mList=$("m-list");var mLDl=mList.getElementsByTagName("dl");var mLDlLen=mLDl.length;for(var i=0;i<mLDlLen;i++){mLDl[i].style.width=272+"px";mLDl[i].style.marginRight=70+"px";mLDl[mLDlLen-1].style.marginRight=0+"px"}turn(15);var gFWrap=$("g-f-wrap");gFWrap.style.padding=0}else{console.log("大屏幕");turn(20)}};var mTip=function(){var mTipIndex=document.cookie.indexOf("mTip");var d=new Date();d.setTime(d.getTime()+60*60*1000);if(mTipIndex!==-1){$("mtip").className+=" z-tip";$("gheader").className+=" z-header"}else{addEvent($("mtipbtn"),"click",function(){$("mtip").className+=" z-tip";$("gheader").className+=" z-header";setCookie("mTip","0",d)})}};var mLogin=function(){var loginSucIndex=document.cookie.indexOf("loginSuc");var useName=$("form").usename;var passWord=$("form").password;var login={};var d=new Date();d.setTime(d.getTime()+60*60*1000);function showMessage(clazz,msg){if(!clazz){nmsg.innerHTML="";removeClass(nmsg,"j-suc");removeClass(nmsg,"j-err")}else{nmsg.innerHTML=msg;addClass(nmsg,clazz)}}function disableSubmit(disabled){$("form").loginBtn.disabled=!!disabled;var method=!disabled?"remove":"add";$("form").loginBtn.classList[method]("j-disabled")}function invalidInput(node,msg){showMessage("j-err",msg);addClass(node,"j-error");node.focus()}function clearInvalid(node){showMessage();removeClass(node,"j-error")}addEvent($("form"),"input",function(event){clearInvalid(event.target);disableSubmit(false)});if(loginSucIndex!==-1){$("mloginacon").className+=" m-login z-login-acon"}else{addEvent($("mlogincon"),"click",function(){$("mloginmodal").className+=" z-loginmodal-show";disabledMouseWheel()});addEvent($("form"),"submit",function(event){stopDefault(event);var input=passWord,pswd=input.value,emsg="";if(pswd.length<6){emsg="密码长度必须大于6位"}else{if(!/\d/.test(pswd)||!/[a-z]/i.test(pswd)){emsg="密码必须包含数字和字母"}}if(!!emsg){stopDefault(event);invalidInput(input,emsg);return}login.userName=useName.value;login.password=passWord.value;get("http://study.163.com/webDev/login.htm",login,function(){setCookie("loginSuc","0",d);useName.value="";passWord.value="";$("mloginmodal").className="m-loginmodal";$("mloginacon").className+=" m-login z-login-acon"})})}addEvent($("closelogin"),"click",function(event){$("mloginmodal").className="m-loginmodal";useName.value="";passWord.value="";clearInvalid(event.target);mouseWheel()});addEvent($("mloginbtn"),"click",function(){$("mloginacon").className="m-login-acon";removeCookie("loginSuc","/163/","127.0.0.1")})};var banner=function(){var mBanner=$("m-banner");var aLi=$("m-b-wrap").getElementsByTagName("li");var aI=$("m-b-box").getElementsByTagName("i");var iNow=0;var num=0;for(var i=0;i<aLi.length;i++){aLi[i].style.filter="alpha(opacity=0)"}aLi[0].style.filter="alpha(opacity=100)";aLi[0].style.opacity="1";var timer=setInterval(auto,5000);function auto(){if(iNow==aLi.length-1){iNow=0}else{iNow++}for(var i=0;i<aLi.length;i++){fadeOut(aLi[i]);removeClass(aI[i],"m-bactive")}fadeIn(aLi[iNow]);addClass(aI[iNow],"m-bactive")}for(var i=0;i<aI.length;i++){aI[i].index=i;addEvent(aI[i],"click",function(){if(this.className=="m-bactive"){iNow=this.index
}else{for(var i=0;i<aI.length;i++){removeClass(aI[i],"m-bactive");fadeOut(aLi[i])}var This=this;addClass(This,"m-bactive");fadeIn(aLi[this.index]);iNow=this.index}})}addEvent(mBanner,"mouseover",function(){clearInterval(timer)});addEvent(mBanner,"mouseout",function(){timer=setInterval(auto,5000)})};var news=function(){var speed=25;var mNWrap=$("m-n-wrap");var mNWrap0=$("m-n-wrap0");var mNWrap1=$("m-n-wrap1");var mNWrap2=$("m-n-wrap2");var mNWLi1=mNWrap1.getElementsByTagName("li");var oneSize=mNWLi1[0].offsetWidth+4;var mNWLi1Width=parseInt(getStyle(mNWLi1[0],"width"))+parseInt(getStyle(mNWLi1[0],"marginRight"));mNWrap1.style.width=mNWLi1.length*mNWLi1Width+"px";mNWrap2.style.width=mNWLi1.length*mNWLi1Width+"px";mNWrap0.style.width=(mNWLi1.length*mNWLi1Width)*2+"px";var mNWrap1HTMl=mNWrap1.innerHTML;mNWrap2.innerHTML=mNWrap1HTMl;function Marquee(){if(mNWrap2.offsetWidth-mNWrap.scrollLeft<=0){mNWrap.scrollLeft-=mNWrap1.offsetWidth}else{mNWrap.scrollLeft++}}var timer=setInterval(Marquee,speed);addEvent(mNWrap,"mouseover",function(){clearInterval(timer)});addEvent(mNWrap,"mouseout",function(){timer=setInterval(Marquee,speed)})};var video=function(){var mVideo=$("m-video");var mVideoModal=$("mvideomodal");var mVideoClose=$("mvideoclose");var video=$("video");addEvent(mVideo,"click",function(event){stopDefault(event);addClass(mVideoModal,"z-videomodal-show")});addEvent(mVideoClose,"click",function(event){stopDefault(event);removeClass(mVideoModal,"z-videomodal-show");video.pause()})};var topList=function(){var mTWrap=$("m-t-wrap");get("http://study.163.com/webDev/hotcouresByCategory.htm",{},function(data){var data=JSON.parse(data);for(var i=0;i<data.length;i++){var smallPhotoUrl=data[i].smallPhotoUrl;var name=data[i].name;var learnerCount=data[i].learnerCount;mTWrap.innerHTML+='<li>									<a href="" class="clearfix">										<img src="'+smallPhotoUrl+'" alt="">										<dl>											<dt>'+name+"</dt>											<dd>"+learnerCount+"</dd>										</dl>									</a>								</li>"}var li=mTWrap.getElementsByTagName("li");var oneSize=li[0].offsetHeight+20;var iNum=1;var bBtn=true;function getWidth(){mTWrap.style.height=li.length*oneSize+"px"}getWidth();function auto(){if(bBtn){bBtn=false;for(var i=0;i<iNum;i++){var oLi=li[i].cloneNode(true);mTWrap.appendChild(oLi);getWidth()}for(var i=0;i<iNum;i++){mTWrap.removeChild(li[0]);mTWrap.style.top+=(-iNum*oneSize)+"px";mTWrap.style.top=0}bBtn=true}}var timer=setInterval(auto,5000);addEvent(mTWrap,"mouseover",function(){clearInterval(timer)});addEvent(mTWrap,"mouseout",function(){timer=setInterval(auto,5000)})})};var tab=function(){var h2=$("m-tab").getElementsByTagName("h2");var ul=$("m-conlist").getElementsByTagName("ul");ul[0].className=("clearfix m-c-w z-mcwarp-show");for(var i=0;i<h2.length;i++){h2[i].index=i;addEvent(h2[i],"click",function(){if(this.className=="m-tactive"){return}else{for(var i=0;i<h2.length;i++){removeClass(h2[i],"m-tactive");ul[i].className=("clearfix m-c-w z-mcwarp-hide")}addClass(this,"m-tactive");ul[this.index].className=("clearfix m-c-w z-mcwarp-show")}})}};function setList(id,obj,callback){get("http://study.163.com/webDev/couresByCategory.htm",obj,function(data){var data=JSON.parse(data);for(var i=0;i<data.list.length;i++){var bigPhotoUrl=data.list[i].bigPhotoUrl;var name=data.list[i].name;var provider=data.list[i].provider;var learnerCount=data.list[i].learnerCount;var price=data.list[i].price;var categoryName=data.list[i].categoryName;var description=data.list[i].description;if(price==0){price="免费"}id.innerHTML+='<li>									<a href="#" class="m-c-box">										<div class="m-con">											<img src="'+bigPhotoUrl+'" alt="">											<dl>												<dt>'+name+"</dt>												<dd>"+provider+'</dd>												<dd class="m-stus">'+learnerCount+'</dd>												<dd class="m-price">￥<span>'+price+'</span></dd>											</dl>										</div>										<div class="m-contip">											<div class="m-c-title clearfix">												<img src="'+bigPhotoUrl+'" alt="">												<dl>													<dt>'+name+'</dt>													<dd class="m-c-stus"><span>'+learnerCount+'</span>人在学</dd>													<dd class="m-c-prom">发布者：<span>'+provider+'</span></dd>													<dd class="m-c-clas">分类：<span>'+categoryName+'</span></dd>												</dl>											</div>											<div class="m-c-content">												<p>'+description+"</p>											</div>										</div>									</a>								</li>"}var li=id.getElementsByTagName("li");for(var i=0;i<li.length;i++){var timer;addEvent(li[i],"mouseenter",function(e){var e=e||window.event;var target=e.target||e.srcElement;if(target.nodeName.toLowerCase()=="li"){var div=target.getElementsByTagName("div");function mouseIn(){setTimeout(function(){fadeIn(div[1])},1000);addClass(div[1],"z-contip")}timer=setTimeout(mouseIn,1200)}});addEvent(li[i],"mouseleave",function(e){var e=e||window.event;var target=e.target||e.srcElement;if(target.nodeName.toLowerCase()=="li"){var div=target.getElementsByTagName("div");setTimeout(function(){removeClass(div[1],"z-contip")
},1000);fadeOut(div[1])}clearTimeout(timer)})}})}var turn=function(tpsize){var mTurn=$("m-turn");var mTab1=$("m-tab1");var mTab2=$("m-tab2");function tab(turn,list,listWrap,tpsize,tType,num){var mTurn=$(turn);var mTab=$(list);var conList={pageNo:1,psize:tpsize,type:tType};get("http://study.163.com/webDev/couresByCategory.htm",conList,function(data){var data=JSON.parse(data);var totlePageCount=data.pagination.totlePageCount;if(mTab.className=="m-tactive"){mTurn.innerHTML="";page({id:turn,nowNum:1,allNum:totlePageCount,callBack:function(now,all){var bBtn=true;var mCWrap=$(listWrap);var conList={pageNo:now,psize:tpsize,type:tType};if(bBtn){bBtn=false;mCWrap.innerHTML="";setList(mCWrap,conList,function(){bBtn=true})}}},num)}})}var timer=setTimeout(function(){tab("m-turn","m-tab1","m-c-wrap1",tpsize,10,8)},0);addEvent(mTab1,"click",function(){tab("m-turn","m-tab1","m-c-wrap1",tpsize,10,8)});addEvent(mTab2,"click",function(){tab("m-turn","m-tab2","m-c-wrap2",tpsize,20,8)});function page(opt,num){if(!opt.id){return false}var obj=$("m-turn");var num=num;var nowNum=opt.nowNum||1;var allNum=opt.allNum||num;var callBack=opt.callBack||function(){};if(nowNum>=2){var oA=document.createElement("a");oA.href="#"+(nowNum-1);oA.className="m-t-left";obj.appendChild(oA)}if(allNum<=num){for(var i=1;i<=allNum;i++){var oA=document.createElement("a");oA.href="#"+i;if(nowNum==i){oA.innerHTML=i;oA.className="z-t-active"}else{oA.innerHTML=i}obj.appendChild(oA)}}else{for(var i=1;i<=num;i++){var oA=document.createElement("a");if(nowNum==1||nowNum==2||nowNum==3){oA.href="#"+i;if(nowNum==i){oA.innerHTML=i;oA.className="z-t-active"}else{oA.innerHTML=i}}else{if((allNum-nowNum)==0||(allNum-nowNum)==1||(allNum-nowNum)==2||(allNum-nowNum)==3){oA.href="#"+(allNum-num+i);if((allNum-nowNum)==0&&i==num){oA.innerHTML=(allNum-num+i);oA.className="z-t-active"}else{if((allNum-nowNum)==1&&i==(num-1)){oA.innerHTML=(allNum-num+i);oA.className="z-t-active"}else{if((allNum-nowNum)==2&&i==(num-2)){oA.innerHTML=(allNum-num+i);oA.className="z-t-active"}else{if((allNum-nowNum)==3&&i==(num-3)){oA.innerHTML=(allNum-num+i);oA.className="z-t-active"}else{oA.innerHTML=(allNum-num+i)}}}}}else{oA.href="#"+(nowNum-num/2+i);if(i==num/2){oA.innerHTML=(nowNum-num/2+i);oA.className="z-t-active"}else{oA.innerHTML=(nowNum-num/2+i)}}}obj.appendChild(oA)}}if((allNum-nowNum)>=1){var oA=document.createElement("a");oA.href="#"+(nowNum+1);oA.className="m-t-right";obj.appendChild(oA)}callBack(nowNum,allNum);var aA=obj.getElementsByTagName("a");for(var i=0;i<aA.length;i++){addEvent(aA[i],"click",function(event){var nowNum=parseInt(this.getAttribute("href").substring(1));obj.innerHTML="";page({id:opt.id,nowNum:nowNum,allNum:allNum,callBack:callBack},8);stopDefault(event)})}}};