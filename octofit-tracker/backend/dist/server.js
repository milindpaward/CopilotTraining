"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const users_1 = __importDefault(require("./api/users"));
const teams_1 = __importDefault(require("./api/teams"));
const activities_1 = __importDefault(require("./api/activities"));
const leaderboard_1 = __importDefault(require("./api/leaderboard"));
const workouts_1 = __importDefault(require("./api/workouts"));
const app = (0, express_1.default)();
const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.get('/api/health', (_req, res) => {
    res.json({
        ok: true,
        service: 'octofit-tracker-backend',
        port: PORT,
        dbReadyState: database_1.default.readyState,
    });
});
app.listen(PORT, () => {
    console.log(`API running at ${baseUrl}`);
});
