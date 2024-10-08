import { useState, useEffect, useRef } from "react";
import "./chat.scss";
import { useAuthContext } from "../../context/AuthContext";
import timeAgo from "../../lib/TimeCalc";
import { useSocketContext } from "../../context/SocketContext";
import { useNotifStore } from "../../lib/NotificationStore";
import ApiRequest from "../../lib/AxiosConfig";
import { ChatsLoader } from "../../lib/loader";
import SkeletonChat from "../Cardloader/SkeletonChat";
function Chat() {
  const [chats, setChats] = useState([])
  const [loading, setloading] = useState(true)
  const [error, SetError] = useState("")
  const [SendMessage, setSendMessage] = useState("");
  const { user } = useAuthContext();
  const { socket } = useSocketContext();
  const [chat, setChat] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const messagesEndRef = useRef(null);
  const decrementnotif = useNotifStore((state) => state.decrement);
  const incrementnotif = useNotifStore((state) => state.increment)
  

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await ApiRequest.get(`/chats/${id}`, {
        withCredentials: true,
      });
      setChats(chats => chats.map(l => {
        if (l.id === id) {
          l.seenBy.push(user.id)
        }
        return l
      }))
      setChat({ ...res.data.chat, receiver });
      setSelectedChatId(id);
      if (!res.data.chat.seenBy.includes(user.id)) {
        decrementnotif();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      socket.emit("sendMessage", {
        data: SendMessage,
        receiverId: chat.receiver.id,
        chatID: chat.id
      });
      const res = await ApiRequest.post(
        `/messages/${chat.id}`,
        { text: SendMessage },
        { withCredentials: true }
      );
      setSendMessage("");
      setChat({ ...chat, lastMessage: res.data.message, messages: [...chat.messages, res.data.message] });
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    const read = async () => {
      try {
        await ApiRequest.get(`/chats/${chat.id}`, { withCredentials: true });
      } catch (err) {
        console.log(err);
      }
    };
    if (socket) {
      socket.on("getMessage", (data) => {
        if (chat) {
          setChat((chat) => ({
            ...chat,
            lastMessage: data.data,
            messages: [
              ...chat.messages,
              {
                text: data.data,
                userId: chat.receiver.id,
                id: chat.receiver.id,
                createdAt: new Date(),
              },
            ],
          }));
          read();
        }
        incrementnotif();
        setChats(chats => {
          return chats.map(singlechat => {
            if (singlechat.id === data.chatID) {
              singlechat.lastMessage = data.data
              singlechat.seenBy = singlechat.seenBy.filter(l => l !== user.id)
            }
            return singlechat
          })
        })
      });
    }
    return () => {
      if (socket) {
        socket.off("getMessage");
      }
    };
  }, [socket, chat]);


  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chats = await ChatsLoader()
        setChats(chats)
        setloading(false)
      } catch (er) {
        setloading(false)
        SetError(er)
      }
      finally {
        setloading(false)
      }

    }
    fetchChats()
  }, [])


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (chat) {
      scrollToBottom();
    }
  }, [chat]);

  if (loading) {
    return <SkeletonChat />
  }
  if (error) {
    return <p>there was some error in loading chats</p>
  }
  if (chats.length <= 0) {
    return <p>there are no chats</p>
  }

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats.map((chat) => (
          <div
            onClick={() => handleOpenChat(chat.id, chat.receiver)}
            className={`message ${selectedChatId === chat.id ? "selected" : ""
              }`} // Conditionally apply the 'selected' class
            key={chat.id}
            style={{
              backgroundColor:
                selectedChatId === chat.id
                  ? "#d3d3d3"
                  : chat.seenBy.includes(user.id)
                    ? "white"
                    : "#fecd514e",
            }}
          >
            <img src={chat.receiver.avatar || "/noavatar.jpeg"} alt="" />
            <span>{chat.receiver.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "/noavatar.jpeg"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => {
              setSelectedChatId(null)
              setChat(null)
            }}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                key={message.id}
                className={`chatMessage`}
                style={{
                  alignSelf:
                    message.userId === user.id ? "flex-end" : "flex-start",
                  textAlign: message.userId === user.id ? "right" : "left",
                }}
              >
                <p>{message.text}</p>
                <span>{timeAgo(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="bottom" onSubmit={handleSendMessage}>
            <textarea
              value={SendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
