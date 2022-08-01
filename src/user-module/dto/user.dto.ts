import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsDefined } from 'class-validator';

export class UserDto{
    @IsString()
    @IsEmail()
    @IsDefined()
    @ApiProperty({
        description: 'User email',
        type: () => String
    })
    email: string;

    @IsString()
    @IsDefined()
    @ApiProperty({
        description: 'A username between 10 and 15 characters',
        type: () => String
    })
    username: string;
}

export class UserParamsDto {
    @IsString()
    @IsEmail()
    @IsDefined()
    email: string;
}

