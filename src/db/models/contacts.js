import { model, Schema } from 'mongoose';
import { CONTACT_TYPE } from '../../constants/contactType.js';

const contactsSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: Object.values(CONTACT_TYPE),
      required: true,
      default: CONTACT_TYPE.PERSONAL,
    },
    photo: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsSchema);
