import { PrismaClient, EducationLevel, Role } from '@prisma/client';
import csv from 'csvtojson';
import * as bcryptjs from 'bcryptjs';
import path from 'path';

const prisma = new PrismaClient();
const salt = bcryptjs.genSaltSync(12);

async function seedUsers() {
  const dataUser = await csv().fromFile(
    path.join(__dirname, '/data/users.csv'),
  );

  for (const row of dataUser) {
    await prisma.user.upsert({
      where: { email: row.email },
      update: {}, // Skip update if exists, or update fields if necessary
      create: {
        name: row.name,
        email: row.email,
        password: bcryptjs.hashSync(row.password, salt),
        role: row.role as Role,
        educationLevel: row.educationLevel as EducationLevel,
      },
    });
  }
  console.log('✅ Users seeded');
}

async function seedStreaks() {
  const dataStreaks = await csv().fromFile(
    path.join(__dirname, '/data/streaks.csv'),
  );

  for (const row of dataStreaks) {
    const user = await prisma.user.findUnique({ where: { email: row.email } });
    if (user) {
      await prisma.streak.create({
        data: {
          userId: user.id,
          startDate: new Date(row.startDate),
          endDate: row.endDate ? new Date(row.endDate) : null,
          longestStreak: parseInt(row.longestStreak),
        },
      });
    }
  }
  console.log('✅ Streaks seeded');
}

async function seedQuizzes() {
  const dataQuizzes = await csv().fromFile(
    path.join(__dirname, '/data/quizzes.csv'),
  );

  for (const row of dataQuizzes) {
    const user = await prisma.user.findUnique({ where: { email: row.email } });

    if (user) {
      // We check if this exact attempt already exists to prevent duplicates on re-run
      const existing = await prisma.quizAttempt.findFirst({
        where: {
          userId: user.id,
          date: new Date(row.date),
          correctAnswers: parseInt(row.correctAnswers),
        },
      });

      if (!existing) {
        await prisma.quizAttempt.create({
          data: {
            userId: user.id,
            totalQuestions: parseInt(row.totalQuestions),
            correctAnswers: parseInt(row.correctAnswers),
            date: new Date(row.date),
          },
        });
      }
    }
  }
  console.log('✅ Quiz Attempts updated');
}

async function main() {
  // Order matters because of Foreign Key constraints
  await seedUsers();
  await seedStreaks();
  await seedQuizzes();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
