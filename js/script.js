/**
 * Контуры трасс
 * - Большинство: SVG с GitHub (CC0-1.0) → trackAssets + TRACK_ASSET_BASE
 * - Мадринг и Сепанг: локальные PNG в assets/tracks/
 * - Если ничего не нашлось: CSS-заглушка .track-icon / .track-error
 */
let currentLanguage = "ru"; // рано: formatDateTime и countdown читают при первом renderSchedule()

const trackAssets = {
  "track-melbourne": "albert_park", "track-shanghai": "shanghai",
  "track-suzuka": "suzuka", "track-sakhir": "bahrain", "track-miami": "miami",
  "track-montreal": "villeneuve", "track-monaco": "monaco", "track-barcelona": "catalunya",
  "track-spielberg": "red_bull_ring", "track-silverstone": "silverstone", "track-spa": "spa",
  "track-hungaroring": "hungaroring", "track-zandvoort": "zandvoort", "track-monza": "monza",
  "track-baku": "baku", "track-singapore": "marina_bay", "track-austin": "americas",
  "track-mexico": "rodriguez", "track-interlagos": "interlagos", "track-vegas": "vegas",
  "track-lusail": "losail", "track-yasmarina": "yas_marina"
};
const TRACK_ASSET_BASE = "https://raw.githubusercontent.com/MasterPlay007/F1-Track-Layouts-SVG/main/";
function trackMarkup(trackClass, modal = false) {
  const asset = trackAssets[trackClass];
  if (trackClass === "track-madrid") {
    const imageClass = modal ? "modal-track-image" : "track-image";
    return `<img class="${imageClass}" src="assets/tracks/madrid.png" alt="Конфигурация трассы Мадринг" loading="lazy">`;
  }
  if (trackClass === "track-sepang") {
    const imageClass = modal ? "modal-track-image" : "track-image";
    return `<img class="${imageClass}" src="assets/tracks/sepang.png" alt="Контур трассы Сепанг" loading="lazy">`;
  }
  if (asset) {
    const imageClass = modal ? "modal-track-image" : "track-image";
    return `<img class="${imageClass}" src="${TRACK_ASSET_BASE}${asset}.svg" alt="Конфигурация трассы" loading="lazy">`;
  }
  const className = modal ? "modal-track-icon" : "track-icon";
  return `<div class="${className} ${trackClass}" role="img" aria-label="Конфигурация трассы"></div>`;
}

const countryCodes = {
  "Австралия":"au", "Китай":"cn", "Япония":"jp", "Бахрейн":"bh", "США":"us",
  "Канада":"ca", "Монако":"mc", "Испания":"es", "Австрия":"at", "Великобритания":"gb",
  "Бельгия":"be", "Венгрия":"hu", "Нидерланды":"nl", "Италия":"it", "Азербайджан":"az",
  "Сингапур":"sg", "Мексика":"mx", "Бразилия":"br", "Катар":"qa", "ОАЭ":"ae",
  "Франция":"fr", "Новая Зеландия":"nz", "Аргентина":"ar", "Германия":"de",
  "Таиланд":"th", "Финляндия":"fi", "Малайзия":"my", "Бахрейн в Малайзии":"my"
};
function flagMarkup(country, extraClass = "country-flag") {
  const code = countryCodes[country];
  return code ? `<img class="${extraClass}" src="https://flagcdn.com/${code}.svg" alt="Флаг: ${country}" loading="lazy">` : "";
}

// ============================================================
// 1. ДАННЫЕ КАЛЕНДАРЯ
// ============================================================
const schedule = [
  { country: "Австралия", flag: "🇦🇺", circuit: "Мельбурн", lengthKm: 5.278, debutYear: 1996, trackClass: "track-melbourne", sessions: [
    { type: "Практика 1", date: "2026-03-06T04:30:00" }, { type: "Практика 2", date: "2026-03-06T08:00:00" }, { type: "Практика 3", date: "2026-03-07T04:30:00" }, { type: "Квалификация", date: "2026-03-07T08:00:00" }, { type: "Гонка", date: "2026-03-08T07:00:00" }
  ]},
  { country: "Китай", flag: "🇨🇳", circuit: "Шанхай", lengthKm: 5.451, debutYear: 2004, trackClass: "track-shanghai", sessions: [
    { type: "Практика 1", date: "2026-03-13T06:30:00" }, { type: "Спринт-квалификация", date: "2026-03-13T10:30:00" }, { type: "Спринт", date: "2026-03-14T06:00:00" }, { type: "Квалификация", date: "2026-03-14T10:00:00" }, { type: "Гонка", date: "2026-03-15T10:00:00" }
  ]},
  { country: "Япония", flag: "🇯🇵", circuit: "Судзука", lengthKm: 5.807, debutYear: 1987, trackClass: "track-suzuka", sessions: [
    { type: "Практика 1", date: "2026-03-27T05:30:00" }, { type: "Практика 2", date: "2026-03-27T09:00:00" }, { type: "Практика 3", date: "2026-03-28T05:30:00" }, { type: "Квалификация", date: "2026-03-28T09:00:00" }, { type: "Гонка", date: "2026-03-29T08:10:00" }
  ]},
  { country: "США", flag: "🇺🇸", circuit: "Майами", lengthKm: 5.412, debutYear: 2022, trackClass: "track-miami", sessions: [
    { type: "Практика 1", date: "2026-05-01T19:00:00" }, { type: "Спринт-квалификация", date: "2026-05-01T23:30:00" }, { type: "Спринт", date: "2026-05-02T19:00:00" }, { type: "Квалификация", date: "2026-05-02T23:00:00" }, { type: "Гонка", date: "2026-05-03T20:00:00" }
  ]},
  { country: "Канада", flag: "🇨🇦", circuit: "Монреаль", lengthKm: 4.361, debutYear: 1978, trackClass: "track-montreal", sessions: [
    { type: "Практика 1", date: "2026-05-22T19:30:00" }, { type: "Спринт-квалификация", date: "2026-05-22T23:30:00" }, { type: "Спринт", date: "2026-05-23T19:00:00" }, { type: "Квалификация", date: "2026-05-23T23:00:00" }, { type: "Гонка", date: "2026-05-24T23:00:00" }
  ]},
  { country: "Монако", flag: "🇲🇨", circuit: "Монте-Карло", lengthKm: 3.337, debutYear: 1950, trackClass: "track-monaco", sessions: [
    { type: "Практика 1", date: "2026-06-05T14:30:00" }, { type: "Практика 2", date: "2026-06-05T18:00:00" }, { type: "Практика 3", date: "2026-06-06T13:30:00" }, { type: "Квалификация", date: "2026-06-06T17:00:00" }, { type: "Гонка", date: "2026-06-07T16:00:00" }
  ]},
  { country: "Испания", flag: "🇪🇸", circuit: "Барселона", lengthKm: 4.657, debutYear: 1991, trackClass: "track-barcelona", sessions: [
    { type: "Практика 1", date: "2026-06-12T14:30:00" }, { type: "Практика 2", date: "2026-06-12T18:00:00" }, { type: "Практика 3", date: "2026-06-13T13:30:00" }, { type: "Квалификация", date: "2026-06-13T17:00:00" }, { type: "Гонка", date: "2026-06-14T16:00:00" }
  ]},
  { country: "Австрия", flag: "🇦🇹", circuit: "Шпильберг", lengthKm: 4.318, debutYear: 1970, trackClass: "track-spielberg", sessions: [
    { type: "Практика 1", date: "2026-06-26T14:30:00" }, { type: "Практика 2", date: "2026-06-26T18:00:00" }, { type: "Практика 3", date: "2026-06-27T13:30:00" }, { type: "Квалификация", date: "2026-06-27T17:00:00" }, { type: "Гонка", date: "2026-06-28T16:00:00" }
  ]},
  { country: "Великобритания", flag: "🇬🇧", circuit: "Сильверстоун", lengthKm: 5.891, debutYear: 1950, trackClass: "track-silverstone", sessions: [
    { type: "Практика 1", date: "2026-07-03T14:30:00" }, { type: "Спринт-квалификация", date: "2026-07-03T18:30:00" }, { type: "Спринт", date: "2026-07-04T14:00:00" }, { type: "Квалификация", date: "2026-07-04T18:00:00" }, { type: "Гонка", date: "2026-07-05T17:00:00" }
  ]},
  { country: "Бельгия", flag: "🇧🇪", circuit: "Спа", lengthKm: 7.004, debutYear: 1950, trackClass: "track-spa", sessions: [
    { type: "Практика 1", date: "2026-07-17T14:30:00" }, { type: "Практика 2", date: "2026-07-17T18:00:00" }, { type: "Практика 3", date: "2026-07-18T13:30:00" }, { type: "Квалификация", date: "2026-07-18T17:00:00" }, { type: "Гонка", date: "2026-07-19T16:00:00" }
  ]},
  { country: "Венгрия", flag: "🇭🇺", circuit: "Хунгароринг", lengthKm: 4.381, debutYear: 1986, trackClass: "track-hungaroring", sessions: [
    { type: "Практика 1", date: "2026-07-24T14:30:00" }, { type: "Практика 2", date: "2026-07-24T18:00:00" }, { type: "Практика 3", date: "2026-07-25T13:30:00" }, { type: "Квалификация", date: "2026-07-25T17:00:00" }, { type: "Гонка", date: "2026-07-26T16:00:00" }
  ]},
  { country: "Нидерланды", flag: "🇳🇱", circuit: "Зандворт", lengthKm: 4.259, debutYear: 1952, trackClass: "track-zandvoort", sessions: [
    { type: "Практика 1", date: "2026-08-21T13:30:00" }, { type: "Спринт-квалификация", date: "2026-08-21T17:30:00" }, { type: "Спринт", date: "2026-08-22T13:00:00" }, { type: "Квалификация", date: "2026-08-22T17:00:00" }, { type: "Гонка", date: "2026-08-23T16:00:00" }
  ]},
  { country: "Италия", flag: "🇮🇹", circuit: "Монца", lengthKm: 5.793, debutYear: 1950, trackClass: "track-monza", sessions: [
    { type: "Практика 1", date: "2026-09-04T13:30:00" }, { type: "Практика 2", date: "2026-09-04T17:00:00" }, { type: "Практика 3", date: "2026-09-05T13:30:00" }, { type: "Квалификация", date: "2026-09-05T17:00:00" }, { type: "Гонка", date: "2026-09-06T16:00:00" }
  ]},
  { country: "Испания", flag: "🇪🇸", circuit: "Мадринг", lengthKm: 5.47, debutYear: 2026, trackClass: "track-madrid", sessions: [
    { type: "Практика 1", date: "2026-09-11T14:30:00" }, { type: "Практика 2", date: "2026-09-11T18:00:00" }, { type: "Практика 3", date: "2026-09-12T13:30:00" }, { type: "Квалификация", date: "2026-09-12T17:00:00" }, { type: "Гонка", date: "2026-09-13T16:00:00" }
  ]},
  { country: "Азербайджан", flag: "🇦🇿", circuit: "Баку", lengthKm: 6.003, debutYear: 2016, trackClass: "track-baku", sessions: [
    { type: "Практика 1", date: "2026-09-24T11:30:00" }, { type: "Практика 2", date: "2026-09-24T15:00:00" }, { type: "Практика 3", date: "2026-09-25T11:30:00" }, { type: "Квалификация", date: "2026-09-25T15:04:00" }, { type: "Гонка", date: "2026-09-26T14:00:00" }
  ]},
  { country: "Бахрейн в Малайзии", flag: "🇲🇾", circuit: "Сепанг", lengthKm: 5.543, debutYear: 1999, trackClass: "track-sepang", sessions: [
    { type: "Практика 1", date: "2026-04-10T14:30:00" }, { type: "Практика 2", date: "2026-04-10T18:00:00" }, { type: "Практика 3", date: "2026-04-11T14:30:00" }, { type: "Квалификация", date: "2026-04-11T18:00:00" }, { type: "Гонка", date: "2026-04-12T18:00:00" }
  ]},
  { country: "Сингапур", flag: "🇸🇬", circuit: "Сингапур", lengthKm: 4.94, debutYear: 2008, trackClass: "track-singapore", sessions: [
    { type: "Практика 1", date: "2026-10-09T11:30:00" }, { type: "Спринт-квалификация", date: "2026-10-09T15:30:00" }, { type: "Спринт", date: "2026-10-10T12:30:00" }, { type: "Квалификация", date: "2026-10-10T16:30:00" }, { type: "Гонка", date: "2026-10-11T15:00:00" }
  ]},
  { country: "США", flag: "🇺🇸", circuit: "Остин", lengthKm: 5.513, debutYear: 2012, trackClass: "track-austin", sessions: [
    { type: "Спринт-квалификация", date: "2026-10-23T20:30:00" }, { type: "Практика 1", date: "2026-10-23T20:30:00" }, { type: "Практика 2", date: "2026-10-24T00:00:00" }, { type: "Спринт", date: "2026-10-24T19:00:00" }, { type: "Квалификация", date: "2026-10-25T00:00:00" }, { type: "Гонка", date: "2026-10-25T23:00:00" }
  ]},
  { country: "Мексика", flag: "🇲🇽", circuit: "Мехико", lengthKm: 4.304, debutYear: 1963, trackClass: "track-mexico", sessions: [
    { type: "Практика 1", date: "2026-10-30T21:30:00" }, { type: "Практика 2", date: "2026-10-31T01:00:00" }, { type: "Практика 3", date: "2026-10-31T20:30:00" }, { type: "Квалификация", date: "2026-11-01T00:00:00" }, { type: "Гонка", date: "2026-11-01T23:00:00" }
  ]},
  { country: "Бразилия", flag: "🇧🇷", circuit: "Сан-Паулу", lengthKm: 4.309, debutYear: 1973, trackClass: "track-interlagos", sessions: [
    { type: "Практика 1", date: "2026-11-06T18:30:00" }, { type: "Практика 2", date: "2026-11-06T22:00:00" }, { type: "Квалификация", date: "2026-11-07T21:00:00" }, { type: "Гонка", date: "2026-11-08T20:00:00" }
  ]},
  { country: "США", flag: "🇺🇸", circuit: "Лас-Вегас", lengthKm: 6.201, debutYear: 2023, trackClass: "track-vegas", sessions: [
    { type: "Практика 1", date: "2026-11-20T03:30:00" }, { type: "Практика 2", date: "2026-11-20T07:00:00" }, { type: "Практика 3", date: "2026-11-21T03:30:00" }, { type: "Квалификация", date: "2026-11-21T07:00:00" }, { type: "Гонка", date: "2026-11-22T07:00:00" }
  ]},
  { country: "Катар", flag: "🇶🇦", circuit: "Лосаил", lengthKm: 5.419, debutYear: 2021, trackClass: "track-lusail", sessions: [
    { type: "Практика 1", date: "2026-11-27T16:30:00" }, { type: "Практика 2", date: "2026-11-27T20:00:00" }, { type: "Квалификация", date: "2026-11-28T21:00:00" }, { type: "Гонка", date: "2026-11-29T19:00:00" }
  ]},
  { country: "ОАЭ", flag: "🇦🇪", circuit: "Абу-Даби", lengthKm: 5.281, debutYear: 2009, trackClass: "track-yasmarina", sessions: [
    { type: "Практика 1", date: "2026-12-04T12:30:00" }, { type: "Практика 2", date: "2026-12-04T16:00:00" }, { type: "Практика 3", date: "2026-12-05T13:30:00" }, { type: "Квалификация", date: "2026-12-05T17:00:00" }, { type: "Гонка", date: "2026-12-06T16:00:00" }
  ]}
];

