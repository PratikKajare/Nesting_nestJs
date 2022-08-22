import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AssignmentService } from './assignment.service';
import { Assignment } from './entities/assignment.entity';
import {
  CreateAssignmentInput,
  structure,
} from './dto/create-assignment.input';

@Resolver((of) => Assignment)
export class AssignmentResolver {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Mutation((returns) => Assignment)
  async createAssignment(
    @Args('createAssignmentInput')
    createAssignmentInput: CreateAssignmentInput,
  ): Promise<Assignment> {
    return await this.assignmentService.create(createAssignmentInput);
  }

  @Query(() => [Assignment], { name: 'assignment' })
  async findAll() {
    return await this.assignmentService.findAll();
  }

  @Query(() => Assignment, { name: 'assignmentById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.assignmentService.findOne(id);
  }

  @Mutation(() => Assignment)
  async deleteAssignment(@Args('id') _id: string) {
    return await this.assignmentService.deleteAssignment(_id);
  }

  @Mutation(() => Assignment, { name: 'updateAssignment' })
  async updateAssignment(
    @Args('id') id: string,
    @Args('structur_id') _id: string,
    @Args('updateAssignmentInput') updateAssignmentInput: structure,
  ) {
    return await this.assignmentService.update(id, _id, updateAssignmentInput);
  }
}
