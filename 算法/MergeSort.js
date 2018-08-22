

function Merge(array, low, mid, high) {
	let i = low; // i是第一段序列的下标
	let j = mid + 1; // j是第二段序列的下标
	let k = 0; // k是临时存放合并序列的下标
	let array2 = new Array(); // array2是临时合并序列

	// 扫描第一段和第二段序列，直到有一个扫描结束
	while (i <= mid && j <= high) {
		// 判断第一段和第二段取出的数哪个更小，将其存入合并序列，并继续向下扫描
		if (array[i] <= array[j]) {
			array2[k] = array[i];
			i++;
			k++;
		} else {
			array2[k] = array[j];
			j++;
			k++;
		}
	}
	// 若第一段序列还没扫描完，将其全部复制到合并序列
	while (i <= mid) {
		array2[k] = array[i];
		i++;
		k++;
	}
	// 若第二段序列还没扫描完，将其全部复制到合并序列
	while (j <= high) {
		array2[k] = array[j];
		j++;
		k++;
	}
	// 将合并序列复制到原始序列中
	for (k = 0, i = low; i <= high; i++ , k++) {
		array[i] = array2[k];
	}
}
function mergePass(arr, gap) {
	let i = 0;
	//归并gap长度的两个相邻子表
	for (i = 0; i + 2 * gap - 1 < arr.length; i = i + 2 * gap) {
		Merge(arr, i, (i + gap - 1), i + 2 * gap - 1);
	}
	//余下两个子表，后者长度小于gap
	if (i + gap - 1 < arr.length) {
		Merge(arr, i, (i + gap - 1), arr.length - 1);
		console.log(i, (i + gap - 1), arr.length - 1)
	}
}
function mergeSort(arr) {
	for (let gap = 1; gap < arr.length; gap = gap * 2) {
		mergePass(arr, gap);
		console.log(arr);
	}
}

let arr = [2, 4, 1, 9, 6, 3, 5];
mergeSort(arr);
console.log(arr);

