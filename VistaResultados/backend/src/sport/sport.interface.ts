import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SportDocument = HydratedDocument<Sport>;

@Schema({ collection: 'sport' })
export class Sport {
  @Prop()
  name: string;

  @Prop()
  icon: string;

  @Prop({ default: true })
  state: boolean;
}

export const SportSchema = SchemaFactory.createForClass(Sport);
