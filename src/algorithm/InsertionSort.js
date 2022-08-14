export default function InsertionSort({
	handleInsertionSort,
	unsortedArray,
	setColorAtIndex,
	handleSort,
	handleNumOfComparision
}) {
	async function insertionSort(array) {
		for (let i = 1; i < array.length; i++) {
			for (let j = i; j > 0; j--) {
				handleNumOfComparision();
				if (array[j] < array[j - 1]) {
					let temp = array[j];
					array[j] = array[j - 1];
					array[j - 1] = temp;
					await handleInsertionSort(j - 1, j, i);
				} else {
					break;
				}
				handleSort(array);
			}
			handleSort(array);
			setColorAtIndex(i, "#b0b1fc");
		}
		console.log(array);
	}
	return (
		<a
			className="insertionSort sort"
			onClick={() => {
				insertionSort(unsortedArray, unsortedArray.length)}}
			href
		>
			Insertion Sort
		</a>
	);
}
