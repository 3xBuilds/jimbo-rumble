import mongoose, {Schema, model, models} from 'mongoose';

const subSchema = new mongoose.Schema({
    dialogue: String,
    timeStamp: Number
  });

const DialogueSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    dialogueArray: [subSchema],
    
  }, {collection: "Dialogue"})

  const Dialogue = models.Dialogue || model('Dialogue', DialogueSchema);

  export default Dialogue