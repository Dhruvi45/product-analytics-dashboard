import { Schema, model, Document } from 'mongoose';

// Define an interface representing a document in the database
interface IData extends Document {
  Day: Date;
  Age: string;
  Gender: string;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
}

// Create a Mongoose schema based on the interface
const dataSchema = new Schema<IData>({
  Day: { type: Date, required: true },
  Age: { type: String, required: true },
  Gender: { type: String, required: true },
  A: { type: Number, required: true },
  B: { type: Number, required: true },
  C: { type: Number, required: true },
  D: { type: Number, required: true },
  E: { type: Number, required: true },
  F: { type: Number, required: true },
});

// Create a Mongoose model
const DataModel = model<IData>('Data', dataSchema);

export default DataModel;
