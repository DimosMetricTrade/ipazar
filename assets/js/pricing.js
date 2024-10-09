function adjustWhiteBoxWidth() {
    const pricingItem = document.querySelector('.pricing-item');
    const whiteBox = document.querySelector('.white-box');
    const whiteBox2 = document.querySelector('.white-box2');
    const whiteBox3 = document.querySelector('.white-box3');
    
    if (pricingItem && whiteBox) {
        whiteBox.style.width = `${pricingItem.offsetWidth}px`;
        whiteBox2.style.width = `${pricingItem.offsetWidth}px`;
        whiteBox3.style.width = `${pricingItem.offsetWidth}px`;
    }
}

// Adjust on load
window.addEventListener('load', adjustWhiteBoxWidth);

// Adjust on resize
window.addEventListener('resize', adjustWhiteBoxWidth);

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.pricing-item');
    const whiteBox = document.querySelector('.white-box');
    const whiteBox2 = document.querySelector('.white-box2');
    const whiteBox3 = document.querySelector('.white-box3');
    const subContainer1 = document.querySelector('.container-subscription-1');
    const subContainer2 = document.querySelector('.container-subscription-2');
    const subContainer3 = document.querySelector('.container-subscription-3');

    function handleItemClick(event) {
        const item = event.currentTarget;

        if (window.innerWidth >= 992) {
            // Remove 'selected' class and add 'not-selected' class to all items
            items.forEach(i => {
                i.classList.remove('selected');
                i.classList.add('not-selected');
            });

            // Remove 'not-selected' class from the clicked item and add 'selected' class
            item.classList.remove('not-selected');
            item.classList.add('selected');

            if (item.id === 'item2') {
                whiteBox.style.display = 'none';
                whiteBox3.style.display = 'none';
                whiteBox2.style.display = 'block';
                subContainer1.style.display = 'none';
                subContainer3.style.display = 'none';
                subContainer2.style.display = 'block';
            }
            else if (item.id === 'item3') {
                whiteBox3.style.display = 'none';
                whiteBox2.style.display = 'none';
                subContainer1.style.display = 'none';
                subContainer2.style.display = 'none';
                whiteBox.style.display = 'block';
                subContainer3.style.display = 'block';

            } else {
                whiteBox.style.display = 'none';
                whiteBox2.style.display = 'none';
                subContainer1.style.display = 'block';
                subContainer2.style.display = 'none';
                whiteBox3.style.display = 'block';
                subContainer3.style.display = 'none';
            }
        }
    }

    function checkScreenWidth() {
        if (window.innerWidth < 992) {
            items.forEach(item => {
                item.removeEventListener('click', handleItemClick);
                item.classList.add('not-clickable');
            });
        } else {
            items.forEach(item => {
                item.addEventListener('click', handleItemClick);
                item.classList.remove('not-clickable');
            });
        }
    }

    // Initial check on DOM content loaded
    checkScreenWidth();

    // Check screen width on window resize
    window.addEventListener('resize', checkScreenWidth);
});