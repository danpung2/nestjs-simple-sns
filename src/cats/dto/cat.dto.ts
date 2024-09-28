import { ApiProperty, PickType } from "@nestjs/swagger";
import { Cat } from "../cats.schema";

// PickType: 필요한 것만 가져와서 쓸 수 있게 해줌
export class ReadOnlyCatDto extends PickType(Cat, ["email", "name"] as const) {
    @ApiProperty({
        example: "20240927",
        description: "id",
    })
    id: string;
}