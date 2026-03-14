import * as bootstrap from 'bootstrap'
import "./scss/bootstrap.scss";
import "./scss/style.scss"
// Font Awesome
import "@fortawesome/fontawesome-free/js/all.min.js"

document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(item=> new bootstrap.Tooltip(item))
    
alert("أهلًا بك في مدرسة علمني، أفضل مدرسة على مستوى القطر متخصصة في تعليم وتأهيل الطلاب بأفضل الطرق والنشاطات، إن كنت تبحث عن مدرسة مميزة لابنك لا تتردد بالتواصل معنا.");
document.getElementById("year").innerHTML = "جميع الحقوق محفوظة لمدرسة علمني الإبتدائية سنة " + new Date().getFullYear()
