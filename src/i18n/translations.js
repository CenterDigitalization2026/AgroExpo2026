export const translations = {
  ru: {
    nav: {
      about: "О конференции",
      directions: "Направления",
      partners: "Партнеры",
      registerBtn: "Зарегистрироваться",
    },
    hero: {
      badge: "Министерство сельского хозяйства РТ • ВПП ООН",
      title: "Digital AgroExpo Tajikistan-2026",
      subtitle:
        "Конференция и выставка проводятся с целью обмена опытом, создания единой цифровой экосистемы и объединения партнеров для устойчивой трансформации агропродовольственных систем и привлечения инвестиций.",
      location: "📍 г. Душанбе",
      date: "📅 Ноябрь – Декабрь 2026",
      format: "🤝 B2B & Форум",
      cta: "Принять участие в AgroExpo",
    },
    directions: {
      title: "Ключевые направления выставки (Expo)",
      subtitle:
        "Инновационные AgTech решения для устойчивого развития АПК Таджикистана",
      smartIrrigation: {
        title: "Умное орошение",
        desc: "Системы капельного полива с датчиками влажности почвы и автоматизированными насосными станциями для экономии воды.",
      },
      agrometeo: {
        title: "Агрометеорология",
        desc: "Мультиспектральный мониторинг, системы раннего предупреждения заморозков и сервисы погоды для защиты урожая.",
      },
      drones: {
        title: "Дроны и ГИС-системы",
        desc: "Аэромониторинг полей, точечное внесение удобрений и спутниковый анализ состояния чарогохов и пахотных земель.",
      },
      fintech: {
        title: "Агроконсалтинг и Финтех",
        desc: "Мобильные приложения для фермеров, электронные маркетплейсы, зеленые кредиты и цифровой агролизинг.",
      },
    },
    registration: {
      title: "Онлайн-регистрация участников",
      subtitle:
        "Заполните форму ниже для получения электронного бейджа участника",
      labels: {
        fullName: "ФИО (Полное имя)",
        email: "Электронная почта (Email)",
        phone: "Номер телефона (WhatsApp/Telegram)",
        organization: "Название компании / ВУЗа / ДХ",
        position: "Должность / Специализация",
        region: "Регион / Страна",
        category: "Категория участника",
        format: "Формат участия",
        selectPlaceholder: "-- Выберите из списка --",
      },
      placeholders: {
        fullName: "Например: Рустамов Искандер Алиевич",
        email: "example@domain.tj",
        phone: "+992900112233",
        organization: "Например: ООО 'АгроТехИнновации' или ДХ 'Саодат'",
        position: "Например: Главный агроном / Директор / Студент",
      },
      buttons: {
        submit: "Зарегистрироваться на AgroExpo-2026",
        submitting: "Отправка...",
      },
      messages: {
        successTitle: "Заявка успешно отправлена!",
        successDesc:
          "Спасибо за регистрацию. Наш оргкомитет свяжется с вами для подтверждения бейджа.",
        errorTitle: "Ошибка при отправке",
        errorDesc:
          "Произошла ошибка при отправке формы в Google Forms. Пожалуйста, попробуйте еще раз.",
      },
      regions: [
        "г. Душанбе",
        "Согдийская область",
        "Хатлонская область",
        "Горно-Бадахшанская автономная область (ГБАО)",
        "Районы республиканского подчинения (РРП)",
        "Зарубежный участник / Международный делегат",
      ],
      categories: [
        "Государственный сектор (Министерства, ведомства)",
        "Дехканское хозяйство / Фермер / Агрохолдинг / Кооператив",
        "IT-компания / Разработчик AgTech / Поставщик оборудования",
        "Международная организация / Донорская структура / НПО",
        "Финансовый институт / Банк / МФО / Страховая компания",
        "Научно-исследовательский институт / ВУЗ / Преподаватель / Студент",
        "Маркетплейс / Логистическая компания / Переработчик",
        "СМИ / Пресса",
      ],
      formats: [
        "Посетитель выставки (Expo) — свободный осмотр демо-зон и стендов",
        "Делегат конференции (Forum) — участие в сессиях",
        "Участник со стендом (Экспонент) — демонстрация решений",
        "Спикер / Докладчик — выступление на сессии",
        "Студент-гид / Волонтер — сопровождение техно-туров",
      ],
      validation: {
        fullNameRequired: "ФИО обязательно для заполнения",
        fullNameMin: "Минимальная длина ФИО — 5 символов",
        fullNameMax: "Максимальная длина ФИО — 100 символов",
        fullNameMatch:
          "Разрешена только кириллица (включая таджикские буквы Ғ, Ӣ, Қ, Ӯ, Ҳ, Ҷ), латиница, пробелы и дефисы",
        emailRequired: "Email обязателен для заполнения",
        emailInvalid: "Введите корректный адрес электронной почты",
        phoneRequired: "Телефон обязателен для заполнения",
        phoneMatch:
          "Введите корректный номер Таджикистана в формате +992XXXXXXXXX",
        orgRequired: "Название компании / ВУЗа / ДХ обязательно для заполнения",
        orgMin: "Минимальная длина — 2 символа",
        orgMax: "Максимальная длина — 150 символов",
        posRequired: "Должность обязательна для заполнения",
        posMin: "Минимальная длина — 2 символа",
        posMax: "Максимальная длина — 100 символов",
        regionRequired: "Выберите ваш регион",
        categoryRequired: "Выберите категорию участника",
        formatRequired: "Выберите формат участия",
        consentRequired: "Необходимо согласие на обработку персональных данных",
      },
    },
    partners: {
      title: "Организаторы и партнеры",
      subtitle:
        "При поддержке ведущих государственных и международных структур",
      items: [
        "Правительство Республики Таджикистан",
        "Министерство сельского хозяйства РТ",
        "ГУП «Центр цифровизации АПК»",
        "KOICA",
        "ВПП ООН (WFP)",
        "ФАО ООН (FAO)",
        "Всемирный Банк",
        "GIZ / Бонки Эсхата",
        "Хумо / Арванд",
      ],
    },
    footer: {
      text: "Digital AgroExpo Tajikistan-2026 — Трансформация сельского хозяйства через технологии.",
      location: "г. Душанбе, Республика Таджикистан",
      copyright: "© 2026 Digital AgroExpo Tajikistan. Все права защищены.",
    },
  },
  tj: {
    nav: {
      about: "Дар бораи конфронс",
      directions: "Самтҳо",
      partners: "Шарикон",
      registerBtn: "Барӯйхатгирӣ",
    },
    hero: {
      badge: "Вазорати кишоварзии Ҷумҳурии Тоҷикистон • БОҶ СММ (WFP)",
      title: "Digital AgroExpo Tajikistan-2026",
      subtitle:
        "Конфронс ва намоишгоҳ бо мақсади мубодилаи таҷриба, таъсиси экосистемаи ягонаи рақамӣ ва муттаҳидсозии шарикон барои табдилдиҳии устувори системаҳои агроозуқаворӣ ва ҷалби сармоя баргузор мегардад.",
      location: "📍 ш. Душанбе",
      date: "📅 Декабр 2026",
      format: "🤝 B2B ва Форум",
      cta: "Иштирок дар AgroExpo",
    },
    directions: {
      title: "Самтҳои асосии намоишгоҳ (Expo)",
      subtitle:
        "Қарорҳои инноватсионии AgTech барои рушди устувори КИА Тоҷикистон",
      smartIrrigation: {
        title: "Обиёрии ҳушманд",
        desc: "Системаҳои обиёрии қатрагӣ бо сенсорҳои намии хок ва пойгоҳҳои автоматии насосӣ барои сарфаи об.",
      },
      agrometeo: {
        title: "Агрометеорология",
        desc: "Мониторинги мултиспектралӣ, системаҳои огоҳонии барвақти сардӣ ва хизматрасониҳои обу ҳаво барои ҳифзи ҳосил.",
      },
      drones: {
        title: "Дронҳо ва системаҳои ГИС",
        desc: "Аэромониторинги майдонҳо, ворид намудани нуриҳо ва таҳлили моҳвораии чарогоҳҳо ва заминҳои корам.",
      },
      fintech: {
        title: "Агроконсалтинг ва Финтех",
        desc: "Барномаҳои мобилӣ барои деҳқонон, маркетплейсҳои рақамӣ, кредитҳои сабз ва агролизинги рақамӣ.",
      },
    },
    registration: {
      title: "Бақайдгирии онлайни иштирокчиён",
      subtitle:
        "Формаи зеринро барои гирифтани бейҷи электронии иштирокчӣ пур кунед",
      labels: {
        fullName: "Ному насаб (Пурра)",
        email: "Почтаи электронӣ (Email)",
        phone: "Рақами телефон (WhatsApp/Telegram)",
        organization: "Номи ширкат / ДДҲ / Хоҷагии деҳқонӣ",
        position: "Вазифа / Ихтисос",
        region: "Минтақа / Кишвар",
        category: "Категорияи иштирокчӣ",
        format: "Формати иштирок",
        selectPlaceholder: "-- Аз рӯйхат интихоб кунед --",
      },
      placeholders: {
        fullName: "Масалан: Рустамов Искандар Алиевич",
        email: "example@domain.tj",
        phone: "+992900112233",
        organization: "Масалан: ҶШМ 'АгроТехИнновация' ё ХД 'Саодат'",
        position: "Масалан: Агрономи калон / Директор / Донишҷӯ",
      },
      buttons: {
        submit: "Барӯйхатгирӣ дар AgroExpo-2026",
        submitting: "Фиристодан...",
      },
      messages: {
        successTitle: "Дархост бо муваффақият фиристода шуд!",
        successDesc:
          "Ташаккур барои бақайдгирӣ. Кумитаи ташкилӣ барои тасдиқи бейҷ бо шумо тамос мегирад.",
        errorTitle: "Хатогӣ ҳангоми фиристодан",
        errorDesc:
          "Ҳангоми фиристодани форма ба Google Forms хатогӣ рух дод. Лутфан, дубора кӯшиш кунед.",
      },
      regions: [
        "ш. Душанбе",
        "Вилояти Суғд",
        "Вилояти Хатлон",
        "Вилояти Мухтори Кӯҳистони Бадахшон (ВМКБ)",
        "Ноҳияҳои тобеи марказ (НТМ)",
        "Иштирокчии хориҷӣ / Делегати байналмилалӣ",
      ],
      categories: [
        "Сохтори давлатӣ (Вазоратҳо, идораҳо)",
        "Хоҷагии деҳқонӣ / Фермер / Агрохолдинг / Кооператив",
        "Ширкати IT / Таҳиягари AgTech / Таъминкунандаи таҷҳизот",
        "Ташкилоти байналмилалӣ / Сохтори донорӣ / ҶТ",
        "Институти молиявӣ / Бонк / ТҶМ / Ширкати суғурта",
        "Институти илмӣ-тадқиқотӣ / ДДҲ / Муаллим / Донишҷӯ",
        "Маркетплейс / Ширкати логистикӣ / Коркардкунанда",
        "КАТ / Пресса",
      ],
      formats: [
        "Иштирокчии намоишгоҳ (Expo) — тамошои озоди минтақаҳои демо ва стендҳо",
        "Делегати конфронс (Forum) — иштирок дар сессияҳо",
        "Иштирокчӣ бо стенд (Экспонент) — намоиши қарорҳо",
        "Спикер / Маърузачӣ — баромад дар сессия",
        "Донишҷӯ-гид / Волонтёр — ҳамроҳии техно-турҳо",
      ],
      validation: {
        fullNameRequired: "Ному насаб ҳатмист",
        fullNameMin: "Дарозии ҳадди ақали ному насаб — 5 аломат",
        fullNameMax: "Дарозии ҳадди аксари ному насаб — 100 аломат",
        fullNameMatch:
          "Танҳо ҳарфҳои кириллӣ (аз ҷумла ҳарфҳои тоҷикӣ Ғ, Ӣ, Қ, Ӯ, Ҳ, Ҷ), лотинӣ, фазо ва дефисҳо иҷозат дода мешаванд",
        emailRequired: "Email ҳатмист",
        emailInvalid: "Суроғаи дурусти почтаи электрониро ворид кунед",
        phoneRequired: "Рақами телефон ҳатмист",
        phoneMatch:
          "Рақами дурусти Тоҷикистонро дар формати +992XXXXXXXXX ворид кунед",
        orgRequired: "Номи ширкат / ДДҲ / ХД ҳатмист",
        orgMin: "Дарозии ҳадди ақал — 2 аломат",
        orgMax: "Дарозии ҳадди аксар — 150 аломат",
        posRequired: "Вазифа ҳатмист",
        posMin: "Дарозии ҳадди ақал — 2 аломат",
        posMax: "Дарозии ҳадди аксар — 100 аломат",
        regionRequired: "Минтақаи худро интихоб кунед",
        categoryRequired: "Категорияи иштирокчиро интихоб кунед",
        formatRequired: "Формати иштирокро интихоб кунед",
        consentRequired: "Розигӣ барои коркарди маълумоти шахсӣ ҳатмист",
      },
    },
    partners: {
      title: "Ташкилотчиён ва шарикон",
      subtitle: "Бо дастгирии сохторҳои пешбари давлатӣ ва байналмилалӣ",
      items: [
        "Ҳукумати Ҷумҳурии Тоҷикистон",
        "Вазорати кишоварзии ҶТ",
        "КАТ «Маркази рақамикунонии КҲ»",
        "KOICA",
        "БҶҲ ООН (WFP)",
        "ФАО ООН (FAO)",
        "Бонки Ҷаҳонӣ",
      ],
    },
    footer: {
      text: "Digital AgroExpo Tajikistan-2026 — Гузариш ба кишоварзии рақамӣ тавассути технологияҳо.",
      location: "ш. Душанбе, Ҷумҳурии Тоҷикистон",
      copyright:
        "© 2026 Digital AgroExpo Tajikistan. Ҳамаи ҳуқуқҳо ҳифз шудаанд.",
    },
  },
  en: {
    nav: {
      about: "About Conference",
      directions: "Directions",
      partners: "Partners",
      registerBtn: "Register Now",
    },
    hero: {
      badge: "Ministry of Agriculture of RT • UN WFP",
      title: "Digital AgroExpo Tajikistan-2026",
      subtitle:
        "The conference and exhibition are held to exchange experience, create a unified digital ecosystem, and unite partners for the sustainable transformation of agrifood systems and investment attraction.",
      location: "📍 Dushanbe",
      date: "📅 November – December 2026",
      format: "🤝 B2B & Forum",
      cta: "Join AgroExpo",
    },
    directions: {
      title: "Key Exhibition Directions (Expo)",
      subtitle:
        "Innovative AgTech solutions for sustainable development of Tajikistan's agricultural sector",
      smartIrrigation: {
        title: "Smart Irrigation",
        desc: "Drip irrigation systems with soil moisture sensors and automated pump stations for water saving.",
      },
      agrometeo: {
        title: "Agrometeorology",
        desc: "Multispectral monitoring, early frost warning systems, and weather services for crop protection.",
      },
      drones: {
        title: "Drones & GIS Systems",
        desc: "Aerial crop monitoring, targeted fertilizer application, and satellite analysis of pastures and arable lands.",
      },
      fintech: {
        title: "Agro-consulting & Fintech",
        desc: "Mobile apps for farmers, digital marketplaces, green credits, and digital agricultural leasing.",
      },
    },
    registration: {
      title: "Online Participant Registration",
      subtitle:
        "Fill out the form below to receive your digital participant badge",
      labels: {
        fullName: "Full Name",
        email: "Email Address",
        phone: "Phone Number (WhatsApp/Telegram)",
        organization: "Organization / University / Farm Name",
        position: "Position / Specialization",
        region: "Region / Country",
        category: "Participant Category",
        format: "Participation Format",
        selectPlaceholder: "-- Select from list --",
      },
      placeholders: {
        fullName: "Example: Rustamov Iskandar Alievich",
        email: "example@domain.tj",
        phone: "+992900112233",
        organization: "Example: LLC 'AgroTech Innovations' or Farm 'Saodat'",
        position: "Example: Chief Agronomist / Director / Student",
      },
      buttons: {
        submit: "Register for AgroExpo-2026",
        submitting: "Submitting...",
      },
      messages: {
        successTitle: "Application submitted successfully!",
        successDesc:
          "Thank you for registering. Our organizing committee will contact you for badge confirmation.",
        errorTitle: "Submission Error",
        errorDesc:
          "An error occurred while sending data to Google Forms. Please try again.",
      },
      regions: [
        "Dushanbe city",
        "Sughd Region",
        "Khatlon Region",
        "Gorno-Badakhshan Autonomous Region (GBAO)",
        "Districts of Republican Subordination (DRS)",
        "Foreign Participant / International Delegate",
      ],
      categories: [
        "Government Sector (Ministries, Agencies)",
        "Dehkan Farm / Farmer / Agro-holding / Cooperative",
        "IT Company / AgTech Developer / Equipment Provider",
        "International Organization / Donor Agency / NGO",
        "Financial Institution / Bank / MFI / Insurance",
        "Research Institute / University / Professor / Student",
        "Marketplace / Logistics Company / Processor",
        "Media / Press",
      ],
      formats: [
        "Exhibition Visitor (Expo) — Free access to demo zones and stands",
        "Conference Delegate (Forum) — Participation in sessions",
        "Exhibitor with Stand — Solutions demonstration",
        "Speaker / Presenter — Presentation at sessions",
        "Student Guide / Volunteer — Escorting tech tours",
      ],
      validation: {
        fullNameRequired: "Full Name is required",
        fullNameMin: "Minimum length is 5 characters",
        fullNameMax: "Maximum length is 100 characters",
        fullNameMatch:
          "Only letters (including Tajik letters Ғ, Ӣ, Қ, Ӯ, Ҳ, Ҷ), spaces, and hyphens are allowed",
        emailRequired: "Email is required",
        emailInvalid: "Enter a valid email address",
        phoneRequired: "Phone number is required",
        phoneMatch:
          "Enter a valid Tajikistan phone number in format +992XXXXXXXXX",
        orgRequired: "Organization name is required",
        orgMin: "Minimum length is 2 characters",
        orgMax: "Maximum length is 150 characters",
        posRequired: "Position is required",
        posMin: "Minimum length is 2 characters",
        posMax: "Maximum length is 100 characters",
        regionRequired: "Select your region",
        categoryRequired: "Select participant category",
        formatRequired: "Select participation format",
        consentRequired: "Consent to personal data processing is required",
      },
    },
    partners: {
      title: "Organizers & Partners",
      subtitle: "Supported by leading government and international entities",
      items: [
        "Government of the Republic of Tajikistan",
        "Ministry of Agriculture of RT",
        "SUE 'Agro Digitalization Center'",
        "KOICA",
        "UN WFP",
        "UN FAO",
        "World Bank",
        "GIZ / Eskhata Bank",
        "Humo / Arvand",
      ],
    },
    footer: {
      text: "Digital AgroExpo Tajikistan-2026 — Agriculture transformation through technology.",
      location: "Dushanbe, Republic of Tajikistan",
      copyright: "© 2026 Digital AgroExpo Tajikistan. All rights reserved.",
    },
  },
};
