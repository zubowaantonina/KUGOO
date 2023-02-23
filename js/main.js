const mMenuToggle = document.querySelector(".mobile-menu-toggle");
const menu = document.querySelector(".mobile-menu");
const openMenu = (event) => {
  menu.classList.add("is-open");
  mMenuToggle.classList.add("close-menu");
  document.body.style.overflow = "hidden"; //запрет прокрутки сайта под меню
  lightModeOn();
};
//функция закрывания меню
const closeMenu = (event) => {
  menu.classList.remove("is-open"); //убивает класс
  mMenuToggle.classList.remove("close-menu");
  document.body.style.overflow = ""; //возвращает прокрутку
  this.scrollY < 1 ? lightModeOff() : lightModeOn();
  // lightModeOff();
};
mMenuToggle.addEventListener("click", (event) => {
  event.preventDefault();
  menu.classList.contains("is-open") ? closeMenu() : openMenu();
});

let currentModal; //текущее модальное окно
let modalDialog; //белое диалоговое окно
const alertModal = document.querySelector("#alert-modal"); //окно с благодарностью
// const modalButton=document.querySelector(".modal-form-button");
// const sending=document.querySelector(".sending");
const subscriptionModal = document.querySelector("#subscription-modal")
const modalButtons = document.querySelectorAll("[data-toggle=modal]"); //переключатели модальных окон

modalButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    //определяем текущее открытое окно
    currentModal = document.querySelector(button.dataset.target);
    currentModal.classList.toggle("is-open");
    modalDialog = currentModal.querySelector('.modal-dialog');
    document.body.style.overflow = "hidden"; //запрет прокрутки сайта под меню
    currentModal.addEventListener("click", (event) => {
      document.body.style.overflow = ""; //возвращает прокрутку
      if (!event.composedPath().includes(modalDialog)) {
        currentModal.classList.remove("is-open");

      }
    });
    // console.log(button.dataset.target);
    // console.log(currentModal);
  });
});
document.addEventListener("keyup", (event) => {
  if (event.key == "Escape" && currentModal.classList.contains("is-open")) {
    currentModal.classList.toggle("is-open");
  }
});





const emails = document.querySelectorAll('.form-content');

// console.log(emails);
emails.forEach(() => {
  const validation = new JustValidate("#eMail", {
    errorFieldCssClass: "is-invalid",
    errorLabelStyle: {
      color: 'red',
      textDecoration: 'underlined',
      top: '-13px',
      left: '10px',
      position: 'absolute',
      background: '#6f73ee;',
      padding: '5px',
    },
    errorsContainer: '.errors-container',

  })
  validation
    .addField("[name='useremail']", [
      {
        rule: 'required',
        errorMessage: "Укажите почту",
      },
      {
        rule: 'email',
        errorMessage: "Неправильный формат почты",
      },

    ])


    .onSuccess((event) => {
      const thisForm = event.target; //наша форма
      const formData = new FormData(thisForm); //данные из нашей формы
      console.log(formData);
      const ajaxSend = async (formData) => {
        /*создаем функцию отправки формы*/
        const fetchResp = await fetch('telegram.php', {
            /*указываем обработчик формы-telegram.php*/
            method: 'POST', /*метод,которым отправляем форму*/
            body: formData ,/*что будет внутри формы - содержимое input*/
        }).then((response) => {
        if (response.ok) {
                thisForm.reset();
               
                subscriptionModal.classList.add("is-open");
                currentModal = subscriptionModal;
                modalDialog = document.querySelector(".modal-dialog");
                currentModal.addEventListener("click", (event) => {
                  if (!event.composedPath().includes(modalDialog)) {
                    currentModal.classList.remove("is-open");
                  }
                });
                 
                } 
                 else {
            // 64112
            alert(response.statusText);
          }
        // return await fetchResp.text();
        /*если все хорошо,возвращаем ответ сервера*/
        });
    };




      
      // const ajaxSend = (formData) => {
      //   console.log(formData);
      //   fetch(thisForm.getAttribute("action"), {
      //     method: thisForm.getAttribute("method"),
      //     body: formData,
      //   }).then((response) => {
      //     if (response.ok) {
      //       thisForm.reset();
           
      //       subscriptionModal.classList.add("is-open");
      //       currentModal = subscriptionModal;
      //       modalDialog = document.querySelector(".modal-dialog");
      //       currentModal.addEventListener("click", (event) => {
      //         if (!event.composedPath().includes(modalDialog)) {
      //           currentModal.classList.remove("is-open");
      //         }
      //       });
            //   alert('форма отправлена');
            // } 
            // else {
            // 64112
            // alert(response.statusText);
      //     }
      //   });
      // };
      ajaxSend(formData);
      console.log(formData);
    });



});

