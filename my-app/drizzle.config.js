import dotenv from 'dotenv';

// Load environment variables from .env.local file
dotenv.config({ path: '.env.local' });  

export default {
  dialect: 'postgresql',  // Use 'postgresql'
  schema: './utils/schema.jsx',  // Adjust the path to your schema file
  out: './drizzle',  // Output directory for migrations
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,  // Use 'url' to establish connection
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL
  },
};
