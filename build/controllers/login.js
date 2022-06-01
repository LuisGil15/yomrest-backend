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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
router.post("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = {
        userName: _req.body.userName,
        password: _req.body.password,
    };
    const user = yield User.findOne({ userName });
    const passwordCorrect = user === null
        ? false
        : yield bcrypt_1.default.compare(password, user.password);
    if (!(user && passwordCorrect)) {
        res.status(401).json({
            success: false,
            error: "Usuario o contraseña incorrectos",
        });
    }
    else {
        const token = jwt.sign({
            userName,
            id: user._id,
        }, "luis", {
            expiresIn: "7d"
        });
        res.status(200).json({
            success: true,
            user: {
                userName: userName,
                token
            }
        });
    }
}));
module.exports = router;
