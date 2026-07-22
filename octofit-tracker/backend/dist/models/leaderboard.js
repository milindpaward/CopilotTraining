"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userRankSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { _id: false });
const teamRankSchema = new mongoose_1.Schema({
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { _id: false });
const leaderboardSchema = new mongoose_1.Schema({
    period: { type: String, enum: ['weekly', 'monthly'], required: true },
    topUsers: [userRankSchema],
    topTeams: [teamRankSchema],
    generatedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});
const LeaderboardModel = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.default = LeaderboardModel;
