document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('EmailForm');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Create a FormData object to collect form data
        const formData = new FormData(form);
        
        // Make a POST request to the server-side script to handle the form data
        fetch('process_form.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            // Display the response from the server on the webpage
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
