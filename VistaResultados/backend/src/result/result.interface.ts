import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import moongose, { HydratedDocument } from 'mongoose';
import { Calendar } from 'src/calendar/calendar.interface';
import { SportCategory } from 'src/sport-category/sport-category.interface';

export type ResultDocument = HydratedDocument<Result>;

@Schema({ collection: 'result' })
export class Result {
  @Prop()
  value: string;

  @Prop()
  type: string;

  @Prop()
  athlete: string;

  @Prop({ type: moongose.Schema.Types.ObjectId, ref: 'Calendar' })
  calendar: Calendar;

  @Prop({ type: moongose.Schema.Types.ObjectId, ref: 'SportCategory' })
  SportCategory: SportCategory;

  @Prop({ default: true })
  state: boolean;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
