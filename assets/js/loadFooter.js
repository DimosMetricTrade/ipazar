document.addEventListener("DOMContentLoaded", function() {
    fetch('includes/footer.html')  // Path relative to the location of the HTML file
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});