// ============================================================
// 2. ДАННЫЕ ПИЛОТОВ (Личный зачёт)
// ============================================================
// Чтобы обновить очки, просто меняйте цифры в поле points.
const drivers = [
  { pos: 1, name: "Андреа Кими Антонелли", number: 12, country: "Италия", flag: "🇮🇹", points: 340 },
  { pos: 2, name: "Джордж Расселл", number: 63, country: "Великобритания", flag: "🇬🇧", points: 238 },
  { pos: 3, name: "Льюис Хэмилтон", number: 44, country: "Великобритания", flag: "🇬🇧", points: 229 },
  { pos: 4, name: "Макс Ферстаппен", number: 3, country: "Нидерланды", flag: "🇳🇱", points: 221 },
  { pos: 5, name: "Шарль Леклер", number: 16, country: "Монако", flag: "🇲🇨", points: 215 },
  { pos: 6, name: "Ландо Норрис", number: 1, country: "Великобритания", flag: "🇬🇧", points: 201 },
  { pos: 7, name: "Оскар Пиастри", number: 81, country: "Австралия", flag: "🇦🇺", points: 138 },
  { pos: 8, name: "Исак Хаджар", number: 6, country: "Франция", flag: "🇫🇷", points: 97 },
  { pos: 9, name: "Лиам Лоусон", number: 30, country: "Новая Зеландия", flag: "🇳🇿", points: 75 },
  { pos: 10, name: "Пьер Гасли", number: 10, country: "Франция", flag: "🇫🇷", points: 41 },
  { pos: 11, name: "Арвид Линдблад", number: 41, country: "Великобритания", flag: "🇬🇧", points: 38 },
  { pos: 12, name: "Франко Колапинто", number: 43, country: "Аргентина", flag: "🇦🇷", points: 27 },
  { pos: 13, name: "Оливер Берман", number: 87, country: "Великобритания", flag: "🇬🇧", points: 23 },
  { pos: 14, name: "Нико Хюлькенберг", number: 27, country: "Германия", flag: "🇩🇪", points: 13 },
  { pos: 15, name: "Габриэль Бортолето", number: 5, country: "Бразилия", flag: "🇧🇷", points: 10 },
  { pos: 16, name: "Эстебан Окон", number: 31, country: "Франция", flag: "🇫🇷", points: 7 },
  { pos: 17, name: "Фернандо Алонсо", number: 14, country: "Испания", flag: "🇪🇸", points: 7 },
  { pos: 18, name: "Карлос Сайнс-мл.", number: 55, country: "Испания", flag: "🇪🇸", points: 7 },
  { pos: 19, name: "Алекс Албон", number: 23, country: "Таиланд", flag: "🇹🇭", points: 5 },
  { pos: 20, name: "Лэнс Стролл", number: 18, country: "Канада", flag: "🇨🇦", points: 0 },
  { pos: 21, name: "Валттери Боттас", number: 77, country: "Финляндия", flag: "🇫🇮", points: 0 },
  { pos: 22, name: "Серхио Перес", number: 11, country: "Мексика", flag: "🇲🇽", points: 0 }
];

const driverTeams = {
  "Андреа Кими Антонелли": { name: "Mercedes", mark: "AMG", color: "#00D2BE" }, "Джордж Расселл": { name: "Mercedes", mark: "AMG", color: "#00D2BE" },
  "Льюис Хэмилтон": { name: "Ferrari", mark: "SF", color: "#E8002D" }, "Шарль Леклер": { name: "Ferrari", mark: "SF", color: "#E8002D" },
  "Макс Ферстаппен": { name: "Red Bull Racing", mark: "RB", color: "#3671C6" }, "Юки Цунода": { name: "Red Bull Racing", mark: "RB", color: "#3671C6" },
  "Ландо Норрис": { name: "McLaren", mark: "MCL", color: "#FF8000" }, "Оскар Пиастри": { name: "McLaren", mark: "MCL", color: "#FF8000" },
  "Исак Хаджар": { name: "Racing Bulls", mark: "VCARB", color: "#6692FF" }, "Лиам Лоусон": { name: "Racing Bulls", mark: "VCARB", color: "#6692FF" }, "Арвид Линдблад": { name: "Racing Bulls", mark: "VCARB", color: "#6692FF" },
  "Пьер Гасли": { name: "Alpine", mark: "A", color: "#FF87BC" }, "Франко Колапинто": { name: "Alpine", mark: "A", color: "#FF87BC" },
  "Оливер Берман": { name: "Haas", mark: "HAAS", color: "#B6BABD" }, "Эстебан Окон": { name: "Haas", mark: "HAAS", color: "#B6BABD" },
  "Нико Хюлькенберг": { name: "Audi", mark: "AUDI", color: "#FF2D00" }, "Габриэль Бортолето": { name: "Audi", mark: "AUDI", color: "#FF2D00" },
  "Фернандо Алонсо": { name: "Aston Martin", mark: "AM", color: "#229971" }, "Лэнс Стролл": { name: "Aston Martin", mark: "AM", color: "#229971" },
  "Карлос Сайнс-мл.": { name: "Williams", mark: "W", color: "#1868DB" }, "Алекс Албон": { name: "Williams", mark: "W", color: "#1868DB" },
  "Валттери Боттас": { name: "Cadillac", mark: "CAD", color: "#D6D6D6" }, "Серхио Перес": { name: "Cadillac", mark: "CAD", color: "#D6D6D6" }
};

