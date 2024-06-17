document.addEventListener("DOMContentLoaded", function() {
    // forces to scroll to the top of the website every time it loads
    document.documentElement.scrollTop = 0; // For most browsers
    document.body.scrollTop = 0; // Safari

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
        var main_sections = document.querySelectorAll('main > section');
        main_sections.forEach( function(item) {
            let rect = getElementPosition(item);
            let hrefId = item.id;
            let a_link = document.querySelector(`a[href="#${hrefId}"]`);
            let span_btn = a_link.children[0];
            if (span_btn !== undefined) {
                let i_fa = span_btn.children[0];
                let ul_submenu = a_link.nextElementSibling;
                if (rect.bottom >= center_position 
                    && rect.top <= center_position ) {
                    span_btn.classList.add('active');
                    ul_submenu.style.display = 'block';
                    i_fa.className = 'fa fa-angle-down';
                    const sub_sections = Array.from(item.querySelectorAll('section'));
                    sub_sections.shift();
                    sub_sections.forEach( function(section) {
                        let hrefId_subsection = section.id;
                        let li_submenu_subsection = document.querySelector(`a[href="#${hrefId_subsection}"]`).parentElement;
                        let rect_subsection = getElementPosition(section);
                        let center_position_subsection = getCenterPosition();
                        if (rect_subsection.bottom >= center_position_subsection 
                            && rect_subsection.top <= center_position_subsection) {
                            li_submenu_subsection.classList.add('active-bold');
                            }
                        else {
                            li_submenu_subsection.classList.remove('active-bold');
                        }
                    });
                } else {
                    span_btn.classList.remove('active');
                    ul_submenu.style.display = 'none';
                    i_fa.className = 'fa fa-angle-right';
                }
            }
        });
    };
    window.addEventListener('scroll', setActiveMenu );
});