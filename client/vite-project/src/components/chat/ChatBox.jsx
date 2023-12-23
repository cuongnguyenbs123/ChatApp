import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/userFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji"
const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading, sendTextMessage, updateCurrentChat } = useContext(ChatContext);
    const { recipientUser,updaeRecipientUser } = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTexMessage] = useState("");

    if (!recipientUser) {
        return (
            <p className="conversation" style={{ textAlign: "center", width: "100%" }}>No conversation selected yet ...</p>
        )
    }

    if (isMessagesLoading) {
        return (
            <p style={{ textAlign: "center", width: "100%" }}>Loading Chat ...</p>
        )
    }

    


    return (
        <Stack gap={4} className="chat-box w-100">
            <div className="chat-header cursor-pointer" type="button" style={{position: 'relative'}} >
                <span onClick={()=>{
                    updateCurrentChat(null);
                    updaeRecipientUser(null);
                }} style={{ position: 'absolute', left: '12px' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg></span>
                <strong>{recipientUser?.name}</strong>
            </div>
            <Stack gap={3} className="messages">
                {messages && messages.map((message, index) => <Stack key={index} className={`${message.senderId === user?._id ? "message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0"}`}>
                    <span>{message.text}</span>
                    <span className="message-footer">{moment(message.createdAt).calendar()}</span>
                </Stack>)}
            </Stack>
            <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
                <InputEmoji value={textMessage} onChange={setTexMessage} fontFamily="nunito" borderColor="rgba(72,112,223,0.2)" />
                <button className="send-btn" onClick={() => {
                    sendTextMessage(textMessage, user, currentChat._id, setTexMessage)
                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                    </svg></button>
            </Stack>
        </Stack>
    )

}
export default ChatBox;