// ============================================================
// 3. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК (+ слайд на мобиле)
// ============================================================
let activeTab = "schedule";
const MOBILE_TAB_MAX = 760;

function isMobileTabs() {
  return window.matchMedia(`(max-width: ${MOBILE_TAB_MAX}px)`).matches;
}

function switchTab(tab) {
  const next = tab === "standings" ? "standings" : "schedule";
  if (next === activeTab) return;

  activeTab = next;

  const scheduleView = document.getElementById("view-schedule");
  const standingsView = document.getElementById("view-standings");
  const tabSchedule = document.getElementById("tab-schedule");
  const tabStandings = document.getElementById("tab-standings");
  const track = document.getElementById("tab-track");

  tabSchedule.classList.toggle("active", activeTab === "schedule");
  tabStandings.classList.toggle("active", activeTab === "standings");

  if (track) track.dataset.tab = activeTab;

  if (isMobileTabs()) {
    // На мобиле обе панели в ряду — видимость через transform у .tab-track
    scheduleView.hidden = false;
    standingsView.hidden = false;
    scheduleView.style.display = "";
    standingsView.style.display = "";
  } else {
    // Десктоп: мгновенное переключение без слайда
    scheduleView.hidden = activeTab !== "schedule";
    standingsView.hidden = activeTab !== "standings";
    scheduleView.style.display = activeTab === "schedule" ? "block" : "none";
    standingsView.style.display = activeTab === "standings" ? "block" : "none";
  }

  if (activeTab === "standings") renderStandings();
}

// Свайп между вкладками — только на мобильной ширине
(function initMobileTabSwipe() {
  const SWIPE_MIN_X = 56;
  const SWIPE_MAX_Y = 48;
  let startX = 0;
  let startY = 0;
  let tracking = false;

  function shouldIgnoreTarget(target) {
    if (!target || !target.closest) return false;
    // Карусель next-race и модалка не должны переключать вкладки
    return Boolean(target.closest("input, textarea, select, .custom-select, .modal, #next-race, .hero-carousel"));
  }

  document.addEventListener("touchstart", (e) => {
    const modal = document.getElementById("modal");
    if (
      !isMobileTabs() ||
      e.touches.length !== 1 ||
      shouldIgnoreTarget(e.target) ||
      modal?.classList.contains("show") ||
      heroSwipeActive
    ) {
      tracking = false;
      return;
    }
    tracking = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    const modal = document.getElementById("modal");
    if (
      !tracking ||
      !isMobileTabs() ||
      !e.changedTouches.length ||
      modal?.classList.contains("show") ||
      heroSwipeActive
    ) {
      tracking = false;
      return;
    }
    tracking = false;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) < SWIPE_MIN_X || Math.abs(dy) > SWIPE_MAX_Y || Math.abs(dx) < Math.abs(dy)) {
      return;
    }
    if (dx < 0 && activeTab === "schedule") switchTab("standings");
    else if (dx > 0 && activeTab === "standings") switchTab("schedule");
  }, { passive: true });

  // При ресайзе синхронизируем display (мобиле ↔ десктоп)
  window.addEventListener("resize", () => {
    const scheduleView = document.getElementById("view-schedule");
    const standingsView = document.getElementById("view-standings");
    const track = document.getElementById("tab-track");
    if (!scheduleView || !standingsView) return;
    if (track) track.dataset.tab = activeTab;
    if (isMobileTabs()) {
      scheduleView.hidden = false;
      standingsView.hidden = false;
      scheduleView.style.display = "";
      standingsView.style.display = "";
    } else {
      scheduleView.hidden = activeTab !== "schedule";
      standingsView.hidden = activeTab !== "standings";
      scheduleView.style.display = activeTab === "schedule" ? "block" : "none";
      standingsView.style.display = activeTab === "standings" ? "block" : "none";
    }
  });
})();

// ============================================================
// 4. ЛОГИКА КАЛЕНДАРЯ
// ============================================================
const nextBox = document.getElementById("next-race");
const gridBox = document.getElementById("race-grid");

function formatDateTime(dateStr, options) {
  if (!dateStr) return "?";
  const locale = currentLanguage === "en" ? "en-GB" : "ru-RU";
  return new Date(dateStr).toLocaleString(locale, options);
}

function getNextSession() {
  const now = Date.now();
  let next = null;

  schedule.forEach((gp, index) => {
    gp.sessions.forEach(session => {
      // Ищем только Гонку или Спринт, игнорируя практики и квалификации
      if (session.date && (session.type === "Гонка" || session.type === "Спринт")) {
        const ts = new Date(session.date).getTime();

        // Если время еще не прошло и это ближайшая гонка
        if (ts > now && (!next || ts < next.ts)) {
          next = {
            ts,
            country: gp.country,
            flag: gp.flag,
            circuit: gp.circuit,
            type: session.type,
            index
          };
        }
      }
    });
  });
  return next;
}

function isPast(gp) {
  const now = Date.now();
  const datedSessions = gp.sessions.filter(s => s.date);
  if (datedSessions.length === 0) return false;
  const lastSessionTime = Math.max(...datedSessions.map(s => new Date(s.date).getTime()));
  return (lastSessionTime + 7200000) < now;
}

/** Главная сессия этапа (Гонка, иначе Спринт, иначе последняя с датой) */
function getPrimarySession(gp) {
  const race = gp.sessions.find(s => s.type === "Гонка" && s.date);
  if (race) return race;
  const sprint = gp.sessions.find(s => s.type === "Спринт" && s.date);
  if (sprint) return sprint;
  const dated = gp.sessions.filter(s => s.date);
  return dated.length ? dated[dated.length - 1] : null;
}

// --- Карусель центральной панели: только prev / current / next ---
// heroSlideIndex: 0 = предыдущая, 1 = текущая, 2 = следующая
let heroSlideIndex = 1;
let heroCountdownTimer = null;
let heroSlidesCache = [];
let heroSwipeActive = false; // блокирует свайп вкладок, пока жест в карусели

function makeHeroSlide(gp, index, role) {
  const session = getPrimarySession(gp);
  const ts = session ? new Date(session.date).getTime() : null;
  return {
    role, // "prev" | "current" | "next"
    index,
    country: gp.country,
    circuit: gp.circuit,
    type: session?.type || "Гонка",
    ts,
    past: role === "prev" || isPast(gp)
  };
}

/** Ровно 3 слайда: предыдущая завершённая, текущая ближайшая, следующая после неё */
function buildHeroSlides() {
  const next = getNextSession();
  const currentIdx = next?.index ?? schedule.findIndex(gp => !isPast(gp));
  const safeCurrent = currentIdx >= 0 ? currentIdx : Math.max(0, schedule.length - 1);
  const prevIdx = safeCurrent > 0 ? safeCurrent - 1 : null;
  const nextIdx = safeCurrent < schedule.length - 1 ? safeCurrent + 1 : null;

  const slides = [];
  if (prevIdx != null) slides.push(makeHeroSlide(schedule[prevIdx], prevIdx, "prev"));
  slides.push(makeHeroSlide(schedule[safeCurrent], safeCurrent, "current"));
  if (nextIdx != null) slides.push(makeHeroSlide(schedule[nextIdx], nextIdx, "next"));
  return slides;
}

function focusRaceTileByIndex(raceIndex) {
  if (!nextBox || raceIndex == null) return;
  nextBox.classList.remove("next-race-press");
  void nextBox.offsetWidth;
  nextBox.classList.add("next-race-press");
  setTimeout(() => nextBox.classList.remove("next-race-press"), 320);

  const tile = document.querySelector(`#race-grid .race-tile[data-race-index="${raceIndex}"]`);
  if (!tile) return;
  tile.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  setTimeout(() => {
    tile.classList.remove("race-tile-flash");
    void tile.offsetWidth;
    tile.classList.add("race-tile-flash");
    setTimeout(() => tile.classList.remove("race-tile-flash"), 1100);
  }, 380);
}

function updateHeroCountdown() {
  const el = document.getElementById("countdown");
  if (!el) return;
  const slide = heroSlidesCache[heroSlideIndex];
  if (!slide) return;
  if (slide.role === "prev" || slide.past || !slide.ts || slide.ts <= Date.now()) {
    el.textContent = currentLanguage === "en" ? "Stage completed" : "Этап завершён";
    return;
  }
  el.textContent = formatCountdown(slide.ts - Date.now());
}

function fillHeroLayer(layer, slide) {
  if (!layer || !slide) return;
  const country = currentLanguage === "en" ? translateString(slide.country, true) : slide.country;
  const type = currentLanguage === "en" ? translateString(slide.type, true) : slide.type;
  const circuit = currentLanguage === "en" ? translateString(slide.circuit, true) : slide.circuit;
  const when = slide.ts
    ? formatDateTime(slide.ts, { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })
    : "—";
  let status;
  if (slide.role === "prev" || slide.past || !slide.ts || slide.ts <= Date.now()) {
    status = currentLanguage === "en" ? "Stage completed" : "Этап завершён";
  } else {
    status = formatCountdown(slide.ts - Date.now());
  }
  // Обои трассы — те же фото, что в карточках
  applyPhotoToElement(layer, slide.circuit);
  layer.innerHTML = `
    <div class="hero-layer-inner">
      <div class="flag">${flagMarkup(slide.country, "country-flag next-flag")}</div>
      <div class="gp-name">${country} — ${type}</div>
      <div class="place">${circuit}</div>
      <div class="when">${when}</div>
      <div class="countdown">${status}</div>
    </div>
  `;
}

function updateHeroDots() {
  nextBox?.querySelectorAll(".hero-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === heroSlideIndex);
    dot.setAttribute("aria-current", i === heroSlideIndex ? "true" : "false");
  });
}

