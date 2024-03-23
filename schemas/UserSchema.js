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
    }]
  }, {collection: "User"})

  const User = models.User || model('User', UserSchema);

  export default User