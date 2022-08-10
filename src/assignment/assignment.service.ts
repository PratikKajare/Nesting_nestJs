import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { CreateAssignmentInput } from './dto/create-assignment.input';
import { Assignment } from './entities/assignment.entity';
import { AssignmentInterface } from './interfaces/assi.interface';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel('Assignment')
    private AssiModel: Model<AssignmentInterface>,
  ) // private configService: ConfigService,
  {}
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
      dueDate,
      instructions,
      attachements: [attach],
      assignees: [assignees],
      learningItemCollections,
      author: [author],
    });
    return (await createdAssign.save()) as any;
  }
  async findAll() {
    return await this.AssiModel.find().exec();
  }

  async findOne(_id: string) {
    return await this.AssiModel.findOne({ _id });
  }

  // update(id: number, updateAssignmentInput: UpdateAssignmentInput) {
  //   return `This action updates a #${id} assignment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} assignment`;
  // }
}

// async create(
//   createAssignmentInput: CreateAssignmentInput,
// ): Promise<Assignment> {
//   const createdAssign = new this.AssiModel(createAssignmentInput);
//   return (await createdAssign.save()) as any;
// }
