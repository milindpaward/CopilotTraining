import mongoose from 'mongoose';
import ActivityModel from '../models/activity';
import LeaderboardModel from '../models/leaderboard';
import TeamModel from '../models/team';
import UserModel from '../models/user';
import WorkoutModel from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
    ]);

    const teams = await TeamModel.insertMany([
      {
        name: 'Summit Sprinters',
        city: 'Seattle',
        motto: 'Climb higher every rep',
        points: 2480,
      },
      {
        name: 'Pulse Pirates',
        city: 'Austin',
        motto: 'Steal every second',
        points: 2210,
      },
    ]);

    const users = await UserModel.insertMany([
      {
        name: 'Ava Martinez',
        email: 'ava.martinez@octofit.dev',
        age: 29,
        fitnessLevel: 'advanced',
        goals: ['Marathon prep', 'Lower resting heart rate'],
        team: teams[0]._id,
      },
      {
        name: 'Noah Kim',
        email: 'noah.kim@octofit.dev',
        age: 34,
        fitnessLevel: 'intermediate',
        goals: ['Build core strength', 'Lose 5 kg'],
        team: teams[0]._id,
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@octofit.dev',
        age: 26,
        fitnessLevel: 'advanced',
        goals: ['Improve VO2 max', 'Hit 10k under 50 mins'],
        team: teams[1]._id,
      },
      {
        name: 'Ethan Brooks',
        email: 'ethan.brooks@octofit.dev',
        age: 31,
        fitnessLevel: 'beginner',
        goals: ['Consistency 4x/week', 'Mobility'],
        team: teams[1]._id,
      },
    ]);

    await TeamModel.updateOne(
      { _id: teams[0]._id },
      { $set: { members: [users[0]._id, users[1]._id] } },
    );
    await TeamModel.updateOne(
      { _id: teams[1]._id },
      { $set: { members: [users[2]._id, users[3]._id] } },
    );

    await ActivityModel.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'run',
        durationMinutes: 52,
        caloriesBurned: 610,
        distanceKm: 9.8,
        notes: 'Tempo intervals on trail route',
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'strength',
        durationMinutes: 47,
        caloriesBurned: 420,
        notes: 'Upper-body push and pull session',
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'cycling',
        durationMinutes: 68,
        caloriesBurned: 735,
        distanceKm: 27.4,
        notes: 'Endurance ride with hill repeats',
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        type: 'yoga',
        durationMinutes: 35,
        caloriesBurned: 185,
        notes: 'Mobility and breathing focus',
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'hiit',
        durationMinutes: 28,
        caloriesBurned: 360,
        notes: 'Sprints and kettlebell circuit',
      },
    ]);

    await LeaderboardModel.insertMany([
      {
        period: 'weekly',
        topUsers: [
          { user: users[2]._id, score: 980, rank: 1 },
          { user: users[0]._id, score: 945, rank: 2 },
          { user: users[1]._id, score: 710, rank: 3 },
        ],
        topTeams: [
          { team: teams[0]._id, score: 1655, rank: 1 },
          { team: teams[1]._id, score: 1580, rank: 2 },
        ],
      },
      {
        period: 'monthly',
        topUsers: [
          { user: users[0]._id, score: 3880, rank: 1 },
          { user: users[2]._id, score: 3725, rank: 2 },
          { user: users[1]._id, score: 3010, rank: 3 },
        ],
        topTeams: [
          { team: teams[0]._id, score: 6890, rank: 1 },
          { team: teams[1]._id, score: 6535, rank: 2 },
        ],
      },
    ]);

    await WorkoutModel.insertMany([
      {
        title: 'Foundational Full Body Circuit',
        difficulty: 'beginner',
        durationMinutes: 30,
        targetMuscles: ['legs', 'core', 'shoulders'],
        equipment: ['dumbbells', 'mat'],
        recommendedFor: ['Consistency', 'Fat loss'],
        createdBy: users[1]._id,
      },
      {
        title: 'Threshold Runner Session',
        difficulty: 'advanced',
        durationMinutes: 50,
        targetMuscles: ['quads', 'glutes', 'calves'],
        equipment: ['treadmill'],
        recommendedFor: ['Endurance', 'Race pace'],
        createdBy: users[0]._id,
      },
      {
        title: 'Athlete Recovery Flow',
        difficulty: 'intermediate',
        durationMinutes: 25,
        targetMuscles: ['hips', 'hamstrings', 'lower back'],
        equipment: ['yoga strap'],
        recommendedFor: ['Mobility', 'Recovery day'],
        createdBy: users[3]._id,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
