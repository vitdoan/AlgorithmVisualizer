export default function SelectionSort({
	setColorAtIndex,
	handleSort,
	handleComparisionAnimation,
	unsortedArray,
	handleSingleAnimation,
    handleNumOfComparision
}) {
	async function selectionSort(array) {
		for (let i = 0; i < array.length; i++) {
			let min = i;
			for (let j = i + 1; j < array.length; j++) {
				await handleComparisionAnimation(j, min);
                handleNumOfComparision();
				if (array[j] < array[min]) {
					min = j;
				}
			}
			let temp = array[i];
			array[i] = array[min];
			array[min] = temp;
			handleSort(array);
			setColorAtIndex(i, "#b4e9fa");
		}
		await new Promise((res) => {
			setTimeout(() => {
				res();
			}, 250);
		});
		for (let i = 0; i < array.length; i++) {
			await handleSingleAnimation(i, "#b0b1fc");
		}
	}
	return (
		<a
			className="selectionSort sort"
			onClick={() => {
                selectionSort(unsortedArray)}}
			href
		>
			Selection Sort
		</a>
	);
}
