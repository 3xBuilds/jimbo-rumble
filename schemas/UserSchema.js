import mongoose, {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    walletId: String,
    username: String,
    wins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    losses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    referrals: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
  }, {collection: "User"})

  const User = models.User || model('User', UserSchema);

  export default User