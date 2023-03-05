"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RoomController = void 0;
var roomRepository_1 = require("../repositories/roomRepository");
var subjectRepository_1 = require("../repositories/subjectRepository");
var videoRepository_1 = require("../repositories/videoRepository");
var RoomController = /** @class */ (function () {
    function RoomController() {
    }
    RoomController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, description, newRoom, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, description = _a.description;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        newRoom = roomRepository_1.roomRepository.create({ name: name, description: description });
                        return [4 /*yield*/, roomRepository_1.roomRepository.save(newRoom)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(201).json(newRoom)];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.status(500).json({ message: 'Internal Sever Error' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RoomController.prototype.createVideo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, url, idRoom, room, newVideo, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, url = _a.url;
                        idRoom = req.params.idRoom;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, roomRepository_1.roomRepository.findOneBy({ id: Number(idRoom) })];
                    case 2:
                        room = _b.sent();
                        if (!room) {
                            return [2 /*return*/, res.status(404).json({ message: 'Aula não existe' })];
                        }
                        newVideo = videoRepository_1.videoRepository.create({
                            title: title,
                            url: url,
                            room: room
                        });
                        return [4 /*yield*/, videoRepository_1.videoRepository.save(newVideo)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, res.status(201).json(newVideo)];
                    case 4:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [2 /*return*/, res.status(500).json({ message: 'Internal Sever Error' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RoomController.prototype.roomSubject = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var subject_id, idRoom, room, subject, roomUpdate, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subject_id = req.body.subject_id;
                        idRoom = req.params.idRoom;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, roomRepository_1.roomRepository.findOneBy({ id: Number(idRoom) })];
                    case 2:
                        room = _a.sent();
                        if (!room) {
                            return [2 /*return*/, res.status(404).json({ message: 'Aula não existe' })];
                        }
                        return [4 /*yield*/, subjectRepository_1.subjectRepository.findOneBy({
                                id: Number(subject_id)
                            })];
                    case 3:
                        subject = _a.sent();
                        if (!subject) {
                            return [2 /*return*/, res.status(404).json({ message: 'Disciplina não existe' })];
                        }
                        roomUpdate = __assign(__assign({}, room), { subjects: [subject] });
                        return [4 /*yield*/, roomRepository_1.roomRepository.save(roomUpdate)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, res.status(204).send()];
                    case 5:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, res.status(500).json({ message: 'Internal Sever Error' })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RoomController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var rooms, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, roomRepository_1.roomRepository.find({
                                relations: {
                                    subjects: true,
                                    videos: true
                                }
                            })];
                    case 1:
                        rooms = _a.sent();
                        return [2 /*return*/, res.json(rooms)];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2 /*return*/, res.status(500).json({ message: 'Internal Sever Error' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RoomController;
}());
exports.RoomController = RoomController;
