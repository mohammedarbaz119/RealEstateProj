import prisma from "./prisma.js"

export const deleteChat = async () => {
const userId ="6686a933eb9b2f9e6e12f519"
   
    try {
const chat = await prisma.chat.findFirst({
            where: {
                userIDs: {
                    hasSome: [userId]
                }
            }
        });
        if (!chat) {
            return;
        }
        await prisma.message.deleteMany({
            where: {
              chatId: chat.id,
            },
          });
        await prisma.chat.delete({
            where: {
                id: chat.id
            },
            
        })
        console.log("delete success",chat)
    }
    catch (err) {
        console.log(err);
    }
}


const add = async () => {
    try {
        const receiverId = "6686a933eb9b2f9e6d12f519";
        const chatData = {
            seenBy: [receiverId],
          };
        const chat = await prisma.chat.create({
            data: {
                userIDs:[receiverId],
                ...chatData,
            },
        });
        console.log("add success",chat);
    }
    catch (err) {
        console.log(err);
    }
}
await add();
