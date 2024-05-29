import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import moongose, { HydratedDocument } from 'mongoose';
import { SportCategory } from 'src/sport-category/sport-category.interface';

export type AthleteDocument = HydratedDocument<Athlete>;

@Schema({ collection: 'athlete' })
export class Athlete {
  @Prop()
  name: string;

  @Prop()
  dni: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  sportsman_number: number;

  @Prop()
  birthday: string;

  @Prop()
  address: string;

  @Prop()
  img_url: string;

  @Prop()
  lodging_place: string;

  @Prop({
    type: [{ type: moongose.Schema.Types.ObjectId, ref: 'SportCategory' }],
  })
  SportCategory: SportCategory[];

  @Prop({ default: true })
  state: boolean;
}

export const AthleteSchema = SchemaFactory.createForClass(Athlete);
