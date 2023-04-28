const pl = {
  global: {
    appName: 'Workai',
  },
  neutral: {
    save: 'Zapisz',
    more: 'Więcej',
    less: 'Mniej',
    search: 'Szukaj',
    cancel: 'Anuluj',
    edit: 'Edytuj ',
    add: 'Dodaj',
    remove: 'Usuń',
    warning: 'Uwaga!',
    upload: 'Załaduj',
    errorMessage: 'Oops... Coś poszło nie tak',
    warningMessage: 'Uważaj!',
    successMessage: 'Sukces!',
    pay: 'Zapłać',
    copy: 'Kopiuj',
    copied: 'Skopiowane',
    publish: 'Opublikuj',
  },
  placeholders: {
    email: "email{'@'}example.com",
    name: 'Imię',
    fullName: 'Imię Nazwisko',
    surname: 'Nazwisko',
    username: 'Nazwa Profilu',
    date: 'DD/MM/RRRR',
    phoneWithCode: '+(48) 225 560 800',
    address: 'Polna 4/20',
    postCode: '00-123',
    city: 'Warszawa',
    iban: 'PLXX XXXX ...',
  },

  validation: {
    mixed: {
      default: "Pole {'${path}'} jest niepoprawne",
      required: "Pole {'${path}'} jest wymagane",
    },
    string: {
      email: 'Niepoprawny adres email',
      phone: 'Niepoprawny numer telefonu',
      min: "Pole {'${path}'} powinno zawierać minimum {'${min}'} znaki",
      max: "Pole {'${path}'} powinno zawierać maksymalnie {'${max}'} znaki",
      contains: "Pole {'${path}'} nie może zawierać słów: {list}",
    },
    number: {
      min: "Pole {'${path}'} powinno być większa bądź równe {'${min}'}",
      max: "Pole {'${path}'} powinno być mniejsze bądź równe {'${max}'}",
    },
    file: {
      default: 'Niepoprawny plik',
    },
  },
  pages: {
    404: {
      subtitle: 'Przepraszamy, wygląda na to że taka strona nie istnieje 🙈',
      backToDashboard: 'Wróć do Strony Głównej',
    },
    home: {
      title: 'Witaj!',
      subtitle: 'Cóż za wspaniała aplikacja ( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)',
    },
  },
  components: {
    exampleComponent: {
      title: 'Przykładowy komponent',
    },
    defaultTemplate: {
      policy: 'Polityka prywatności',
    },
  },
};

const plNumber = {
  currency: {
    style: 'currency',
    currency: 'PLN',
    currencyDisplay: 'symbol',
  },
};
export { pl, plNumber };
