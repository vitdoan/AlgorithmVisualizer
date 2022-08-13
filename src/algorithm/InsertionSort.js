export default function InsertionSort({
	handleInsertionSort,
	unsortedArray,
    setColorAtIndex,
    handleSort,
}) {
	async function insertionSort(array) {
		for (let i = 1; i < array.length; i++) {
			for (let j = i; j > 0; j--) {
				if (array[j] < array[j - 1]) {
					let temp = array[j];
					array[j] = array[j - 1];
					array[j - 1] = temp;
                    console.log("current array: "+array);
                    await handleInsertionSort(array,j-1,j);
				} else {
					break;
				}
                handleSort(array);
			}
            handleSort(array);
		}
        console.log(array);
	}
	return (
		<a
			className="insertionSort sort"
			onClick={() => insertionSort(unsortedArray, unsortedArray.length)}
			href
		>
			Insertion Sort
		</a>
	);
}
