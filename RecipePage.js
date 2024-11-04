function toggleLike(element) {
    // Check if the like state is true or false
    const isLiked = element.getAttribute("data-liked") === "true";
    
    // Toggle the heart icon and like state
    element.innerHTML = isLiked ? "🤍 1.65k likes" : "❤️ 1.65k likes";
    element.setAttribute("data-liked", !isLiked);
}

function toggleSave(element) {
    const img = document.getElementById('bookmark')
    // Check if the like state is true or false
    const isSaved = element.getAttribute("data-saved") === "true";
    if (isSaved){
        img.src="bookmark-white.png"
    }
    else{ 
        img.src="bookmark.png"
    }
    // Toggle the icon and state
    element.setAttribute("data-saved", !isSaved);
}

function postComment() {
    const commentInput = document.getElementById("comment-input");
    const commentText = commentInput.value.trim();

    if (commentText) {
        // Create a new comment element
        const commentSection = document.querySelector(".comments-section");
        const newComment = document.createElement("div");
        newComment.classList.add("comment");

        // Add avatar
        const avatar = document.createElement("img");
        avatar.src = "user-avatar.jpg"; // Use the stock avatar image
        avatar.alt = "User Avatar";
        avatar.classList.add("comment-avatar");
        newComment.appendChild(avatar);

        // Add content
        const content = document.createElement("div");
        content.classList.add("comment-content");

        const commenterName = document.createElement("span");
        commenterName.classList.add("commenter-name");
        commenterName.textContent = "DefaultUser"; // Default user name
        content.appendChild(commenterName);

        const commentParagraph = document.createElement("p");
        commentParagraph.textContent = commentText;
        content.appendChild(commentParagraph);

        newComment.appendChild(content);

        // Append new comment to the comments section
        commentSection.appendChild(newComment);

        // Clear the input field
        commentInput.value = "";
    }
}