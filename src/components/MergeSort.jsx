export default function MergeSort({
	handleMergeSort,
	unsortedArray,
	handleComparisionAnimation,
}) {
	async function mergeSort(array, left, right) {
		if (left >= right) {
			return;
		}
		let mid = left + Math.floor((right - left) / 2);
		await mergeSort(array, left, mid);
		await mergeSort(array, mid + 1, right);
		await merge(array, left, mid, right);
		handleMergeSort(array);
	}

	// handleComparisionAnimation(i,mid+1+j);
	// await new Promise(r => setTimeout(r, 2000));

	async function merge(arr, left, mid, right) {
		let leftArrLength = mid - left + 1;
		let rightArrLength = right - mid;

		let leftArr = [];

		for (let x = 0; x < leftArrLength; x++) {
			leftArr[x] = arr[left + x];
		}

		//Index of leftArr
		let i = 0;
		//Index of rightArr
		let j = 0;
		//Index of mergedArr
		let k = left;

		while (i < leftArrLength && j < rightArrLength) {
            await handleComparisionAnimation(i+left,mid+1+j);
            console.log("array after promise: "+arr)
			if (leftArr[i] <= arr[mid + 1 + j]) {
				arr[k] = leftArr[i];
				i++;
			} else {
				arr[k] = arr[mid + 1 + j];
				j++;
			}
			k++;
		}

		while (i < leftArrLength) {
			arr[k] = leftArr[i];
			i++;
			k++;
		}
		while (j < rightArrLength) {
			arr[k] = arr[mid + 1 + j];
			j++;
			k++;
		}
		console.log("Array after: " + arr);
	}
	return (
		<a
			className="mergeSort"
			onClick={() =>
				mergeSort(unsortedArray, 0, unsortedArray.length - 1)
			}
			href
		>
			Merge Sort
		</a>
	);
}
