import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';
const sql = neon('postgresql://neondb_owner:CVbRUrxH90kX@ep-morning-fire-a5lffbxr.us-east-2.aws.neon.tech/neondb?sslmode=require');
export const db = drizzle(sql,{schema});