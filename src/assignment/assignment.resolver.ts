import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AssignmentService } from './assignment.service';
import { Assignment, attach } from './entities/assignment.entity';
import { CreateAssignmentInput } from './dto/create-assignment.input';

@Resolver(() => Assignment)
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
  findOne(@Args('_id', { type: () => String }) _id: string) {
    return this.assignmentService.findOne(_id);
  }

  // @Mutation(() => Assignment)
  // updateAssignment(@Args('updateAssignmentInput') updateAssignmentInput: UpdateAssignmentInput) {
  //   return this.assignmentService.update(updateAssignmentInput.id, updateAssignmentInput);
  // }

  // @Mutation(() => Assignment)
  // removeAssignment(@Args('id', { type: () => Int }) id: number) {
  //   return this.assignmentService.remove(id);
  // }
}
