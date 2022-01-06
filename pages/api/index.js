const fsp = require("fs").promises;
import path from "path";
export default async function (req, res) {
  try {
    // get file path
    const filePath = path.join(process.cwd(), "public/wordlist.txt");

    // wait for data fetch
    const fileData = await fsp.readFile(filePath);

    // turn file into list
    const wordList = fileData.toString().split("\n");

    // filter based on keyword
    const keyWord = req.query["key"] ? req.query["key"] : "";
    const filterList = wordList.filter((e) =>
      e.toLowerCase().startsWith(keyWord.toLowerCase())
    );

    // return result
    res.status(200).json(filterList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error reading data" });
  }
}
