import { MessageType } from "./MessageTypeEnum";

export interface IMessage {
    message: string,
    type: MessageType,
    show: boolean
}