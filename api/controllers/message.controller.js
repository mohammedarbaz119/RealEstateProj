import prisma from "../lib/prisma.js";
export const addmessage = async (req, res) => {
    const chatId = req.params.id;
    const userId = req.userId;
    const text = req.body.text;
    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
                userIDs: {
                    hasSome: [userId]
                }
            }
        });
        if (!chat) {
            return res.status(404).json({ message: "chat not found" });
        }
        const message = await prisma.message.create({
            data: {
                text,chatId,userId
            }
        });

        await prisma.chat.update({
            where: {
                id: chatId
            },
            data: {
                seenBy: [userId],
                lastMessage: text
            }
        })
        res.status(200).json({ message });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to add message" });
    }
}