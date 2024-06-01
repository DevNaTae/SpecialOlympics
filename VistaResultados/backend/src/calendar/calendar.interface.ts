import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import moongose, { HydratedDocument } from 'mongoose';
import { Place } from 'src/place/place.interface';
import { Sport } from 'src/sport/sport.interface';

export type CalendarDocument = HydratedDocument<Calendar>;

@Schema({ collection: 'calendar' })
export class Calendar {
  @Prop()
  date: string;

  @Prop()
  time: string;

  @Prop({ type: moongose.Schema.Types.ObjectId, ref: 'Place' })
  place: Place;

  @Prop({ type: moongose.Schema.Types.ObjectId, ref: 'Sport' })
  sport: Sport;

  @Prop({ default: true })
  state: boolean;
}

export const CalendarSchema = SchemaFactory.createForClass(Calendar);
