import mongoose, { Schema } from 'mongoose';

const ProposalPostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  proposals: [
    {
      bid: {
        type: Number,
        required: [true, 'Has tu oferta'],
        min: [1, 'Tu oferta debe ser de al menos 1$'],
      },
      message: {
        type: String,
        minlength: [10, 'Tu propuesta debe tener al menos 10 caracteres'],
        required: [true, 'Escribe tu propuesta'],
      },
      postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    },
  ],

}, { timestamps: true });

ProposalPostSchema.index({ userId: 1 }, { unique: true });
export default mongoose.model('Proposal', ProposalPostSchema);
