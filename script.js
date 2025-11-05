// Pobieramy referencje do elementów DOM raz — zamiast wywoływać getElementById za każdym razem
// Dzięki temu kod jest czytelniejszy i minimalizujemy koszty poszukiwania elementów w DOM.
const num1El = document.getElementById("num1");
const num2El = document.getElementById("num2");
const btn = document.getElementById("btn");
const wynikEl = document.getElementById("wynik");


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


function wykonajObl(event) {
  // event jest opcjonalny — kiedy funkcja przypięta jako handler zostanie wywołana,
  // przeglądarka przekaże obiekt zdarzenia. Nie jest on wymagany do samego obliczenia.
  // Można go użyć np. do e.preventDefault() gdyby to był submit formularza.

  // Pobieramy liczby przez helper
  const a = sanitizeAndParse(num1El);
  const b = sanitizeAndParse(num2El);


  if (Number.isNaN(a) || Number.isNaN(b)) {
    wynikEl.textContent = "Podaj dwie poprawne liczby";
    return;
  }
  let wynik;
  const v = document.getElementById("operation").value;

  if(v == "add"){
    wynik = a + b;
  }else if(v == "sub"){
    wynik = a - b;
  }else if(v == "divi"){
    wynik = a / b;
  }else if(v == "mul"){
    wynik = a * b;
  }

  wynikEl.textContent = wynik;
}


btn.addEventListener("click", wykonajObl);
