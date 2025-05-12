import { useUserState } from "../../atoms/State";
import { useNavigate } from "react-router";
import { ButtonEl } from "../../Ui/button/button";
import css from "./index.module.css";

export function SignUp() {
  const navigate = useNavigate();
  const { userSignUp } = useUserState();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("Email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("contraseña") as string;
    const confirmPassword = formData.get("confirmarcontraseña") as string;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      console.log(email, name, password);
      await userSignUp(email, name, password);
      navigate("/");
    } catch (error) {
      console.error("Error al registrarse:", error);
    }
  };
  return (
    <div className={css.mainsignup}>
      <div className={css.textContainer}>
        <h1 className={css.signupTitle}>Registrarse</h1>
        <h3>Ingresá los siguientes datos para realizar el registro</h3>
      </div>

      <form className={css.formularioSignup} onSubmit={handleSubmit}>
        <label className={css.labelText} htmlFor="email">
          EMAIL
        </label>
        <input className={css.input} type="text" name="Email" />
        <label className={css.labelText} htmlFor="name">
          Nombre
        </label>
        <input className={css.input} type="text" name="name" />
        <label className={css.labelText} htmlFor="contraseña">
          CONTRASEÑA
        </label>
        <input className={css.input} type="password" name="contraseña" />
        <label className={css.labelText} htmlFor="confirmarcontraseña">
          CONFIRMAR CONTRASEÑA
        </label>
        <input
          className={css.input}
          type="password"
          name="confirmarcontraseña"
        />
        <h3>¿Ya tenés una cuenta?</h3>
        <a className={css.textLink} href="/ingresar">
          Iniciá sesión
        </a>
        <div className={css.buttonContainer}>
          <ButtonEl>Siguiente</ButtonEl>
        </div>
      </form>
    </div>
  );
}
