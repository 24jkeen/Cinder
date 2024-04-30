// Sample house data (you can replace this with actual data)
const houseData = [
    // { id: 1, image: 'houses/house1.jpg' },
    // { id: 2, image: 'houses/house2.jpg' },
    // { id: 3, image: 'houses/house3.jpg' },
    // Add more house objects as needed
];

function fetchHouseData() {
    fetch('http://127.0.0.1:5000/houses') // Replace with your Flask server URL
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch house data');
        }
        return response.json();
    })
    .then(data => {
        // Process the fetched house data
        console.log('Fetched house data:', data);
        // Call a function to render the house data on the UI
        renderProfiles(data);
    })
    .catch(error => {
        console.error('Error fetching house data:', error);
        // Handle errors, such as displaying an error message on the UI
    });
}

function renderHouseData(houseData) {
    const houseContainer = document.getElementById('house-container');

    // Clear existing content
    houseContainer.innerHTML = '';

    // Render each house profile card
    houseData.forEach(house => {
        const houseProfile = document.createElement('div');
        houseProfile.classList.add('house-profile');

        // Create image element
        const image = document.createElement('img');
        image.src = house.image;
        image.alt = 'House Image';
        houseProfile.appendChild(image);

        // Create title element
        const title = document.createElement('h3');
        title.textContent = house.title; // Update with your house title data
        houseProfile.appendChild(title);

        // Create like and dislike counters
        const likeCounter = document.createElement('span');
        likeCounter.classList.add('like-counter');
        likeCounter.textContent = `Likes: ${house.likes}`;
        houseProfile.appendChild(likeCounter);

        const dislikeCounter = document.createElement('span');
        dislikeCounter.classList.add('dislike-counter');
        dislikeCounter.textContent = `Dislikes: ${house.dislikes}`;
        houseProfile.appendChild(dislikeCounter);

        // Create like button
        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.textContent = 'Like';
        likeButton.addEventListener('click', () => handleVote(house.id, 'like'));
        houseProfile.appendChild(likeButton);

        // Create dislike button
        const dislikeButton = document.createElement('button');
        dislikeButton.classList.add('dislike-button');
        dislikeButton.textContent = 'Dislike';
        dislikeButton.addEventListener('click', () => handleVote(house.id, 'dislike'));
        houseProfile.appendChild(dislikeButton);

        // Append the house profile card to the container
        houseContainer.appendChild(houseProfile);
    });
}



// Function to render house profiles
function renderProfiles(data) {
    const profileContainer = document.getElementById('profile-container');
    profileContainer.innerHTML = ''; // Clear previous content

    data.forEach(house => {
        // Create profile card
        const profileCard = document.createElement('div');
        profileCard.classList.add('profile-card');

        // Add house image
        const image = document.createElement('img');
        image.src = house.image[0];
        profileCard.appendChild(image);

        // Add like and dislike buttons
        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('profile-actions');

        const likeButton = document.createElement('button');
        likeButton.textContent = 'Like';
        likeButton.addEventListener('click', () => {
            console.log(`Liked house with ID ${house.id}`);
            handleVote(house.id, 'like');
            // Add your logic for handling a like action here
        });
        actionsContainer.appendChild(likeButton);

        const dislikeButton = document.createElement('button');
        dislikeButton.textContent = 'Dislike';
        dislikeButton.addEventListener('click', () => {
            console.log(`Disliked house with ID ${house.id}`);
            handleVote(house.id, 'dislike');
            // Add your logic for handling a dislike action here
        });

        // Create title element
        const title = document.createElement('h3');
        title.textContent = house.title; // Update with your house title data
        profileCard.appendChild(title);

        // Create like and dislike counters
        const likeCounter = document.createElement('span');
        likeCounter.classList.add('like-counter');
        likeCounter.textContent = `Likes: ${house.likes}  `;
        profileCard.appendChild(likeCounter);

        const dislikeCounter = document.createElement('span');
        dislikeCounter.classList.add('dislike-counter');
        dislikeCounter.textContent = `Dislikes: ${house.dislikes}`;
        profileCard.appendChild(dislikeCounter);
        

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

        // // Like button event listener
        // likeButton.addEventListener('click', () => {
        //     const houseId = 1;
        //     handleVote(houseId, 'like');
        // });

        // // Dislike button event listener
        // dislikeButton.addEventListener('click', () => {
        //     const houseId = 1;
        //     handleVote(houseId, 'dislike');
        // });
    });
}

// Render initial profiles
fetchHouseData();


