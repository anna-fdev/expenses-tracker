import { ApiProperty } from '@nestjs/swagger';
import {
  ApiEntryList,
  ApiExpense,
  ApiListMeta,
} from '@expenses-tracker/api-models';

import { ExpenseDto } from './expense.dto';

class ExpenseMetadata implements ApiListMeta {
  @ApiProperty()
  total: number;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  limit: number;
}

export class ExpenseResponse implements ApiEntryList<ApiExpense> {
  @ApiProperty({ type: ExpenseMetadata })
  metadata: ExpenseMetadata;

  @ApiProperty({ type: ExpenseDto, isArray: true })
  entries: ApiExpense[];
}
