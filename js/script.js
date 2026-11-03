/* =========================
   DARK / LIGHT MODE
========================= */

let themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

});


/* =========================
   COMMENT SYSTEM
========================= */

let commentForm = document.getElementById("commentForm");

let message = document.getElementById("message");

let fileHandle = null;


commentForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Get visitor information

    let name = document.getElementById("visitorName").value.trim();

    let email = document.getElementById("visitorEmail").value.trim();

    let comment = document.getElementById("commentText").value.trim();


    // Validate fields

    if (name === "" || email === "" || comment === "") {

        message.textContent = "Please fill all fields!";

        return;

    }


    // Create comment data

    let commentData =

        "Name: " + name + "\n" +

        "Email: " + email + "\n" +

        "Comment: " + comment + "\n" +

        "------------------------------\n";


    try {

        // Select file on first save

        if (fileHandle === null) {

            fileHandle = await window.showSaveFilePicker({

                suggestedName: "comments.txt",

                types: [

                    {

                        description: "Text Files",

                        accept: {

                            "text/plain": [".txt"]

                        }

                    }

                ]

            });

        }


        // Read existing file

        let existingFile = await fileHandle.getFile();

        let oldComments = await existingFile.text();


        // Append new comment

        let newComments = oldComments + commentData;


        // Write to file

        let writable = await fileHandle.createWritable();

        await writable.write(newComments);

        await writable.close();


        // Success message

        message.textContent = "Comment saved successfully!";


        // Clear form

        commentForm.reset();


    }

    catch (error) {

        if (error.name === "AbortError") {

            message.textContent = "File selection cancelled.";

        }

        else {

            message.textContent = "Error saving comment!";

            console.error(error);

            fileHandle = null;

        }

    }

});