import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { assignees, attach, author } from '../entities/assignment.entity';

export interface AssignmentInterface extends Document {
  _id: string;
  title: string;
  dueDate: Date;
  shouldEmailAssignees?: boolean;
  status?: string;
  assignType?: string;
  instructions: string;
  attachements: [attach];
  assignees: [assignees];
  learningItemCollections: [string];
  author: [author];
}
