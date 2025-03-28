document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("fileInput");
    const preview = document.getElementById("preview");
    const button = document.getElementById("shareStory");
    
    
    if (input) {
        input.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function (e) {
               
                preview.innerHTML = file.type.startsWith("image/")
                    ? `<img src="${e.target.result}" alt="Preview" style="width: 80px; height: 80px; border-radius: 10px; margin-bottom: 10px;">`
                    : `<video src="${e.target.result}" controls style="width: 80px; height: 80px; border-radius: 10px; margin-bottom: 10px;"></video>`;

                
                let stories = JSON.parse(localStorage.getItem("stories")) || [];
                stories.push({ src: e.target.result, type: file.type });
                localStorage.setItem("stories", JSON.stringify(stories));
            };
            reader.readAsDataURL(file);
        });

        button.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }

    
    const storySection = document.querySelector(".stories");
    if (storySection) {
        let stories = JSON.parse(localStorage.getItem("stories")) || [];

        
        const existStory = `
            <div class="story-container">
                <a class="plus-icon" href="story.html">+</a>
                <p>Your Story</p>
            </div>
            <div class="story"><img src="ASSETS/rohit sharma.png" alt="Rohit Sharma"><p>Rohit Sharma</p></div>
            <div class="story"><img src="ASSETS/hardik pandey.png" alt="Hardik Pandey"><p>Hardik Pandey</p></div>
            <div class="story"><img src="ASSETS/images.jpeg" alt="Virat Kohli"><p>Virat Kohli</p></div>
        `;

        storySection.innerHTML = existStory;

        
        stories.forEach((story, index) => {
            const newStoryDiv = document.createElement("div");
            newStoryDiv.classList.add("story");
            newStoryDiv.innerHTML = story.type.startsWith("image/")
                ? `<img src="${story.src}" alt="Your Story">`
                : `<video src="${story.src}" controls></video>`;
            newStoryDiv.innerHTML += `<p>Your Story</p>`;

            newStoryDiv.addEventListener("click", function () {
                const action = confirm("Click OK to View Story, cancel to Delete.");
                if (action) {
                    
                    const Full = document.createElement("div");
                    Full.style.position = "fixed";
                    Full.style.top = "0";
                    Full.style.left = "0";
                    Full.style.width = "100%";
                    Full.style.height = "100%";
                    Full.style.background = "rgba(0, 0, 0, 0.8)";
                    Full.style.display = "flex";
                    Full.style.justifyContent = "center";
                    Full.style.alignItems = "center";
                    Full.style.zIndex = "1000";

                    Full.innerHTML = story.type.startsWith("image/")
                        ? `<img src="${story.src}" alt="Full Story" style="max-width: 90%; max-height: 90%; border-radius: 10px;">`
                        : `<video src="${story.src}" controls autoplay style="max-width: 90%; max-height: 90%; border-radius: 10px;"></video>`;

                    
                    Full.addEventListener("click", function () {
                        document.body.removeChild(Full);
                    });

                    document.body.appendChild(Full);
                } else {
                    
                    const Delete = confirm("Are you sure you want to delete this story?");
                    if (Delete) {
                        stories.splice(index, 1);
                        localStorage.setItem("stories", JSON.stringify(stories));
                        location.reload();
                    }
                }
            });

            
            storySection.insertBefore(newStoryDiv, storySection.children[1]);
        });
    }
});




