import messageModel from "../Model/messageModel.js";
export async function addChat(req, res) {
    try {
        console.log(req.body);
        let { chatId, senderId, text } = req.body
        let message = new messageModel({
            chatId, senderId, text
        })
        let result = await message.save()
        res.json({ err: false, result })
    } catch (error) {
        res.json(error)
    }
}
export async function getChat(req, res) {
    try {
        console.log(req.params);
        let chatId= req.params.chatId
        let message = await messageModel.find({chatId })
        console.log(message);
        res.json({ err: false, message })
    } catch (error) {
        res.json(error)
    }
}