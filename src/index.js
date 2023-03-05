"use strict";
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
var express_1 = require("express");
var data_source_1 = require("./data-source");
var routes_1 = require("./routes");
var adminjs_1 = require("adminjs");
var express_2 = require("@adminjs/express");
var typeorm_1 = require("@adminjs/typeorm"); // or any other adapter
var Room_1 = require("./entities/Room");
var Subject_1 = require("./entities/Subject");
var Video_1 = require("./entities/Video");
var User_1 = require("./entities/User");
var login_1 = require("./components/login");
var passwords_1 = require("@adminjs/passwords");
var argon2_1 = require("argon2");
data_source_1.AppDataSource.initialize().then(function () {
    adminjs_1["default"].registerAdapter({ Database: typeorm_1.Database, Resource: typeorm_1.Resource });
    var ADMIN_SECRET = process.env.ADMIN_SECRET || 's3cr3t4dmlnp4$$';
    var authenticate = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
        var user, matched;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.User.findOneBy({ email: email })];
                case 1:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 3];
                    return [4 /*yield*/, argon2_1["default"].verify(user.password, password)];
                case 2:
                    matched = _a.sent();
                    if (matched && user.role.includes(User_1.UserRole.ADMIN)) {
                        return [2 /*return*/, user];
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/, false];
            }
        });
    }); };
    var adminJs = new adminjs_1["default"]({
        resources: [
            {
                resource: User_1.User,
                options: {
                    properties: {
                        password: {
                            isVisible: {
                                list: false,
                                filter: false,
                                show: false,
                                edit: false
                            }
                        }
                    }
                },
                features: [
                    (0, passwords_1["default"])({
                        properties: {
                            encryptedPassword: 'password',
                            password: 'newPassword'
                        },
                        hash: argon2_1["default"].hash
                    })
                ]
            },
            {
                resource: Room_1.Room,
                options: {
                    id: 'sala_de_aula'
                }
            },
            Video_1.Video,
            {
                resource: Subject_1.Subject,
                options: {
                    id: 'assunto'
                }
            },
        ]
    });
    adminJs.overrideLogin({ component: login_1["default"] });
    var adminRouter = express_2["default"].buildAuthenticatedRouter(adminJs, {
        authenticate: authenticate,
        cookiePassword: ADMIN_SECRET
    }, null, {
        resave: true,
        saveUninitialized: true,
        ADMIN_SECRET: ADMIN_SECRET
    });
    var app = (0, express_1["default"])();
    app.use(adminJs.options.rootPath, adminRouter);
    app.use(express_1["default"].json());
    app.use(routes_1["default"]);
    return app.listen(process.env.PORT, function () {
        console.log("AdminJS started on http://localhost:".concat(process.env.PORT).concat(adminJs.options.rootPath));
    });
});
