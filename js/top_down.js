function improvement_splitting_at(input_array, i) {

	i = parseInt(i);
	var first_part_mean = mean(input_array.slice(0, i+1));
	var second_part_mean = mean(input_array.slice(i+1));
	return second_part_mean - first_part_mean;
}

function calculate_error(part_array) {
	return standard_deviation(part_array);
}

function split_further(input_array, start, end) {
	start = parseInt(start)
	end = parseInt(end)
	if(calculate_error(input_array.slice(start, end)) > max_error) {
		top_down(input_array.slice(start, end));
	} else {
		final_result.push(input_array.slice(start, end))
		return
	}
}

function mean(input_array) {
	var sum = 0;
	for(var i in input_array) {
		sum += input_array[i];
	}
	var mean = sum/input_array.length;
	return mean;
}

function standard_deviation(input_array) {
	var input_mean = mean(input_array);
	var variance_numerator = 0;
	for(var i in input_array){
		variance_numerator += Math.pow((input_mean - input_array[i]), 2);
	}
	var variance = variance_numerator/input_array.length;
	var sd = Math.sqrt(variance);
	return sd
}

var max_error;
var final_result = [];

function top_down(input_array){
	if (max_error == undefined){
		max_error = 0.50*standard_deviation(input_array);
	}
	if(input_array.length < 2){
		return 
	}
	var best_so_far = Infinity;
	var input_size = input_array.length;
	for (var i in input_array){
		if (input_size-1 == i){
			continue;
		}
		var improvement_in_approximation = 1/Math.abs(improvement_splitting_at(input_array, i))
		if(improvement_in_approximation < best_so_far){
			var breakpoint = parseInt(i)
			var best_so_far = improvement_in_approximation
		}
	}
	split_further(input_array, 0, breakpoint+1);
	split_further(input_array, breakpoint+1, input_size+1)
	return final_result
}