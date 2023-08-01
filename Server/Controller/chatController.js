import chatModel from "../Model/chatModel.js";
export async function createChat(req, res) {
    console.log(req.body);
    const senderId = req.body.senderId;
    const reciverId = req.body.reciverId;
  
    try {
      // Check if a chat with both senderId and reciverId already exists
      let result = await chatModel.findOne({
        members: { $all: [senderId, reciverId] },
      });
  
      if (result) {
        // Chat already exists
        res.json({ err: false, result });
      } else {
        // Chat doesn't exist, create a new chat
        const newChat = new chatModel({
          members: [senderId, reciverId],
        });
  
        const result = await newChat.save();
        res.json({ err: false, result });
      }
    } catch (error) {
      res.json({ error });
    }
  }
export async function userChat(req, res) {
    try {

        let userChats = await chatModel.find({
            members: { $in: [req.params.id] }
        })
 
        res.json({ err: false, userChats })

    } catch (error) {
        res.json({ error })
    }
}
export async function findChat(req, res) {
    try {
        let chat = await chatModel.find({
            members: { $all: [req.params.firstId, req.params.secondId] }
        })
        res.json({ err: false, chat })

    } catch (error) {
        res.json({ error })
    }
}