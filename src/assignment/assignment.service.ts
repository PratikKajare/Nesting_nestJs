import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { UserInputError } from 'apollo-server-core';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { DateScalar } from 'src/scalar/date.scalar';
import { attach, CreateAssignmentInput } from './dto/create-assignment.input';
import { Assignment } from './entities/assignment.entity';
import { AssignmentInterface } from './interfaces/assi.interface';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel('Assignment')
    private AssiModel: Model<AssignmentInterface>, // private configService: ConfigService,
  ) {}
  async create(
    createAssignmentInput: CreateAssignmentInput,
  ): Promise<Assignment> {
    const {
      _id,
      title,
      dueDate,
      instructions,
      attachements: [attach],
      assignees: [assignees],
      learningItemCollections,
      author: [author],
    } = createAssignmentInput;
    console.log(
      _id,
      title,
      dueDate,
      instructions,
      attach,
      assignees,
      learningItemCollections,
      author,
    );

    const createdAssign = new this.AssiModel({
      _id: randomUUID(),
      title,
      dueDate: new Date(),
      instructions,
      attachements: [attach],
      assignees: [assignees],
      learningItemCollections,
      author: [author],
    });
    return (await createdAssign.save()) as any;
  }
  //   async assignStudentsToLesson(
  //   lessonId: string,
  //   studentIds: string[],
  // ): Promise<Lesson> {
  //   const lesson = await this.lessonRepository.findOneBy({ id: lessonId });
  //   lesson.students = [...studentIds];
  //   return this.lessonRepository.save(lesson);
  // }

  async findAll() {
    return await this.AssiModel.find().exec();
  }

  async findOne(_id: string) {
    return await this.AssiModel.findOne({ _id });
  }

  // async update(
  //   _id: string,
  //   updateAssignmentInput: CreateAssignmentInput,
  // ): Promise<Assignment> {
  //   const {
  //     title,
  //     dueDate,
  //     instructions,
  //     learningItemCollections,
  //     attachements: [attach],
  //   } = updateAssignmentInput;
  //   const category = await this.AssiModel.findOneAndUpdate({ _id }).exec();
  //   if (title) {
  //     category.title = updateAssignmentInput.title;
  //   }
  //   if (dueDate) {
  //     category.dueDate = updateAssignmentInput.dueDate;
  //   }
  //   if (instructions) {
  //     category.instructions = updateAssignmentInput.instructions;
  //   }

  //   if (learningItemCollections) {
  //     category.learningItemCollections =
  //       updateAssignmentInput.learningItemCollections;
  //   }

  //   if ([attach]) {
  //     await updateAssignmentInput.attachements;
  //   }

  //   return (await category.save()) as any;
  // }

  async update(id: string, updateAssignmentInput: CreateAssignmentInput) {
    const post = await this.AssiModel.findByIdAndUpdate(
      id,
      updateAssignmentInput,
    )
      .setOptions({ overwrite: false, new: true, nullable: true })
      .populate('attachements')
      .populate('assignees')
      .populate('author');
    if (!post) {
      throw new NotFoundException();
    }
    return post.save();
  }

  async deleteAssignment(_id: string) {
    if (!_id) {
      throw new UserInputError('Invalid argument value', {
        argumentName: '_id',
      });
    } else {
      return await this.AssiModel.findOneAndDelete({ _id });
    }
  }

  async updateattach(_id: string, updateAttachInput: attach): Promise<string> {
    const post = await this.AssiModel.findByIdAndUpdate({
      _id,
      attachements: { _id: { $eq: { _id } } },
    });
    const { filePath } = updateAttachInput;
    if (filePath) {
      {
        await updateAttachInput.filePath;
      }
    }

    return (await post.save()) as any;
  }
}
