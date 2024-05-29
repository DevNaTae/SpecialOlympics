import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import moongose, { HydratedDocument } from 'mongoose';
import { Sport } from 'src/sport/sport.interface';

export type SportCategoryDocument = HydratedDocument<SportCategory>;

@Schema({ collection: 'SportCategory' })
export class SportCategory {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: moongose.Schema.Types.ObjectId, ref: 'Sport' })
  sport: Sport;

  @Prop({ default: true })
  state: boolean;
}

export const SportCategorySchema = SchemaFactory.createForClass(SportCategory);
