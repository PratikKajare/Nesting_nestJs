import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { structure } from '../entities/assignment.entity';

export interface AssignmentInterface extends Document {
  id: string;
  title: string;

  structure: [structure];
}
