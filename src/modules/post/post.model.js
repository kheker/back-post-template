import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  category:{
    type: String,
    enum:['IT & Programación', 'Diseño y Multimedia', 'Traducción y Contenidos', 'Marketing y Ventas', 'Soporte Administrativo', 'Legal', 'Finanzas y Administración', 'Ingenieria y Manufactura', 'Otros'],
    required:[true,'Elige una categoria para tu proyecto'],
  },
  title: {
    type: String,
    trim: true,
    maxlength:[160, 'El titulo de tu proyecto es muy largo'],
    minlength:[4, 'El titulo de tu proyecto es muy corto'],
    required:[true,'Necesitas un titulo para tu proyecto'],
  },
  description: {
    type: String,
    required:[true,'Necesitas una breve descripción de tu proyecto!'],
  },
  tags:[],
  fixedValue:{
    type:Number,
    required: [true, 'Ingresa el presupuesto para tu proyecto'],
    min:[1,'El presupuesto debe estar por encima de 1$']
  },
  owner:{
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  proposals:{
    type: Number,
    default:0,
  },
  status:{
    type:String,
    enum:['disponible', 'evaluando propuestas', 'finalizado'],
    default:'disponible',
  }
},{timestamp: true})

PostSchema.statics = {
  createPost(args, user) {
    return this.create({
      ...args,
      owner: user,
    });
  },

  incProposalCount(postId){
    return this.findByIdAndUpdate(postId,{$inc:{proposals: 1} },{new:true});
  },

  decProposalCount(postId){
    return this.findByIdAndUpdate(postId,{$inc:{proposals: -1} },{new:true});
  },
};

export default mongoose.model('Post',PostSchema);