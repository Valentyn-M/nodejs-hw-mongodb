import express from 'express';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/env.js';
import cors from 'cors';
import pino from 'pino-http';

const PORT = Number(getEnvVar(ENV_VARS.PORT, 3000));

export const setupServer = () => {
	const app = express();

	app.use(express.json());

	app.use(cors());

	app.use(
		pino({
			transport: {
				target: 'pino-pretty',
			},
		}),
	);

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});

	// ==========================================================================================================================

	app.get('/', (req, res) => {
		res.json({
			message: 'Wellcome to Contacts App!',
		});
	});

	// ==========================================================================================================================

	app.use('*', (req, res, next) => {
		res.status(404).json({
			message: 'Not found',
		});
	});

	app.use((err, req, res, next) => {
		res.status(500).json({
			message: 'Something went wrong',
			error: err.message,
		});
	});
};
