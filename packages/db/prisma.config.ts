import { defineConfig } from "prisma/config";
import 'dotenv/config'

const URL = process.env.DATABASE_URL;
console.log(URL)

export default defineConfig({
   schema: "prisma/schema.prisma",
   migrations: {
      path: "prisma/migrations",
   },
   datasource: {
      url: URL,
   },
});
