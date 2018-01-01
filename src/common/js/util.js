/*
输入 ?id=123&name=bbbb
输出 {id:123,name:bbbb}
 */
export function urlParse(){
	let url=window.location.search;//获取url里面 ？后面的参数
	let obj={};
	let reg=/[?&][^?&]+=[^?&]/g;//匹配？&符号后面的一个或者多个非？&的用=等于号链接的字符
	let arr=url.match(reg);
	if (arr) {
		arr.forEach((item)=>{
			let temparr=item.substring(1).split("=");
			let key=decodeURIComponent(temparr[0]);
			let val=decodeURIComponent(temparr[1]);
			obj[key]=val;
			//console.log(key);
			//console.log(val);
		})
	}
	return obj;
}