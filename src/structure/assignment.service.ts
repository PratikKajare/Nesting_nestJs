import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInputError } from 'apollo-server-core';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';

import {
  CreateAssignmentInput,
  structure,
} from './dto/create-assignment.input';
import { Assignment } from './entities/assignment.entity';
import { AssignmentInterface } from './interfaces/assi.interface';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel('Demo')
    private AssiModel: Model<AssignmentInterface>, // private configService: ConfigService,
  ) {}
  async create(
    createAssignmentInput: CreateAssignmentInput,
  ): Promise<Assignment> {
    const { id, title, structure } = createAssignmentInput;
    console.log(id, title);

    const createdAssign = new this.AssiModel({
      id: randomUUID(),
      title,
      structure,
    });
    return (await createdAssign.save()) as any;
  }

  async findAll() {
    return await this.AssiModel.find().exec();
  }

  async findOne(id: string) {
    return await this.AssiModel.findOne({ id });
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

  async update(
    id: string,
    _id: string,
    updateAssignmentInput: structure,
  ): Promise<any> {
    const found = await this.findOne(id);
    const post = await this.AssiModel.updateOne(
      { id: found.id, 'structure.id': _id },
      {
        $set: {
          'structure.$.title': updateAssignmentInput.title,
          'structure.$.description': updateAssignmentInput.description,
          'structure.$.type': updateAssignmentInput.type,
          'structure.$.sortingOrder': updateAssignmentInput.sortingOrder,
        },
      },
    ).setOptions({ overwrite: false, new: true, nullable: true });
    console.log(updateAssignmentInput);

    return post;
  }
}
