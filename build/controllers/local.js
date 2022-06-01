"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Local = require("../models/Local");
const User = require("../models/User");
const userAuth = require("../middleware/userAuth");
router.get("/", userAuth, (_req, res) => {
    const { idUser } = _req.body;
    if (!idUser) {
        res.status(401).json({
            success: false,
            error: "Token invalido",
        });
    }
    else {
        const user = User.findById(idUser);
        if (!user) {
            res.status(401).json({
                success: false,
                error: "Usuario no encontrado",
            });
        }
        else {
            Local.find()
                .then((locals) => {
                res.json({
                    success: true,
                    items: locals
                });
            })
                .catch((err) => {
                res.json({
                    success: false,
                    error: err
                });
            });
        }
    }
});
router.post("/", userAuth, (_req, res) => {
    const { idUser } = _req.body;
    if (!idUser) {
        res.status(401).json({
            success: false,
            error: "Token invalido",
        });
    }
    else {
        const user = User.findById(idUser);
        if (!user) {
            res.status(401).json({
                success: false,
                error: "Usuario no encontrado",
            });
        }
        else {
            if (_req.body.name && _req.body.contact && _req.body.address) {
                delete _req.body.idUser;
                const newLocal = new Local({
                    name: _req.body.name,
                    contact: _req.body.contact,
                    address: _req.body.address,
                });
                newLocal.save((err) => {
                    if (err) {
                        res.send({
                            success: false,
                            error: err,
                        });
                    }
                    else {
                        res.send({
                            success: true,
                            item: newLocal,
                        });
                    }
                });
            }
            else {
                res.send({
                    success: false,
                    error: "Datos faltantes",
                });
            }
        }
    }
});
router.put("/", userAuth, (_req, res) => {
    const { idUser } = _req.body;
    if (!idUser) {
        res.status(401).json({
            success: false,
            error: "Token invalido",
        });
    }
    else {
        const user = User.findById(idUser);
        if (!user) {
            res.status(401).json({
                success: false,
                error: "Usuario no encontrado",
            });
        }
        else {
            if (_req.body.name && _req.body.contact && _req.body.address) {
                delete _req.body.idUser;
                Local.findByIdAndUpdate(_req.body.id, {
                    name: _req.body.name,
                    contact: _req.body.contact,
                    address: _req.body.address,
                }, (err) => {
                    if (err) {
                        res.send({
                            success: false,
                            error: err,
                        });
                    }
                    else {
                        res.send({
                            success: true,
                            item: _req.body,
                        });
                    }
                });
            }
            else {
                res.send({
                    success: false,
                    error: "Datos faltantes",
                });
            }
        }
    }
});
router.delete("/:id", userAuth, (_req, res) => {
    const { idUser } = _req.body;
    if (!idUser) {
        res.status(401).json({
            success: false,
            error: "Token invalido",
        });
    }
    else {
        const user = User.findById(idUser);
        if (!user) {
            res.status(401).json({
                success: false,
                error: "Usuario no encontrado",
            });
        }
        else {
            if (_req.params.id) {
                delete _req.body.idUser;
                Local.findByIdAndRemove(_req.params.id, (err) => {
                    if (err) {
                        res.send({
                            success: false,
                            error: err,
                        });
                    }
                    else {
                        res.send({
                            success: true,
                            item: _req.body,
                        });
                    }
                });
            }
            else {
                res.send({
                    success: false,
                    error: "Datos faltantes",
                });
            }
        }
    }
});
module.exports = router;
