import path from 'path';
import { env } from '../config/env';

export const SESSIONS_PATH = path.resolve(process.cwd(), env.SESSIONS_DIR);
export const LOGS_PATH = path.resolve(process.cwd(), 'logs');