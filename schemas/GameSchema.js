import mongoose, {Schema, model, models} from 'mongoose';

const GameSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    status: String, // upcoming, ongoing, halted, ended
    players: {
        type: [ mongoose.Schema.Types.ObjectId ],
        required: true
    },
    winner: String,
    fee: Number,
    revivalFee: Number,
    battleStartTime: String,
    regCloseTime: String,
    reviveLimit: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
  }, {collection: "Game"})

  const Game = models.Game || model('Game', GameSchema);

  export default Game