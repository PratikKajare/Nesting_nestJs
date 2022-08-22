import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
@ObjectType()
export class Assignment {
  @Field(() => ID, { nullable: true })
  id: string;
  @Prop()
  @Field({ nullable: true })
  title: string;
  @Field((type) => [structure], {
    nullable: true,
    description: 'multiple data',
  })
  structure: [structure];
}

@ObjectType('structureOf')
export class structure {
  @Field(() => ID, { nullable: true })
  id: string;
  @Field((type) => String, { nullable: true })
  title: string;
  @Field((type) => String, { nullable: true })
  description: string;
  @Field((type) => String, { nullable: true })
  type: string;
  @Field((type) => String, { nullable: true })
  sortingOrder: string;
}
