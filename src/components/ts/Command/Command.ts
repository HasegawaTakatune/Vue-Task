import type Operation from './interface/Operation';

export default class Command {
    // 文字列からコマンドを抽出する
    public static Str2Command(cmd: string) {
        let operation: Operation = { color: null, fontSize: null, message: null };

        // 各コマンドのパーティションは”&&”で判定している
        const list = cmd.split('&&');

        if (list.length < 1) return null;

        // コマンドを抽出していく
        list.forEach((value: string) => {

            // 色抽出
            const color = this.ValidateColor(value);
            if (color) {
                operation.color = color;
                return;
            }

            // フォントサイズ抽出
            const fontSize = this.ValidateFontSize(value);
            if (fontSize) {
                operation.fontSize = fontSize;
                return;
            }

            // メッセージ抽出
            const message = this.ValidateMessage(value);
            if (message) {
                operation.message = message;
                return;
            }
        })
        return operation;
    }

    // 色のバリデーションチェック
    private static ValidateColor(cmd: string): string | null {
        const command = /^[c|C]olor/;

        if (!command.test(cmd)) return null;

        const list = cmd.split('=');
        if (list.length < 2) return null;

        const opt = /^#[0-9|a-z|A-Z]{6}$/;
        if (!opt.test(list[1])) return null;

        return list[1];
    }

    // フォントサイズのバリデーションチェック
    private static ValidateFontSize(cmd: string): string | null {
        const command = /^[f|F]ont[s|S]ize/;

        if (!command.test(cmd)) return null;

        const list = cmd.split('=');
        if (list.length < 2) return null;

        const opt = /^[0-9]{1,2}(px|em|rem)$/;
        if (!opt.test(list[1])) return null;

        return list[1];

    }
    // メッセージのバリデーションチェック
    private static ValidateMessage(cmd: string): string | null {
        const command = /^[m|M]essage/;

        if (!command.test(cmd)) return 'None';

        const list = cmd.split('=');
        if (list.length < 2 && list[1].length < 30) return null;

        return list[1];
    }
}