let arr = [2, 4, 1, 9, 6, 3, 5]
function swap(arr, left, right) {
	var temp = arr[left];
	arr[left] = arr[right];
	arr[right] = temp;
}
function QuickSort(arr, left, right) {
	if (left == right) return;
	var bbLeft = left;
	var base = arr[(left+right)/2];
	console.log(arr, left, right, base);
	while (left < right) {
		while (arr[right] > base && left < right) {
			right--;
		}
		// if (left < right) {
		// 	swap(arr, left, right)	
		// 	console.log(arr, left, right, base);
		// }

		while (arr[left] < base && left < right) {
			left++;
		}
		if (left < right) {
			swap(arr, left, right)
			console.log(arr, left, right, base);
		}
		console.log(left, right);
	}

	QuickSort(arr, bbLeft, left - 1);
	QuickSort(arr, left + 1, arr.length - 1);
}
QuickSort(arr, 0, arr.length - 1);
console.log(arr);
