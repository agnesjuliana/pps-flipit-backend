import { PrismaClient, EducationLevel, Role } from '@prisma/client';
import csv from 'csvtojson';
import * as bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

const salt = bcryptjs.genSaltSync(12);

async function users() {
  const dataUser = await csv().fromFile(__dirname + '/data/users.csv');
  let users = dataUser.map(user => {
    return {
      email: user.email,
      password: bcryptjs.hashSync(user.password, salt),
      role: user.role as Role,
      name: user.name,
      educationLevel: EducationLevel.Undergraduate,
    };
  });

  for (const user of users) {
    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        email: user.email,
        password: user.password,
        role: user.role,
        name: user.name,
        educationLevel: user.educationLevel,
      },
      create: {
        email: user.email,
        password: user.password,
        role: user.role,
        name: user.name,
        educationLevel: user.educationLevel,
      },
    });
  }
}

const main = async () => {
  await users();
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
