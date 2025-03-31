import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

// Set your custom time frame
const START_DATE = "2025-03-01";  // Change this to your desired start date
const END_DATE = "2025-03-31";    // Change this to your desired end date
const NUM_COMMITS = 50;           // Change this to the number of commits you want

const makeCommits = (n, startDate, endDate) => {
  if (n === 0) return git.push();

  const start = moment(startDate);
  const end = moment(endDate);

  // Generate a random date within the custom time range
  const randomDate = moment(start.valueOf() + random.int(0, end.diff(start, "days")) * 86400000).format();

  const data = { date: randomDate };
  console.log(`Commit on: ${randomDate}`);

  jsonfile.writeFile(path, data, () => {
    git.add([path]).commit(randomDate, { "--date": randomDate }, () => {
      makeCommits(n - 1, startDate, endDate);
    });
  });
};

// Run with the specified custom time frame
makeCommits(NUM_COMMITS, START_DATE, END_DATE);
