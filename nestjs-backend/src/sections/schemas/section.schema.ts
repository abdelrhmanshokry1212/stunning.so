import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SectionDocument = Section & Document;

@Schema({ timestamps: true })
export class Section {
  @Prop({ required: true })
  prompt: string;

  @Prop({ required: true, type: [Object] })
  sections: Array<{
    title: string;
    content: string;
  }>;

  @Prop({ type: Object })
  metadata?: {
    source: string;
    timestamp: string;
    promptProcessed: string;
    sectionsGenerated: number;
  };

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const SectionSchema = SchemaFactory.createForClass(Section); 