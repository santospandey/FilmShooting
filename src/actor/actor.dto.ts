import { Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ActorDTO{
    @Length(2, 50)
    @ApiProperty({
        type: String,
        description: "first name"
    })
    first_name:string;

    @Length(2, 50)
    @ApiProperty({
        type: String,
        description: "last name"
    })
    last_name:string;
}