/** Наложение: новый слайд заезжает поверх текущего */
function setHeroSlide(index, { animate = false, direction = 0 } = {}) {
  if (!nextBox || !heroSlidesCache.length) return;
  index = Math.max(0, Math.min(heroSlidesCache.length - 1, index));
  if (index === heroSlideIndex && animate) return;

  const base = nextBox.querySelector(".hero-base");
  const overlay = nextBox.querySelector(".hero-overlay");
  if (!base || !overlay) {
    heroSlideIndex = index;
    renderHeroCarousel();
    return;
  }

  const finish = () => {
    heroSlideIndex = index;
    fillHeroLayer(base, heroSlidesCache[heroSlideIndex]);
    // countdown id только на базовом слое активного слайда
    const cd = base.querySelector(".countdown");
    if (cd) cd.id = "countdown";
    overlay.className = "hero-overlay";
    overlay.innerHTML = "";
    overlay.style.transition = "";
    overlay.style.transform = "";
    overlay.style.opacity = "";
    updateHeroDots();
    updateHeroNavButtons();
    if (heroCountdownTimer) clearInterval(heroCountdownTimer);
    updateHeroCountdown();
    heroCountdownTimer = setInterval(updateHeroCountdown, 30000);
  };

  if (!animate || direction === 0) {
    finish();
    return;
  }

  // direction < 0: свайп влево → prev накладывается слева
  // direction > 0: свайп вправо → next накладывается справа
  fillHeroLayer(overlay, heroSlidesCache[index]);
  overlay.classList.add("is-visible");
  overlay.style.transition = "none";
  overlay.style.transform = direction < 0 ? "translateX(-100%)" : "translateX(100%)";
  overlay.style.opacity = "1";
  void overlay.offsetWidth;
  overlay.style.transition = "transform 0.32s cubic-bezier(0.22, 0.9, 0.28, 1)";
  overlay.style.transform = "translateX(0)";
  setTimeout(finish, 330);
}

function renderHeroCarousel() {
  if (!nextBox) return;
  heroSlidesCache = buildHeroSlides();
  if (!heroSlidesCache.length) {
    nextBox.innerHTML = `<p class="loading">Календарь завершен.</p>`;
    return;
  }

  // Старт всегда на «текущей» (role === current)
  const currentPos = heroSlidesCache.findIndex(s => s.role === "current");
  heroSlideIndex = currentPos >= 0 ? currentPos : 0;

  const dotsHtml = heroSlidesCache.map((_, i) =>
    `<button type="button" class="hero-dot${i === heroSlideIndex ? " active" : ""}" data-hero-index="${i}" aria-label="Слайд ${i + 1}" aria-current="${i === heroSlideIndex ? "true" : "false"}"></button>`
  ).join("");

  nextBox.classList.add("next-race-clickable", "hero-carousel");
  nextBox.setAttribute("role", "region");
  nextBox.setAttribute("aria-label", "Карусель этапов");
  nextBox.onclick = null;
  nextBox.onkeydown = null;

  nextBox.innerHTML = `
    <button type="button" class="edge-nav edge-nav-prev hero-nav-prev" aria-label="Предыдущий этап">
      <span class="edge-nav-arrow" aria-hidden="true">‹</span>
    </button>
    <button type="button" class="edge-nav edge-nav-next hero-nav-next" aria-label="Следующий этап">
      <span class="edge-nav-arrow" aria-hidden="true">›</span>
    </button>
    <div class="hero-stage">
      <div class="hero-base"></div>
      <div class="hero-overlay" aria-hidden="true"></div>
    </div>
    <div class="hero-dots" role="tablist" aria-label="Слайды карусели">${dotsHtml}</div>
  `;

  fillHeroLayer(nextBox.querySelector(".hero-base"), heroSlidesCache[heroSlideIndex]);
  const cd = nextBox.querySelector(".hero-base .countdown");
  if (cd) cd.id = "countdown";
  updateHeroNavButtons();

  if (heroCountdownTimer) clearInterval(heroCountdownTimer);
  updateHeroCountdown();
  heroCountdownTimer = setInterval(updateHeroCountdown, 30000);

  nextBox.querySelector(".hero-nav-prev")?.addEventListener("click", (e) => {
    e.stopPropagation();
    navigateHero(-1);
  });
  nextBox.querySelector(".hero-nav-next")?.addEventListener("click", (e) => {
    e.stopPropagation();
    navigateHero(1);
  });

  nextBox.querySelector(".hero-dots")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".hero-dot");
    if (!btn) return;
    e.stopPropagation();
    const i = Number(btn.dataset.heroIndex);
    if (Number.isNaN(i) || i === heroSlideIndex) return;
    setHeroSlide(i, { animate: true, direction: i > heroSlideIndex ? 1 : -1 });
  });

  nextBox.querySelector(".hero-stage")?.addEventListener("click", (e) => {
    if (e.target.closest(".hero-dot, .edge-nav")) return;
    const slide = heroSlidesCache[heroSlideIndex];
    if (slide) focusRaceTileByIndex(slide.index);
  });

  initHeroSwipe();
}

let heroSwipeBound = false;
function initHeroSwipe() {
  if (heroSwipeBound || !nextBox) return;
  heroSwipeBound = true;
  let startX = 0;
  let startY = 0;
  let tracking = false;
  let dragging = false;
  let overlay = null;

  nextBox.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    if (e.target.closest(".hero-dot, .edge-nav")) return;
    tracking = true;
    dragging = false;
    heroSwipeActive = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    overlay = nextBox.querySelector(".hero-overlay");
  }, { passive: true });

  nextBox.addEventListener("touchmove", (e) => {
    if (!tracking || !overlay || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    if (!dragging) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
        tracking = false;
        heroSwipeActive = false;
        overlay.classList.remove("is-visible");
        overlay.style.transform = "";
        overlay.innerHTML = "";
        return;
      }
      if (Math.abs(dx) > 8) dragging = true;
    }
    if (!dragging) return;

    // Свайп вправо → левый слайд (prev); свайп влево → правый (next)
    const targetIndex = dx > 0 ? heroSlideIndex - 1 : heroSlideIndex + 1;
    if (targetIndex < 0 || targetIndex >= heroSlidesCache.length) {
      // край — лёгкое сопротивление без смены слайда
      overlay.classList.remove("is-visible");
      overlay.innerHTML = "";
      return;
    }

    if (!overlay.classList.contains("is-visible") || overlay.dataset.previewIndex !== String(targetIndex)) {
      fillHeroLayer(overlay, heroSlidesCache[targetIndex]);
      overlay.dataset.previewIndex = String(targetIndex);
      overlay.classList.add("is-visible");
      overlay.style.transition = "none";
    }

    const width = nextBox.offsetWidth || 1;
    const progress = Math.min(1, Math.abs(dx) / width);
    // Prev заезжает слева (свайп вправо), next — справа (свайп влево)
    if (dx > 0) {
      overlay.style.transform = `translateX(${-100 + progress * 100}%)`;
    } else {
      overlay.style.transform = `translateX(${100 - progress * 100}%)`;
    }
  }, { passive: true });

  const endHeroGesture = (e) => {
    if (!tracking) return;
    tracking = false;
    const dx = (e.changedTouches?.[0]?.clientX ?? startX) - startX;
    const width = nextBox.offsetWidth || 1;
    const progress = Math.abs(dx) / width;
    const targetIndex = dx > 0 ? heroSlideIndex - 1 : heroSlideIndex + 1;
    const canSwitch = dragging && progress > 0.22 && targetIndex >= 0 && targetIndex < heroSlidesCache.length;

    if (canSwitch) {
      // Доводим наложение до конца
      if (overlay) {
        overlay.style.transition = "transform 0.22s cubic-bezier(0.22, 0.9, 0.28, 1)";
        overlay.style.transform = "translateX(0)";
      }
      setTimeout(() => {
        setHeroSlide(targetIndex, { animate: false });
        heroSwipeActive = false;
      }, 230);
    } else {
      // Откат
      if (overlay?.classList.contains("is-visible")) {
        overlay.style.transition = "transform 0.22s ease";
        overlay.style.transform = dx > 0 ? "translateX(-100%)" : "translateX(100%)";
        setTimeout(() => {
          if (overlay) {
            overlay.classList.remove("is-visible");
            overlay.innerHTML = "";
            overlay.style.transition = "";
            overlay.style.transform = "";
            delete overlay.dataset.previewIndex;
          }
          heroSwipeActive = false;
        }, 230);
      } else {
        heroSwipeActive = false;
      }
    }
  };

  nextBox.addEventListener("touchend", endHeroGesture, { passive: true });
  nextBox.addEventListener("touchcancel", endHeroGesture, { passive: true });
}

function renderSchedule() {
  renderHeroCarousel();
  renderRaceGrid();
}

function renderRaceGrid() {
  const gridBox = document.getElementById("race-grid");
  if (!gridBox) return;
  const sortMode = document.getElementById("calendar-sort")?.value || "default";
  const ordered = schedule.map((gp, index) => ({...gp, originalIndex:index}));
  if (sortMode === "top-down") ordered.sort((a,b) => a.originalIndex - b.originalIndex);
  else if (sortMode === "bottom-up") ordered.sort((a,b) => b.originalIndex - a.originalIndex);
  else if (sortMode === "length-asc") ordered.sort((a,b) => a.lengthKm - b.lengthKm);
  else if (sortMode === "length-desc") ordered.sort((a,b) => b.lengthKm - a.lengthKm);
  else if (sortMode === "newest") ordered.sort((a,b) => b.debutYear - a.debutYear);
  else if (sortMode === "oldest") ordered.sort((a,b) => a.debutYear - b.debutYear);
  gridBox.innerHTML = ordered.map(gp => {
    const pastClass = isPast(gp) ? "past" : "";
    return `
      <div class="race-tile ${pastClass}" data-race-index="${gp.originalIndex}" onclick="openModal(${gp.originalIndex})">
        ${trackMarkup(gp.trackClass)}
        <div class="country">${flagMarkup(gp.country)} <span>${gp.country}</span></div>
        <div class="city">${gp.circuit}</div>
        <div class="race-meta">${gp.lengthKm.toFixed(3)} км · с ${gp.debutYear} г.</div>
      </div>
    `;
  }).join("");
}


// Кастомное меню сортировки календаря в стиле сайта
function toggleCalendarSort() {
  const menu = document.getElementById("calendar-sort-menu");
  const trigger = document.getElementById("calendar-sort-trigger");
  if (!menu || !trigger) return;
  const opening = menu.hidden;
  menu.hidden = !opening;
  trigger.setAttribute("aria-expanded", String(opening));
}

function chooseCalendarSort(value, label) {
  const select = document.getElementById("calendar-sort");
  const trigger = document.getElementById("calendar-sort-trigger");
  const menu = document.getElementById("calendar-sort-menu");
  if (!select || !trigger || !menu) return;
  select.value = value;
  trigger.innerHTML = `${label} <span class="select-chevron">⌄</span>`;
  menu.querySelectorAll('[role="option"]').forEach(option => {
    option.setAttribute("aria-selected", String(option.dataset.value === value));
  });
  menu.hidden = true;
  trigger.setAttribute("aria-expanded", "false");
  renderRaceGrid();
}

document.addEventListener("click", event => {
  const wrap = document.getElementById("calendar-sort-wrap");
  if (wrap && !wrap.contains(event.target)) {
    const menu = document.getElementById("calendar-sort-menu");
    const trigger = document.getElementById("calendar-sort-trigger");
    if (menu) menu.hidden = true;
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }
});

