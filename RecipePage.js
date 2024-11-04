function toggleLike(element) {
    // Check if the like state is true or false
    const isLiked = element.getAttribute("data-liked") === "true";
    
    // Toggle the heart icon and like state
    element.innerHTML = isLiked ? "🤍 1.65k likes" : "❤️ 1.65k likes";
    element.setAttribute("data-liked", !isLiked);
}

function toggleSave() {
    const img = document.getElementById('bookmark');
    const saveButton = document.getElementById("save-button");
    const isSaved = saveButton.getAttribute("data-saved")
    // Check if the like state is true or false
    if (isSaved==="true"){
        img.src="bookmark.png";
    }
    else{ 
        img.src="bookmark-white.png";
    }
    
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

function openPopup() {
    document.getElementById("bookmark-popup").style.display = "block";
}

function closePopup() {
    document.getElementById("bookmark-popup").style.display = "none";
}

function confirmBookmark() {
    const folder = document.getElementById("bookmark-folder").value;
    const saveButton = document.getElementById("save-button");
    const popup = document.getElementById("bookmark-popup");
    var button1 = document.createElement("button");
    button1.setAttribute("id",'delete-button')
    button1.setAttribute("attribute",'Delete')
    button1.onclick = deleteBookmark;
    popup.appendChild(button1);
    button1.innerHTML = "Delete"; 

    console.log(button1);
    console.log("Bookmarked in folder:", folder);

    alert("Recipe bookmarked in " + folder + "!");
    saveButton.setAttribute("data-saved", "true");
    toggleSave();
    closePopup();
}

function deleteBookmark() {
    const saveButton = document.getElementById("save-button");
    saveButton.setAttribute("data-saved", "false");
    alert("Recipe bookmarked removed!");


    const parent = document.getElementById("bookmark-popup");
    const child = document.getElementById("delete-button");
    parent.removeChild(child);

    toggleSave();
    closePopup();

  }