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

function setupCarousel() {
    const main = document.querySelector('main');
    
    if (!main) return;
    
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';
    carouselContainer.style.cssText = `
        position: relative;
        width: 100%;
        height: 20vh;
        max-height: 300px;
        margin: 2em auto;
        overflow: hidden;
        border-radius: 1em;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    `;
    
    const carouselWrapper = document.createElement('div');
    carouselWrapper.className = 'carousel-wrapper';
    carouselWrapper.style.cssText = `
        display: flex;
        height: 100%;
        transition: transform 0.5s ease;
    `;
    
    const images = [
        'media/education.jpg',
        'media/health.jpeg',
        'media/social protection.jpg',
        'media/culture_sport.jpg',
        'media/housing.jpg',
        'media/transport.png',
        'media/economy.jpg',
        'media/ecology.jpg',
        'media/administrative services.jpg',
        'media/safety.jpg'
    ];
    
    images.forEach(src => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.style.cssText = `
            min-width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f0f0f0;
        `;
        
        const img = document.createElement('img');
        img.src = src;
        img.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        `;
        
        slide.appendChild(img);
        carouselWrapper.appendChild(slide);
    });
    
    carouselContainer.appendChild(carouselWrapper);
    
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '❮';
    prevBtn.className = 'carousel-btn prev';
    prevBtn.style.cssText = `
        position: absolute;
        left: 1em;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(102, 126, 234, 0.8);
        color: white;
        border: none;
        padding: 1em 1.2em;
        font-size: 1.5em;
        cursor: pointer;
        border-radius: 0.5em;
        z-index: 10;
        transition: all 0.3s ease;
    `;
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '❯';
    nextBtn.className = 'carousel-btn next';
    nextBtn.style.cssText = prevBtn.style.cssText.replace('left: 1em', 'right: 1em');
    
    prevBtn.addEventListener('mouseenter', () => {
        prevBtn.style.background = 'rgba(102, 126, 234, 1)';
        prevBtn.style.transform = 'translateY(-50%) scale(1.1)';
    });
    prevBtn.addEventListener('mouseleave', () => {
        prevBtn.style.background = 'rgba(102, 126, 234, 0.8)';
        prevBtn.style.transform = 'translateY(-50%) scale(1)';
    });
    
    nextBtn.addEventListener('mouseenter', () => {
        nextBtn.style.background = 'rgba(102, 126, 234, 1)';
        nextBtn.style.transform = 'translateY(-50%) scale(1.1)';
    });
    nextBtn.addEventListener('mouseleave', () => {
        nextBtn.style.background = 'rgba(102, 126, 234, 0.8)';
        nextBtn.style.transform = 'translateY(-50%) scale(1)';
    });
    
    carouselContainer.appendChild(prevBtn);
    carouselContainer.appendChild(nextBtn);
    
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';
    indicators.style.cssText = `
        position: absolute;
        bottom: 1em;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 0.5em;
        z-index: 10;
    `;
    
    images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'indicator-dot';
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: ${index === 0 ? 'white' : 'rgba(255, 255, 255, 0.5)'};
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        dot.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(dot);
    });
    
    carouselContainer.appendChild(indicators);
    
    const h2 = main.querySelector('h2');
    if (h2) {
        h2.after(carouselContainer);
    } else {
        main.insertBefore(carouselContainer, main.firstChild);
    }
    
    let currentSlide = 0;
    
    function updateCarousel() {
        carouselWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        const dots = indicators.querySelectorAll('.indicator-dot');
        dots.forEach((dot, index) => {
            dot.style.background = index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)';
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + images.length) % images.length;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % images.length;
        updateCarousel();
    });
    
    setInterval(() => {
        currentSlide = (currentSlide + 1) % images.length;
        updateCarousel();
    }, 5000);
}

function setupSearch() {
    const main = document.querySelector('main');
    const h2 = main.querySelector('h2');
    
    if (!h2) return;
    
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        margin: 2em auto;
        max-width: 600px;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Пошук напряму діяльності...';
    searchInput.style.cssText = `
        flex: 1;
        padding: 1em 1.5em;
        border: 2px solid #667eea;
        border-radius: 2em;
        font-size: 1em;
        outline: none;
        transition: all 0.3s ease;
    `;
    
    searchInput.addEventListener('focus', () => {
        searchInput.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.2)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.style.boxShadow = 'none';
    });
    
    const searchIcon = document.createElement('button');
    searchIcon.innerHTML = '🔍';
    searchIcon.style.cssText = `
        padding: 1em 1.5em;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 50%;
        font-size: 1.2em;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    `;
    
    searchIcon.addEventListener('mouseenter', () => {
        searchIcon.style.transform = 'scale(1.1)';
        searchIcon.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
    });
    
    searchIcon.addEventListener('mouseleave', () => {
        searchIcon.style.transform = 'scale(1)';
        searchIcon.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });
    
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchIcon);
    
    h2.after(searchContainer);
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const activities = document.querySelectorAll('.activity-item');
        
        activities.forEach(activity => {
            const title = activity.querySelector('dt').textContent.toLowerCase();
            const description = activity.querySelector('dd').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                activity.style.display = 'grid';
                activity.style.animation = 'fadeIn 0.5s ease';
            } else {
                activity.style.display = 'none';
            }
        });
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        if (!document.querySelector('style[data-search-animation]')) {
            style.setAttribute('data-search-animation', 'true');
            document.head.appendChild(style);
        }
    }
    
    searchIcon.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // searchInput.addEventListener('input', performSearch);
}

function setupResponsiveNav() {
    const nav = document.querySelector('nav');
    
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
    setupCarousel();
    setupSearch();
    setupResponsiveNav();
});