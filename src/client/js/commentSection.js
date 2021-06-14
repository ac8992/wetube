import fetch from "node-fetch";
import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const comment_del = document.querySelector("#comment_del");
const video__comment = document.querySelector(".video__comment");


const addComment = (text, newCommentId) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.className = "video__comment";
    newComment.id = "video__comment";
    newComment.dataset.id = newCommentId;
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    span.className = "comment_text";
    const span2 = document.createElement("span");
    span2.innerText = "❌";
    span2.id = "comment_del";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
}

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const btn = form.querySelector("button");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    if (response.status === 201) {
        textarea.value = "";
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
    }
}

const handleCommentDelete = async (event) => {
    const comment = event.target.parentElement;
    const commentId = video__comment.dataset.id;
    const { status } = await fetch(`/api/comments/${commentId}`, { method: "DELETE" });
    if (status === 200) {
        comment.remove();
    }
}

if (form) {
    form.addEventListener("submit", handleSubmit);
}

if (comment_del) {
    comment_del.addEventListener("click", handleCommentDelete);
}