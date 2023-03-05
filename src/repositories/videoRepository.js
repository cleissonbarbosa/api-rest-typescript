"use strict";
exports.__esModule = true;
exports.videoRepository = void 0;
var data_source_1 = require("../data-source");
var Video_1 = require("../entities/Video");
exports.videoRepository = data_source_1.AppDataSource.getRepository(Video_1.Video);
