/* eslint-disable @typescript-eslint/camelcase */

import express from 'express';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  let info;
  if (height && weight && !isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = (Number(weight) * 100 * 100) / (Number(height) * Number(height));
    if (bmi < 18.5) {
      info = 'Underweight';
    } else if (bmi > 18.5 && bmi < 25) {
      info = 'Normal (healthy weight)';
    } else if (bmi > 25) {
      info = 'Overweight';
    }

    return res.status(200).json({ weight: Number(weight), height: Number(height), info });
  }

  return res.status(400).json({
    error: "malformatted parameters"
  });

});

app.post('/exercises', (req, res) => {
  const daily_exercises: Array<number> = req.body.daily_exercises;
  const target: number = req.body.target;
  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({
      error: "parameters missing"
    });
  } else if (isNaN(Number(target)) || daily_exercises.filter(item => isNaN(Number(item))).length > 0) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }
  const responseObject = calculateExercises(daily_exercises, target);
  return res.status(200).json(responseObject);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});