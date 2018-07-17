function quickSort(arr) {
	let i = 0, j = arr.length, temp;
	temp = arr[i];
	while (i < j) {
		if (temp < arr[j]) j--;
		if (temp > arr[i]) i++;
	}

}

quickSort([4, 3, 8, 9, 1, 2, 6, 10, 5, 7]);