import mongoose from "mongoose";

interface BookDocument extends mongoose.Document {
  title:string;
  createdAt: Date;
  updatedAt: Date;
} 

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
}, { timestamps: true })

const BookModel = mongoose.models.Book || mongoose.model<BookDocument>('Book', BookSchema)

export { BookModel };
export type { BookDocument };
