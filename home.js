const name = "Seng";

const math = 85;
const khmer = 75;
const english = 90;
const computer = 80;
const history = 70;
const biology = 95;

const total = math + khmer + english + computer + history + biology;
const average = total / 6;

console.log("Student Name: " + name);
console.log("Math: " + math);
console.log("Khmer: " + khmer);
console.log("English: " + english);
console.log("Computer: " + computer);
console.log("History: " + history);
console.log("Biology: " + biology);
console.log("Total Points: " + total);
console.log("Average Points: " + average.toFixed(2));