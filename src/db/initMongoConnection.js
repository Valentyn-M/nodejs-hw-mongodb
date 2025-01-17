import mongoose from 'mongoose';
import { ENV_VARS } from '../constants/env.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
	try {
		// Використаємо утилітарну функцію getEnvVar, яка забезпечує доступ до змінних оточення
		const user = getEnvVar(ENV_VARS.MONGODB_USER);
		const pwd = getEnvVar(ENV_VARS.MONGODB_PASSWORD);
		const url = getEnvVar(ENV_VARS.MONGODB_URL);
		const db = getEnvVar(ENV_VARS.MONGODB_DB);

		const connectionURI = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;

		await mongoose.connect(connectionURI);

		console.log('Mongo connection successfully established!');
	} catch (err) {
		console.error('Error while setting up mongo connection', err);
		process.exit(1);
	}
};
