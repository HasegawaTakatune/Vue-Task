import type Operation from "../Command/interface/Operation";
import Command from "../Command/Command";

// キュー/スタックのベース抽象クラス
export default abstract class Base {
    // コマンドリスト
    protected commands: Array<Operation> = [];
    // コマンド取得
    public Get() { return this.commands; }
    // コマンド追加
    public Push(cmd: string) {
        const command = Command.Str2Command(cmd);
        if (command) {
            this.commands.push(command);
            return true;
        }
        return false;
    };
    // コマンド取り出し
    abstract Pop(): Operation | null;
}