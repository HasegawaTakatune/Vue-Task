import type Operation from "../Command/interface/Operation";
import Command from "../Command/Command";
import Base from "./Base";

export default class Stack extends Base {
    public Push(cmd: string): boolean {
        const command = Command.Str2Command(cmd);
        if (command) {
            this.commands.push(command);
            return true;
        }
        return false;
    }

    public Pop(): Operation | null {
        if (this.commands === null) return null;
        if (this.commands.length < 1) return null;
        return this.commands?.pop() ?? null;
    }
}