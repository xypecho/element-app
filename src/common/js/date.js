export function formatDate(date,fmt){
	if (/(y+)/.test(fmt)) {
		fmt=fmt.replace(RegExp.$1,date.getFullYear());
		console.log(fmt);
	}
	let o={
		'M+':date.getMonth()+1,
		'd+':date.getDate(),
		'h+':date.getHours(),
		'm+':date.getMinutes()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str=o[k]+"";
			fmt=fmt.replace(RegExp.$1,str);
		}
	}
	return fmt;
}