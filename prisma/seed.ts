import { prisma } from "../src/server/db";

async function main() {
  const userId = "39ad5f1f-7da1-48f4-8de3-ff29de51d5c5";
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

  [
    {
      name: "John Doe",
      phone: "+36014435657",
      email: "john@example.com",
      id: "5c653efa-bd1c-4e76-b411-3cda06597b1c",
    },
    {
      name: "Alexandra Smith",
      phone: "+36304444444",
      email: "sandra@example.com",
      id: "84502234-982f-4e83-bee2-b50327e1d85a",
    },
  ].map(async ({ name, phone, email, id }) => {
    await prisma.contact.upsert({
      where: { id },
      create: {
        name,
        phone,
        email,
        id,
        userId,
      },
      update: {},
    });
  });
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
