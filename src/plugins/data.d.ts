import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of an Info. */
export interface IInfo {

    /** Info text */
    text?: (string|null);

    /** Info season */
    season?: (number|null);

    /** Info episode */
    episode?: (number|null);

    /** Info frameStart */
    frameStart?: (number|null);

    /** Info framePrefer */
    framePrefer?: (number|null);

    /** Info frameEnd */
    frameEnd?: (number|null);

    /** Info segmentId */
    segmentId?: (number|null);
}

/** Represents an Info. */
export class Info implements IInfo {

    /**
     * Constructs a new Info.
     * @param [properties] Properties to set
     */
    constructor(properties?: IInfo);

    /** Info text. */
    public text: string;

    /** Info season. */
    public season: number;

    /** Info episode. */
    public episode: number;

    /** Info frameStart. */
    public frameStart: number;

    /** Info framePrefer. */
    public framePrefer: number;

    /** Info frameEnd. */
    public frameEnd: number;

    /** Info segmentId. */
    public segmentId: number;

    /**
     * Creates a new Info instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Info instance
     */
    public static create(properties?: IInfo): Info;

    /**
     * Encodes the specified Info message. Does not implicitly {@link Info.verify|verify} messages.
     * @param message Info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Info message, length delimited. Does not implicitly {@link Info.verify|verify} messages.
     * @param message Info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Info message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Info;

    /**
     * Decodes an Info message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Info;

    /**
     * Verifies an Info message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Info message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Info
     */
    public static fromObject(object: { [k: string]: any }): Info;

    /**
     * Creates a plain object from an Info message. Also converts values to other types if specified.
     * @param message Info
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Info, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Info to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Info
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a Data. */
export interface IData {

    /** Data info */
    info?: (IInfo[]|null);
}

/** Represents a Data. */
export class Data implements IData {

    /**
     * Constructs a new Data.
     * @param [properties] Properties to set
     */
    constructor(properties?: IData);

    /** Data info. */
    public info: IInfo[];

    /**
     * Creates a new Data instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Data instance
     */
    public static create(properties?: IData): Data;

    /**
     * Encodes the specified Data message. Does not implicitly {@link Data.verify|verify} messages.
     * @param message Data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Data message, length delimited. Does not implicitly {@link Data.verify|verify} messages.
     * @param message Data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Data message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Data;

    /**
     * Decodes a Data message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Data;

    /**
     * Verifies a Data message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Data message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Data
     */
    public static fromObject(object: { [k: string]: any }): Data;

    /**
     * Creates a plain object from a Data message. Also converts values to other types if specified.
     * @param message Data
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Data, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Data to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Data
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
