// this file contains all the handlers for our routes.
// Meaning that the Handler that we add to our router.get(PATHNAME, HANDLER)
// will live in this File. The reason is that otherwise routes.js will become huge file
// if we start to add logic into it as well.

import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        const postedMessages = await PostMessage.find();
        console.log(postedMessages);
        res.status(200).json(postedMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    console.log("createPost -> req.body", req.body);
    const params = req.query;
    console.log("createPost -> params", params);
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {

    // renaming id to _id. We did this to because next we will check that it is actually a MongoDB id.
    const { id: _id } = req.params;
    console.log("updatePost -> req.params", req.params);
    const post = req.body;
    console.log("updatePost -> req.body", req.body);

    // checking if that id is present in mongoDB.
    //  if not then we will send 404 not found
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with that ID");

    // we use findByIdAndUpdate function of Model and 
    // pass the id, post and new as true to get back the new modified document.
    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    
    res.json(updatePost);
};

export const deletePost = async (req, res) => {

    const { id: _id } = req.params;
    console.log("deletePost -> req.params", req.params);
    
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("ID not found");

    try {
        // const deletedPost = await PostMessage.deleteOne( { "_id": mongoose.Types.ObjectId(_id)})
        const deletedPost = await PostMessage.findByIdAndDelete(_id);
        res.json(deletedPost);
    } catch (error) {
        console.log("deletePost -> error", error);
        res.status(500).send("Server error. Could not delete")
    }
};