/*********************
*** MOD: JLopez MX ***
*********************/
var vd = document.getElementById("player");
vp.setup(config);
vp.on("playAttemptFailed", function(e){
var po = vp.getPosition();
var retry = Math.round(localStorage.getItem("retry"));
var res = {};
var servers = [""];
var xhttp = new XMLHttpRequest();

if(retry == null) retry = 0;
if(retry < servers.length || vp.getDuration() > 0){
retry += 1;
localStorage.setItem("retry", retry);
ld.style.display="block";
vd.style.display="none";
/*********************
*** MOD: JLopez MX ***
*********************/
for(var i=0; i<servers.length; i++){
xhttp.onreadystatechange = function() {
if (this.readyState === 4) {
if(this.status === 200){
res = JSON.parse(this.responseText);
if(res.status === "ok"){
var script = document.createElement("script");
script.innerHTML = res.result;
document.body.appendChild(script);
vp.seek(po);
} else {
vp.stop();
}
} else {
vp.stop();
}
ld.style.display="none";
vd.style.display="block";
}
};
xhttp.open("GET", servers[i] + "", true);
xhttp.send();
}
}
});
vp.on("error", function(e){
var po = vp.getPosition();
var retry = Math.round(localStorage.getItem("retry"));
var res = {};
var servers = [""];
var xhttp = new XMLHttpRequest();
/*********************
*** MOD: JLopez MX ***
*********************/
if(retry == null) retry = 0;
if(retry < servers.length || vp.getDuration() > 0){
retry += 1;
localStorage.setItem("retry", retry);
ld.style.display="block";
vd.style.display="none";

for(var i=0; i<servers.length; i++){
xhttp.onreadystatechange = function() {
if (this.readyState === 4) {
if(this.status === 200){
res = JSON.parse(this.responseText);
if(res.status === "ok"){
var script = document.createElement("script");
script.innerHTML = res.result;
document.body.appendChild(script);
vp.seek(po);
} else {
vp.stop();
}
} else {
vp.stop();
}
ld.style.display="none";
vd.style.display="block";
}
};
xhttp.open("GET", servers[i] + "", true);
xhttp.send();
}
}
});
vp.on("ready", function(){
ld.style.display="none";
vd.style.display="block";
var mt = localStorage.getItem("jwplayer.mute");
var vl = localStorage.getItem("jwplayer.volume");
if (mt !== null && (vl === null || vl === 0)) {
vp.setMute(true);
} else if(vl !== null && vl > 0) {
vp.setVolume(Math.round(vl));
}
if("jwplayer" === "jwplayer" && ("" === "netflix" || "" === "hotstar")){
var ts = document.querySelector(".jw-slider-time");
ts.prepend(document.querySelector(".jw-text-elapsed"));
ts.append(document.querySelector(".jw-text-duration"));
}
});
vp.on("firstFrame", function() {
var firstFrame = JSON.stringify(this.qoe().firstFrame);
console.log("The player took "+firstFrame+"ms to get to the first video frame.");
});
vp.on("time", function(e) {
localStorage.setItem(timeElapse, Math.round(e.position));
});
vp.on("beforePlay", function(){
var list = document.getElementsByClassName("jw-button-container");
var rewind = document.querySelector("[button=\"rewind\"]");
var forward = document.querySelector("[button=\"forward\"]");
if(list.length){
list[0].insertBefore(rewind, list[0].childNodes[2]);
list[0].insertBefore(forward, list[0].childNodes[4]);
}
if(lastTime !== null && lastTime > vp.getPosition() && lastTime < vp.getDuration()){
dResume.style.display="block";
document.getElementById("timez").innerHTML=prettySecond(lastTime);
}
});
vp.once("complete", function(e) {
localStorage.removeItem(timeElapse);
window.parent.postMessage(JSON.stringify({
playback: {
status: "complete"
}
}), "*");
});
/*********************
*** MOD: JLopez MX ***
*********************/
vp.addButton('<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-rewind" viewBox="0 0 1024 1024" focusable="false"><path d="M455.68 262.712889l-67.072 79.644444-206.904889-174.08 56.775111-38.627555a468.48 468.48 0 1 1-201.216 328.817778l103.310222 13.141333a364.487111 364.487111 0 0 0 713.614223 139.605333 364.373333 364.373333 0 0 0-479.971556-435.541333l-14.904889 5.973333 96.312889 81.066667zM329.955556 379.505778h61.610666v308.167111H329.955556zM564.167111 364.088889c61.269333 0 110.933333 45.511111 110.933333 101.717333v135.566222c0 56.149333-49.664 101.660444-110.933333 101.660445s-110.933333-45.511111-110.933333-101.660445V465.749333c0-56.149333 49.664-101.660444 110.933333-101.660444z m0 56.490667c-27.249778 0-49.322667 20.252444-49.322667 45.226666v135.566222c0 24.974222 22.072889 45.169778 49.322667 45.169778 27.192889 0 49.265778-20.195556 49.265778-45.169778V465.749333c0-24.917333-22.072889-45.169778-49.265778-45.169777z" p-id="7377"></path></svg>', "10 Seconds", function() {
var seek = 0, time = vp.getPosition() - 10;
seek = time <= 0 ? 0 : time;
vp.seek(seek);
return true;
}, "rewind");
vp.addButton('<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-forward" viewBox="0 0 1024 1024" focusable="false"><path d="M561.948444 262.712889l67.015112 79.644444 206.961777-174.08-56.832-38.627555a468.48 468.48 0 1 0 201.216 328.817778l-103.310222 13.141333a364.487111 364.487111 0 0 1-713.557333 139.605333 364.373333 364.373333 0 0 1 479.971555-435.541333l14.904889 5.973333-96.369778 81.066667zM329.955556 379.505778h61.610666v308.167111H329.955556zM564.167111 364.088889c61.269333 0 110.933333 45.511111 110.933333 101.717333v135.566222c0 56.149333-49.664 101.660444-110.933333 101.660445s-110.933333-45.511111-110.933333-101.660445V465.749333c0-56.149333 49.664-101.660444 110.933333-101.660444z m0 56.490667c-27.249778 0-49.322667 20.252444-49.322667 45.226666v135.566222c0 24.974222 22.072889 45.169778 49.322667 45.169778 27.192889 0 49.265778-20.195556 49.265778-45.169778V465.749333c0-24.917333-22.072889-45.169778-49.265778-45.169777z" p-id="7407"></path></svg>', "10 Seconds", function() {
var seek = 0, time = vp.getPosition() + 10;
seek = time <= 0 ? 0 : time;
vp.seek(seek);
return true;
}, "forward");

window.onorientationchange = function(e) {
if (e.landscape) {
var vid = document.getElementsByTagName("video")[0];
if (vid.requestFullscreen) {
vid.requestFullscreen();
} else if (vid.mozRequestFullScreen) {
vid.mozRequestFullScreen();
} else if (vid.webkitRequestFullscreen) {
vid.webkitRequestFullscreen();
}}};

/*********************
*** MOD: JLopez MX ***
*********************/