import mongoose, {Schema, model, models} from 'mongoose';

const GameSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    status: {
        type: String,
        default: "upcoming"
    }, // upcoming, ongoing, halted, ended
    players: {
        type: [ mongoose.Schema.Types.ObjectId ],
        required: true
    },
    winner: String,
    fee: {
        type: Number,
        default: 0
    },
    revivalFee: {
        type: Number,
        default: 0
    },
    battleStartTime: String,
    regCloseTime: String,
    reviveLimit: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
  }, {collection: "Game"})

  const Game = models.Game || model('Game', GameSchema);

  export default Game