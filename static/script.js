document.addEventListener("DOMContentLoaded", function() {
    var menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach( function(item) {
        var subMenu = item.querySelectorAll('.submenu')
        if (subMenu.length > 0) {
            var icon = document.createElement('i');
            icon.className = 'fa fa-angle-right';
            icon.setAttribute('aria-hidden', 'true');
            
            var span = document.createElement('span');
            span.className = 'btn-menu-item'
            
            span.appendChild(icon);
            
            var link = item.querySelector('a');
            var link_text = link.textContent;
            span.insertAdjacentText('beforeend', link_text);
            link.childNodes[0].nodeValue = '';
            link.appendChild(span);
        };
    });

    function getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const top = (rect.top + scrollTop).toFixed(2);
        const bottom = (rect.bottom + scrollTop).toFixed(2);
        return {
            top: Number(top),
            bottom: Number(bottom)
        };
    };

    function getCenterPosition() {
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const center = (scrollY + (windowHeight / 2)).toFixed(2)
        return Number(center);
    };

    function setActiveMenu() {
        let center_position = getCenterPosition();
        // console.log(center_position);
        var main_sections = document.querySelectorAll('main > section');
        // for (let i = 0; i < main_sections.length; i++) {
        main_sections.forEach( function(item) {
            let rect = getElementPosition(item);
            if (rect.bottom >= center_position && rect.top <= center_position) {
                var hrefId = item.id;
                var span_btn = document.querySelector(`a[href="#${hrefId}"]`).children[0];
                span_btn.classList.add('active');
            } else {
                var remove_id = item.id;
                var remove_btn = document.querySelector(`a[href="#${remove_id}"]`);
                if (remove_btn !== null) {
                    remove_btn.children[0].classList.remove('active');
                }
            }
        });
        // let currentActive = null;
        
        // main_sections.forEach( function(section) {
        //     let rect = getElementPosition(section);
        //     let center_position = getCenterPosition().centerY2;
        //     console.log('center_position', center_position);
        //     console.log('top', rect.top, 'bottom', rect.bottom)
        //     if (rect.top >= center_position && rect.bottom <= center_position) {
        //         currentActive = section;
        //         console.log(currentActive);
        //     }
        // });
    };
    
    // var spans_btn_menu_item = document.querySelectorAll('.menu-item .btn-menu-item');
    // Add scroll event listener to the window
    window.addEventListener('scroll', setActiveMenu );

    // intera por cada .menu-item
    menuItems.forEach( function(item) {
        // pega todas as tags span com class name de .btn-menu-item dentro de .menu-item
        tags_span_btn_submenu = item.querySelectorAll('.btn-menu-item');
        // para cada tag .btn-menu-item adiciona um ouvinte ao click
        tags_span_btn_submenu.forEach( function(tag_span) {
            tag_span.addEventListener('click', function () {
                var ul_submenu = item.querySelector('.submenu');
                var i_fa = item.querySelector('.fa');
                // console.log('i: ', i_fa);
                // console.log('ul: ', ul_submenu);
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