// 5. МОДАЛЬНОЕ ОКНО
// ============================================================
let modalCloseTimer = null;
let activeRaceTile = null;
let currentModalIndex = null;
let modalNavLock = false;
const modalAnimationDuration = 1350;

function setModalOrigin(tile) {
  const modal = document.getElementById("modal");
  const modalContent = modal?.querySelector(".modal-content");
  if (!modal || !modalContent || !tile) return;
  const from = tile.getBoundingClientRect();
  const to = modalContent.getBoundingClientRect();
  const fromX = from.left + from.width / 2;
  const fromY = from.top + from.height / 2;
  const toX = to.left + to.width / 2;
  const toY = to.top + to.height / 2;
  const originX = fromX - toX;
  const originY = fromY - toY;
  const originSX = Math.max(.08, from.width / Math.max(to.width, 1));
  const originSY = Math.max(.08, from.height / Math.max(to.height, 1));
  // Precalculate intermediate values in JS: this avoids unsupported CSS calc(length * number)
  // expressions that can make keyframe transforms jump on some browsers.
  modalContent.style.setProperty("--origin-x", `${originX}px`);
  modalContent.style.setProperty("--origin-y", `${originY}px`);
  modalContent.style.setProperty("--origin-x-82", `${originX * .82}px`);
  modalContent.style.setProperty("--origin-y-82", `${originY * .82}px`);
  modalContent.style.setProperty("--origin-x-52", `${originX * .52}px`);
  modalContent.style.setProperty("--origin-y-52", `${originY * .52}px`);
  modalContent.style.setProperty("--origin-x-20", `${originX * .2}px`);
  modalContent.style.setProperty("--origin-y-20", `${originY * .2}px`);
  modalContent.style.setProperty("--origin-sx", String(originSX));
  modalContent.style.setProperty("--origin-sy", String(originSY));
  modalContent.style.setProperty("--scale-x-18", String(originSX + (1 - originSX) * .18));
  modalContent.style.setProperty("--scale-y-18", String(originSY + (1 - originSY) * .18));
  modalContent.style.setProperty("--scale-x-52", String(originSX + (1 - originSX) * .52));
  modalContent.style.setProperty("--scale-y-52", String(originSY + (1 - originSY) * .52));
}

function fillModalBody(index) {
  const body = document.getElementById("modal-body");
  if (!body || !schedule[index]) return;
  body.innerHTML = buildModalBodyHtml(index);
  applyModalCircuitPhoto(index, body);
}

/** Фото трасс (те же, что в карточках модалки) — общие для карусели и модалки */
const CIRCUIT_PHOTO_URLS = {
  "Мельбурн": "https://media.formula1.com/image/upload/ar_16:9,c_fill,g_south/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/manual/Destination%20Guides/Images%20-%20Permission/Ok'd%20Australia/Melbourne%20-%20Melbourne's%20Sporting%20Precinct.webp",
  "Судзука": "https://media.formula1.com/image/upload/ar_16:9,c_fill/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/manual/Suzuka%20general%20view.webp",
  "Шанхай": "https://media.formula1.com/image/upload/ar_16:9,c_fill,g_south/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2024/F1_Grand_Prix_of_China___Practice__Sprint_Qualifying/2149223915.webp",
  "Майами": "https://media.formula1.com/image/upload/ar_16:9,c_fill/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2025/F1_Grand_Prix_of_Miami___Sprint__Qualifying/2213210704.webp",
  "Имола": "https://oversteer48.com/wp-content/uploads/2024/02/Imola-1.jpg",
  "Монте-Карло": "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000001/fom-website/2025/Monaco/GettyImages-2217000310.webp",
  "Монреаль": "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Canada/2278018163.webp",
  "Барселона": "https://media.formula1.com/image/upload/ar_16:9,c_fill,g_south/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/manual/Destination%20Guides/Images%20-%20Permission/Ok'd%20Spain/dcd1309my04.webp",
  "Шпильберг": "https://media.formula1.com/image/upload/ar_16:9,c_fill,g_south/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2025/F1_Grand_Prix_of_Austria/2222764590.webp",
  "Сильверстоун": "https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Great_Britain/2284745141.webp",
  "Хунгароринг": "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Hungary/2287714608.webp",
  "Спа": "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Belgium/2286754028.webp",
  "Зандворт": "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Netherlands/2291683428.webp",
  "Монца": "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Italy/2293801644.webp",
  "Мадринг": "https://www.thesun.co.uk/wp-content/uploads/2026/09/13-09-2026-1108115888.jpg?quality=80&strip=all&w=1024",
  "Баку": "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Azerbaijan.webp",
  "Сингапур": "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/races/2023/race-listing/Singapore.webp",
  "Остин": "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/USA.webp",
  "Сепанг": "https://www.motorsportweek.com/wp-content/uploads/2026/10/F1-Bahrain-GP-FP3.webp",
  "Мехико": "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Mexico.webp",
  "Сан-Паулу": "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Brazil.webp",
  "Лас-Вегас": "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Las%20Vegas.webp",
  "Лосаил": "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Qatar.webp",
  "Абу-Даби": "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Abu%20Dhabi.webp"
};

function getCircuitPhotoUrl(circuit) {
  return CIRCUIT_PHOTO_URLS[circuit] || "";
}

function applyPhotoToElement(el, circuit) {
  if (!el) return;
  const photoUrl = getCircuitPhotoUrl(circuit);
  if (photoUrl) {
    el.style.setProperty("--circuit-photo", `url("${photoUrl}")`);
    const preload = new Image();
    preload.onerror = () => el.style.setProperty("--circuit-photo", "none");
    preload.src = photoUrl;
  } else {
    el.style.setProperty("--circuit-photo", "none");
  }
}

function applyModalCircuitPhoto(index, targetEl) {
  const gp = schedule[index];
  if (!gp) return;
  const el = targetEl || document.getElementById("modal-body");
  applyPhotoToElement(el, gp.circuit);
}

function buildModalBodyHtml(index) {
  const gp = schedule[index];
  if (!gp) return "";
  const sortedSessions = [...gp.sessions].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });
  const sessionsHtml = sortedSessions.map(s => {
    let timeStr = "?";
    let isUnknown = true;
    if (s.date) {
      timeStr = formatDateTime(s.date, { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
      isUnknown = false;
    }
    const highlight = (s.type === "Гонка" || s.type === "Спринт") ? "highlight" : "";
    return `
      <div class="session-item ${highlight}">
        <span class="name">${s.type}</span>
        <span class="time ${isUnknown ? "unknown" : ""}">${timeStr}</span>
      </div>
    `;
  }).join("");
  return `
    <div class="race-stage-label">Этап ${index + 1}</div>
    ${trackMarkup(gp.trackClass, true)}
    <h2 class="modal-title">${flagMarkup(gp.country, "country-flag modal-flag")} ${gp.country} <br><span style="font-size:15px; color:#888;">${gp.circuit}</span></h2>
    <div class="session-list">${sessionsHtml}</div>
  `;
}

function updateModalNavButtons() {
  const prevBtn = document.getElementById("modal-prev");
  const nextBtn = document.getElementById("modal-next");
  if (!prevBtn || !nextBtn) return;
  if (currentModalIndex == null) {
    prevBtn.hidden = true;
    nextBtn.hidden = true;
    return;
  }
  prevBtn.hidden = false;
  nextBtn.hidden = false;
  prevBtn.disabled = currentModalIndex <= 0;
  nextBtn.disabled = currentModalIndex >= schedule.length - 1;
}

function updateHeroNavButtons() {
  const prevBtn = nextBox?.querySelector(".hero-nav-prev");
  const nextBtn = nextBox?.querySelector(".hero-nav-next");
  if (!prevBtn || !nextBtn) return;
  prevBtn.disabled = heroSlideIndex <= 0;
  nextBtn.disabled = heroSlideIndex >= heroSlidesCache.length - 1;
}

function navigateHero(delta) {
  const next = heroSlideIndex + delta;
  if (next < 0 || next >= heroSlidesCache.length) return;
  const btn = nextBox?.querySelector(delta < 0 ? ".hero-nav-prev" : ".hero-nav-next");
  if (btn) {
    btn.classList.remove("nav-flash");
    void btn.offsetWidth;
    btn.classList.add("nav-flash");
    setTimeout(() => btn.classList.remove("nav-flash"), 280);
  }
  setHeroSlide(next, { animate: true, direction: delta });
}

/** Сдвиг ленты: одна карточка выталкивает другую */
function switchModalWithSlide(nextIndex, direction) {
  const body = document.getElementById("modal-body");
  const slide = document.getElementById("modal-slide-panel");
  const track = document.getElementById("modal-track");
  if (!body || !slide || !track || !schedule[nextIndex] || modalNavLock) return;

  modalNavLock = true;
  track.classList.add("is-sliding");

  // direction > 0 (next): [current | next], едем влево на -50%
  // direction < 0 (prev): [prev | current], старт с -50%, едем вправо к 0
  if (direction > 0) {
    slide.innerHTML = buildModalBodyHtml(nextIndex);
    applyModalCircuitPhoto(nextIndex, slide);
    if (currentLanguage === "en") translateNode(slide);
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
    void track.offsetWidth;
    track.style.transition = "transform 0.34s cubic-bezier(0.22, 0.9, 0.28, 1)";
    track.style.transform = "translateX(-50%)";
  } else {
    // Временно: новый слева, текущий справа
    slide.innerHTML = body.innerHTML;
    slide.style.setProperty("--circuit-photo", body.style.getPropertyValue("--circuit-photo") || "none");
    body.innerHTML = buildModalBodyHtml(nextIndex);
    applyModalCircuitPhoto(nextIndex, body);
    if (currentLanguage === "en") translateNode(body);
    track.style.transition = "none";
    track.style.transform = "translateX(-50%)";
    void track.offsetWidth;
    track.style.transition = "transform 0.34s cubic-bezier(0.22, 0.9, 0.28, 1)";
    track.style.transform = "translateX(0)";
  }

  setTimeout(() => {
    currentModalIndex = nextIndex;
    activeRaceTile = document.querySelector(`#race-grid .race-tile[data-race-index="${nextIndex}"]`);
    fillModalBody(nextIndex);
    if (currentLanguage === "en") translateNode(body);
    updateModalNavButtons();
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
    slide.innerHTML = "";
    slide.style.removeProperty("--circuit-photo");
    track.classList.remove("is-sliding");
    modalNavLock = false;
  }, 360);
}

function flashNavButton(delta) {
  const btn = document.getElementById(delta < 0 ? "modal-prev" : "modal-next");
  if (!btn || btn.disabled) return;
  btn.classList.remove("nav-flash");
  void btn.offsetWidth;
  btn.classList.add("nav-flash");
  setTimeout(() => btn.classList.remove("nav-flash"), 280);
}

function openModal(index, options = {}) {
  if (modalCloseTimer) { clearTimeout(modalCloseTimer); modalCloseTimer = null; }
  const gp = schedule[index];
  const modal = document.getElementById("modal");
  const body = document.getElementById("modal-body");
  if (!gp || !modal || !body) return;

  const isSwitch = options.switch === true && modal.classList.contains("show");
  const direction = options.direction || 0;

  if (isSwitch) {
    if (modalNavLock) return;
    switchModalWithSlide(index, direction);
    return;
  }

  currentModalIndex = index;
  activeRaceTile = document.querySelector(`#race-grid .race-tile[data-race-index="${index}"]`);
  fillModalBody(index);
  updateModalNavButtons();

  const modalContent = modal.querySelector(".modal-content");
  const track = document.getElementById("modal-track");
  const slide = document.getElementById("modal-slide-panel");
  if (track) {
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
    track.classList.remove("is-sliding");
  }
  if (slide) {
    slide.innerHTML = "";
    slide.style.removeProperty("--circuit-photo");
  }

  modal.classList.remove("show", "closing");
  if (modalContent) {
    modalContent.style.transform = "";
    modalContent.style.opacity = "";
    modalContent.style.transition = "";
    modal.style.visibility = "hidden";
    modalContent.style.animation = "none";
    void modalContent.offsetWidth;
    setModalOrigin(activeRaceTile);
    modalContent.style.animation = "";
    void modalContent.offsetWidth;
    modal.style.visibility = "visible";
    modal.classList.add("show");
  } else {
    modal.style.visibility = "visible";
    modal.classList.add("show");
  }
}

function navigateModal(delta) {
  if (modalNavLock || currentModalIndex == null) return;
  const next = currentModalIndex + delta;
  if (next < 0 || next >= schedule.length) return;
  flashNavButton(delta);
  openModal(next, { switch: true, direction: delta });
}

function closeModal(event) {
  if (event && event.target && !(event.target.id === "modal" || event.target.classList.contains("close-btn"))) {
    return;
  }
  const modal = document.getElementById("modal");
  if (!modal || !modal.classList.contains("show") || modal.classList.contains("closing")) return;
  modal.classList.add("closing");
  modal.classList.remove("show");
  currentModalIndex = null;
  const prevBtn = document.getElementById("modal-prev");
  const nextBtn = document.getElementById("modal-next");
  if (prevBtn) prevBtn.hidden = true;
  if (nextBtn) nextBtn.hidden = true;
  modalCloseTimer = setTimeout(() => {
    modal.classList.remove("closing");
    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) modalContent.style.animation = "none";
    modal.style.visibility = "hidden";
    requestAnimationFrame(() => {
      if (modalContent) modalContent.style.animation = "";
      modal.style.visibility = "";
    });
    modalCloseTimer = null;
  }, 1310);
}

