const util = require("util");

const names = process.env.NAME_LIST.split(",").map((name) => name.trim());
const isHyperMode = process.env.HYPER_MODE === "true";
const teamName = process.env.TEAM_NAME;

const getDelay = (round) => (round > 30 ? 50 : round > 10 ? 100 : 350);

const getHyperModeText = (text) => {
  const numberOfTabs = Math.floor(Math.random() * 10);
  const numberOfNewLines = Math.floor(Math.random() * 30);
  return `${Array(numberOfNewLines).fill("\n").join("")}${Array(numberOfTabs)
    .fill("\t")
    .join("")}${text}\n${Array(numberOfTabs)
    .fill("\t")
    .join("")}${text}\n${Array(numberOfTabs).fill("\t").join("")}${text}`;
};

const getOutput = (...data) => {
  const text = util.format(process.env.OUTPUT_TEMPLATE, ...data);
  return isHyperMode ? getHyperModeText(text) : text;
};

(async () => {
  console.clear();
  let count = 100;
  let sacrificed = "";
  while (--count > 0) {
    const delay = getDelay(count);
    const random = Math.floor(Math.random() * names.length);
    process.stdout.write(
      isHyperMode ? getHyperModeText(names[random]) : names[random]
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    sacrificed = names[random];
    console.clear();
  }
  process.stdout.write(getOutput(sacrificed, teamName));
})();
