export interface heading {
    text: string;
    hiddenSM: boolean;
}

export enum BodyType {
    IMAGE = "IMAGE",
    TEXT = "TEXT",
    ARRAY = "ARRAY",
    NUMBER = "NUMBER",
    LINK = "LINK",
}

export type bodyItem =
    | {
          type: BodyType.IMAGE;
          data: string;
          hiddenSM: boolean;
          alt: string | undefined;
      }
    | {
          type: BodyType.TEXT;
          data: string;
          hiddenSM: boolean;
          alt?: string | undefined;
      }
    | {
          type: BodyType.LINK;
          data: string;
          hiddenSM: boolean;
      }
    | {
          type: BodyType.ARRAY;
          data: { name: string }[];
          hiddenSM: boolean;
          alt?: string | undefined;
      }
    | {
          type: BodyType.NUMBER;
          data: number;
          hiddenSM: boolean;
          alt?: string | undefined;
      };

export type bodyArray = bodyItem[];
