import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
@InputType()
export class CreateAssignmentInput {
  @Field(() => ID, { nullable: true })
  _id: string;
  @IsNotEmpty()
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  dueDate: Date;
  @Field({ nullable: true })
  instructions?: string;
  @Field((type) => Boolean, { nullable: true })
  shouldEmailAssignees?: boolean;
  @Field({ nullable: true })
  status?: string;
  @Field({ nullable: true })
  assignType?: string;
  @Field((type) => [attach], { nullable: true })
  attachements: attach[];
  @Field((type) => [assignees], { nullable: true })
  assignees: assignees[];
  @Field((type) => [String], { nullable: true })
  learningItemCollections: [string];
  @Field((type) => [author], { nullable: true, description: 'multiple data' })
  author: author[];
}
@InputType()
export class attach {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field((type) => String, { nullable: true })
  name: string;
  @Field((type) => String, { nullable: true })
  filePath: string;
  @Field((type) => String, { nullable: true })
  type: string;
  @Field((type) => String, { nullable: true })
  size: string;
}

@InputType()
export class assignees {
  @Field((type) => String, { nullable: true })
  assignType: string;
  @Field((type) => [String], { nullable: true })
  selectedUsers: [string];
}

@InputType()
export class author {
  @Field((type) => String, { nullable: true })
  name: string;
  @Field((type) => String, { nullable: true })
  id: string;
  @Field((type) => String, { nullable: true })
  organization: string;
}
