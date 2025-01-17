import express from 'express';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/env.js';
import cors from 'cors';
import pino from 'pino-http';
import { getAllContacts, getContactById } from './services/contacts.js';

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

	app.get('/contacts', async (req, res) => {
		const contacts = await getAllContacts();

		res.status(200).json({
			status: 200,
			message: "Successfully found contacts!",
			data: contacts,
		});
	});

	app.get('/contacts/:contactId', async (req, res) => {
		const contactId = req.params.contactId;
		const contact = await getContactById(contactId);

		if (!contact) {
			res.status(404).json({
				message: 'Contact not found',
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: `Successfully found contact with id ${contactId}!`,
			data: contact,
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