// Свайп внутри модалки: лента едет за пальцем, одна карточка выталкивает другую
(function initModalSwipe() {
  let startX = 0;
  let startY = 0;
  let tracking = false;
  let dragging = false;
  let track = null;
  let preparedDir = 0;

  function resetTrack() {
    if (!track) return;
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
    track.classList.remove("is-sliding");
    const slide = document.getElementById("modal-slide-panel");
    const body = document.getElementById("modal-body");
    if (slide) {
      slide.innerHTML = "";
      slide.style.removeProperty("--circuit-photo");
    }
    // если во время жеста меняли body для prev — восстановим из currentModalIndex
    if (preparedDir < 0 && body && currentModalIndex != null) {
      fillModalBody(currentModalIndex);
      if (currentLanguage === "en") translateNode(body);
    }
    preparedDir = 0;
  }

  function prepareSlide(direction) {
    const body = document.getElementById("modal-body");
    const slide = document.getElementById("modal-slide-panel");
    if (!body || !slide || currentModalIndex == null) return false;
    const targetIndex = currentModalIndex + direction;
    if (targetIndex < 0 || targetIndex >= schedule.length) return false;

    if (preparedDir === direction) return true;
    // сброс предыдущей подготовки
    if (preparedDir !== 0) resetTrack();

    preparedDir = direction;
    track.classList.add("is-sliding");

    if (direction > 0) {
      slide.innerHTML = buildModalBodyHtml(targetIndex);
      applyModalCircuitPhoto(targetIndex, slide);
      if (currentLanguage === "en") translateNode(slide);
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
    } else {
      slide.innerHTML = body.innerHTML;
      slide.style.setProperty("--circuit-photo", body.style.getPropertyValue("--circuit-photo") || "none");
      body.innerHTML = buildModalBodyHtml(targetIndex);
      applyModalCircuitPhoto(targetIndex, body);
      if (currentLanguage === "en") translateNode(body);
      track.style.transition = "none";
      track.style.transform = "translateX(-50%)";
    }
    return true;
  }

  document.addEventListener("touchstart", (e) => {
    const modal = document.getElementById("modal");
    if (!modal?.classList.contains("show") || modalNavLock || e.touches.length !== 1) {
      tracking = false;
      return;
    }
    if (e.target.closest(".close-btn, .edge-nav")) {
      tracking = false;
      return;
    }
    tracking = true;
    dragging = false;
    preparedDir = 0;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    track = document.getElementById("modal-track");
  }, { passive: true });

  document.addEventListener("touchmove", (e) => {
    if (!tracking || !track || e.touches.length !== 1 || currentModalIndex == null) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    if (!dragging) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 12) {
        tracking = false;
        resetTrack();
        return;
      }
      if (Math.abs(dx) > 10) dragging = true;
    }
    if (!dragging) return;

    const direction = dx < 0 ? 1 : -1;
    if (!prepareSlide(direction)) {
      // край — лёгкое сопротивление
      const resist = dx * 0.2;
      track.style.transition = "none";
      track.style.transform = direction > 0
        ? `translateX(${resist}px)`
        : `translateX(calc(-50% + ${resist}px))`;
      return;
    }

    const width = track.parentElement?.offsetWidth || window.innerWidth || 1;
    const progress = Math.min(1, Math.abs(dx) / width);
    track.style.transition = "none";
    if (direction > 0) {
      track.style.transform = `translateX(${-progress * 50}%)`;
    } else {
      track.style.transform = `translateX(${-50 + progress * 50}%)`;
    }
  }, { passive: true });

  const endGesture = (e) => {
    if (!tracking) return;
    tracking = false;
    const dx = (e.changedTouches?.[0]?.clientX ?? startX) - startX;
    const width = track?.parentElement?.offsetWidth || window.innerWidth || 1;
    const progress = Math.abs(dx) / width;
    const direction = dx < 0 ? 1 : -1;
    const targetIndex = currentModalIndex + direction;
    const canSwitch = dragging && progress > 0.22 && targetIndex >= 0 && targetIndex < schedule.length && preparedDir === direction;

    if (!track) return;

    if (canSwitch) {
      modalNavLock = true;
      track.style.transition = "transform 0.28s cubic-bezier(0.22, 0.9, 0.28, 1)";
      track.style.transform = direction > 0 ? "translateX(-50%)" : "translateX(0)";
      setTimeout(() => {
        currentModalIndex = targetIndex;
        activeRaceTile = document.querySelector(`#race-grid .race-tile[data-race-index="${targetIndex}"]`);
        fillModalBody(targetIndex);
        if (currentLanguage === "en") {
          const body = document.getElementById("modal-body");
          if (body) translateNode(body);
        }
        updateModalNavButtons();
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        const slide = document.getElementById("modal-slide-panel");
        if (slide) {
          slide.innerHTML = "";
          slide.style.removeProperty("--circuit-photo");
        }
        track.classList.remove("is-sliding");
        preparedDir = 0;
        modalNavLock = false;
      }, 300);
    } else {
      track.style.transition = "transform 0.28s cubic-bezier(0.22, 0.9, 0.28, 1)";
      if (preparedDir < 0) {
        track.style.transform = "translateX(-50%)";
        setTimeout(() => {
          resetTrack();
        }, 280);
      } else {
        track.style.transform = "translateX(0)";
        setTimeout(() => {
          resetTrack();
        }, 280);
      }
    }
  };

  document.addEventListener("touchend", endGesture, { passive: true });
  document.addEventListener("touchcancel", endGesture, { passive: true });
})();

// ============================================================
// 6. ОТРИСОВКА ПИЛОТОВ
// ============================================================
// История результатов загружается по запросу отдельно для каждого пилота.
const F1_API_BASE = "https://api.jolpi.ca/ergast/f1";

const driverApiIds = {
  "Андреа Кими Антонелли": "antonelli", "Джордж Расселл": "russell",
  "Льюис Хэмилтон": "hamilton", "Макс Ферстаппен": "max_verstappen",
  "Шарль Леклер": "leclerc", "Ландо Норрис": "norris",
  "Оскар Пиастри": "piastri", "Исак Хаджар": "hadjar",
  "Лиам Лоусон": "lawson", "Пьер Гасли": "gasly",
  "Арвид Линдблад": "lindblad", "Франко Колапинто": "colapinto",
  "Оливер Берман": "bearman", "Нико Хюлькенберг": "hulkenberg",
  "Габриэль Бортолето": "bortoleto", "Эстебан Окон": "ocon",
  "Фернандо Алонсо": "alonso", "Карлос Сайнс-мл.": "sainz",
  "Алекс Албон": "albon", "Юки Цунода": "tsunoda",
  "Лэнс Стролл": "stroll", "Валттери Боттас": "bottas",
  "Серхио Перес": "perez"
};

async function loadDriverResults(apiId) {
  const response = await fetch(`${F1_API_BASE}/2026/drivers/${encodeURIComponent(apiId)}/results.json?limit=100`);
  if (!response.ok) throw new Error(`API вернул ${response.status}`);
  const data = await response.json();
  const races = data?.MRData?.RaceTable?.Races || [];
  return races.map(race => {
    const result = race.Results?.[0] || {};
    return {
      round: Number(race.round),
      raceName: race.raceName || race.Circuit?.circuitName || `Этап ${race.round}`,
      date: race.date || "",
      position: result.position || result.positionText || "—",
      status: result.status || "",
      points: result.points ?? "0"
    };
  }).sort((a, b) => b.round - a.round);
}

