document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.getElementById('profile-container');
    let currentIndex = 0;
    let currentHouseIndex = 0;
    let houses = [];

    function createProfileCard(house) {
        const profileCard = document.createElement('div');
        profileCard.classList.add('profile-card');

        const title = document.createElement('h3');
        title.textContent = `House ID: ${house.id}`;
        profileCard.appendChild(title);

        const currentImage = document.createElement('img');
        profileCard.appendChild(currentImage);

        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('profile-actions');

        const likeButton = document.createElement('button');
        likeButton.textContent = 'Like';
        likeButton.addEventListener('click', () => {
            handleVote(house.id, 'like');
        });
        actionsContainer.appendChild(likeButton);

        const dislikeButton = document.createElement('button');
        dislikeButton.textContent = 'Dislike';
        dislikeButton.addEventListener('click', () => {
            handleVote(house.id, 'dislike');
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
        profileContainer.appendChild(profileCard);

        updateImage(currentImage, house.image);

        return profileCard;
    }

    function updateImage(imgElement, images) {
        if (images.length !== 0) {
            fetch(`http://127.0.0.1:5000/image/${images[currentIndex]}`)
                .then(response => response.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    imgElement.src = url;
                })
                .catch(error => {
                    console.error('Error fetching image:', error);
                });
        }
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + houses[currentHouseIndex].image.length) % houses[currentHouseIndex].image.length;
        updateImage(document.querySelector('.profile-card img'), houses[currentHouseIndex].image);
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % houses[currentHouseIndex].image.length;
        updateImage(document.querySelector('.profile-card img'), houses[currentHouseIndex].image);
    }

    function fetchData() {
        fetch('http://127.0.0.1:5000/houses')
            .then(response => response.json())
            .then(data => {
                houses = data;
                if (houses.length > 0) {
                    profileContainer.innerHTML = '';
                    createProfileCard(houses[currentHouseIndex]);
                }
            })
            .catch(error => {
                console.error('Error fetching houses:', error);
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
                throw new Error('Failed to record vote');
            }
            console.log(`Successfully recorded ${voteType} for house ${houseId}`);
            currentHouseIndex = (currentHouseIndex + 1) % houses.length;
            profileContainer.innerHTML = '';
            createProfileCard(houses[currentHouseIndex]);
        })
        .catch(error => {
            console.error('Error recording vote:', error);
        });
    }

    fetchData();
});