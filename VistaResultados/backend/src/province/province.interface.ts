import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import moongose, { HydratedDocument } from 'mongoose';
import { Award } from 'src/award/award.interface';

export type ProvinceDocument = HydratedDocument<Province>;

@Schema({ collection: 'province' })
export class Province {
  @Prop()
  name: string;

  @Prop()
  img_url: string;

  @Prop({
    type: [{ type: moongose.Schema.Types.ObjectId, ref: 'Award' }],
  })
  award: Award[];

  @Prop({ default: true })
  state: boolean;
}

export const ProvinceSchema = SchemaFactory.createForClass(Province);
