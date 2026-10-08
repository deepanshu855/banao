import mongoose from "mongoose";

const projectSchema= new mongoose.Schema({
    title: {
        type: String,
        default: "Untitled Project",
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, {timestamps: true});

const Project = mongoose.model("project", projectSchema);

export default Project;