import { InputType, Int, Field, ID } from '@nestjs/graphql';
@InputType()
export class CreateAssignmentInput {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field((type) => [structure], {
    nullable: true,
    description: 'multiple data',
  })
  structure: structure[];
}
@InputType()
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
