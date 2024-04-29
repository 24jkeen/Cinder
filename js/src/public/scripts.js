// Sample house data (you can replace this with actual data)
const houseData = [
    { id: 1, image: 'houses/house1.jpg' },
    { id: 2, image: 'houses/house2.jpg' },
    { id: 3, image: 'houses/house3.jpg' },
    // Add more house objects as needed
];

// Function to render house profiles
function renderProfiles() {
    const profileContainer = document.getElementById('profile-container');
    profileContainer.innerHTML = ''; // Clear previous content

    houseData.forEach(house => {
        // Create profile card
        const profileCard = document.createElement('div');
        profileCard.classList.add('profile-card');

        // Add house image
        const image = document.createElement('img');
        image.src = house.image;
        profileCard.appendChild(image);

        // Add like and dislike buttons
        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('profile-actions');

        const likeButton = document.createElement('button');
        likeButton.textContent = 'Like';
        likeButton.addEventListener('click', () => {
            console.log(`Liked house with ID ${house.id}`);
            // Add your logic for handling a like action here
        });
        actionsContainer.appendChild(likeButton);

        const dislikeButton = document.createElement('button');
        dislikeButton.textContent = 'Dislike';
        dislikeButton.addEventListener('click', () => {
            console.log(`Disliked house with ID ${house.id}`);
            // Add your logic for handling a dislike action here
        });
        actionsContainer.appendChild(dislikeButton);

        profileCard.appendChild(actionsContainer);

        // Append profile card to container
        profileContainer.appendChild(profileCard);


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
                })
                .catch(error => {
                    console.error('Error recording vote:', error);
                });
        }

        // Like button event listener
        likeButton.addEventListener('click', () => {
            const houseId = 1;
            handleVote(houseId, 'like');
        });

        // Dislike button event listener
        dislikeButton.addEventListener('click', () => {
            const houseId = 1;
            handleVote(houseId, 'dislike');
        });
    });
}

// Render initial profiles
renderProfiles();


