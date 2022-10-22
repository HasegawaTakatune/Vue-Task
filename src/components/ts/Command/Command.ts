import type Operation from './interface/Operation';

export default class Command {
    public static Str2Command(cmd: string) {
        let operation: Operation = { color: null, fontSize: null, message: null };
        const list = cmd.split('&&');

        if (list.length < 1) return null;

        list.forEach((value: string) => {
            const color = this.ValidateColor(value);
            if (color) {
                operation.color = color;
                return;
            }

            const fontSize = this.ValidateFontSize(value);
            if (fontSize) {
                operation.fontSize = fontSize;
                return;
            }

            const message = this.ValidateMessage(value);
            if (message) {
                operation.message = message;
                return;
            }
        })
        return operation;
    }

    private static ValidateColor(cmd: string): string | null {
        const command = /^[c|C]olor/;

        if (!command.test(cmd)) return null;

        const list = cmd.split('=');
        if (list.length < 2) return null;

        // const opt = /^#([0-9]{6}$|[0-9]{3}$)/;
        const opt = /^#[0-9|a-z|A-Z]{6}$/;
        if (!opt.test(list[1])) return null;

        return list[1];
    }

    private static ValidateFontSize(cmd: string): string | null {
        const command = /^[f|F]ont[s|S]ize/;

        if (!command.test(cmd)) return null;

        const list = cmd.split('=');
        if (list.length < 2) return null;

        const opt = /^[0-9]{2}$/;
        if (!opt.test(list[1])) return null;

        return list[1];
    }

    private static ValidateMessage(cmd: string): string | null {
        const command = /^[m|M]essage/;

        if (!command.test(cmd)) return null;

        const list = cmd.split('=');
        if (list.length < 2 && list[1].length < 30) return null;

        return list[1];
    }
}