import { InferSchemaType, Schema, model } from 'mongoose';

const userRankSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const teamRankSchema = new Schema(
  {
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const leaderboardSchema = new Schema(
  {
    period: { type: String, enum: ['weekly', 'monthly'], required: true },
    topUsers: [userRankSchema],
    topTeams: [teamRankSchema],
    generatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export type Leaderboard = InferSchemaType<typeof leaderboardSchema>;

const LeaderboardModel = model<Leaderboard>('Leaderboard', leaderboardSchema);

export default LeaderboardModel;
