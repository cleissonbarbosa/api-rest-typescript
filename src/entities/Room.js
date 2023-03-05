"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Room = void 0;
var typeorm_1 = require("typeorm");
var Subject_1 = require("./Subject");
var Video_1 = require("./Video");
var Room = /** @class */ (function (_super) {
    __extends(Room, _super);
    function Room() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Room.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' })
    ], Room.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true })
    ], Room.prototype, "description");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Video_1.Video; }, function (video) { return video.room; })
    ], Room.prototype, "videos");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Subject_1.Subject; }, function (subject) { return subject.rooms; })
    ], Room.prototype, "subjects");
    Room = __decorate([
        (0, typeorm_1.Entity)('rooms')
    ], Room);
    return Room;
}(typeorm_1.BaseEntity));
exports.Room = Room;
