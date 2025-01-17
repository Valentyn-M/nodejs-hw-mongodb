import { ContactsCollection } from "../db/models/contacts.js";

export const getAllContacts = async () => {
	try {
		const contacts = await ContactsCollection.find();
		return contacts;
	}
	catch (err) {
		console.error(err);
		return null;
	}
};

export const getContactById = async (contactId) => {
	try {
		const contact = await ContactsCollection.findById(contactId);
		return contact;
	}
	catch (err) {
		console.error(err);
		return null;
	}
};
