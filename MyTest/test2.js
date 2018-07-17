console.log(parseInt('0x4E07', 16));
console.log(0x4E07.toString(2));
function transfer(num) {
	let ary = ['1110', '10', '10'];
	let binary = num.toString(2);
	ary[2] = ary[2]+binary.slice(binary.length-6);
	ary[1] = ary[1]+binary.slice(binary.length-12,binary.length-6);
	ary[0] = ary[0]+binary.slice(0,binary.length-12).padStart(4,'0');
	let result =  ary.join('');
	console.log(ary);
	return parseInt(result,2).toString(8);
  }
  //万
  let result = transfer(0x4E07);//E4B887


  console.log(result);



