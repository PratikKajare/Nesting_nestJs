import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
@ObjectType()
export class Assignment {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Prop()
  @Field({ nullable: true })
  title: string;
  @Prop()
  @Field({ nullable: true })
  dueDate: Date;
  @Prop()
  @Field((type) => Boolean, { nullable: true })
  shouldEmailAssignees?: boolean;
  @Prop()
  @Field({ nullable: true })
  status?: string;
  @Prop()
  @Field({ nullable: true })
  assignType?: string;
  @Prop()
  @Field({ nullable: true })
  instructions: string;
  @Prop()
  @Field((type) => [attach], { nullable: true })
  attachements: attach[];
  @Prop()
  @Field((type) => [assignees], { nullable: true })
  assignees: assignees[];
  @Prop()
  @Field((type) => [String], { nullable: true, description: 'multiple data' })
  learningItemCollections: [string];
  @Prop()
  @Field((type) => [author], { nullable: true, description: 'multiple data' })
  author: author[];
}

@ObjectType('attachements')
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

@ObjectType('assigneesarray')
export class assignees {
  @Field((type) => String, { nullable: true })
  assignType: string;
  @Field((type) => [String], { nullable: true })
  selectedUsers: [string];
}

@ObjectType('authorarray')
export class author {
  @Field((type) => String, { nullable: true })
  name: string;
  @Field((type) => String, { nullable: true })
  id: string;
  @Field((type) => String, { nullable: true })
  organization: string;
}
