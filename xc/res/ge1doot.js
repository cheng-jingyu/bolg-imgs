"use strict";var ge1doot=ge1doot||{json:null,screen:null,pointer:null,camera:null,loadJS:function(t,i,s){"string"==typeof t&&(t=[t]);for(var e=0,n=t.length;e<n;e++)!function(t){var e=document.createElement("script");i&&(e.readyState?e.onreadystatechange=function(){"loaded"!=e.readyState&&"complete"!=e.readyState||(e.onreadystatechange=null,0==--n&&i(s||!1))}:e.onload=function(){0==--n&&i(s||!1)}),e.src=t,document.getElementsByTagName("head")[0].appendChild(e)}(t[e])}};ge1doot.Screen=function(t){(ge1doot.screen=this).elem=document.getElementById(t.container)||t.container,this.ctx="CANVAS"==this.elem.tagName&&this.elem.getContext("2d"),this.style=this.elem.style,this.left=0,this.top=0,this.width=0,this.height=0,this.cursor="default",this.setup=t,this.resize=function(){var t=this.elem;for(this.width=t.offsetWidth,this.height=t.offsetHeight,this.left=0,this.top=0;null!=t;t=t.offsetParent)this.left+=t.offsetLeft,this.top+=t.offsetTop;this.ctx&&(this.elem.width=this.width,this.elem.height=this.height),this.setup.resize&&this.setup.resize()},this.setCursor=function(t){t!==this.cursor&&"ontouchstart"in window==!1&&(this.cursor=t,this.style.cursor=t)},window.addEventListener("resize",function(){ge1doot.screen.resize()},!1),this.setup.resize||this.resize()},ge1doot.Pointer=function(t){var e=ge1doot.pointer=this,i=document.body,s=document.documentElement;this.setup=t,this.screen=ge1doot.screen,this.elem=this.screen.elem,this.X=0,this.Y=0,this.Xi=0,this.Yi=0,this.bXi=0,this.bYi=0,this.Xr=0,this.Yr=0,this.startX=0,this.startY=0,this.scale=0,this.wheelDelta=0,this.isDraging=!1,this.hasMoved=!1,this.isDown=!1,this.evt=!1;var n,o,h=0,r=0;t.tap&&(this.elem.onclick=function(){return!1}),t.documentMove||(document.ontouchmove=function(t){t.preventDefault()}),document.addEventListener("MSHoldVisual",function(t){t.preventDefault()},!1),void 0!==this.elem.style.msTouchAction&&(this.elem.style.msTouchAction="none"),this.pointerDown=function(t){this.isDown||(this.elem.setCapture&&this.elem.setCapture(),this.isDraging=!1,this.hasMoved=!1,this.isDown=!0,this.evt=t,this.Xr=(void 0!==t.clientX?t:t.touches[0]).clientX,this.Yr=(void 0!==t.clientY?t:t.touches[0]).clientY,this.X=h=this.Xr-this.screen.left,this.Y=r=this.Yr-this.screen.top+(s&&s.scrollTop||i.scrollTop),this.setup.down&&this.setup.down(t))},this.pointerMove=function(t){this.Xr=(void 0!==t.clientX?t:t.touches[0]).clientX,this.Yr=(void 0!==t.clientY?t:t.touches[0]).clientY,this.X=this.Xr-this.screen.left,this.Y=this.Yr-this.screen.top+(s&&s.scrollTop||i.scrollTop),this.isDown&&(this.Xi=this.bXi+(this.X-h),this.Yi=this.bYi-(this.Y-r)),(11<Math.abs(this.X-h)||11<Math.abs(this.Y-r))&&(this.hasMoved=!0,this.isDown?this.isDraging?this.setup.drag&&this.setup.drag(t):(this.startX=h,this.startY=r,this.setup.startDrag&&this.setup.startDrag(t),this.isDraging=!0):(h=this.X,r=this.Y)),this.setup.move&&this.setup.move(t)},this.pointerUp=function(t){this.bXi=this.Xi,this.bYi=this.Yi,this.hasMoved?this.setup.up&&this.setup.up(this.evt):(this.X=h,this.Y=r,this.setup.tap&&this.setup.tap(this.evt)),this.isDraging=!1,this.isDown=!1,this.hasMoved=!1,this.setup.up&&this.setup.up(this.evt),this.elem.releaseCapture&&this.elem.releaseCapture(),this.evt=!1},this.pointerCancel=function(t){this.elem.releaseCapture&&this.elem.releaseCapture(),this.isDraging=!1,this.hasMoved=!1,this.isDown=!1,this.bXi=this.Xi,this.bYi=this.Yi,r=h=0},"ontouchstart"in window&&(this.elem.ontouchstart=function(t){return e.pointerDown(t),!1},this.elem.ontouchmove=function(t){return e.pointerMove(t),!1},this.elem.ontouchend=function(t){return e.pointerUp(t),!1},this.elem.ontouchcancel=function(t){return e.pointerCancel(t),!1}),document.addEventListener("mousedown",function(t){(t.target===e.elem||t.target.parentNode&&t.target.parentNode===e.elem||t.target.parentNode.parentNode&&t.target.parentNode.parentNode===e.elem)&&(void 0!==t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,t.preventDefault(),e.pointerDown(t))},!1),document.addEventListener("mousemove",function(t){e.pointerMove(t)},!1),document.addEventListener("mouseup",function(t){e.pointerUp(t)},!1),document.addEventListener("gesturechange",function(t){return t.preventDefault(),1<t.scale?e.scale=.1:t.scale<1?e.scale=-.1:e.scale=0,e.setup.scale&&e.setup.scale(t),!1},!1),window.navigator.msPointerEnabled&&(n=0,(o=new MSGesture).target=this.elem,this.elem.addEventListener("MSPointerDown",function(t){t.pointerType==t.MSPOINTER_TYPE_TOUCH&&(o.addPointer(t.pointerId),n++)},!1),this.elem.addEventListener("MSPointerOut",function(t){t.pointerType==t.MSPOINTER_TYPE_TOUCH&&n--},!1),this.elem.addEventListener("MSGestureHold",function(t){t.preventDefault()},!1),this.elem.addEventListener("MSGestureChange",function(t){return 1<n&&(t.preventDefault&&t.preventDefault(),e.scale=t.velocityExpansion,e.setup.scale&&e.setup.scale(t)),!1},!1)),window.addEventListener&&this.elem.addEventListener("DOMMouseScroll",function(t){return t.preventDefault&&t.preventDefault(),e.wheelDelta=10*t.detail,e.setup.wheel&&e.setup.wheel(t),!1},!1),this.elem.onmousewheel=function(){return e.wheelDelta=.25*-event.wheelDelta,e.setup.wheel&&e.setup.wheel(event),!1}},window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,16)};