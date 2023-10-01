const form = document.getElementById("form");
const username = document.getElementById("usuário");
const email = document.getElementById("email");
const password = document.getElementById("senha");
const password2 = document.getElementById("senha2");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email não é válido");
  }
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} é necessário`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} tem que ter pelo menos ${min} characteres`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} tem que ter menos de ${max} characteres`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value != input2.value) {
    showError(input2, "As senhas não são iguais");
  }
}

// Get fieldname
function getFieldName(input) {
  if (input.id === "senha2") {
    return "Senha";
  }
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validating information upon submition
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    (((checkRequired([username, email, password, password2]),
    checkLength(username, 3, 15)),
    checkLength(password, 6, 25),
    checkEmail(email)),
    checkPasswordsMatch(password, password2))
  ) {
  }
});

//Checking password Strength
function Strength(password) {
  let i = 0;
  if (password.length > 6) {
    i++;
  }
  if (password.length >= 10) {
    i++;
  }

  if (/[A-Z]/.test(password)) {
    i++;
  }

  if (/[0-9]/.test(password)) {
    i++;
  }

  if (/[A-Za-z0-8]/.test(password)) {
    i++;
  }

  return i;
}

let container = document.querySelector(".password-control");
document.addEventListener("keyup", function (e) {
  let password = document.querySelector("#senha").value;

  let strength = Strength(password);
  if (strength <= 2) {
    container.classList.add("weak");
    container.classList.remove("moderate");
    container.classList.remove("strong");
  } else if (strength >= 2 && strength <= 4) {
    container.classList.remove("weak");
    container.classList.add("moderate");
    container.classList.remove("strong");
  } else {
    container.classList.remove("weak");
    container.classList.remove("moderate");
    container.classList.add("strong");
  }
});
