import HTTPStatus from 'http-status';
import User from './user.model';
import Proposal from '../proposal/proposal.model';
import filteredBody from '../../utils/filteredBody';
import { SchemaList } from '../../config/constants';

export async function register(req, res) {
  try {
    const body = filteredBody(req.body, SchemaList.users.create);
    const user = await User.create(body);
    await Proposal.create({ userId: user._id });
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ e, error: true, message: 'Error al crear usuario' });
  }
}

export function login(req, res, next) {
  res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
  return next();
}

export async function perfil(req, res) {
  try {
    // const perfil = await User.findById(req.user.id);
    return res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ error: true, message: 'Error de servidor intenta mas tarde' });
  }
}

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.status(HTTPStatus.OK).json(user);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ error: true, message: 'Usuario no encontrado' });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    return res.status(HTTPStatus.OK).json(users);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ error: true, message: 'Error al buscar usuarios' });
  }
}

export async function editPerfil(req, res) {
  try {
    const body = filteredBody(req.body, SchemaList.users.create);
    const user = await User.findByIdAndUpdate(req.user.id, body, { new: true });
    return res.status(HTTPStatus.ACCEPTED).json(user);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ e, error: true, message: 'Error al editar intenta de nuevo' });
  }
}
