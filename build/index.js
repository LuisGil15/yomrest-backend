"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Config
app.set("port", process.env.PORT || 3001);
require("./database");
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({ origin: true, credentials: true }));
// Routes
app.use('/api/login', require('./controllers/login'));
app.use('/api/local', require('./controllers/local'));
app.get('/', (_req, res) => {
    res.send('Hello World - Luis Gil');
});
// Server
app.listen(app.get("port"), () => {
    console.log(`Server listening on port ${app.get("port")}`);
});
