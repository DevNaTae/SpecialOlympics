import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import moongose, { HydratedDocument } from 'mongoose';
import { SportCategory } from 'src/sport-category/sport-category.interface';

export type ActivityDocument = HydratedDocument<Activity>;

@Schema({ collection: 'activity' })
export class Activity {
  @Prop()
  type: string;

  @Prop()
  gender: string;

  @Prop({
    type: moongose.Schema.Types.ObjectId,
    ref: 'SportCategory',
  })
  SportCategory: SportCategory;

  @Prop({ default: true })
  state: boolean;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
