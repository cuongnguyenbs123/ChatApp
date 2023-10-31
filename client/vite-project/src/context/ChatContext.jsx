import { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from '../utils/servicesFetchAPI';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [isUserChatsError, setIsUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessageLoading, setIsMessageLoading] = useState(false);
    const [messageError, setIsMessageError] = useState(null);
    const [sendTextMessageError,setSendTextMessageError] = useState(null);
    const [newMessage,setNewMessage] = useState(null);


    useEffect(() => {
        const getUser = async () => {
            const response = await getRequest(`${baseUrl}/users`);
            if (response.error) {
                return console.log("Error fetching users", response);
            }


            const pChats = response.filter((u) => {
                let isChatCreated = false;

                if (user?._id === u._id) return false;

                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u.id || chat.members[1] === u._id;
                    })
                }
                return !isChatCreated;
            })

            setPotentialChats(pChats);
        };
        getUser();
    }, [userChats]);


    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true);
                setIsUserChatsError(null);
                const response = await getRequest(`${baseUrl}/chats/${user?._id}`)


                if (response.error) {
                    return setIsUserChatsError(reponse);
                }

                setIsUserChatsLoading(false);

                setUserChats(response);
            }
        }
        getUserChats();
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
            setIsMessageLoading(true);
            setIsMessageError(null);
            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`)


            if (response.error) {
                return setIsMessageError(reponse);
            }

            setMessages(response);
        }
        getMessages();
    }, [currentChat])

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`${baseUrl}/chats`, { firstId, secondId });
        if (response.error) {
            return console.log("Error creating chat", response);
        }
        setUserChats((prev) => [...prev, response])
    }, [])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    }, [])

    const sendTextMessage = useCallback(async(textMessage,sender,currentChatId,setTextMessage)=>{
        if(!textMessage) return console.log("You must type something")

        const response = await postRequest(`${baseUrl}/messages`,{
            chatId:currentChatId,
            senderId:sender._id,
            text:textMessage
        })

        if(response.error){
            return setSendTextMessageError(response);
        }

        setNewMessage(response)

        setMessages((prev)=>[...prev,response])

        setTextMessage("")
    },[])

    return (
        <ChatContext.Provider
            value={{
                userChats,
                isUserChatsLoading,
                isUserChatsError,
                potentialChats,
                createChat,
                updateCurrentChat,
                isMessageLoading,
                setIsMessageError,
                currentChat,
                messages,
                sendTextMessage
            }}
        >{children}</ChatContext.Provider>
    )
}