const forms = document.querySelectorAll(".modal-form");
forms.forEach((form) => {
  const validation = new JustValidate(form, {
    errorFieldCssClass: "is-invalid",
    errorLabelStyle: {
      color: 'red',
      textDecoration: 'underlined',
      top: '-15px',
      left: '10px',
      position: 'absolute',
      background: '#FFFFFF',
      padding: '5px',
      fontSsize: '10px',
    },
    errorsContainer: '.errors-container',
  });
  validation
    .addField("[name='userphone']", [
      {
        rule: "required",
        errorMessage: "Укажите телефон",
      },
      {
        rule: 'minLength',
        value: 13,
        errorMessage: "Недостаточно знаков",
      },
    ])

    .onSuccess((event) => {
      const thisForm = event.target; //наша форма
      const formData = new FormData(thisForm); //данные из нашей формы
      const ajaxSend = (formData) => {
        fetch(thisForm.getAttribute("action"), {
          method: thisForm.getAttribute("method"),
          body: formData,
        }).then((response) => {
          if (response.ok) {
            thisForm.reset();
            currentModal.classList.remove("is-open");
            alertModal.classList.add("is-open");
            currentModal = alertModal;
            modalDialog = document.querySelector(".modal-dialog");
            currentModal.addEventListener("click", (event) => {
              if (!event.composedPath().includes(modalDialog)) {
                currentModal.classList.remove("is-open");
              }
            });
            // alert('форма отправлена');
          }
          //   else {
          // 64112
          //     alert(response.statusText);
          // }
        });
      };
      ajaxSend(formData);
      console.log(formData);
    });

});


/* Создаем префикс +7, даже если вводят 8 или 9 */
const prefixNumber = (str) => {
  /* если вводят семерку, добавляем ей скобку */
  if (str === "7") {
    return "7 (";
  }
  /* если вводят восьмерку, ставим вместо нее +7 ( */
  if (str === "8") {
    return "+7 (";
  }
  /* если пишут девятку, заменяем на +7 (9  */
  if (str === "9") {
    return "7 (9";
  }
  /* в других случаях просто 7 (  */
  return "7 (";
}; /* профикс в любом раскладе будет +7 () */

/* Ловим события ввода в любом поле */
document.addEventListener("input", (e) => {
  /* Проверяем, что это поле имеет класс phone-mask */
  if (e.target.classList.contains("phone-mask")) {
    /* поле с телефоном помещаем в переменную input */
    const input = e.target;
    /* вставляем плюс в начале номера */
    const value = input.value.replace(/\D+/g, "");
    /* длинна номера 11 символов */
    const numberLength = 11;

    /* Создаем переменную, куда будем записывать номер */
    let result;
    /* Если пользователь ввел 8... */
    if (input.value.includes("+8") || input.value[0] === "8") {
      /* Стираем восьмерку */
      result = "";
    } else {
      /* Оставляем плюсик в поле */
      result = "+";
    }

    /* Запускаем цикл, где переберем каждую цифру от 0 до 11 */
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          /* в самом начале ставим префикс +7 ( */
          result += prefixNumber(value[i]);
          continue;
        case 4:
          /* добавляем после "+7 (" круглую скобку ")" */
          result += ") ";
          break;
        case 7:
          /* дефис после 7 символа */
          result += "-";
          break;
        case 9:
          /* еще дефис  */
          result += "-";
          break;
        default:
          break;
      }
      /* на каждом шаге цикла добавляем новую цифру к номеру */
      result += value[i];
    }
    /* итог: номер в формате +7 (999) 123-45-67 */
    input.value = result;
  }
});
