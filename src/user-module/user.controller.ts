import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto, UserParamsDto } from './dto/user.dto';
import { User } from './interface/user';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from '../core/filter';
import { JoiValidationPipe } from '../core/pipe';
import { LogginInterceptor } from './interceptor';
import { AuthGuard } from '../core/guard';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /users
  @Get()
  @UseInterceptors(new LogginInterceptor())
  users(
    //@Param('id', ParseIntPipe) id: number,
    //@Query('sort', ParseBoolPipe) sort: boolean,
    @Body() data: UserDto,
    @Req() req: Request,
  ): User[] {
    return this.userService.getUsers();
  }

  @Get('/:email')
  //@UseFilters(new HttpExceptionFilter())
  @Header('Cache-Control', 'none')
  async getUser(
    @Param() params: UserParamsDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<User> {
    try {
      return await this.userService.getUser(params.email);
      //res.status(HttpStatus.CREATED).send();
    } catch (error) {
      throw new BadRequestException('test');
    }
  }

  // POST /users
  @Post()
  @ApiExtraModels(UserDto)
  @ApiResponse({
    schema: {
      $ref: getSchemaPath(UserDto),
    },
  })
  @UseGuards(AuthGuard)
  //@UsePipes(new JoiValidationPipe({}))
  @UsePipes(new ValidationPipe())
  postUser(@Body() user: UserDto): Promise<User> {
    return this.userService.addUser(user);
  }

  // DELETE /users/example@hotmail.com
  @Delete('/:email')
  deleteUser(@Param() params: UserParamsDto): User[] {
    return this.userService.deleteUser(params.email);
  }
}
