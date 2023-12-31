import { Controller, Get } from '@nestjs/common';
import { AppService } from '../../Services/app/app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
