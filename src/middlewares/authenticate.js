import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];
  if (bearer !== 'Bearer') {
    next(createHttpError(401, 'Auth header chould be of type Bearer'));
    return;
  }
  if (!token) {
    next(createHttpError(401, 'No Access token provided'));
    return;
  }

  const session = await SessionsCollection.findOne({ accessToken: token });
  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isSessionTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }

  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;

  next();
};
