import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import moongose, { HydratedDocument } from 'mongoose';
import { Result } from 'src/result/result.interface';

export type AwardDocument = HydratedDocument<Award>;

@Schema({ collection: 'award' })
export class Award {
  @Prop()
  province: string;

  @Prop({ type: moongose.Schema.Types.ObjectId, ref: 'Result' })
  result: Result;

  @Prop()
  type: string;

  @Prop({ default: true })
  state: boolean;
}

export const AwardSchema = SchemaFactory.createForClass(Award);
