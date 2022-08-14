export default function MergeSort({
	handleMergeSort,
	unsortedArray,
	handleComparisionAnimation,
	handleSingleAnimation,
	handleNumOfComparision,
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
			await handleComparisionAnimation(i + left, mid + 1 + j);
			handleNumOfComparision();
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
			await handleSingleAnimation(left + i);
			arr[k] = leftArr[i];
			i++;
			k++;
		}
		while (j < rightArrLength) {
			await handleSingleAnimation(mid + 1 + j);
			arr[k] = arr[mid + 1 + j];
			j++;
			k++;
		}
	}
	return (
		<a
			className="mergeSort sort"
			onClick={() => {
				mergeSort(unsortedArray, 0, unsortedArray.length - 1);
			}}
		>
			Merge Sort
		</a>
	);
}
