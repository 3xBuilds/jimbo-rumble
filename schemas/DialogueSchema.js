import mongoose, {Schema, model, models} from 'mongoose';

const DialogueSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    dialogue: String,
    
  }, {collection: "Dialogue"})

  const Dialogue = models.Dialogue || model('Dialogue', DialogueSchema);

  export default Dialogue