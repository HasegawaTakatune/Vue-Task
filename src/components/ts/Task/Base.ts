import type Operation from "../Command/interface/Operation";
import Command from "../Command/Command";

export default abstract class Base {
    protected commands: Array<Operation> = [];
    public Get() { return this.commands; }

    public Push(cmd: string) {
        const command = Command.Str2Command(cmd);
        if (command) {
            this.commands.push(command);
            return true;
        }
        return false;
    };

    abstract Pop(): Operation | null;
}