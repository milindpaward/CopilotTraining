"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true,
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    targetMuscles: [{ type: String, required: true, trim: true }],
    equipment: [{ type: String, trim: true }],
    recommendedFor: [{ type: String, trim: true }],
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
});
const WorkoutModel = (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = WorkoutModel;
