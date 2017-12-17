import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { hashSync, compareSync } from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
import constants from '../../config/constants';
import { passwordReg } from './user.validation';

const UserSchema = new Schema({
  email:{
    type: String,
    unique: true,
    required:[true, 'Ingresa tu email'],
    trim: true,
    validate:{
      validator(email){
        return validator.isEmail(email);
      },
      message: '{VALUE} no es email valido',
    },
  },
  password:{
    type: String,
    trim: true,
    required: [true, 'Ingresa la contraseña'],
    minlength: [6, 'La contraseña debe contar con al menos 6 digitos'],
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: '{VALUE} no es una contraseña valida',
    },
  },
  fullName:{
    type: String,
    minlength: [3, 'Nombre debe tener al menos 3 caracteres'],
  },
  biography:{
    type:String,
    minlength: [100, 'Tu biografia debe tener al menos 100 caracteres'],
  },
  avatar:{
    type: String
  },
  skills:[],
  isConfirm: {
    type:Boolean,
    default: false,
  },
  isComplete:{
    type: Boolean,
    default: false,
  },
  providerData:{
    uid:String,
    provider:String,
  },
},{timestamp:true});

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} ya ha sido registrado',
})

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
})

UserSchema.methods = {
  _hashPassword(password){
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken(){
    return jwt.sign(
      {
        id: this._id,
      },
      constants.JWT_SECRET
    );
  },
  toAuthJSON(){
    return {
      ...this.toJSON(),
      isConfirm: this.isConfirm,
      isComplete: this.isComplete,
      token: `JWT ${this.createToken()}`,
    }
  },
  toJSON(){
    return {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
      avatar: this.avatar,
      skills: this.skills,
      biography: this.biography
    }
  },
};

export default mongoose.model('User',UserSchema);