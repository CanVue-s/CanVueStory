/*=:project
    scalable Inman Flash Replacement (sIFR) version 3, beta 2

  =:file
    Copyright: 2006 Mark Wubben.
    Author: Mark Wubben, <http://novemberborn.net/>

  =:history
    * IFR: Shaun Inman
    * sIFR 1: Mike Davidson, Shaun Inman and Tomas Jogin
    * sIFR 2: Mike Davidson, Shaun Inman, Tomas Jogin and Mark Wubben

  =:license
    This software is licensed and provided under the CC-GNU LGPL.
    See <http://creativecommons.org/licenses/LGPL/2.1/>    
*/

var parseSelector=(function(){var _1=/\s*,\s*/;var _2=/\s*([\s>+~(),]|^|$)\s*/g;var _3=/([\s>+~,]|[^(]\+|^)([#.:@])/g;var _4=/^[^\s>+~]/;var _5=/[\s#.:>+~()@]|[^\s#.:>+~()@]+/g;function parseSelector(_6,_7){_7=_7||document.documentElement;var _8=_6.split(_1),_9=[];for(var i=0;i<_8.length;i++){var _b=[_7],_c=toStream(_8[i]);for(var j=0;j<_c.length;){var _e=_c[j++],_f=_c[j++],_10="";if(_c[j]=="("){while(_c[j++]!=")"&&j<_c.length){_10+=_c[j]}_10=_10.slice(0,-1)}_b=select(_b,_e,_f,_10)}_9=_9.concat(_b)}return _9}function toStream(_11){var _12=_11.replace(_2,"$1").replace(_3,"$1*$2");if(_4.test(_12)){_12=" "+_12}return _12.match(_5)||[]}function select(_13,_14,_15,_16){return (parseSelector.selectors[_14])?parseSelector.selectors[_14](_13,_15,_16):[]}var _17={toArray:function(_18){var a=[];for(var i=0;i<_18.length;i++){a.push(_18[i])}return a}};var dom={isTag:function(_1c,tag){return (tag=="*")||(tag.toLowerCase()==_1c.nodeName.toLowerCase())},previousSiblingElement:function(_1e){do{_1e=_1e.previousSibling}while(_1e&&_1e.nodeType!=1);return _1e},nextSiblingElement:function(_1f){do{_1f=_1f.nextSibling}while(_1f&&_1f.nodeType!=1);return _1f},hasClass:function(_20,_21){return (_21.className||"").match("(^|\\s)"+_20+"(\\s|$)")},getByTag:function(tag,_23){return _23.getElementsByTagName(tag)}};var _24={"#":function(_25,_26){for(var i=0;i<_25.length;i++){if(_25[i].getAttribute("id")==_26){return [_25[i]]}}return []}," ":function(_28,_29){var _2a=[];for(var i=0;i<_28.length;i++){_2a=_2a.concat(_17.toArray(dom.getByTag(_29,_28[i])))}return _2a},">":function(_2c,_2d){var _2e=[];for(var i=0,_30;i<_2c.length;i++){_30=_2c[i];for(var j=0,_32;j<_30.childNodes.length;j++){_32=_30.childNodes[j];if(_32.nodeType==1&&dom.isTag(_32,_2d)){_2e.push(_32)}}}return _2e},".":function(_33,_34){var _35=[];for(var i=0,_37;i<_33.length;i++){_37=_33[i];if(dom.hasClass([_34],_37)){_35.push(_37)}}return _35},":":function(_38,_39,_3a){return (parseSelector.pseudoClasses[_39])?parseSelector.pseudoClasses[_39](_38,_3a):[]}};parseSelector.selectors=_24;parseSelector.pseudoClasses={};parseSelector.util=_17;parseSelector.dom=dom;return parseSelector})();
var sIFR=new function(){var _3b=this;var _3c="sIFR-active";var _3d="sIFR-unloading";var _3e="sIFR-replaced";var _3f="sIFR-flash";var _40="sIFR-ignore";var _41="sIFR-alternate";var _42="sIFR-class";var _43="sIFR-layout";var _44="sIFR-fixfocus";var _45="sIFR-dummy";var _46="sIFR-zoomdetect";var _47=6;var _48=126;var _49=8;var _4a="SIFR-PREFETCHED";var _4b=[];var _4c=5;var _4d="beta2";this.isActive=false;this.isEnabled=true;this.preserveSingleWhitespace=false;this.fixWrap=true;this.fixHover=true;this.autoInitialize=true;this.setPrefetchCookie=true;this.cookiePath="/";this.domains=[];this.fromLocal=false;this.forceClear=false;this.forceWidth=true;this.fitExactly=false;this.forceTextTransform=true;this.useDomLoaded=true;this.useStyleCheck=false;this.hasFlashClassSet=false;this.repaintOnResize=true;this.callbacks=[];var _4e=0;var _4f=false,_50=false;var dom=new function(){var _52="http://www.w3.org/1999/xhtml";this.getBody=function(){var _53=document.getElementsByTagName("body");if(_53.length==1){return _53[0]}return null};this.addClass=function(_54,_55){if(_55){_55.className=((_55.className||"")==""?"":_55.className+" ")+_54}};this.removeClass=function(_56,_57){if(_57){_57.className=_57.className.replace(new RegExp("(^|\\s)"+_56+"(\\s|$)"),"").replace(/^\s+|(\s)\s+/g,"$1")}};this.hasClass=function(_58,_59){return new RegExp("(^|\\s)"+_58+"(\\s|$)").test(_59.className)};this.hasOneOfClassses=function(_5a,_5b){for(var i=0;i<_5a.length;i++){if(this.hasClass(_5a[i],_5b)){return true}}return false};this.create=function(_5d){if(document.createElementNS){return document.createElementNS(_52,_5d)}return document.createElement(_5d)};this.nodeFromHtml=function(_5e){var _5f=this.create("div");_5f.innerHTML=_5e;return _5f.firstChild};this.getComputedStyle=function(_60,_61){var _62;if(document.defaultView&&document.defaultView.getComputedStyle){_62=document.defaultView.getComputedStyle(_60,null)[_61]}else{if(_60.currentStyle){_62=_60.currentStyle[_61]}}return _62||""};this.getStyleAsInt=function(_63,_64,_65){var _66=this.getComputedStyle(_63,_64);if(_65&&!/px$/.test(_66)){return 0}_66=parseInt(_66);return isNaN(_66)?0:_66};this.getWidthFromStyle=function(_67){var _68=this.getStyleAsInt(_67,"width",ua.ie);if(_68==0){var _69=this.getStyleAsInt(_67,"paddingRight",true);var _6a=this.getStyleAsInt(_67,"paddingLeft",true);var _6b=this.getStyleAsInt(_67,"borderRightWidth",true);var _6c=this.getStyleAsInt(_67,"borderLeftWidth",true);_68=_67.offsetWidth-_6a-_69-_6c-_6b}return _68};this.blurElement=function(_6d){if(ua.gecko){_6d.blur();return}var _6e=dom.create("input");_6e.style.width="0px";_6e.style.height="0px";_6d.parentNode.appendChild(_6e);_6e.focus();_6e.blur();_6e.parentNode.removeChild(_6e)};this.getDimensions=function(_6f){var _70=_6f.offsetWidth;var _71=_6f.offsetHeight;if(_70==0||_71==0){for(var i=0;i<_6f.childNodes.length;i++){var _73=_6f.childNodes[i];if(_73.nodeType!=1){continue}_70=Math.max(_70,_73.offsetWidth);_71=Math.max(_71,_73.offsetHeight)}}return {width:_70,height:_71}};this.contentIsLink=function(_74){var _75=false;for(var i=0;i<_74.childNodes.length;i++){var _77=_74.childNodes[i];if(_77.nodeType==3&&!_77.nodeValue.match(/^\s*$/)){return false}else{if(_77.nodeType!=1){continue}}var _78=_77.nodeName.toLowerCase()=="a";if(!_78){return false}else{_75=true}}return _75};var dom=this;this.swf={create:function(_7a,_7b,id,_7d,_7e,src,_80,_81,_82){var obj=_7a.object(_7b,id,src,_7d,_7e);return _7a.params(obj,"flashvars",_80,"wmode",_81,"bgcolor",_82,"allowScriptAccess","always","quality","best")},ie:{object:function(_84,id,src,_87,_88){return "<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" id=\""+id+"\" width=\""+_87+"\" height=\""+_88+"\" class=\""+_3f+"\">"+"<param name=\"movie\" value=\""+src+"\"></param></object>"+"<scr"+"ipt event=FSCommand(info,args) for="+id+">"+id+"_DoFSCommand(info, args);"+"</"+"script>"},params:function(obj){var _8a="";for(var i=1;i<arguments.length;i+=2){_8a+="<param name=\""+arguments[i]+"\" value=\""+arguments[i+1]+"\"></param>"}return obj.replace(/(<\/object>)/,_8a+"$1")},insert:function(_8c,_8d){_8c.innerHTML=_8d}},other:{object:function(_8e,id,src,_91,_92){var obj=dom.create("object");var _94=["type","application/x-shockwave-flash","id",id,"name",id,"data",src,"width",_91,"height",_92];while(_94.length){obj.setAttribute(_94.shift(),_94.shift())}obj.className=_3f;if(!_8e){return obj}var _95=dom.create("div");_95.className=_44;_95.appendChild(obj);return _95},params:function(obj){for(var i=1;i<arguments.length;i+=2){if(arguments[i]=="name"){continue}var _98=dom.create("param");_98.setAttribute("name",arguments[i]);_98.setAttribute("value",arguments[i+1]);obj.appendChild(_98)}return obj},insert:function(_99,_9a){while(_99.firstChild){_99.removeChild(_99.firstChild)}_99.appendChild(_9a)}}}};this.dom=dom;var ua=new function(){var ua=navigator.userAgent.toLowerCase();var _9d=(navigator.product||"").toLowerCase();this.macintosh=ua.indexOf("mac")>-1;this.windows=ua.indexOf("windows")>-1;this.quicktime=false;this.opera=ua.indexOf("opera")>-1;this.konqueror=_9d.indexOf("konqueror")>-1;this.ie=false/*@cc_on||true@*/;this.ieSupported=this.ie&&!/ppc|smartphone|iemobile|msie\s5\.5/.test(ua)/*@cc_on&&@_jscript_version>=5.5@*/;this.ieWin=this.ie&&this.windows/*@cc_on&&@_jscript_version>=5.1@*/;this.windows=this.windows&&(!this.ie||this.ieWin);this.ieMac=this.ie&&this.macintosh/*@cc_on&&@_jscript_version<5.1@*/;this.macintosh=this.macintosh&&(!this.ie||this.ieMac);this.safari=ua.indexOf("safari")>-1;this.webkit=ua.indexOf("applewebkit")>-1&&!this.konqueror;this.khtml=this.webkit||this.konqueror;this.gecko=!this.webkit&&_9d=="gecko";this.ieVersion=this.ie&&/.*msie\s(\d\.\d)/.exec(ua)?parseFloat(RegExp.$1):0;this.operaVersion=this.opera&&/.*opera(\s|\/)(\d+\.\d+)/.exec(ua)?parseFloat(RegExp.$2):0;this.webkitVersion=this.webkit&&/.*applewebkit\/(\d+).*/.exec(ua)?parseFloat(RegExp.$1):0;this.geckoBuildDate=this.gecko&&/.*gecko\/(\d{8}).*/.exec(ua)?parseFloat(RegExp.$1):0;this.konquerorMajor=this.konqueror&&/.*konqueror\/(\d).*/.exec(ua)?parseFloat(RegExp.$1):0;this.konquerorMinor=this.konqueror&&/.*khtml\/\d\.(\d).*/.exec(ua)?parseFloat(RegExp.$1):0;this.konquerorSmall=this.konqueror&&/.*khtml\/\d\.\d\.(\d).*/.exec(ua)?parseFloat(RegExp.$1):0;this.flashVersion=0;if(this.ieWin){var axo;var _9f=false;try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(e){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");this.flashVersion=6;axo.AllowScriptAccess="always"}catch(e){_9f=this.flashVersion==6}if(!_9f){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(e){}}}if(!_9f&&axo){this.flashVersion=parseFloat(/([\d,?]+)/.exec(axo.GetVariable("$version"))[1].replace(/,/g,"."))}}else{if(navigator.plugins&&navigator.plugins["Shockwave Flash"]){var _a0=navigator.plugins["Shockwave Flash"];this.flashVersion=parseFloat(/(\d+\.?\d*)/.exec(_a0.description)[1]);var i=0;while(this.flashVersion>=_49&&i<navigator.mimeTypes.length){var _a2=navigator.mimeTypes[i];if(_a2.type=="application/x-shockwave-flash"&&_a2.enabledPlugin.description.toLowerCase().indexOf("quicktime")>-1){this.flashVersion=0;this.quicktime=true}i++}}}this.flash=this.flashVersion>=_49;this.transparencySupport=this.macintosh||this.windows;this.computedStyleSupport=this.ie||document.defaultView&&document.defaultView.getComputedStyle&&(!this.gecko||this.geckoBuildDate>=20030624);this.requiresPrefetch=this.ieWin||this.khtml;this.fixFocus=this.gecko&&this.windows&&this.geckoBuildDate>20061206;this.nativeDomLoaded=this.gecko||this.webkit&&this.webkitVersion>=525||this.konqueror&&this.konquerorMajor>3||this.opera;this.mustCheckStyle=this.khtml||this.opera;this.forcePageLoad=this.webkit&&this.webkit<523;this.properDocument=typeof (document.location)=="object";this.supported=this.flash&&this.properDocument&&(!this.ie||this.ieSupported)&&(!this.opera)&&(!this.webkit||this.webkitVersion>=412)&&(!this.konqueror)&&this.computedStyleSupport&&(!this.gecko||this.geckoBuildDate>20040804)};this.ua=ua;var _a3=new function(){var _a4={leading:true,"margin-left":true,"margin-right":true,"text-indent":true};var _a5=" ";function capitalize($){return $.toUpperCase()}this.normalize=function(str){if(_3b.preserveSingleWhitespace){return str.replace(/\s/g,_a5)}return str.replace(/(\n|\r)+/g,_a5).replace(/(\s)\s+/g,"$1").replace(/\xA0/,_a5)};this.textTransform=function(_a8,str){switch(_a8){case "uppercase":str=str.toUpperCase();break;case "lowercase":str=str.toLowerCase();break;case "capitalize":var _aa=str;str=str.replace(/^\w|\s\w/g,capitalize);if(str.indexOf("function capitalize")!=-1){var _ab=_aa.replace(/(^|\s)(\w)/g,"$1$1$2$2").split(/^\w|\s\w/g);str="";for(var i=0;i<_ab.length;i++){str+=_ab[i].charAt(0).toUpperCase()+_ab[i].substring(1)}}break}return str};this.toHexString=function(str){if(typeof (str)!="string"||!str.charAt(0)=="#"||str.length!=4&&str.length!=7){return str}str=str.replace(/#/,"");if(str.length==3){str=str.replace(/(.)(.)(.)/,"$1$1$2$2$3$3")}return "0x"+str};this.toJson=function(obj){var _af="";switch(typeof (obj)){case "string":_af="\""+obj+"\"";break;case "number":case "boolean":_af=obj.toString();break;case "object":_af=[];for(var _b0 in obj){if(obj[_b0]==Object.prototype[_b0]){continue}_af.push("\""+_b0+"\":"+_a3.toJson(obj[_b0]))}_af="{"+_af.join(",")+"}";break}return _af};this.convertCssArg=function(arg){if(!arg){return {}}if(typeof (arg)=="object"){if(arg.constructor==Array){arg=arg.join("")}else{return arg}}var obj={};var _b3=arg.split("}");for(var i=0;i<_b3.length;i++){var $=_b3[i].match(/([^\s{]+)\s*\{(.+)\s*;?\s*/);if(!$||$.length!=3){continue}if(!obj[$[1]]){obj[$[1]]={}}var _b6=$[2].split(";");for(var j=0;j<_b6.length;j++){var $2=_b6[j].match(/\s*([^:\s]+)\s*\:\s*([^;]+)/);if(!$2||$2.length!=3){continue}obj[$[1]][$2[1]]=$2[2].replace(/\s+$/,"")}}return obj};this.extractFromCss=function(css,_ba,_bb,_bc){var _bd=null;if(css&&css[_ba]&&css[_ba][_bb]){_bd=css[_ba][_bb];if(_bc){delete css[_ba][_bb]}}return _bd};this.cssToString=function(arg){var css=[];for(var _c0 in arg){var _c1=arg[_c0];if(_c1==Object.prototype[_c0]){continue}css.push(_c0,"{");for(var _c2 in _c1){if(_c1[_c2]==Object.prototype[_c2]){continue}var _c3=_c1[_c2];if(_a4[_c2]){_c3=parseInt(_c3,10)}css.push(_c2,":",_c3,";")}css.push("}")}return css.join("")};this.bind=function(_c4,_c5){return function(){_c4[_c5].apply(_c4,arguments)}};this.escape=function(str){return escape(str).replace(/\+/g,"%2B")};this.copyProperties=function(_c7,to){for(var _c9 in _c7){if(to[_c9]===undefined){to[_c9]=_c7[_c9]}}return to};this.domain=function(){var _ca="";try{_ca=document.domain}catch(e){}return _ca};this.domainMatches=function(_cb,_cc){if(_cc=="*"||_cc==_cb){return true}var _cd=_cc.lastIndexOf("*");if(_cd>-1){_cc=_cc.substr(_cd+1);var _ce=_cb.lastIndexOf(_cc);if(_ce>-1&&(_ce+_cc.length)==_cb.length){return true}}return false};this.uriEncode=function(s){return encodeURI(decodeURIComponent(s))}};this.util=_a3;var _d0={};_d0.fragmentIdentifier=new function(){this.fix=true;var _d1;this.cache=function(){_d1=document.title};function doFix(){document.title=_d1}this.restore=function(){if(this.fix){setTimeout(doFix,0)}}};this.hacks=_d0;_d0.pageLoad=new function(){var _d2=null;function pollLoad(){try{if(ua.ie||document.readyState!="loaded"&&document.readyState!="complete"){document.documentElement.doScroll("left")}}catch(e){return setTimeout(pollLoad,10)}afterDomLoad()}function afterDomLoad(){if(_3b.useStyleCheck){checkStyle()}else{if(!ua.mustCheckStyle){fire(null,true)}}}function checkStyle(){_d2=dom.create("div");_d2.className=_45;dom.getBody().appendChild(_d2);pollStyle()}function pollStyle(){if(dom.getComputedStyle(_d2,"marginLeft")=="42px"){afterStyle()}else{setTimeout(pollStyle,10)}}function afterStyle(){if(_d2&&_d2.parentNode){_d2.parentNode.removeChild(_d2)}_d2=null;fire(null,true)}function fire(evt,_d4){_3b.initialize(_d4);if(evt&&evt.type=="load"){if(document.removeEventListener){document.removeEventListener("DOMContentLoaded",fire,false)}if(window.removeEventListener){window.removeEventListener("load",fire,false)}}}this.attach=function(){if(window.addEventListener){window.addEventListener("load",fire,false)}else{window.attachEvent("onload",fire)}if(!_3b.useDomLoaded||ua.forcePageLoad||ua.ie&&window.top!=window){return}if(ua.nativeDomLoaded){document.addEventListener("DOMContentLoaded",afterDomLoad,false)}else{if(ua.ie||ua.khtml){pollLoad()}}}};_d0.zoom=new function(){var _d5,_d6;function detect(){if(_d5.offsetLeft!=_d6){_d6=_d5.offsetLeft;resize(null,true)}}this.init=function(){if(!ua.ie||ua.ieVersion<7){return}_d5=dom.create("div");_d5.className=_46;_d5.style.cssText="display:block;width:auto;position:absolute;left:10%;top:-100px;";dom.getBody().appendChild(_d5);_d6=_d5.offsetLeft;setInterval(detect,200)}};this.errors={};var _d7={kwargs:[],replaceAll:function(_d8){for(var i=0;i<this.kwargs.length;i++){_3b.replace(this.kwargs[i])}if(!_d8){this.kwargs=[]}}};function isValidDomain(){if(_3b.domains.length==0){return true}var _da=_a3.domain();for(var i=0;i<_3b.domains.length;i++){var _dc=_3b.domains[i];if(_a3.domainMatches(_da,_dc)){return true}}return false}function isFile(){if(!_3b.fromLocal&&document.location.protocol=="file:"){if(_3b.debug){_3b.errors.fire("isFile")}return true}return false}function resize(evt,_de){var _df=_de?{}:resize.viewport;resize.viewport={width:window.innerWidth||document.documentElement.clientWidth||dom.getBody().clientWidth,height:window.innerHeight||document.documentElement.clientHeight||dom.getBody().clientHeight};if(_df&&resize.viewport.width==_df.width&&resize.viewport.height==_df.height){return}if(resize.timer){clearTimeout(resize.timer)}resize.timer=setTimeout(function(){delete resize.timer;for(var i=0;i<_3b.callbacks.length;i++){_3b.callbacks[i].resize()}},200)}function scale(){for(var i=0;i<_3b.callbacks.length;i++){_3b.callbacks[i].call("scale")}}this.activate=function(){if(!ua.supported||!this.isEnabled||this.isActive||!isValidDomain()||isFile()){return}if(arguments.length>0){this.prefetch.apply(this,arguments)}this.isActive=true;this.setFlashClass();_d0.fragmentIdentifier.fix=ua.ieWin&&_d0.fragmentIdentifier.fix&&window.location.hash!="";if(_d0.fragmentIdentifier.fix){_d0.fragmentIdentifier.cache()}if(!this.autoInitialize){return}_d0.pageLoad.attach();if(ua.ie){window.attachEvent("onunload",function(){dom.addClass(_3d,document.documentElement)})}};this.setFlashClass=function(){if(this.hasFlashClassSet){return}dom.addClass(_3c,dom.getBody()||document.documentElement);this.hasFlashClassSet=true};this.removeFlashClass=function(){if(!this.hasFlashClassSet){return}dom.removeClass(_3c,dom.getBody());dom.removeClass(_3c,document.documentElement);this.hasFlashClassSet=false};this.initialize=function(_e2){if(!this.isActive||!this.isEnabled){return}if(_50){if(!_e2){_d7.replaceAll(false)}return}_50=true;_d7.replaceAll(_e2);if(_3b.repaintOnResize){if(window.addEventListener){window.addEventListener("resize",resize,false);window.addEventListener("scroll",scale,false)}else{window.attachEvent("onresize",resize);window.attachEvent("onscroll",scale)}_d0.zoom.init()}clearPrefetch()};function getSource(src){if(typeof (src)!="string"){if(src.src){src=src.src}if(typeof (src)!="string"){var _e4=[];for(var _e5 in src){if(src[_e5]!=Object.prototype[_e5]){_e4.push(_e5)}}_e4.sort().reverse();var _e6="";var i=-1;while(!_e6&&++i<_e4.length){if(parseFloat(_e4[i])<=ua.flashVersion){_e6=src[_e4[i]]}}src=_e6}}if(!src&&_3b.debug){_3b.errors.fire("getSource")}if(ua.ie&&src.charAt(0)=="/"){src=window.location.toString().replace(/([^:]+)(:\/?\/?)([^\/]+).*/,"$1$2$3")+src}return src}this.prefetch=function(){if((!ua.requiresPrefetch&&!this.isActive)||!ua.supported||!this.isEnabled||!isValidDomain()){return}if(this.setPrefetchCookie&&new RegExp(";?"+_4a+"=true;?").test(document.cookie)){return}try{_4f=true;if(ua.ieWin){prefetchIexplore(arguments)}else{prefetchLight(arguments)}if(this.setPrefetchCookie){document.cookie=_4a+"=true;path="+this.cookiePath}}catch(e){if(_3b.debug){throw e}}};function prefetchIexplore(_e8){for(var i=0;i<_e8.length;i++){document.write("<script defer type=\"sifr/prefetch\" src=\""+getSource(_e8[i])+"\"></script>")}}function prefetchLight(_ea){for(var i=0;i<_ea.length;i++){new Image().src=getSource(_ea[i])}}function clearPrefetch(){if(!ua.ieWin||!_4f){return}try{var _ec=document.getElementsByTagName("script");for(var i=_ec.length-1;i>=0;i--){var _ee=_ec[i];if(_ee.type=="sifr/prefetch"){_ee.parentNode.removeChild(_ee)}}}catch(e){}}function getRatio(_ef,_f0){for(var i=0;i<_f0.length;i+=2){if(_ef<=_f0[i]){return _f0[i+1]}}return _f0[_f0.length-1]||1}function getFilters(obj){var _f3=[];for(var _f4 in obj){if(obj[_f4]==Object.prototype[_f4]){continue}var _f5=obj[_f4];_f4=[_f4.replace(/filter/i,"")+"Filter"];for(var _f6 in _f5){if(_f5[_f6]==Object.prototype[_f6]){continue}_f4.push(_f6+":"+_a3.escape(_a3.toJson(_a3.toHexString(_f5[_f6]))))}_f3.push(_f4.join(","))}return _a3.escape(_f3.join(";"))}function calculate(_f7){var _f8,_f9;if(!ua.ie){_f8=dom.getStyleAsInt(_f7,"lineHeight");_f9=Math.floor(dom.getStyleAsInt(_f7,"height")/_f8)}else{if(ua.ie){var _fa=dom.getComputedStyle(_f7,"fontSize");if(_fa.indexOf("px")>0){_f8=parseInt(_fa)}else{var _fb=_f7.innerHTML;_f7.style.visibility="visible";_f7.style.overflow="visible";_f7.style.position="static";_f7.style.zoom="normal";_f7.style.writingMode="lr-tb";_f7.style.width=_f7.style.height="auto";_f7.style.maxWidth=_f7.style.maxHeight=_f7.style.styleFloat="none";var _fc=_f7;var _fd=_f7.currentStyle.hasLayout;if(_fd){_f7.innerHTML="<div class=\""+_43+"\">X<br />X<br />X</div>";_fc=_f7.firstChild}else{_f7.innerHTML="X<br />X<br />X"}var _fe=_fc.getClientRects();_f8=_fe[1].bottom-_fe[1].top;_f8=Math.ceil(_f8*0.8);if(_fd){_f7.innerHTML="<div class=\""+_43+"\">"+_fb+"</div>";_fc=_f7.firstChild}else{_f7.innerHTML=_fb}_fe=_fc.getClientRects();_f9=_fe.length;if(_fd){_f7.innerHTML=_fb}_f7.style.visibility=_f7.style.width=_f7.style.height=_f7.style.maxWidth=_f7.style.maxHeight=_f7.style.overflow=_f7.style.styleFloat=_f7.style.position=_f7.style.zoom=_f7.style.writingMode=""}}}return {lineHeight:_f8,lines:_f9}}this.replace=function(_ff,_100){if(!ua.supported){return}if(_100){_ff=_a3.copyProperties(_ff,_100)}if(!_50){return _d7.kwargs.push(_ff)}if(_3b.onReplacementStart){_3b.onReplacementStart(_ff)}var _101=_ff.elements;if(!_101&&parseSelector){_101=parseSelector(_ff.selector)}if(_101.length==0){return}var src=getSource(_ff.src);var css=_a3.convertCssArg(_ff.css);var _104=getFilters(_ff.filters);var _105=(_ff.forceClear==null)?_3b.forceClear:_ff.forceClear;var _106=(_ff.fitExactly==null)?_3b.fitExactly:_ff.fitExactly;var _107=_106||(_ff.forceWidth==null?_3b.forceWidth:_ff.forceWidth);var _108=!!(_ff.preventWrap&&!_ff.forceSingleLine);var _109=parseInt(_a3.extractFromCss(css,".sIFR-root","leading"))||0;var _10a=_a3.extractFromCss(css,".sIFR-root","font-size",true)||0;var _10b=_a3.extractFromCss(css,".sIFR-root","background-color",true)||"#FFFFFF";var _10c=_a3.extractFromCss(css,".sIFR-root","kerning",true)||"";var _10d=_ff.gridFitType||_a3.extractFromCss(css,".sIFR-root","text-align")=="right"?"subpixel":"pixel";var _10e=_3b.forceTextTransform?_a3.extractFromCss(css,".sIFR-root","text-transform",true)||"none":"none";var _10f=_a3.extractFromCss(css,".sIFR-root","opacity",true)||"100";var _110=_a3.extractFromCss(css,".sIFR-root","cursor",true)||"default";var _111=_ff.pixelFont||false;var _112=_ff.ratios||_4b;var _113=parseInt(_ff.tuneHeight)||0;var _114=!!_ff.onRelease||!!_ff.onRollOver||!!_ff.onRollOut;if(parseInt(_10a).toString()!=_10a&&_10a.indexOf("px")==-1){_10a=0}else{_10a=parseInt(_10a)}if(parseFloat(_10f)<1){_10f=100*parseFloat(_10f)}var _115="";if(_106){_a3.extractFromCss(css,".sIFR-root","text-align",true)}if(!_ff.modifyCss){_115=_a3.cssToString(css)}var _116=_ff.wmode||"";if(!_116){if(_ff.transparent){_116="transparent"}else{if(_ff.opaque){_116="opaque"}}}if(_116=="transparent"){if(!ua.transparencySupport){_116="opaque"}else{_10b="transparent"}}for(var i=0;i<_101.length;i++){var node=_101[i];if(dom.hasOneOfClassses([_3e,_40,_41],node)){continue}var _119=dom.getDimensions(node);var _11a=_119.height;var _11b=_119.width;var _11c=dom.getComputedStyle(node,"display");if(!_11a||!_11b||_11c==null||_11c=="none"){continue}if(_105&&ua.gecko){node.style.clear="both"}var html=null;if(_3b.fixWrap&&ua.ie&&_11c=="block"){html=node.innerHTML;node.innerHTML="X"}_11b=dom.getWidthFromStyle(node);if(html&&_3b.fixWrap&&ua.ie){node.innerHTML=html}var _11e,_11f;if(!_10a){var _120=calculate(node);_11e=Math.min(_48,Math.max(_47,_120.lineHeight));if(_111){_11e=Math.max(8,8*Math.round(_11e/8))}_11f=_120.lines;if(isNaN(_11f)||!isFinite(_11f)||_11f==0){_11f=1}if(_11f>1&&_109){_11a+=Math.round((_11f-1)*_109)}}else{_11e=_10a;_11f=1}_11a=Math.round(_11f*_11e);if(_105&&ua.gecko){node.style.clear=""}var _121=dom.create("span");_121.className=_41;var _122=node.cloneNode(true);node.parentNode.appendChild(_122);for(var j=0,l=_122.childNodes.length;j<l;j++){_121.appendChild(_122.childNodes[j].cloneNode(true))}if(_ff.modifyContent){_ff.modifyContent(_122,_ff.selector)}if(_ff.modifyCss){_115=_ff.modifyCss(css,_122,_ff.selector)}var _125=_3b.fixHover&&dom.contentIsLink(_122);var _126=handleContent(_122,_10e,_ff.uriEncode);_122.parentNode.removeChild(_122);if(_ff.modifyContentString){_126.text=_ff.modifyContentString(_126.text,_ff.selector)}if(_126.text==""){continue}var _127=Math.round(_11f*getRatio(_11e,_112)*_11e)+_4c+_113;var _128=_107?_11b:"100%";var vars=["content="+_a3.escape(_126.text),"antialiastype="+(_ff.antiAliasType||""),"width="+_11b,"height="+_11a,"renderheight="+_127,"fitexactly="+_106,"tunewidth="+(_ff.tuneWidth||0),"tuneheight="+_113,"offsetleft="+(_ff.offsetLeft||""),"offsettop="+(_ff.offsetTop||""),"thickness="+(_ff.thickness||""),"sharpness="+(_ff.sharpness||""),"kerning="+_10c,"gridfittype="+_10d,"flashfilters="+_104,"opacity="+_10f,"blendmode="+(_ff.blendMode||""),"size="+_11e,"css="+_a3.escape(_115),"selectable="+(_ff.selectable==null?"true":_ff.selectable),"fixhover="+_125,"preventwrap="+_108,"forcesingleline="+(_ff.forceSingleLine===true),"link="+_a3.escape(_126.primaryLink[0]||""),"target="+_a3.escape(_126.primaryLink[1]||""),"events="+_114,"cursor="+_110,"version="+_4d];var _12a=encodeVars(vars);var _12b="sIFR_callback_"+_4e++;var _12c=new CallbackInfo(_12b,vars,_107,{onReplacement:_ff.onReplacement,onRollOver:_ff.onRollOver,onRollOut:_ff.onRollOut,onRelease:_ff.onRelease});window[_12b+"_DoFSCommand"]=(function(_12d){return function(info,arg){_12d.handle(info,arg)}})(_12c);_121.setAttribute("id",_12b+"_alternate");var _130=ua.ie?dom.swf.ie:dom.swf.other;var _131=dom.swf.create(_130,ua.fixFocus&&_ff.fixFocus,_12b,_128,_127,src,_12a,_116,_10b);_130.insert(node,_131);_12c.html=_131;_3b.callbacks.push(_12c);if(_ff.selector){if(!_3b.callbacks[_ff.selector]){_3b.callbacks[_ff.selector]=[_12c]}else{_3b.callbacks[_ff.selector].push(_12c)}}node.appendChild(_121);dom.addClass(_3e,node)}_d0.fragmentIdentifier.restore()};this.getCallbackByFlashElement=function(node){for(var i=0;i<_3b.callbacks.length;i++){if(_3b.callbacks[i].id==node.getAttribute("id")){return _3b.callbacks[i]}}};this.redraw=function(){for(var i=0;i<_3b.callbacks.length;i++){_3b.callbacks[i].resetMovie()}};function encodeVars(vars){return vars.join("&").replace(/%/g,"%25")}function handleContent(_136,_137,_138){_138=_138||_a3.uriEncode;var _139=[],_13a=[],_13b=[];var _13c=_136.childNodes;var i=0;while(i<_13c.length){var node=_13c[i];if(node.nodeType==3){var text=_a3.normalize(node.nodeValue);text=_a3.textTransform(_137,text);text=text.replace(/</g,"&lt;");_13a.push(text)}if(node.nodeType==1){var _140=[];var _141=node.nodeName.toLowerCase();var _142=node.className||"";if(/\s+/.test(_142)){if(_142.indexOf(_42)>-1){_142=_142.match("(\\s|^)"+_42+"-([^\\s$]*)(\\s|$)")[2]}else{_142=_142.match(/^([^\s]+)/)[1]}}if(_142!=""){_140.push("class=\""+_142+"\"")}if(_141=="a"){var href=_138(node.getAttribute("href")||"");var _144=node.getAttribute("target")||"";_140.push("href=\""+href+"\"","target=\""+_144+"\"");if(_13b.length==0){_13b=[href,_144]}}_13a.push("<"+_141+(_140.length>0?" ":"")+_140.join(" ")+">");if(node.hasChildNodes()){_139.push(i);i=0;_13c=node.childNodes;continue}else{if(!/^(br|img)$/i.test(node.nodeName)){_13a.push("</",node.nodeName.toLowerCase(),">")}}}if(_139.length>0&&!node.nextSibling){do{i=_139.pop();_13c=node.parentNode.parentNode.childNodes;node=_13c[i];if(node){_13a.push("</",node.nodeName.toLowerCase(),">")}}while(i==_13c.length-1&&_139.length>0)}i++}return {text:_13a.join("").replace(/\n|\r/g,""),primaryLink:_13b}}function CallbackInfo(id,vars,_147,_148){this.id=id;this.vars=vars;this._events=_148;this._forceWidth=_147;this._firedReplacementEvent=!(_148.onReplacement!=null);this.html=null}CallbackInfo.prototype.getFlashElement=function(){return document.getElementById(this.id)};CallbackInfo.prototype.available=function(){var _149=this.getFlashElement();return _149&&_149.parentNode};CallbackInfo.prototype.handle=function(info,arg){if(!this.available()){return}switch(/(FSCommand\:)?(.+)/.exec(info)[2]){case "resize":var _14c=this.getFlashElement();var $=arg.split(/\:|,/);_14c.setAttribute($[0],$[1]);if($.length>2){_14c.style[$[2]]=$[3]+"px"}if(ua.khtml){var _14e=_14c.offsetHeight}if(!this._firedReplacementEvent){this._events.onReplacement(this);this._firedReplacementEvent=true}break;case "resetmovie":this.resetMovie();break;case "blur":dom.blurElement(this.getFlashElement());break;case "event":if(this._events[arg]){this._events[arg](this)}break;default:if(this.debugHandler&&/(FSCommand\:)?debug/.test(info)){this.debugHandler(info,arg)}}};CallbackInfo.prototype.call=function(type,_150){if(!this.available()){return false}var _151=this.getFlashElement();try{_151.SetVariable("callbackType",type);_151.SetVariable("callbackValue",_150);_151.SetVariable("callbackTrigger",true)}catch(e){return false}return true};CallbackInfo.prototype.replaceText=function(_152,_153){var _154=_a3.escape(_152);this.updateVars("content",_154);if(this.call("replacetext",_154)){var node=this.getAlternate();if(_153){while(node.firstChild){node.removeChild(node.firstChild)}for(var i=0;i<_153.length;i++){node.appendChild(_153[i])}}else{try{node.innerHTML=_152}catch(e){}}return true}return false};CallbackInfo.prototype.updateVars=function(name,_158){for(var i=0;i<this.vars.length;i++){if(this.vars[i].split("=")[0]==name){this.vars[i]=name+"="+_158;break}}};CallbackInfo.prototype.resetMovie=function(){if(!this.available()){return}var _15a=this.getFlashElement();var node=_15a.parentNode;var vars=encodeVars(this.vars);if(ua.ie){this.html=this.html.replace(/(flashvars(=|\"\svalue=)\")[^\"]+/,"$1"+vars);node.replaceChild(dom.nodeFromHtml(this.html),_15a)}else{var _15d=this.html.getElementsByTagName("param");for(var i=0;i<_15d.length;i++){if(_15d[i].getAttribute("name")=="flashvars"){_15d[i].setAttribute("value",vars);break}}node.replaceChild(this.html.cloneNode(true),_15a)}};CallbackInfo.prototype.resize=function(){if(!this.available()){return}var _15f=this.getFlashElement();var _160=_15f.parentNode;var _161=_15f.offsetWidth;var _162=_15f.getAttribute("width");var _163=_15f.getAttribute("height");_15f.style.width="0px";_15f.style.height="0px";_15f.parentNode.style.minHeight=_163;var _164=this.getAlternate().childNodes;var _165=[];for(var i=0;i<_164.length;i++){var node=_164[i].cloneNode(true);_165.push(node);_160.appendChild(node)}var _168=dom.getWidthFromStyle(_160);for(var i=0;i<_165.length;i++){_160.removeChild(_165[i])}_15f.style.width=_15f.style.height=_15f.parentNode.style.minHeight="";_15f.setAttribute("width",this._forceWidth?_168:_162);_15f.setAttribute("height",_163);if(_168!=_161){this.call("resize",_168)}else{this.call("scale")}};CallbackInfo.prototype.changeCSS=function(css){css=_a3.escape(_a3.cssToString(_a3.convertCssArg(css)));this.updateVars("css",css);return this.call("changecss",css)};CallbackInfo.prototype.getAlternate=function(){return document.getElementById(this.id+"_alternate")}};