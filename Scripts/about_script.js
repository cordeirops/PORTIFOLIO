const showDescriptButtons = document.querySelectorAll(".show-description-button");

function toggleDescription(event){
    const workDescription = event.target.parentElement.querySelector(".work-description");

    if (workDescription.style.display === "none" || workDescription.style.display === "" ){
        workDescription.style.display = "block";
    } else {
        workDescription.style.display = "none";
    }
}

showDescriptButtons.forEach(button => {
    button.addEventListener("click", toggleDescription);
})