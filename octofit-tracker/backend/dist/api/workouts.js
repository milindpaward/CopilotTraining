"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = __importDefault(require("../models/workout"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const items = await workout_1.default.find().populate('createdBy', 'name email').lean();
        res.json({
            resource: 'workouts',
            count: items.length,
            items,
        });
    }
    catch (error) {
        res.status(500).json({
            resource: 'workouts',
            error: 'Failed to fetch workouts',
            details: error,
        });
    }
});
exports.default = router;
