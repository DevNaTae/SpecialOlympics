import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import moongose, { HydratedDocument } from 'mongoose';
import { Athlete } from 'src/athlete/athlete.interface';
import { Calendar } from 'src/calendar/calendar.interface';
import { SportCategory } from 'src/sport-category/sport-category.interface';

export type ResultDocument = HydratedDocument<Result>;

@Schema({ collection: 'result' })
export class Result {
  @Prop()
  time: string;

  @Prop()
  place: string;

  @Prop({ type: moongose.Schema.Types.ObjectId, ref: 'Athlete' })
  athlete: Athlete;

  @Prop({ type: moongose.Schema.Types.ObjectId, ref: 'Calendar' })
  calendar: Calendar;

  @Prop({ default: true })
  state: boolean;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
