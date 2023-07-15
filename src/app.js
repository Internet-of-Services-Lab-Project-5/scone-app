const fsPromises = require("fs").promises;

/* ---------------------------------- MAIN ---------------------------------- */

async function main() {
  try {
    console.log("Started execution");
    const passengers = parseRequesterData();
    console.log("Searching for", passengers);
    const dataset = await readDataset();
    console.log("Dataset", dataset);
    if (!dataset) throw Error("invalid dataset");
    const hits = searchPassengers(dataset, passengers);
    console.log("Hits", hits);
    console.log("Writing result", hits.join("\n"));
    await writeResult(hits.join("\n"));
    console.log("Finished execution");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

/* --------------------------------- HELPERS -------------------------------- */

function parseRequesterData() {
  const requesterData = process.env.IEXEC_REQUESTER_SECRET_1;

  try {
    const data = JSON.parse(requesterData);
    return data;
  } catch (e) {
    console.log("cannot parse requester data", e, requesterData);
  }
}

async function readDataset() {
  const iexecIn = process.env.IEXEC_IN;
  const datasetFileName = process.env.IEXEC_DATASET_FILENAME;

  try {
    const confidentialFile = await fsPromises.readFile(`${iexecIn}/${datasetFileName}`);
    const text = confidentialFile.toString();
    const lines = text.split("\n");
    const header = lines[0].split(",");
    const data = lines.slice(1).map((line) => {
      const recordData = line.split(",");
      const record = {};
      header.forEach((key, index) => {
        record[key] = recordData[index];
      });
      return record;
    });
    return data;
  } catch (e) {
    console.log("Could not read dataset file", e, datasetFileName);
  }
}

function searchPassengers(dataset, passengers) {
  return dataset
    .filter((record) =>
      passengers.some(
        (passenger) =>
          record['"first_name"'] === `"${passenger.firstname}"` &&
          record['"last_name"'] === `"${passenger.lastname}"` &&
          record['"birthdate"'] === `"${passenger.birthdate}"`
      )
    )
    .map((record) => JSON.stringify(record));
}

async function writeResult(content) {
  const iexecOut = process.env.IEXEC_OUT;

  await fsPromises.writeFile(`${iexecOut}/result.txt`, content);
  const computedJsonObj = {
    "deterministic-output-path": `${iexecOut}/result.txt`,
  };
  await fsPromises.writeFile(`${iexecOut}/computed.json`, JSON.stringify(computedJsonObj));
}

/* ----------------------------------- RUN ---------------------------------- */

main();
