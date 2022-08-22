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
import { attach, CreateAssignmentInput } from './dto/create-assignment.input';

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
  // @Mutation((returns) => Assignment)
  // assignStudentsToLesson(
  //   @Args('assignStudentsToLessonInput')
  //   assignStudentsToLessonInput: CreateAssignmentInput,
  // ) {
  //   const { lessonId, studentIds } = assignStudentsToLessonInput;
  //   return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  // }
  @Query(() => [Assignment], { name: 'assignment' })
  async findAll() {
    return await this.assignmentService.findAll();
  }

  @Query(() => Assignment, { name: 'assignmentById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.assignmentService.findOne(id);
  }

  @Mutation(() => Assignment, { name: 'updateAssignment' })
  async updateAssignment(
    @Args('updateAssignmentInput') updateAssignmentInput: CreateAssignmentInput,
  ) {
    return await this.assignmentService.update(
      updateAssignmentInput._id,
      updateAssignmentInput,
    );
  }
  @Mutation(() => Assignment, { name: 'updateAttachment' })
  async updateAttachByAssign(
    @Args('id') _id: string,

    @Args('updateAttach') updateAttachInput: attach,
  ) {
    return await this.assignmentService.updateattach(_id, updateAttachInput);
  }

  @Mutation(() => Assignment)
  async deleteAssignment(@Args('id') _id: string) {
    return await this.assignmentService.deleteAssignment(_id);
  }
  // @ResolveField('attachements', (returns) => [attach])
  // async attachements(@Parent() attach: Assignment) {
  //   const { _id } = attach;
  //   return this.assignmentService.attachements({ _id: _id });
  // }
}
