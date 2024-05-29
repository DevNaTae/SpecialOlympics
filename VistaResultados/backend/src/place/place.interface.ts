import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlaceDocument = HydratedDocument<Place>;

@Schema({ collection: 'place' })
export class Place {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  img_url: string;  

  @Prop()
  line?: string[];

  @Prop({ default: true })
  state: boolean;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
