window.addEventListener('DOMContentLoaded', function () { // сначала загрузска всех файлов свзязаных с проектом потом отображение 
    //ТАБЫ
    let tabs = document.querySelectorAll('.tabheader__item'), // класс табов фитнес постное премиум сбалансированное
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

    function showTabContent(i = 0) { // создание переключение fade (css анимация )
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function (event) { // создание события на нажатие на любой из табов
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    //ТАЙМЕР

    const dedlain = '2022-02-20';

    function getTime(endtime) { // получение разницы между датами 
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))), // КОЛИЧЕСТВО ДНЕЙ  //матсфлоор огругление до ближайшего целого 
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), // получили остаток 
            minutes = Math.floor((t / 1000 / 60) % 60), // получили минуты 
            seconds = Math.floor((t / 1000) % 60); // получили секунды

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getClock(num) { // условие для того чтобы отображался дополнительный 0 
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;

        }
    }

    function setClock(selector, endtime) { //функция  которая будет утсанавливать время на страницу
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        timeInterval = setInterval(updateClock, 1000); // setInterval функция котороая позваляет запускать функцию через какое то время
        updateClock();

        function updateClock() { // функция которая будкт обновлять наш дедлайн
            const t = getTime(endtime);

            days.innerHTML = getClock(t.days);
            hours.innerHTML = getClock(t.hours);
            minutes.innerHTML = getClock(t.minutes);
            seconds.innerHTML = getClock(t.seconds);


            if (t.total <= 0) {
                clearInterval(timeInterval); // останавливает отчет времени
            }
        }
    }
    setClock('.timer', dedlain);

    //создание модального окна

    const modalTriger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show'); // класс show показать
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(closeModal);
    }

    modalTriger.forEach(btn => { // перебирает все кнопеи с классом data-modal
        btn.addEventListener('click', openModal)
    }); //приминили свойства в теги бади хиден оно останвливает прокрутку скрлом перемешение по сай;



    function closeModal() {
        modal.classList.add('hide'); // класс show показать
        modal.classList.remove('show');
        document.body.style.overflow = ''; //приминили свойствo оно возвращает в работу прокрутку скрлом перемешение по сайту

    }

    modalClose.addEventListener('click', closeModal); // после клика вызовем функцию closeModal 

    modal.addEventListener('click', (e) => { // событие по которому кликаешь не модально окно закрывает модальное окно 
        if (e.target === modal) { //e.target элемент события
            closeModal();
        }

    });

    document.addEventListener('keydown', (e) => { // event.cod cобытие когда нажимаем на клавиатуру а имеено esc вызывается метод закрытия
        if (e.code === 'Escape' && modal.classList.contains('show')) { //нажата ди клавиша esc и установлен ли класс show (показано ли модальное окно)
            closeModal();
        }
    });

    const timeModal = setTimeout(openModal, 2000); // вызывает через 1 секунду функцию openmodal

 function showModalScrol() {  //показ модального окна один раз 
        window.addEventListener('scroll', () => {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { // как только пользователь долистал до конца страницы 
                openModal(); 
                window.removeEventListener('scroll', (showModalScrol));  // удаление события
            }
        })
    };

    window.addEventListener('scroll', (showModalScrol));


});