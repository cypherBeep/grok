function mergeSort(list){
	let left = [];
	let right = [];

	if(list.length <= 1) return list;

	let middle = list.length / 2;
	let left = list.slice(0, middle);
	let right = list.slice(middle, list.length);

	return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right){
	let result = [];

	while(left.length || right.length){
		if(left[0] < right[0]) result.push(left.shift());
		else result.push(right.shift());

		if(left.length) result.push(left.shift())
		else result.push(right.shift());
		
	}
	
	return result;
}
