import css from "./index.module.css";
import { ButtonEl } from "../../Ui/button/button";
import puertaimg from "../../assets/puertaimg.svg";
import { useAuthState } from "../../atoms/State";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export function Login() {
  const navigate = useNavigate();
  const { logIn, setEmail, error } = useAuthState();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("pass") as string;

    try {
      setEmail(email);
      await logIn(email, password);

      if (!error) {
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "DATOS INCORRECTOS",
          text: "Asegurate de completar correctamente tus datos",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al iniciar sesión.",
      });
    }
  };

  return (
    <>
      <div className={css.mainingresar}>
        <img className={css.imagen} src={puertaimg} alt="Puerta" />
        <div className={css.textcontainer}>
          <h1 className={css.iniciartitle}>Iniciar Sesión</h1>
          <h3>Ingresá los datos para iniciar sesión</h3>
        </div>
        <form className={css.formulario} onSubmit={handleSubmit}>
          <label className={css.labeltext}>EMAIL</label>
          <input className={css.inputingresar} type="text" name="email" />
          <label className={css.labeltext}>CONTRASEÑA</label>
          <input className={css.inputingresar} type="password" name="pass" />
          <a className={css.textlink} href="">
            Olvidé mi contraseña
          </a>
          <ButtonEl>Acceder</ButtonEl>
        </form>
        <p className={css.textform}>
          Aún no tenés cuenta?{" "}
          <a href="/signup" className={css.textlink} id="registro">
            Registrate.
          </a>
        </p>
      </div>
    </>
  );
}
