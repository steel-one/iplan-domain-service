import { IsString } from 'class-validator';
import { ActionDto } from 'src/utils/action.dto';

export class CreateUpdatePaymentDto extends ActionDto {
  @IsString()
  id;

  @IsString()
  name;

  @IsString()
  userId;

  @IsString()
  eventId;
}
