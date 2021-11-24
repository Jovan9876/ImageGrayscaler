/*
 * Project:
 * File Name: main.js
 * Description:
 *
 * Created Date: November 22
 * Author: Jovan Sandhu
 *
 */
path = require("path");

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

IOhandler.unzip("./myfile.zip", "unzipped")
  .then((pathOut) => {
    let images = IOhandler.readDir(pathOut);
    return images;
  })
  .then((images) => {
    let count = 0
    for (let i of images) {
      string = i.toString()
      IOhandler.grayScale(string, `gray${count}.png`)
      count += 1
    }

  })
  .catch((err) => {
    console.error(err);
  });
