import HTTPStatus from 'http-status';
import User from './user.model';
import Proposal from '../proposal/proposal.model';
import filteredBody from '../../utils/filteredBody';
import { SchemaList } from '../../config/constants';

export async function register(req, res, next) {
  const body = filteredBody(req.body, SchemaList.users.create);
  try {
    const user = await User.create(body);
    await Proposal.create({ userId: user._id });
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export function login(req, res, next) {
  res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
  return next();
}

export async function perfil(req, res, next) {
  try {
    // const perfil = await User.findById(req.user.id);
    return res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    return res.status(HTTPStatus.OK).json(user);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await User.find();
    return res.status(HTTPStatus.OK).json(users);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function editPerfil(req, res, next) {
  const body = filteredBody(req.body, SchemaList.users.create);
  try {
    const user = await User.findByIdAndUpdate(req.user.id, body, { new: true });
    return res.status(HTTPStatus.ACCEPTED).json(user);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}
