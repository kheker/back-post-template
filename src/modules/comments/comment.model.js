import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref: 'User'
  },
  messages:[
    {
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
      userRef:{
        type:Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
},{timestamps:true});

CommentSchema.index({userId: 2}, {unique: true});

export default mongoose.model('Comment', CommentSchema);