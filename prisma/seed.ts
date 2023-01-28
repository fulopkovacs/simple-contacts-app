import { prisma } from "../src/server/db";
import { images } from "./base64images";

async function main() {
  const userId = "39ad5f1f-7da1-48f4-8de3-ff29de51d5c5";
  const phone = "+36012345678";
  await prisma.user.upsert({
    where: {
      id: userId,
    },
    create: {
      name: "Anonymous Unicorn",
      id: userId,
    },
    update: {},
  });

  const initialContacts = [
    {
      name: "Timothy Lewis",
      phone,
      profilePhoto: images.timothy,
      email: "timothy@mail.com",
      id: "5c653efa-bd1c-4e76-b411-3cda06597b1a",
    },
    {
      name: "Sarah Wright",
      phone,
      profilePhoto: images.sarah,
      email: "sarah@mail.com",
      id: "5c653efa-bd1c-4e76-b411-3cda06597b1b",
    },
    {
      name: "Lucy Jones",
      phone,
      profilePhoto: images.lucy,
      email: "lucy@mail.com",
      id: "5c653efa-bd1c-4e76-b411-3cda06597b1c",
    },
    {
      name: "Jake Perez",
      phone,
      profilePhoto: images.jake,
      email: "jake@mail.com",
      id: "5c653efa-bd1c-4e76-b411-3cda06597b1d",
    },
    {
      name: "Adebayo Rodriguez",
      phone,
      profilePhoto: images.adebayo,
      email: "adebayo@mail.com",
      id: "5c653efa-bd1c-4e76-b411-3cda06597b1e",
    },
  ]

  // Prisma has a bug with async operations in an SQLite db,
  // so we have to use a for loop here (instead of Promise.all):
  // https://github.com/prisma/prisma/issues/9562#issuecomment-1051189816
  for (const { name, phone, email, id, profilePhoto } of initialContacts ) {
    await prisma.contact.upsert({
      where: { id },
      create: {
        name,
        phone,
        email,
        profilePhoto,
        id,
        userId,
      },
      update: {},
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
