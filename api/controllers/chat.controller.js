import prisma from "../lib/prisma.js";

export const getAllchats = async (req, res) => {
    const userId = req.userId;
    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [userId],
                },
            },
            include:{
                messages:{
                    select:{
                        createdAt:true
                    }
                }
            }
            
        });
        for (const chat of chats) {
            const receiverId = chat.userIDs.find(id => id !== userId);
            const receiver = await prisma.user.findUnique({
                where: {
                    id: receiverId
                },

                select: {
                    id: true,
                    username: true,
                    avatar: true
                }
            });
            chat.receiver = receiver;
        }
        chats.sort((a, b) => {
            return new Date(b.messages[b.messages.length - 1].createdAt) - new Date(a.messages[a.messages.length - 1].createdAt);
        });
        res.status(200).json({ chats });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to get all chats" });
    }
};
export const getSinglechat = async (req, res) => {
    try {
        const chatId = req.params.id;
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
                userIDs: {
                    hasSome: [req.userId],
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });
        if(!chat.seenBy.includes(req.userId)){
            await prisma.chat.update({
                where: {
                    id: chatId,
                },
                data: {
                    seenBy: {
                     push:[req.userId],
                    },
                },
            });
        }

       

        res.status(200).json({ chat });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to get chat" });
    }
};
export const addChat = async (req, res) => {
    try {
        const userId = req.userId;
        const { receiverId,message } = req.body;
        const chatData = {
            seenBy: [userId],
          };
          if(message){
            chatData.lastMessage = message
                chatData.messages = {
                    create:{
                        text:message,
                        userId:userId,
                    },
                };
          }
        const chat = await prisma.chat.create({
            data: {
                userIDs:[userId,receiverId],
                ...chatData,
            },
        });
        res.status(200).json({ chat });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed create chats" });
    }
};
export const readChats = async (req, res) => {
    try {
        const userId = req.userId;
        const chat = await prisma.chat.findUnique({ 
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [userId],
                },
            },
        });
       if(!chat.seenBy.includes(userId)){
           await prisma.chat.update({
               where: {
                   id: req.params.id,
               },
               data: {
                   seenBy: {
                       push: [userId],
                   },
               },
           }); 

        }

        res.status(200).json({ chat });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to get all chats" });
    }
};


export const getAllunreadchatsnos = async (req, res) => {
    try {
        const userId = req.userId;
        let chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [userId],
                },
            },
        });
        chats = chats.filter(chat => !chat.seenBy.includes(userId))
        res.status(200).json({ notifs:chats.length });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to get all chats" });
    }
}

export const getHasChat = async (req, res) => {
    try {
        const userId = req.userId;
        const { receiverId } = req.body;
        console.log(req.body)
        const chat = await prisma.chat.findFirst({
            where: {
                userIDs: {
                    hasEvery: [userId,receiverId],
                },
            },
        });
        res.status(200).json({ chat });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to get chat" });
    }
}