"use strict";
exports.__esModule = true;
exports.roomRepository = void 0;
var data_source_1 = require("../data-source");
var Room_1 = require("../entities/Room");
exports.roomRepository = data_source_1.AppDataSource.getRepository(Room_1.Room);
