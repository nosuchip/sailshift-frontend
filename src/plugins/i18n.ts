import Vue from "vue";
import VueI18n from "vue-i18n";

const flagRussia = require("../assets/img/iconfinder_flag-russia2x_748044.png");
const flagEngland = require("../assets/img/iconfinder_flag-united-kingdom_748024.png");

Vue.use(VueI18n);

const messages = {
  "en": {
    "Application title": "Tests"
  },
  "ru": {
    "Add new answer(s)": "Добавить ответ(ы)",
    "Add new variant(s)": "Добавить ответ(ы)",
    "Add question": "Добавить вопрос",
    "Add select(s)": "Добавить поля выбора",
    "Additional conditions": "Дополнительные условия",
    "Admin": "Управление",
    "Answer": "Ответ",
    "Application title": "Тесты ЦОДИВ",
    "At least one answer must be selected": "Как минимум один ответ должен быть выбран",
    "At least one varian in each answer must be selected": "Как минимум один ответ в каждом поле должен быть выбран",
    "Available tests": "Доступные тесты",
    "Cancel": "Отмена",
    "Cannnot save test": "Невозможно сохранить тест",
    "Check": "Проверить",
    "Choose a test": "Выберите тест",
    "Choose question to start from": "Выберите вопрос с которого начать",
    "Choose test to start": "Выберите тест",
    "Choose training settings": "Выберите настройки для примеров",
    "Copy variants from previous": "Скопировать ответы из предыдущего поля",
    "Correct answer must be provided": "Должен быть задан правильный ответ",
    "Correct answer to question (case insensitive)": "Правильный ответ на вопрос (регистр неважен)",
    "Correct answers": "Правильно",
    "Disabled": "Недоступно",
    "Division operation return whole number": "Результат деление - целое число",
    "Edit question": "Редактировать вопрос",
    "Edit test": "Редактировать тест",
    "Example how this question looks finally": "Пример того, как вопрос будет выглядеть",
    "Excercise ID": "Идентификатор упражнения",
    "Go home": "На главную страницу",
    "Home": "Домой",
    "Incorrect answers": "Неправильно",
    "Input answer": "Введите ответ",
    "Leave as is if you don't know what is it": "Оставьте как есть если не знаете что это такое",
    "Let's go!": "Вперёд!",
    "Math excercise": "Математические задачи",
    "Math training": "Математическая тренировка",
    "Maximum value": "Наибольше число",
    "Minimum value": "Наименьшее число",
    "Minus operation greater then zero": "Результат вычитания больше нуля",
    "Multiplication operation result not greater then (zero - unlimited)": "Умножение не даст результат больше чем ... (ноль - без ограничений)",
    "New question": "Новый вопрос",
    "New test": "Новый тест",
    "Number bounds": "Максимальное/минимальное числа",
    "Number of open braces in template must match number of close braces": "Число открывающихся и закрывающихся фигурных задающих поля выбора скобок долдно быть одинаковым",
    "Operation count per expression": "Количество операций в примере",
    "Operations to test": "Какие операции использовать",
    "Password": "Пароль",
    "Pick": "Выбрать",
    "Please enter valid number": "Введите число",
    "Points": "Оценка",
    "Previous question": "Предыдущий вопрос",
    "Question description HTML or text": "Описание вопроса (HTML или текст)",
    "Question ID mask": "Маска ID вопросов",
    "Question ID": "ID вопроса",
    "Question order": "Номер вопроса",
    "Question score": "Оценка",
    "Question subtext": "Дополнительный текст",
    "Question text": "Текст",
    "Question title": "Заглавие вопроса",
    "Question type": "Тип вопроса",
    "Question": "Вопрос",
    "Questions order step": "Порядок вопроса",
    "Questions": "Вопросы",
    "Result": "Результат",
    "Run": "Запуск",
    "Save": "Сохранить",
    "Select answer": "Выберите ответ",
    "Skip question": "Пропустить вопрос",
    "Solve expression": "Решите пример",
    "Start test from the first question": "Начать тест сначала",
    "Template must be provided": "Шаблон должен быть задан",
    "Template; placeholders enclosed in curly braces: `{some word}`": "Шаблон; верные ответы заключены в фигурные скобки",
    "Test name required": "Требуется название теста",
    "Test name": "Название теста",
    "Test results": "Результаты теста",
    "Test saved": "Тест сохранён",
    "Test subject": "Тест",
    "Tests": "Тесты",
    "This field required": "Это обязтельное поле",
    "Total result greater then zero": "Общий результат больше нуля",
    "Total result": "Общий результат",
    "Total score": "Счёт",
    "Trash words, it is incorrect answers": "Лишние варианты ответа",
    "Username": "Имя пользователя",
    "Add answer(s) from text lines": "Добавить ответы из набора строк",
    "Add select field(s) from text lines": "Добавить поля выбора из набора строк",
    "Input answers (one per line), prefix correct with '+'": "Введите ответы по одному на строку. Верный ответ префиксуется знаком '+'",
    "Input answers fields (one per line)": "Укажите название полей выбора по одному на строку",
    "Create": "Добавить"
  }
};

export const locales = [{
  locale: "ru",
  icon: flagRussia,
  title: "Russian"
}, {
  locale: "en",
  icon: flagEngland,
  title: "English"
}];

export default new VueI18n({
  locale: "ru",
  fallbackLocale: "en",
  messages
});
