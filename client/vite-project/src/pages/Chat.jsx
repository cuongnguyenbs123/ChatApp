import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack, Modal, Button } from "react-bootstrap";
import UserChat from "../components/chat/userChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChat";
import ChatBox from "../components/chat/ChatBox";
import { useFetchRecipientUser } from "../hooks/userFetchRecipient";


const Chat = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, updateCurrentChat, currentChat, isMessagesLoading } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, user);

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);
    return (
        <>
            <Container>
                {matches && recipientUser && <PotentialChats />}
                {userChats?.length < 1 ? null : (
                    <Stack direction="horizontal" gap={4} className="align-items-start">
                        {
                            matches ?
                                <Stack className="messages-box flex-grow-0 w-100" gap={3}>
                                    {isUserChatsLoading && <p>Loading chats ...</p>}
                                    {userChats?.map((chat, index) => {
                                        return (
                                            <div key={index} onClick={() => updateCurrentChat(chat)}><UserChat chat={chat} user={user} /></div>
                                        )
                                    })}
                                </Stack>
                                : (
                                    !recipientUser && <Stack className="messages-box w-100 flex-grow-0" gap={3}>
                                        {isUserChatsLoading && <p>Loading chats ...</p>}
                                        {userChats?.map((chat, index) => {
                                            return (
                                                <div key={index} onClick={() => updateCurrentChat(chat)}><UserChat chat={chat} user={user} /></div>
                                            )
                                        })}
                                    </Stack>
                                )
                        }
                        {
                            matches ? <ChatBox /> : (
                                recipientUser && !isMessagesLoading ?
                                    <div
                                        className="modal show w-100"
                                        style={{ display: 'block', position: 'initial' }}
                                    >
                                        <Modal.Dialog>
                                            <Modal.Body>
                                                <ChatBox />
                                            </Modal.Body>
                                        </Modal.Dialog>
                                    </div>
                                    : null
                            )
                        }
                    </Stack>
                )}
            </Container>
        </>
    )
};
export default Chat;