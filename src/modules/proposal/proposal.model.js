import mongoose, { Schema } from 'mongoose';

const ProposalPostSchema = new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref: 'User'
  },
  proposals:[
    {
      message:{
        type:String,
        maxlength:[10, 'Tu propuesta debe tener al menos 10 caracteres'],
        required:[true, 'Escribe tu propuesta']
      },
      postId:{
        type:Schema.Types.ObjectId,
        ref: 'Post',
      }
    }
  ],

});

ProposalPostSchema.index({userId: 1}, {unique: true})
export default mongoose.model('Proposal',ProposalPostSchema);