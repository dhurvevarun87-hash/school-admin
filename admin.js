// =========================
// SUPABASE CONFIG
// =========================

const SUPABASE_URL =
    "https://pnyzlbbdhbdunopsdzcx.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_2pmABySR4qtu8RYiPzb7UQ_nWm9-gKX";


// =========================
// LOAD SUPABASE
// =========================

const script = document.createElement("script");

script.src =
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

script.onload = () => {

    window.supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );

    setupLogin();

};

document.head.appendChild(script);


// =========================
// LOGIN
// =========================

function setupLogin() {

    const loginForm =
        document.getElementById("loginForm");

    const loginBtn =
        document.getElementById("loginBtn");

    const message =
        document.getElementById("loginMessage");


    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("password")
                    .value;


            loginBtn.disabled = true;

            loginBtn.textContent =
                "Logging in...";

            message.textContent = "";


            const {
                data,
                error
            } =
                await window.supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });


            if (error) {

                console.error(error);

                message.textContent =
                    "❌ Invalid email or password.";

                loginBtn.disabled = false;

                loginBtn.textContent =
                    "Login";

                return;
            }


            if (data.session) {

                window.location.href =
                    "dashboard.html";

            }

        }
    );

}