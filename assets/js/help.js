
// Show div1 and make Button 1 active by default
document.getElementById('div1').style.display = 'block';
document.querySelector('.button').classList.add('active-button');

function showContent(divId, button) {
    // Hide all divs
    var divs = document.querySelectorAll('.content-container');
    divs.forEach(function(div) {
        div.style.display = 'none';
    });

    // Show the selected div
    var selectedDiv = document.getElementById(divId);
    selectedDiv.style.display = 'block';

    // Remove the active class from all buttons
    var buttons = document.querySelectorAll('.button');
    buttons.forEach(function(btn) {
        btn.classList.remove('active-button');
    });

    // Add the active class to the clicked button
    button.classList.add('active-button');
}

document.addEventListener('DOMContentLoaded', function() {
    var backToTopBtn = document.getElementById('backToTopBtn');

    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    };

});

function toggleContent(sectionId) {
    var expandedContent = document.getElementById(sectionId);
    var expandableBox = document.querySelector('.expandable-box');

    if (expandedContent.style.maxHeight) {
        expandedContent.style.maxHeight = null;
    } else {
        expandedContent.style.maxHeight = expandedContent.scrollHeight + "px";
    }
}
