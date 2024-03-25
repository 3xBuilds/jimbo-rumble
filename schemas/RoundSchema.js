import mongoose, {Schema, model, models} from 'mongoose';

const messageSchema = new mongoose.Schema({
    message: String,
    timeStamp: Number,
    killed: Object,
    survivor: Object
  });

const RoundSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    messages: [messageSchema],
  }, {collection: "Round"})

  const Round = models.Round || model('Round', RoundSchema);

  export default Round