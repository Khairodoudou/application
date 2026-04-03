const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.appSetting.upsert({
    where: { id: "global" },
    update: { supportEmail: "contact@HealthAegis.com" },
    create: {
      id: "global",
      supportEmail: "contact@HealthAegis.com",
    }
  });
  console.log("Database updated successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
