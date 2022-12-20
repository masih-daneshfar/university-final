import { Request } from "express";

export interface fileUploadItemType {
    name: string;
    data: { type: "Buffer", data: Buffer },
    size: number,
    encoding: string;
    tempFilePath: string;
    truncated: boolean;
    mimetype: string;
    md5: string;
    mv: (uploadPath: string, callBack: (error: any) => void) => void;
}


export type RequestWithFiles = Request & {
    files?: Record<string, fileUploadItemType>
}