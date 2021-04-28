import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogPostDocument = BlogPost & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
  autoIndex: true,
  minimize: true,
})
export class BlogPost {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
