import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(envVarName, defaultValue) {
	const envVar = process.env[envVarName];

	if (envVar) return envVar;

	if (defaultValue) return defaultValue;

	throw new Error(`Missing: process.env['${envVarName}'].`);
}