function teamLogoMarkup(teamName) {
  // Логотипы загружаются из локальной папки Logo внутри сайта.
  const logoFiles = {
    "Mercedes": "Mercedes-AMG-Petronas-Formula-One-Team-Logo-Old.png",
    "Red Bull Racing": "new-Red-Bull-logo-png-vertical-large-size.png",
    "Ferrari": "Ferrari-Scuderia-Logo.png",
    "McLaren": "McLaren_Racing_logo.png",
    "Alpine": "Alpine_logo.png",
    "Haas": "Haas-Symbol.png",
    "Audi": "Audi-Revolut-F1-Logo.png",
    "Aston Martin": "aston-martin-logo-png_seeklogo-12499.png",
    "Williams": "Williams_F1_logo_2026_(Corrigindo).png",
    "Racing Bulls": "600px-RB_allmode.png",
    "Cadillac": "Cadillac_Formula_1_Team_logo.png",
  };
  const file = logoFiles[teamName];
  if (!file) return "";
  const src = `Logo/${file}`;
  return `<img src="${src}" alt="${teamName}" loading="lazy" onerror="this.style.display='none'">`;
}

// Официальные портреты F1 2026; фотографии на трассе используются как большие боковые кадры.
const driverVisuals = {
  // Портреты берутся с официального CDN Formula1.com; идентификаторы соответствуют карточкам пилотов.
  "Андреа Кими Антонелли": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/mercedes/andant01/2026mercedesandant01right.webp" },
  "Джордж Расселл": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/mercedes/georus01/2026mercedesgeorus01right.webp" },
  "Льюис Хэмилтон": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/ferrari/lewham01/2026ferrarilewham01right.webp" },
  "Макс Ферстаппен": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/redbullracing/maxver01/2026redbullracingmaxver01right.webp" },
  "Шарль Леклер": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/ferrari/chalec01/2026ferrarichalec01right.webp" },
  "Ландо Норрис": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/mclaren/lannor01/2026mclarenlannor01right.webp" },
  "Оскар Пиастри": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/mclaren/oscpia01/2026mclarenoscpia01right.webp" },
  "Исак Хаджар": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/redbullracing/isahad01/2026redbullracingisahad01right.webp" },
  "Лиам Лоусон": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/racingbulls/lialaw01/2026racingbullslialaw01right.webp" },
  "Арвид Линдблад": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/racingbulls/arvlin01/2026racingbullsarvlin01right.webp" },
  "Пьер Гасли": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/alpine/piegas01/2026alpinepiegas01right.webp" },
  "Франко Колапинто": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/alpine/fracol01/2026alpinefracol01right.webp" },
  "Оливер Берман": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/haas/olibea01/2026haasolibea01right.webp" },
  "Нико Хюлькенберг": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/audi/nichul01/2026audinichul01right.webp" },
  "Габриэль Бортолето": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/audi/gabbor01/2026audigabbor01right.webp" },
  "Эстебан Окон": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/haas/estoco01/2026haasestoco01right.webp" },
  "Фернандо Алонсо": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/astonmartin/feralo01/2026astonmartinferalo01right.webp" },
  "Карлос Сайнс-мл.": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/williams/carsai01/2026williamscarsai01right.webp" },
  "Алекс Албон": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/williams/alealb01/2026williamsalealb01right.webp" },
  "Юки Цунода": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/red_bull_racing/yuktsun01/2026red_bull_racingyuktsun01right.webp" },
  "Лэнс Стролл": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/astonmartin/lanstr01/2026astonmartinlanstr01right.webp" },
  "Валттери Боттас": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/cadillac/valbot01/2026cadillacvalbot01right.webp" },
  "Серхио Перес": { portrait: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/cadillac/serper01/2026cadillacserper01right.webp" }
};
const defaultActionPhoto = "https://media.formula1.com/image/upload/t_16by9South/c_fit,w_1584/q_auto/v1740000001/trackside-images/2025/F1_Grand_Prix_of_United_States/2242064336.webp";

// Локальные SVG-заглушки: если внешний хост недоступен, боковая панель не остаётся пустой.
function driverFallbackImage(driver, mode = "portrait") {
  const team = (driverTeams[driver.name] || {}).name || "FORMULA 1";
  const color = (driverTeams[driver.name] || {}).color || "#00d2be";
  const safe = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const title = safe(driver.name.toUpperCase());
  const subtitle = safe(team.toUpperCase());
  const art = mode === "portrait"
    ? `<path d="M220 620 Q235 420 330 390 L330 330 Q280 300 290 210 Q300 90 400 90 Q500 90 510 210 Q520 300 470 330 L470 390 Q565 420 580 620Z" fill="#17191d" stroke="${color}" stroke-width="8"/><circle cx="400" cy="220" r="92" fill="#b9c0c5" opacity=".2"/>`
    : `<path d="M0 460 L210 300 L390 365 L620 170 L800 250 L800 620 L0 620Z" fill="${color}" opacity=".24"/><path d="M0 520 L280 390 L440 430 L800 290" stroke="${color}" stroke-width="7" fill="none" opacity=".7"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 700"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#092a2a"/><stop offset="1" stop-color="#111318"/></linearGradient><pattern id="p" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.5" fill="${color}" opacity=".24"/></pattern></defs><rect width="800" height="700" fill="url(#g)"/><rect width="800" height="700" fill="url(#p)"/>${art}<text x="42" y="82" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="${color}" letter-spacing="4">${subtitle}</text><text x="42" y="630" font-family="Arial,sans-serif" font-size="38" font-weight="900" fill="#fff">${title}</text><text x="42" y="674" font-family="Arial,sans-serif" font-size="18" fill="#d8e1e1">PHOTO UNAVAILABLE</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function selectDriverVisual(index) {
  const driver = drivers[index];
  if (!driver) return;
  const visual = driverVisuals[driver.name] || {};
  const portrait = document.getElementById("driver-portrait");
  // Сбрасываем старые обработчики и назначаем отдельный резерв для каждого изображения.
  portrait.onerror = () => { portrait.onerror = null; portrait.src = driverFallbackImage(driver, "portrait"); };
  portrait.src = visual.portrait || driverFallbackImage(driver, "portrait");
  document.getElementById("driver-portrait-caption").textContent = driver.name;
  document.querySelectorAll(".driver-card").forEach((card, i) => {
    card.classList.toggle("visual-selected", i === index);
    const results = card.querySelector(".driver-results-mobile");
    if (results && i === index) {
      const imageUrl = visual.portrait || driverFallbackImage(driver, "portrait");
      results.style.backgroundImage = `linear-gradient(180deg, rgba(15,15,18,.28) 0%, rgba(15,15,18,.48) 42%, rgba(15,15,18,.94) 100%), url("${imageUrl}")`;
    }
  });
}

function scrollDriverRowToTop(index) {
  // Автопрокрутка нужна только на телефоне: на ПК сохраняем обычное поведение.
  if (!window.matchMedia("(max-width: 760px)").matches) return;
  const card = document.querySelectorAll(".driver-card")[index];
  const row = card && card.querySelector(".driver-row");
  if (!row) return;
  // Дожидаемся, пока выпадающий блок появится в потоке, и только затем
  // выравниваем именно строку пилота по верхнему краю окна.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const top = window.scrollY + row.getBoundingClientRect().top;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  });
}

function renderStandings() {
  const box = document.getElementById("standings-list");
  box.innerHTML = drivers.map((driver, index) => `
    <article class="driver-card">
      <button class="driver-row" type="button" aria-expanded="false"
        aria-controls="driver-results-${index}" onclick="selectDriverVisual(${index}); toggleDriverResults(${index}); scrollDriverRowToTop(${index})">
        <span class="driver-pos">${driver.pos}</span>
        <span class="driver-name"><span class="driver-identity">${driver.name}<span class="driver-number">${driver.number}</span></span><span class="driver-team">${flagMarkup(driver.country, "country-flag driver-flag")}<span>${driver.country}</span></span></span>
        <span class="driver-team-badge" title="${(driverTeams[driver.name] || {}).name || "Команда"}">
          <span class="team-logo" style="--team-color:${(driverTeams[driver.name] || {}).color || "#888"}">${teamLogoMarkup((driverTeams[driver.name] || {}).name)}</span>
          <span class="team-name">${(driverTeams[driver.name] || {}).name || "Команда"}</span>
        </span>
        <span class="driver-points">${driver.points}<small>очков</small></span>
      </button>
      <div class="driver-results-mobile" id="driver-results-${index}" hidden></div>
    </article>
  `).join("");
  selectDriverVisual(0);
}

const driverResultsCache = new Map();

async function toggleDriverResults(index) {
  const cards = document.querySelectorAll(".driver-card");
  const card = cards[index];
  const display = document.getElementById("driver-results-display");
  if (!card || !display) return;
  const button = card.querySelector(".driver-row");
  const mobileResults = card.querySelector(".driver-results-mobile");
  const isMobile = window.matchMedia("(max-width: 760px)").matches;
  const isAlreadyOpen = card.classList.contains("expanded");

  cards.forEach((otherCard) => {
    otherCard.classList.remove("expanded");
    otherCard.querySelector(".driver-row").setAttribute("aria-expanded", "false");
    const localResults = otherCard.querySelector(".driver-results-mobile");
    if (localResults) { localResults.hidden = true; localResults.innerHTML = ""; }
  });
  if (isMobile) display.hidden = true;
  else display.hidden = false;

  if (isAlreadyOpen) {
    display.innerHTML = '<p class="results-empty">Выбери пилота, чтобы посмотреть результаты его гонок.</p>';
    display.dataset.driverIndex = "";
    return;
  }

  card.classList.add("expanded");
  button.setAttribute("aria-expanded", "true");
  const target = isMobile ? mobileResults : display;
  if (isMobile && mobileResults) mobileResults.hidden = false;
  target.dataset.driverIndex = String(index);
  const loadingHtml = '<h3 class="driver-results-title">Результаты гонок — ' + escapeHtml(drivers[index].name) + '</h3><p class="results-loading">Загружаю результаты сезона…</p>';
  target.innerHTML = loadingHtml;
  if (!isMobile) display.dataset.driverIndex = String(index);
  if (driverResultsCache.has(index)) {
    target.innerHTML = driverResultsCache.get(index);
    return;
  }

  try {
    const apiId = driverApiIds[drivers[index].name];
    if (!apiId) throw new Error("Не найден ID пилота в API");
    const races = await loadDriverResults(apiId);
    let html;
    if (!races.length) {
      html = '<p class="results-empty">Результаты этого пилота пока недоступны в источнике данных.</p>';
    } else {
      html = `
        <h3 class="driver-results-title">Результаты гонок — ${escapeHtml(drivers[index].name)}</h3>
        <div class="results-heading"><span>Гран-при</span><span>Финиш</span></div>
        ${races.map(race => `
          <div class="driver-result-item">
            <span class="result-race"><strong>${escapeHtml(race.raceName)}</strong>
              <small>${race.date ? formatDateTime(`${race.date}T12:00:00`, { day: "numeric", month: "short" }) : `Этап ${race.round}`}</small>
            </span>
            <span class="result-position ${race.position === "1" ? "position-winner" : race.position === "2" ? "position-silver" : race.position === "3" ? "position-bronze" : ""}">
              ${race.status === "Finished" || race.position !== "R" ? `P${escapeHtml(race.position)}` : "Сход"}
            </span>
          </div>
        `).join("")}
        <p class="results-source">Источник: Jolpica F1 API · сезон 2026</p>`;
    }
    driverResultsCache.set(index, html);
    if (target.dataset.driverIndex === String(index)) target.innerHTML = html;
  } catch (error) {
    if (target.dataset.driverIndex === String(index)) {
      target.innerHTML = `<h3 class="driver-results-title">Результаты гонок — ${escapeHtml(drivers[index].name)}</h3><p class="results-empty">Не удалось загрузить результаты. Проверь подключение к интернету и попробуй ещё раз.</p><button class="retry-results" type="button" onclick="retryDriverResults(${index})">Повторить</button>`;
    }
  }
}

function retryDriverResults(index) {
  driverResultsCache.delete(index);
  const display = document.getElementById("driver-results-display");
  if (display) display.dataset.driverIndex = "";
  toggleDriverResults(index);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

// ============================================================
// 7. ЗАПУСК
// ============================================================
function formatCountdown(diff) {
  if (diff <= 0) {
    return currentLanguage === "en" ? "Race started!" : "Началось!";
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff % 86400000 / 3600000);
  const m = Math.floor(diff % 3600000 / 60000);
  if (currentLanguage === "en") {
    return `Race starts in: ${d} d ${h} h ${m} min`;
  }
  return `До старта: ${d} д ${h} ч ${m} мин`;
}
/** Обновляет контент активного слайда карусели под текущий язык. */
function refreshNextRaceLocale() {
  if (!nextBox || !heroSlidesCache.length) return;
  const base = nextBox.querySelector(".hero-base");
  const slide = heroSlidesCache[heroSlideIndex];
  if (base && slide) {
    fillHeroLayer(base, slide);
    const cd = base.querySelector(".countdown");
    if (cd) cd.id = "countdown";
  }
  updateHeroCountdown();
}

renderSchedule();

// ============================================================
// 8. КНОПКА "НАВЕРХ"
// ============================================================
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;
  
  if (window.scrollY > 300) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
});

// ============================================================
// 9. Мгновенное переключение русского / английского языка
// ============================================================
const languagePairs = {
  "Формула-1": "Formula 1",
  "Календарь": "Calendar", "Пилоты": "Drivers", "Загрузка...": "Loading...",
  "Сортировка": "Sort by", "По календарю": "Calendar order", "Снизу вверх": "Reverse order",
  "Длина трассы: от короткой": "Track length: shortest first", "Длина трассы: от длинной": "Track length: longest first",
  "По новизне: сначала новые": "By debut: newest first", "По годам: сначала старые": "By debut: oldest first",
  "Личный зачёт": "Driver standings", "Выбери пилота": "Select a driver",
  "Выбери пилота, чтобы посмотреть результаты его гонок.": "Select a driver to view their race results.",
  "Загрузка данных...": "Loading data...", "Календарь завершен.": "Season calendar complete.",
  "Практика 1": "Practice 1", "Практика 2": "Practice 2", "Практика 3": "Practice 3",
  "Квалификация": "Qualifying", "Спринт-квалификация": "Sprint Qualifying", "Спринт": "Sprint", "Гонка": "Race",
  "Этап": "Round", "Контур трассы Сепанг": "Sepang circuit outline", "Конфигурация трассы Мадринг": "Madring circuit layout", "Конфигурация трассы": "Circuit layout",
  "До старта:": "Race starts in:", "Началось!": "Race started!",
  "Этап завершён": "Stage completed", "Этап завершен": "Stage completed",
  "Карусель этапов": "Race stages carousel", "Слайды карусели": "Carousel slides",
  "Перейти к карточке следующей гонки": "Go to next race card",
  "Предыдущая трасса": "Previous circuit", "Следующая трасса": "Next circuit",
  "Команда": "Team", "очков": "pts", "Результаты гонок — ": "Race results — ",
  "Гран-при": "Grand Prix", "Финиш": "Finish", "Сход": "Retired", "Источник:": "Source:",
  "Не удалось загрузить результаты. Проверь подключение к интернету и попробуй ещё раз.": "Could not load results. Check your internet connection and try again.",
  "Повторить": "Retry", "Результаты этого пилота пока недоступны в источнике данных.": "Race results for this driver are not currently available from the data source.",
  "Бахрейн в Малайзии": "Malaysia", "Австралия": "Australia", "Китай": "China", "Япония": "Japan", "США": "United States", "Канада": "Canada", "Монако": "Monaco", "Испания": "Spain", "Австрия": "Austria", "Великобритания": "United Kingdom", "Бельгия": "Belgium", "Венгрия": "Hungary", "Нидерланды": "Netherlands", "Италия": "Italy", "Азербайджан": "Azerbaijan", "Сингапур": "Singapore", "Мексика": "Mexico", "Бразилия": "Brazil", "Катар": "Qatar", "ОАЭ": "UAE", "Франция": "France", "Новая Зеландия": "New Zealand", "Аргентина": "Argentina", "Германия": "Germany", "Таиланд": "Thailand", "Финляндия": "Finland", "Малайзия": "Malaysia",
  "Мельбурн": "Melbourne", "Шанхай": "Shanghai", "Судзука": "Suzuka", "Майами": "Miami", "Монреаль": "Montreal", "Монте-Карло": "Monte Carlo", "Барселона": "Barcelona", "Шпильберг": "Spielberg", "Сильверстоун": "Silverstone", "Спа": "Spa-Francorchamps", "Хунгароринг": "Hungaroring", "Зандворт": "Zandvoort", "Монца": "Monza", "Мадринг": "Madring", "Баку": "Baku", "Сепанг": "Sepang", "Мехико": "Mexico City", "Сан-Паулу": "São Paulo", "Лас-Вегас": "Las Vegas", "Лосаил": "Lusail", "Абу-Даби": "Abu Dhabi", "Остин": "Austin", "Сингапур": "Singapore",
  "Андреа Кими Антонелли": "Andrea Kimi Antonelli", "Джордж Расселл": "George Russell", "Льюис Хэмилтон": "Lewis Hamilton", "Макс Ферстаппен": "Max Verstappen", "Шарль Леклер": "Charles Leclerc", "Ландо Норрис": "Lando Norris", "Оскар Пиастри": "Oscar Piastri", "Исак Хаджар": "Isack Hadjar", "Лиам Лоусон": "Liam Lawson", "Пьер Гасли": "Pierre Gasly", "Арвид Линдблад": "Arvid Lindblad", "Франко Колапинто": "Franco Colapinto", "Оливер Берман": "Oliver Bearman", "Нико Хюлькенберг": "Nico Hulkenberg", "Габриэль Бортолето": "Gabriel Bortoleto", "Эстебан Окон": "Esteban Ocon", "Фернандо Алонсо": "Fernando Alonso", "Карлос Сайнс-мл.": "Carlos Sainz Jr.", "Алекс Албон": "Alex Albon", "Лэнс Стролл": "Lance Stroll", "Валттери Боттас": "Valtteri Bottas", "Серхио Перес": "Sergio Perez"
};
const sortedLanguagePairs = Object.entries(languagePairs).sort((a, b) => b[0].length - a[0].length);
const sortedReverseLanguagePairs = [...sortedLanguagePairs].sort((a, b) => b[1].length - a[1].length);
const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();
let applyingLanguage = false;
function translateString(value, toEnglish) {
  let result = value;
  const pairs = toEnglish ? sortedLanguagePairs : sortedReverseLanguagePairs;
  for (const [ru, en] of pairs) result = result.split(toEnglish ? ru : en).join(toEnglish ? en : ru);
  return result;
}
function translateNode(node) {
  if (!node) return;
  if (node.nodeType === Node.TEXT_NODE) {
    if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
    const original = originalTextNodes.get(node);
    const next = currentLanguage === "en" ? translateString(original, true) : original;
    if (node.nodeValue !== next) node.nodeValue = next;
    return;
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    for (const attr of ["title", "aria-label", "alt"]) {
      if (!node.hasAttribute(attr)) continue;
      let values = originalAttributes.get(node);
      if (!values) { values = {}; originalAttributes.set(node, values); }
      if (!(attr in values)) values[attr] = node.getAttribute(attr);
      const next = currentLanguage === "en" ? translateString(values[attr], true) : values[attr];
      if (node.getAttribute(attr) !== next) node.setAttribute(attr, next);
    }
    [...node.childNodes].forEach(translateNode);
  }
}
function applyLanguage() {
  applyingLanguage = true;
  languageObserver.disconnect();
  document.documentElement.lang = currentLanguage;
  document.title = currentLanguage === "en" ? "Formula 1 2026" : "Формула-1 2026";
  translateNode(document.body);
  const button = document.getElementById("language-toggle");
  if (button) {
    button.textContent = currentLanguage === "ru" ? "EN" : "RU";
    button.setAttribute("aria-label", currentLanguage === "ru" ? "Switch to English" : "Переключить на русский");
    button.title = currentLanguage === "ru" ? "Switch to English" : "Переключить на русский";
  }
  // Дата и таймер следующей гонки собираются динамически — обновляем под текущий язык
  refreshNextRaceLocale();
  applyingLanguage = false;
  languageObserver.observe(document.body, { subtree: true, childList: true, characterData: true });
}
function toggleLanguage() {
  if (applyingLanguage) return;
  currentLanguage = currentLanguage === "ru" ? "en" : "ru";
  applyLanguage();
}
const languageObserver = new MutationObserver(records => {
  if (applyingLanguage || currentLanguage !== "en") return;
  applyingLanguage = true;
  records.forEach(record => {
    if (record.type === "characterData") translateNode(record.target);
    record.addedNodes?.forEach(node => translateNode(node));
  });
  applyingLanguage = false;
});
languageObserver.observe(document.body, { subtree: true, childList: true, characterData: true });
