import { CONTACT_TYPE } from '../constants/contactType.js';

const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isContactType = (contactType) =>
    Object.values(CONTACT_TYPE).includes(contactType);

  if (isContactType(type)) return type;
};

const parseString = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return;

  return value;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseString(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
