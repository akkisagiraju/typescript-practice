interface ArgsObject {
	value1: number;
	value2: number;
}

const parseArgs = (args: Array<string>): ArgsObject => {
	if (args.length > 4) throw new Error(`Too many arguments`);
	if (args.length < 4) throw new Error('Not enough arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			value1: Number(args[2]),
			value2: Number(args[3])
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}
};


const calculateBmi = (a: number, b: number): string => {
	const bmi = (b * 100 * 100) / (a * a);
	if (bmi < 18.5) {
		return 'Underweight';
	} else if (bmi > 18.5 && bmi <= 25) {
		return 'Normal (healthy weight)';
	} else if (bmi > 25) {
		return 'Overweight';
	}
	return '';
};

try {
	const { value1, value2 } = parseArgs(process.argv);
	console.log(calculateBmi(value1, value2));
} catch (error) {
	console.log('Error, something bad happened, message: ', error.message);
}
