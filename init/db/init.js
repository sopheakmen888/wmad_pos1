"use strict";
/* eslint-disable no-console, no-process-exit */
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var bcrypt = require("bcrypt");
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var role, username, email, password, hashedPassword, data, rawSql, sqlReducedToStatements, sqlStatements, _i, sqlStatements_1, sql, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, 10, 12]);
                    return [4 /*yield*/, prisma.role.create({
                            data: {
                                id: 1,
                                name: "Admin",
                            },
                        })];
                case 1:
                    role = _a.sent();
                    console.log("Role created:", role.name);
                    username = process.env.ADMIN_DEFAULT_USERNAME || "admin";
                    email = process.env.ADMIN_DEFAULT_EMAIL || "admin@demo.com";
                    password = process.env.ADMIN_DEFAULT_PASSWORD || "admin";
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 2:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                username: username,
                                email: email,
                                password: hashedPassword,
                                roleId: 1,
                            },
                        })];
                case 3:
                    data = _a.sent();
                    console.log("Admin created:", data.username);
                    return [4 /*yield*/, fs.promises.readFile(path.join(__dirname, "seed.sql"), {
                            encoding: "utf-8",
                        })];
                case 4:
                    rawSql = _a.sent();
                    sqlReducedToStatements = rawSql
                        .split("\n")
                        .filter(function (line) { return !line.startsWith("--"); }) // remove comments-only lines
                        .join("\n")
                        .replace(/\r\n|\n|\r/g, " ") // remove newlines
                        .replace(/\s+/g, " ");
                    sqlStatements = splitStringByNotQuotedSemicolon(sqlReducedToStatements);
                    _i = 0, sqlStatements_1 = sqlStatements;
                    _a.label = 5;
                case 5:
                    if (!(_i < sqlStatements_1.length)) return [3 /*break*/, 8];
                    sql = sqlStatements_1[_i];
                    return [4 /*yield*/, prisma.$executeRawUnsafe(sql)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8: return [3 /*break*/, 12];
                case 9:
                    e_1 = _a.sent();
                    console.error(e_1);
                    process.exit(1);
                    return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, prisma.$disconnect()];
                case 11:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function splitStringByNotQuotedSemicolon(input) {
    var result = [];
    var currentSplitIndex = 0;
    var isInString = false;
    for (var i = 0; i < input.length; i++) {
        if (input[i] === "'") {
            // toggle isInString
            isInString = !isInString;
        }
        if (input[i] === ";" && !isInString) {
            result.push(input.substring(currentSplitIndex, i + 1));
            currentSplitIndex = i + 2;
        }
    }
    return result;
}
void main();
