/*
 * Project:
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: November 22
 * Author: Jovan Sandhu
 *
 */

const { resolve } = require("path");
const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn).pipe(unzipper.Extract({ path: pathOut }));
    console.log("Extraction operation complete");
    resolve(pathOut);
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */

const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    let images = [];
    fs.readdir(dir, (err, data) => {
      if (err) {
        reject(err);
      } else {
        data.forEach((file) => {
          if (file.includes(".png")) {
            images.push(dir + path.sep + file);
          }
        });
        resolve(images);
      }
    });
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  fs.createReadStream(pathIn)
    .pipe(
      new PNG({
        filterType: 4,
      })
    )
    .on("parsed", function () {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;

          // invert color

          let gray =
            255 -
            this.data[idx] +
            255 -
            this.data[idx + 1] +
            255 -
            this.data[idx + 2];

          this.data[idx] = gray;
          this.data[idx + 1] = gray;
          this.data[idx + 2] = gray;

          // and reduce opacity
          this.data[idx + 3] = this.data[idx + 3] >> 1;
        }
      }
      this.pack().pipe(fs.createWriteStream(pathOut));
    })
    .on("error", function (err) {
      console.error(err);
    });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
