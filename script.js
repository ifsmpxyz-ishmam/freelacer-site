
const contactform = document.getElementById('contact-form');
const formstatus = document.getElementById('form-status');

if (contactform) {
  contactform.addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const service = document.getElementById('service').value.trim();

    if (!name || !email || !message || !service) {
      formstatus.innerHTML = 'Please fill in all fields.';
      return;
    }

    formstatus.innerHTML = 'Sending...';

    const messageData = {
      fields: {
        'Name': name,
        'Email': email,
        'Service': service,
        'Message': message
      }
    };

    try {
      const response = await fetch('/.netlify/functions/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      formstatus.innerHTML = "Thanks! We'll respond to you soon.";
      contactform.reset();

    } catch (error) {
      console.error('Error sending message:', error);
      formstatus.innerHTML = 'Something went wrong. Please try again.';
    }
  });
}

  
const reviewContainer = document.getElementById('reviews-container');

if (reviewContainer) {
  async function fetchReviews() {
    try {
      const response = await fetch('/.netlify/functions/reviews',{
      method : 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
      );
      const data = await response.json();
      function displayReviews(reviews) {
    reviewContainer.innerHTML = '';
    reviews.forEach((review,index) => {
      const div = document.createElement ('div');
      div.classList.add('Reviews-div')
      const Name = document.createElement('p')
      Name.classList.add('Name-Review')
      Name.textContent = review.fields [ 'Name' ]
        const ratingValue = review.fields['Rating'];
        const stars = '⭐'.repeat(ratingValue);
        const rating = document.createElement('p')
        rating.textContent = stars;
        rating.classList.add('Reviews-Rating')
        const comment = document.createElement('p')
        comment.textContent = review.fields [ 'Comment' ]
        comment.classList.add('Reviews-Describtion')
        div.append(Name,rating,comment)
        reviewContainer.appendChild(div)
    });
    
  }
  displayReviews(data);
    }
    catch (error) {
    console.error('Error fecthing review:', error);
        reviewContainer.innerHTML = 'Error loading reviews';
    }
  }
  fetchReviews();
}

  
