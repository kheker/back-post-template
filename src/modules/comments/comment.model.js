import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  postRefId:{
    type:Schema.Types.ObjectId,
    ref:'Post',
    required:true
  },
  userRef:{
    type:Schema.Types.ObjectId,
    ref: 'User'
  },
  hireUserId:{
    type:Schema.Types.ObjectId,
    ref: 'User'
  },
  eval:{
    type:Number,
    required:[true, 'Califica al freelancer'],
    min:true,
    default:0,
  },
  message: {
    type: String,
    required:[true, 'Has un comentario'],
    minlength:[10, 'Tu comentario debe ser mas largo'],
  },
},{timestamps:true});

CommentSchema.index({userId: 2}, {unique: true});

export default mongoose.model('Comment', CommentSchema);