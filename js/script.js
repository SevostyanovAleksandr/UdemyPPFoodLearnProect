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

    const dedlain = '2022-02-10';

    function getTime(endtime) { // получение разницы между датами 
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ), // КОЛИЧЕСТВО ДНЕЙ  //матсфлоор огругление до ближайшего целого 
            hours = Math.floor( (t/(1000*60*60) % 24) ), // получили остаток 
            minutes = Math.floor( (t/1000/60) % 60 ), // получили минуты 
            seconds = Math.floor( (t/1000) % 60 ); // получили секунды

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
function getClock(num){  // условие для того чтобы отображался дополнительный 0 
    if ( num >= 0 && num < 10){
        return `0${num}`; }

        else {
            return num;

        }
    }

    function setClock(selector, endtime) { //функция  которая будет утсанавливать время на страницу
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        timeInterval = setInterval(updateClock, 1000);// setInterval функция котороая позваляет запускать функцию через какое то время
        updateClock();
        function updateClock() { // функция которая будкт обновлять наш дедлайн
            const t = getTime(endtime);

            days.innerHTML = getClock (t.days);
            hours.innerHTML = getClock (t.hours);
            minutes.innerHTML = getClock (t.minutes);
            seconds.innerHTML = getClock (t.seconds);


            if (t.total <= 0) {
                clearInterval(timeInterval); // останавливает отчет времени
            }
        }
    }
    setClock('.timer', dedlain);
});
