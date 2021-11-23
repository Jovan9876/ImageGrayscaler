/*
 * Project:
 * File Name: main.js
 * Description:
 *
 * Created Date: November 22
 * Author: Jovan Sandhu
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;


IOhandler.unzip()
.then(IOhandler.readDir())
.then(IOhandler.grayScale())