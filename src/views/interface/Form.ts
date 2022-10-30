import type Base from "@/components/ts/Task/Base"
import type Operation from "@/components/ts/Command/interface/Operation"
import type { AttachType } from "../enum/AttachType"

export default interface Form {
    // 起動/停止フラグ
    power: boolean,

    // キュークラス
    queue: Base,
    // スタッククラス
    stack: Base,

    // コマンドのアタッチ対象選択
    attachOf: AttachType,

    // プリセット適応フラグ
    presetColor: boolean
    presetFontSize: boolean,
    presetMessage: boolean,

    // 入力コマンド
    command: string,

    // 現在のコマンド
    nowQueue: Operation,
    nowStack: Operation,
}