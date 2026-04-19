import type { Category } from "./types";

// Pre-made categories shipped with the app. Each has 30+ items so the
// same word doesn't repeat too quickly across rounds.
export const BUILTIN_CATEGORIES: Category[] = [
  {
    id: "animals",
    name: "Animals",
    emoji: "🐾",
    source: "builtin",
    words: [
      "Lion", "Tiger", "Elephant", "Giraffe", "Zebra", "Kangaroo", "Panda",
      "Koala", "Penguin", "Dolphin", "Shark", "Octopus", "Eagle", "Owl",
      "Parrot", "Crocodile", "Snake", "Turtle", "Frog", "Horse", "Cow",
      "Pig", "Sheep", "Goat", "Chicken", "Duck", "Rabbit", "Fox", "Wolf",
      "Bear", "Deer", "Squirrel", "Bat", "Bee", "Butterfly",
    ],
  },
  {
    id: "food",
    name: "Food",
    emoji: "🍔",
    source: "builtin",
    words: [
      "Pizza", "Burger", "Sushi", "Pasta", "Tacos", "Ramen", "Salad",
      "Steak", "Pancakes", "Waffles", "Donut", "Croissant", "Bagel",
      "Sandwich", "Burrito", "Curry", "Dumplings", "Lasagna", "Risotto",
      "Paella", "Kebab", "Falafel", "Hummus", "Pho", "Pad Thai",
      "Fried Rice", "Spring Roll", "Cheesecake", "Brownie", "Ice Cream",
      "Smoothie", "Coffee", "Tea", "Lemonade", "Milkshake",
    ],
  },
  {
    id: "movies",
    name: "Movies",
    emoji: "🎬",
    source: "builtin",
    words: [
      "Titanic", "Inception", "Avatar", "Gladiator", "Joker", "Frozen",
      "Shrek", "Toy Story", "Finding Nemo", "Up", "Coco", "Moana",
      "Jaws", "Rocky", "Avengers", "Iron Man", "Spider-Man", "Batman",
      "Superman", "Star Wars", "Harry Potter", "Lord of the Rings",
      "The Matrix", "Pulp Fiction", "Forrest Gump", "Goodfellas",
      "The Godfather", "Casablanca", "Jurassic Park", "Back to the Future",
      "E.T.", "Alien", "Predator", "Terminator", "Die Hard",
    ],
  },
  {
    id: "countries",
    name: "Countries",
    emoji: "🌍",
    source: "builtin",
    words: [
      "France", "Italy", "Spain", "Germany", "Japan", "China", "India",
      "Brazil", "Argentina", "Mexico", "Canada", "USA", "UK", "Ireland",
      "Norway", "Sweden", "Finland", "Iceland", "Russia", "Greece",
      "Turkey", "Egypt", "Morocco", "Kenya", "South Africa", "Australia",
      "New Zealand", "Thailand", "Vietnam", "Indonesia", "Philippines",
      "Korea", "Portugal", "Netherlands", "Belgium",
    ],
  },
  {
    id: "sports",
    name: "Sports",
    emoji: "⚽",
    source: "builtin",
    words: [
      "Soccer", "Basketball", "Tennis", "Baseball", "Cricket", "Rugby",
      "Hockey", "Golf", "Boxing", "Wrestling", "Swimming", "Cycling",
      "Running", "Skiing", "Snowboarding", "Surfing", "Skateboarding",
      "Volleyball", "Badminton", "Table Tennis", "Archery", "Fencing",
      "Gymnastics", "Karate", "Judo", "Sailing", "Rowing", "Climbing",
      "Diving", "Polo", "Bowling", "Curling", "Darts", "Chess",
      "Pool",
    ],
  },
  {
    id: "jobs",
    name: "Jobs",
    emoji: "💼",
    source: "builtin",
    words: [
      "Doctor", "Nurse", "Teacher", "Lawyer", "Engineer", "Architect",
      "Firefighter", "Police Officer", "Pilot", "Chef", "Baker", "Farmer",
      "Artist", "Musician", "Actor", "Writer", "Photographer", "Dancer",
      "Scientist", "Astronaut", "Programmer", "Designer", "Plumber",
      "Electrician", "Mechanic", "Carpenter", "Barber", "Dentist",
      "Veterinarian", "Pharmacist", "Journalist", "Translator", "Banker",
      "Accountant", "Detective",
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return BUILTIN_CATEGORIES.find((c) => c.id === id);
}
