window.addEventListener('DOMContentLoaded', function() {   // сначала загрузска всех файлов свзязаных с проектом потом отображение 
    
	let tabs = document.querySelectorAll('.tabheader__item'),  // класс табов фитнес постное премиум сбалансированное
		tabsContent = document.querySelectorAll('.tabcontent'), // класс контента который будет отображать каждый таб в каждом табе свой контент 
		tabsParent = document.querySelector('.tabheader__items'); // родитель всех табов

	function hideTabContent() { // функция скрытия контента табов 
        
        tabsContent.forEach(item => { 
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); // выделение активности таба 
        });
	}

	function showTabContent(i = 0) {                // создание переключение fade (css анимация )
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) { // создание события на нажатие на любой из табов
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});
});

