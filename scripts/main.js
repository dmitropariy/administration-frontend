function setupDropdownMenu() {
    const activityLink = document.querySelector('nav a[href="/activity.html"]');
    
    if (activityLink) {
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-menu';
        dropdown.style.cssText = `
            position: absolute;
            background: white;
            border-radius: 0.5em;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            padding: 1em;
            display: none;
            min-width: 200px;
            z-index: 1000;
        `;
        
        const activities = [
            'Освіта',
            'Охорона здоров\'я',
            'Соціальний захист',
            'Культура та спорт',
            'ЖКГ',
            'Транспорт',
            'Економіка',
            'Екологія',
            'Адмінпослуги',
            'Безпека'
        ];
        
        activities.forEach(activity => {
            const item = document.createElement('a');
            item.textContent = activity;
            item.href = '/activity.html';
            item.style.cssText = `
                display: block;
                padding: 0.8em;
                color: #2c3e50;
                text-decoration: none;
                border-radius: 0.3em;
                transition: all 0.3s ease;
            `;
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = '#e3f2fd';
                item.style.paddingLeft = '1.5em';
            });
            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = 'transparent';
                item.style.paddingLeft = '0.8em';
            });
            dropdown.appendChild(item);
        });
        
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        activityLink.parentNode.insertBefore(wrapper, activityLink);
        wrapper.appendChild(activityLink);
        wrapper.appendChild(dropdown);
        
        activityLink.addEventListener('mouseenter', () => {
            dropdown.style.display = 'block';
        });
        
        wrapper.addEventListener('mouseleave', () => {
            dropdown.style.display = 'none';
        });
    }
}

function setupResponsiveNav() {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    
    function adjustNavLayout() {
        if (window.innerWidth <= 768) {
            nav.style.position = 'fixed';
            nav.style.right = '0';
            nav.style.top = '0';
            nav.style.height = '100vh';
            nav.style.width = '250px';
            nav.style.flexDirection = 'column';
            nav.style.justifyContent = 'flex-start';
            nav.style.paddingTop = '2em';
            nav.style.transform = 'translateX(100%)';
            nav.style.transition = 'transform 0.3s ease';
            nav.style.zIndex = '1000';
            nav.style.overflowY = 'auto';
            
            if (!document.querySelector('.burger-menu')) {
                const burgerBtn = document.createElement('button');
                burgerBtn.className = 'burger-menu';
                burgerBtn.innerHTML = '☰';
                burgerBtn.style.cssText = `
                    position: fixed;
                    top: 1em;
                    right: 1em;
                    z-index: 1001;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 0.8em 1em;
                    font-size: 1.5em;
                    cursor: pointer;
                    border-radius: 0.5em;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                `;
                
                burgerBtn.addEventListener('click', () => {
                    const isOpen = nav.style.transform === 'translateX(0%)';
                    nav.style.transform = isOpen ? 'translateX(100%)' : 'translateX(0%)';
                    burgerBtn.innerHTML = isOpen ? '☰' : '✕';
                });
                
                document.body.appendChild(burgerBtn);
            }
        } else {
            nav.style.position = 'static';
            nav.style.flexDirection = 'row';
            nav.style.height = 'auto';
            nav.style.width = 'auto';
            nav.style.transform = 'none';
            nav.style.paddingTop = '0';
            
            const burgerBtn = document.querySelector('.burger-menu');
            if (burgerBtn) {
                burgerBtn.remove();
            }
        }
    }
    
    adjustNavLayout();
    window.addEventListener('resize', adjustNavLayout);
}

document.addEventListener('DOMContentLoaded', () => {
    setupDropdownMenu();
    setupResponsiveNav();
});