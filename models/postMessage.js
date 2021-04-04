import mongoose from "mongoose";

// What is a schema?
// With mongodb we can create documents that look absolutely different
// such as 1 doc have title and message while other has name, age and message.
// mongoose allow us to give some sort of uniformity to our documents.
// so each post needs to have title, message, creator, tags, selectedFile, likeCount, createAt
// here selectedFile is a n image converted to a string using base64 module.
// likeCount is of type Number with default value 0 and so on with createAt which is that day's date.
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

//Because of this schema above, we will be able to run find, create, delete, and update commands
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
