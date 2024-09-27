/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./Configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://neondb_owner:CVbRUrxH90kX@ep-morning-fire-a5lffbxr.us-east-2.aws.neon.tech/neondb?sslmode=require",
    }
  };