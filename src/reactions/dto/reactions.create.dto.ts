import { PickType } from "@nestjs/swagger";
import { Reactions } from "../reactions.schema";

export class ReactionsCreateDto extends PickType(Reactions, ["author", "contents"] as const) {}