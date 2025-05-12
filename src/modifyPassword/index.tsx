import css from "./index.module.css";
import { ButtonEl } from "../Ui/button/button";
export function ModifyPassword() {
  return (
    <>
      <div className={css.mainmodifypass}>
        <h1 className={css.h1password}>Elegí una nueva clave</h1>

        <form className={css.formulariopass}>
          <label className={css.labelText} htmlFor="password">
            Nueva Clave
          </label>
          <input
            className={css.inputingresar}
            type="password"
            name="password"
          />
          <label className={css.labeltext}>Confirma tu nueva clave</label>
          <input
            className={css.inputingresar}
            type="password"
            name="confirmPassword"
          />
          <ButtonEl>Guardar</ButtonEl>
        </form>
      </div>
    </>
  );
}
