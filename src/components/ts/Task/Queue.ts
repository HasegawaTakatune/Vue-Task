import type Operation from "../Command/interface/Operation";
import Base from "./Base";

export default class Queue extends Base {
    public Pop(): Operation | null {
        if (this.commands === null) return null;
        if (this.commands.length < 1) return null;
        return this.commands?.shift() ?? null;
    }
}