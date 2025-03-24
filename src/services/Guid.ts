class Guid {
    public static EMPTY = "00000000-0000-0000-0000-000000000000";

    private static gen(count: number) {
        var out = "";
        for (var i = 0; i < count; i++) {
            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return out;
    };

    public static create(): _Guid {
        return [this.gen(2), this.gen(1), this.gen(1), this.gen(1), this.gen(3)].join("-")
    }
}

export default Guid;

export type _Guid = string;