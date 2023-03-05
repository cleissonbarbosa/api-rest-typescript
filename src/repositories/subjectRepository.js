"use strict";
exports.__esModule = true;
exports.subjectRepository = void 0;
var data_source_1 = require("../data-source");
var Subject_1 = require("../entities/Subject");
exports.subjectRepository = data_source_1.AppDataSource.getRepository(Subject_1.Subject);
