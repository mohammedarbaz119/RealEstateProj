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
        const { receiverId } = req.body;
        const chat = await prisma.chat.create({
            data: {
                userIDs: {
                    set: [userId, receiverId],
                },
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
