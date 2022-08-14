export default function QuickSort({
	handleSort,
	unsortedArray,
    handleQuickSort
}) {
	async function quickSort(arr, low, high) {
		if (low >= high) {
			return;
		}
		let pi = await partition(arr, low, high);
		await quickSort(arr, low, pi - 1);
		await quickSort(arr, pi + 1, high);
		handleSort(arr);
	}

	async function partition(arr, low, high) {
        
		let pivot = arr[high];

		let i = low - 1;
		for (let j = low; j < high; j++) {

			if (arr[j] < pivot) {
				i++;
				swap(arr, i, j);
                await handleQuickSort(i,j,high);
			}
            handleSort(arr);
		}
		swap(arr, i + 1, high);
        await handleQuickSort(i+1,high,high);
        handleSort(arr);
		return i + 1;
	}

	function swap(arr, i, j) {
		let temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}

	return (
		<a
			className="quickSort sort"
			onClick={() =>
				quickSort(unsortedArray, 0, unsortedArray.length - 1)
			}
			href
		>
			Quick Sort
		</a>
	);
}
