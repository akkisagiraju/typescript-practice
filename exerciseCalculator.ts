interface ArgsInterface {
	value1: Array<number>;
	value2: number;
}

const parseArguments = (args: Array<string>): ArgsInterface => {
	if (args.length < 3) throw new Error('Not enough arguments');
	const newArray = args.slice(3);
	const numberArray = newArray.map(item => {
		if (!isNaN(Number(item))) {
			return Number(item);
		} else {
			throw new Error('Providied values were not numbers!');
		}
	});

	if (!isNaN(Number(args[2]))) {
		return {
			value1: numberArray,
			value2: Number(args[2])
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}
};


interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercises = (arr: Array<number>, num: number): Result => {
	const periodLength = arr.length;
	const trainingDays = arr.filter(val => val !== 0).length;
	const average = arr.reduce((acc, val) => acc + val, 0) / periodLength;
	let success;
	if (average > num) {
		success = true;
	} else {
		success = false;
	}
	const rating = 2;
	const ratingDescription = 'not too bad but could be better';
	const target = num;

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average
	};
};

try {
	const { value1, value2 } = parseArguments(process.argv);
	console.log(calculateExercises(value1, value2));
} catch (error) {
	console.log('Error, something bad happened, message: ', error.message);
}

export { calculateExercises };