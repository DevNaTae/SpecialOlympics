import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GalleryDocument = HydratedDocument<Gallery>;

@Schema({ collection: 'gallery' })
export class Gallery {
  @Prop()
  img_url: string;

  @Prop({ default: true })
  state: boolean;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
