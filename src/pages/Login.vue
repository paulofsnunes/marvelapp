<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login | Universo Marvel</h2>
      <form action="">
        <div class="input-field">
          <input
            type="text"
            name="username"
            v-model="username"
            id="username"
            placeholder="Seu nome de usúario"
          />
          <div class="underline"></div>
        </div>
        <div class="input-field">
          <input
            type="password"
            name="password"
            v-model="password"
            id="pass"
            minlength="6"
            required
            placeholder="Sua senha"
            autocomplete="on"
          />
          <div class="underline"></div>
        </div>
        <button class="button-submit" type="button" @click="checkPassword()">
          Entrar
        </button>
        <p v-if="passwordError">
          Senha incorreta! Tente novamente.
        </p>
      </form>

      <div class="footer">
        <span>Ou conecte-se às redes sociais</span>
        <div class="social-fields">
          <div class="social-field twitter">
            <a href="#">
              <img
                class="icon-login"
                src="../assets/Icons/twitter-brands.svg"
                width="15"
                alt="twitter-icon"
              />
              Entre com seu Twitter
            </a>
          </div>
          <div class="social-field facebook">
            <a href="#">
              <img
                class="icon-login"
                src="../assets/Icons/facebook-f-brands.svg"
                width="10"
                alt="facebook-icon"
              />
              Entre com seu Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import { validatePassword } from "@/utils/validatePassword";

  export default {
    data() {
      return {
        username: "",
        password: "",
        passwordOk: false,
        passwordError: false,
      };
    },
    methods: {
      checkPassword() {
        this.passwordCorrect = validatePassword(this.password);
        if (this.passwordCorrect) {
          this.setUserLoggedIn();
          this.$router.push("/home");
        } else {
          this.passwordError = true;
        }
      },
      ...mapActions(["setUserLoggedIn"]),
    },
  };
</script>

<style lang="css" scoped>

@import url('https://fonts.googleapis.com/css2?family=Marvel:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  * {
    margin: 0;
    border: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Marvel', sans-serif;
}

  .login-container {
    background: url(../assets/bgUatu.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-card {
    background: white;
    min-width: 320px;
    min-height: 40vh;
    padding: 2rem;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    animation: fadein 3s; /* Apartir daqui vou criar um fadein no formulário */
    -moz-animation: fadein 3s; /* Firefox */
    -webkit-animation: fadein 3s; /* Safari and Chrome */
    -o-animation: fadein 3s; /* Opera */
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    /* Firefox */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    /* Opera */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  /* FIM do fadin */

  h2 {
    font-weight: 600;
    margin-bottom: 2rem;
    position: relative;
  }

  h2::before {
    content: "";
    position: absolute;
    height: 4px;
    width: 20px;
    bottom: 1px;
    left: 0;
    border-radius: 8px;
    background: linear-gradient(45deg, #8e2de2, #4a00e0);
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .input-field {
    position: relative;
  }

  form .input-field:first-child {
    margin-bottom: 1.5rem;
  }

  .input-field .underline::before {
    content: "";
    position: absolute;
    height: 1px;
    width: 100%;
    bottom: -5px;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
  }

  .input-field .underline::after {
    content: "";
    position: absolute;
    height: 1px;
    width: 100%;
    bottom: -5px;
    left: 0;
    background: linear-gradient(45deg, #8e2de2, #4a00e0);
    transform: scaleX(0);
    transition: all 0.3s ease-in-out;
    transform-origin: left;
  }

  .input-field input:focus ~ .underline::after {
    transform: scaleX(1);
  }

  .input-field input {
    outline: none;
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.7);
    width: 100%;
    border: none;
    font-family: "Marvel", sans-serif;
  }

  .input-field input::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  .button-submit {
    margin-top: 2rem;
    padding: 0.4rem;
    width: 100%;
    background: linear-gradient(to left, #4776e6, #8e54e9);
    cursor: pointer;
    color: white;
    font-family: "Marvel", sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    border-radius: 4px;
    transition: all 0.3s ease;
    border: none;
  }

  .button-submit:hover {
    letter-spacing: 0.5px;
    background: linear-gradient(to right, #4776e6, #8e54e9);
  }

  .footer {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }

  .footer span {
    color: rgba(0, 0, 0, 0.7);
    font-size: 0.8rem;
    text-align: center;
  }

  .footer .social-field {
    padding: 0.4rem;
    border-radius: 4px;
    font-size: 0.85rem;
    width: 100%;
    cursor: pointer;
    margin-top: 1rem;
  }

  .footer .social-field a i {
    margin: 0 0.5rem;
    width: 15px;
}

.footer .social-field a {
    text-decoration: none;
    color: white;
}

  .footer .social-field.twitter {
    background: linear-gradient(to right, #56a7f2, #468aca);
    text-align: center;
  }

  .footer .social-field.facebook {
    background: linear-gradient(to right, #1e3c72, #2a5298);
    text-align: center;
  }

  .icon-login {
    margin-right: 8px;
  }
</style>
