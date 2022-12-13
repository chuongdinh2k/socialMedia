const commentModel = require('../Models/CommentModel')
const videoModel = require('../Models/VideoModel')

const postComment = async (req, res) => {
    try {
        const idVideo = req.params.id;
        const currentVideo = await videoModel.findOne({ _id: idVideo })
        const comment = new commentModel({
            author: req.body.iduser,
            content: req.body.content,
            heart_count: 0,
        })
        await comment.save();

        await videoModel
        .updateOne(
            { _id: idVideo},
            { $push: { comment: comment._id }, $set: { comment_count: currentVideo.comment_count + 1 } }
        )
        res.send('Comment success!')
    } catch (error) {
        res.status(404).send(error);
    }
}

const getListComment = async (req, res) => {
    try {
        const idVideo = req.params.id
        const listComment = await videoModel.find({ _id: idVideo }).populate({
            path: 'comment',
            populate: { path: 'author' }
        })
        res.send(listComment)
    } catch (error) {
        res.status(404).send(error);
    }
}

const deleteComment = async (req, res) => {
    try {
        const id = req.params.id;
        const idVideo = req.params.idVideo;
        const currentVideo = await videoModel.findOne({ _id: idVideo })

        await commentModel.deleteOne({ _id: id})

        await videoModel
        .updateOne(
            { _id: idVideo },
            { $set: { comment_count: currentVideo.comment_count - 1 } }
        )
        res.status(200).send('Xóa thành công!')
    } catch (error) {
        res.status(404).send(error);
    }
}

module.exports = {
    postComment: postComment,
    getListComment: getListComment,
    deleteComment: deleteComment,
}