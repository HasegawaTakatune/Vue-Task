import type Base from "@/components/ts/Task/Base"
import type Operation from "@/components/ts/Command/interface/Operation"
import type { AttachType } from "../enum/AttachType"

export default interface Form {
    power: boolean,

    queue: Base,
    stack: Base,

    attachOf: AttachType,

    presetColor: boolean
    presetFontSize: boolean,
    presetMessage: boolean,

    command: string,

    nowQueue: Operation,
    nowStack: Operation,
}