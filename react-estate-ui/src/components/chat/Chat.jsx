// import { useState } from "react";
// import "./chat.scss";
// import { useAuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import timeAgo from "../../lib/TimeCalc";
// import { useEffect } from "react";
// function Chat({chats}) {

//   const [SendMessage,setSendMessage] = useState("")
//   const {user} = useAuthContext();
//   const [chat, setChat] = useState(null);
// useEffect(() => {
//   console.log("chat");
// }, [chat])

//   const handleOpenChat = async(id,receiver) => {
//     try{
//       const res = await axios.get(`/api/chats/${id}`,{withCredentials:true});
//       chats = chats.map((chat)=>chat.id===id?{...chat,seenBy:[...chat.seenBy,user.id]}:chat);
//       setChat({...res.data.chat,receiver});
//     }
//     catch(err){
//       console.log(err);
//     }
//   }

//   const handleSendMessage = async(e) => {
//    e.preventDefault()
//    setSendMessage(""); 
//    try{
//       const res = await axios.post(`/api/messages/${chat.id}`,{text:SendMessage},{withCredentials:true});
//       setChat({...chat,messages:[...chat.messages,res.data.message]});
//     }
//     catch(err){
//       setChat({...chat,messages:chat.messages.pop()})
//       console.log(err);
//     }
//   }
//   return (
//     <div className="chat">
//       <div className="messages">
//         <h1>Messages</h1>
//         {
//           chats.map((chat)=>{
//             return(
//             <div onClick={() => handleOpenChat(chat.id,chat.receiver)} className="message" key={chat.id} style={{backgroundColor:chat.seenBy.includes(user.id)?"white":"#fecd514e"}}>
//               <img src={chat.receiver.avatar||"/noavatar.jpeg"} alt="" />
//               <span>{chat.receiver.username}</span>
//               <p>{chat.lastMessage}</p>
//             </div>
//           )})
//         }
        
//       </div>
//       {chat && (
//         <div className="chatBox">
//           <div className="top">
//             <div className="user">
//               <img
//                 src={chat.receiver.avatar||"/noavatar.jpeg"}
//                 alt=""
//               />
//               {chat.receiver.username}
//             </div>
//             <span className="close" onClick={()=>setChat(false)}>X</span>
//           </div>
//           <div className="center">
//             {
//               chat.messages.map((message)=>(
//                 <div key={message.id} className={`chatMessage`} 
//                 style={{alignSelf:message.userId===user.id?"flex-end":"flex-start",
//                   textAlign:message.userId===user.id?"right":"left"
//                 }}>
//                   <p>{message.text}</p>
//                   <span>{timeAgo(message.createdAt)}</span>
//                 </div>
//             ))}
//           </div>
//           <form className="bottom" onSubmit={handleSendMessage}>
//             <textarea value={SendMessage} onChange={e=>setSendMessage(e.target.value)}/>
//             <button type="submit">Send</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chat;
import { useState, useEffect, useRef } from "react";
import "./chat.scss";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import timeAgo from "../../lib/TimeCalc";
import { useSocketContext } from "../../context/SocketContext";
function Chat({ chats }) {
  const [SendMessage, setSendMessage] = useState("");
  const { user } = useAuthContext();
  const {socket} = useSocketContext();
  const [chat, setChat] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const messagesEndRef = useRef(null);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await axios.get(`/api/chats/${id}`, { withCredentials: true });
      setChat({ ...res.data.chat, receiver });
      setSelectedChatId(id); // Set the selected chat ID
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      socket.emit("sendMessage", {data:SendMessage,receiverId:chat.receiver.id});
      const res = await axios.post(
        `/api/messages/${chat.id}`,
        { text: SendMessage },
        { withCredentials: true }
      );
      setSendMessage("");
      setChat({ ...chat, messages: [...chat.messages, res.data.message] }); 
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const read = async () => {
      try{
      await axios.get(`/api/chats/${chat.id}`, { withCredentials: true });
      }catch(err){
        console.log(err);
      }
    };
    if (chat && socket) {
      socket.on("getMessage", (data) => {
        setChat({ ...chat, messages: [...chat.messages, { text: data, userId: chat.receiver.id,id:chat.receiver.id,createdAt:new Date() }] });
        read();
      })
    }
    
    }, [socket,chat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
 

  useEffect(() => {
    if (chat) {
      scrollToBottom();
    }
  }, [chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats.map((chat) => (
          <div
            onClick={() => handleOpenChat(chat.id, chat.receiver)}
            className={`message ${selectedChatId === chat.id ? 'selected' : ''}`} // Conditionally apply the 'selected' class
            key={chat.id}
            style={{
              backgroundColor: selectedChatId === chat.id ? "#d3d3d3" : (chat.seenBy.includes(user.id) ? "white" : "#fecd514e"),
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
            <span className="close" onClick={() => setChat(null)}>X</span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                key={message.id}
                className={`chatMessage`}
                style={{
                  alignSelf: message.userId === user.id ? "flex-end" : "flex-start",
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
            <textarea value={SendMessage} onChange={(e) => setSendMessage(e.target.value)} />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;

