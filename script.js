// Pobieramy referencje do elementów DOM raz — zamiast wywoływać getElementById za każdym razem
// Dzięki temu kod jest czytelniejszy i minimalizujemy koszty poszukiwania elementów w DOM.
const num1El = document.getElementById("num1");
const num2El = document.getElementById("num2");
const btn = document.getElementById("btn");
const wynikEl = document.getElementById("wynik");

/*
  Funkcja pomocnicza: sanitizeAndParse
  - przyjmuje element input (HTMLInputElement)
  - pobiera wartość, obcina białe znaki, zamienia przecinek na kropkę (dla polskich użytkowników)
  - konwertuje do Number za pomocą Number(...), co wymusza bardziej restrykcyjne sprawdzenie
    (Number("12abc") => NaN, podczas gdy parseFloat("12abc") => 12).
  - zwraca liczbę (Number) albo NaN jeśli wartość nie jest poprawną liczbą
*/
function sanitizeAndParse(inputEl) {
  // pobieramy wartość jako string
  const raw = inputEl.value;

  // trim() usuwa białe znaki z początku i końca
  const trimmed = raw.trim();

  // Zamiana przecinka na kropkę — przydatne gdy użytkownik wpisze "1,23"
  // replace(',', '.') zmienia tylko pierwsze wystąpienie; można użyć regex /,/g dla wszystkich
  const normalized = trimmed.replace(',', '.');

  // Number(...) konwertuje cały string na liczbę lub zwraca NaN jeśli string nie jest poprawny
  const value = Number(normalized);

  return value; // może być liczbą (np. 3.5) albo NaN
}

/*
  Główna, nazwana funkcja obsługująca kliknięcie przycisku.
  Użycie nazwy funkcji pozwala:
  - łatwiej odczytywać stack trace w błędach,
  - móc ją (ewentualnie) reużywać w innych miejscach (np. wywołać z klawiatury),
  - terningować testy jednostkowe (można testować funkcję bez symulowania kliknięcia).
*/
function policzSume(event) {
  // event jest opcjonalny — kiedy funkcja przypięta jako handler zostanie wywołana,
  // przeglądarka przekaże obiekt zdarzenia. Nie jest on wymagany do samego obliczenia.
  // Można go użyć np. do e.preventDefault() gdyby to był submit formularza.

  // Pobieramy liczby przez helper
  const a = sanitizeAndParse(num1El);
  const b = sanitizeAndParse(num2El);

  // Walidacja: sprawdzamy, czy którakolwiek z wartości jest NaN (Not a Number)
  // Number.isNaN jest preferowane zamiast globalnego isNaN, bo działa bardziej przewidywalnie:
  // Number.isNaN("abc") === false ale Number("abc") === NaN, a Number.isNaN(Number("abc")) === true
  if (Number.isNaN(a) || Number.isNaN(b)) {
    // Jeśli niepoprawne dane — wyświetlamy komunikat i kończymy działanie funkcji.
    // textContent jest szybsze i bezpieczniejsze niż innerHTML, bo nie parsuje HTML.
    wynikEl.textContent = "Podaj dwie poprawne liczby";
    return; // kończymy funkcję, nie wykonujemy dodawania
  }

  // Teraz a i b są poprawnymi liczbami (typu number). Operator + wykona dodawanie arytmetyczne.
  const suma = a + b;

  // Wyświetlamy wynik: automatycznie zostanie przekonwertowany na string
  wynikEl.textContent = suma;
}

/*
  Podpięcie handlera: zamiast podać funkcję anonimową,
  przekazujemy referencję do nazwanej funkcji policzSume.
  To nie wywołuje funkcji natychmiast — tylko mówi: "wywołaj policzSume kiedy będzie click".
*/
btn.addEventListener("click", policzSume);
