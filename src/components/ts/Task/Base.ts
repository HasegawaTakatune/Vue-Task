import type Operation from "../Command/interface/Operation";
export default abstract class Base {
    protected commands: Array<Operation> = [];
    public Get() { return this.commands; }

    abstract Push(cmd: string): boolean;
    abstract Pop(): Operation | null;
}