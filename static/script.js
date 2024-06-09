
// Placeholder for login functionality
function login() {
    // Implement Google login and university email validation here
}

// T-Distribution Calculator
function calculateTDistribution() {
    // Implement calculator logic here
}

// Hidden download button
// document.addEventListener('DOMContentLoaded', function() {
//     const secretArea = document.querySelector('#secretArea');
//     secretArea.addEventListener('click', function() {
//         const downloadButton = document.createElement('a');
//         downloadButton.href = 'path/to/previous_assessments.zip';
//         downloadButton.download = 'previous_assessments.zip';
//         downloadButton.click();
//     });
// });

document.addEventListener("DOMContentLoaded", function() {
    
    var menuItems = document.querySelectorAll('.menu-item');
    console.log(menuItems);
    menuItems.forEach( function(item) {
        var subMenu = item.querySelectorAll('.submenu')
        if (subMenu.length > 0) {
            var icon = document.createElement('i');
            icon.className = 'fa fa-angle-right';
            icon.setAttribute('aria-hidden', 'true');
            
            var span = document.createElement('span');
            span.className = 'btn-menu-item'
            // adiciona a tag i dentro da tag span
            span.appendChild(icon);

            // adiciona o span em volta do primeiro conteúdo dentro da tag
            span.appendChild(item.firstChild);
            // adiciona o span como primeiro filho da tag item
            item.insertBefore(span, item.firstChild);
            // console.log(item.outerHTML)
        };
    });

    // intera por cada .menu-item
    menuItems.forEach( function(item) {
        // pega todas as tags span com class name de .btn-menu-item dentro de .menu-item
        tags_span_btn_submenu = item.querySelectorAll('.btn-menu-item');
        // para cada tag .btn-menu-item adiciona um ouvinte ao click
        tags_span_btn_submenu.forEach( function(tag_span) {
            tag_span.addEventListener('click', function () {
                var ul_submenu = item.querySelector('.submenu');
                var i_fa = item.querySelector('.fa');
                console.log('i: ', i_fa);
                console.log('ul: ', ul_submenu);
                if (i_fa !== null || ul_submenu !== null) {
                    if (ul_submenu.style.display === 'none' || ul_submenu.style.display === '') {
                        ul_submenu.style.display = 'block';
                        i_fa.className = 'fa fa-angle-down';
                        tag_span.classList.add('active');
                    } else {
                        ul_submenu.style.display = 'none';
                        i_fa.className = 'fa fa-angle-right';
                        tag_span.classList.remove('active');
                    };
                };
            });
        });
    });
});