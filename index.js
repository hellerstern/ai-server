const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const fs = require("fs");

function generateString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.post("/upload", async (req, res) => {
  const file = req.files.file;
  let fileNameSplited = file.name.split(".");
  let extension = fileNameSplited[fileNameSplited.length - 1];
  let fileName = `${generateString(
    10
  )}-${new Date().getMilliseconds()}.${extension}`;
  try {
    await file.mv(`uploads/${fileName}`);
    return res.status(200).json({
      message: "success",
      fileName,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong during uploading a file" });
  }
});

app.listen(8000, () => console.log("Your server is running on PORT " + 8000));
