
document.addEventListener('DOMContentLoaded', function () {


    const profileContainer = document.getElementById('profile-container');
    profileContainer.innerHTML = ''; // Clear previous content

    // Create profile card
    const profileCard = document.createElement('div');
    profileCard.classList.add('profile-card');


    let currentIndex = 0;
    let images = [];



    // Add house image
    const currentImage = document.createElement('img');
    currentImage.src = currentImage.src;
    profileCard.appendChild(currentImage);

    // Add like and dislike buttons
    const actionsContainer = document.createElement('div');
    actionsContainer.classList.add('profile-actions');

    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.addEventListener('click', () => {
        // console.log(`Liked house with ID ${house.id}`);
        handleVote(1, 'like');
        // Add your logic for handling a like action here
    });
    actionsContainer.appendChild(likeButton);

    const dislikeButton = document.createElement('button');
    dislikeButton.textContent = 'Dislike';
    dislikeButton.addEventListener('click', () => {
        // console.log(`Disliked house with ID ${house.id}`);
        handleVote(1, 'dislike');
        // Add your logic for handling a dislike action here
    });
    actionsContainer.appendChild(dislikeButton);

    const nextImageButton = document.createElement('button');
    nextImageButton.textContent = 'Next';
    nextImageButton.addEventListener('click', nextImage);
    actionsContainer.appendChild(nextImageButton);

    const previousImageButton = document.createElement('button');
    previousImageButton.textContent = 'Previous';
    previousImageButton.addEventListener('click', prevImage);
    actionsContainer.appendChild(previousImageButton);

    profileCard.appendChild(actionsContainer);

    // Append profile card to container
    profileContainer.appendChild(profileCard);

    // Function to update the displayed image
    function updateImage() {
        if (images.length !== 0) {
            currentImage.src = images[currentIndex];
            profileCard.replaceChild(currentImage, currentImage);
        }
    }

    // Function to navigate to the previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }

    // Function to navigate to the next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    // Fetch images from the server-side
    fetchData(updateImage);

    function fetchData(updateImage) {
        fetch('http://127.0.0.1:5000/houses')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch house images');
                }
                return response.json();
            })
            .then(data => {
                images = data.image;
                updateImage(); // Display the first image
            })
            .catch(error => {
                console.error('Error fetching house images:', error);
            });
    }

    function handleVote(houseId, voteType) {
        fetch('http://127.0.0.1:5000/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ house_id: houseId, vote_type: voteType })
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    throw new Error('Failed to record vote');
                }
                console.log(`Successfully recorded ${voteType} for house ${houseId}`);
                // Once the vote is recorded successfully, fetch data for the next house
                fetchData(updateImage);
            })
            .catch(error => {
                console.error('Error recording vote:', error);
            });
    }
});

