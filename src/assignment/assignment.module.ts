import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentResolver } from './assignment.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AssiSchema } from './schema/ass.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Assignment',
        schema: AssiSchema,
      },
    ]),
  ],
  providers: [AssignmentResolver, AssignmentService],
})
export class AssignmentModule {}
