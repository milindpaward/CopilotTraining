"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    type: {
        type: String,
        enum: ['run', 'cycling', 'strength', 'yoga', 'swim', 'hiit'],
        required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    loggedAt: { type: Date, default: Date.now },
    notes: { type: String, trim: true },
}, {
    timestamps: true,
});
const ActivityModel = (0, mongoose_1.model)('Activity', activitySchema);
exports.default = ActivityModel;
