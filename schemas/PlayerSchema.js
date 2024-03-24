import mongoose, {Schema, model, models} from 'mongoose';

const PlayerSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tokenId: {
        type: Number,
        required: true
    },
    joinTime: {
        type: Date,
        default: Date.now
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    revives: {
        type: Number,
        default: 0
    },
    isAlive: {
        type: Boolean,
        default: true
    },
  }, {collection: "Player"})

  const Player = models.Player || model('Player', PlayerSchema);

  export default Player