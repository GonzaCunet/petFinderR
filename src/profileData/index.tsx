import css from "./index.module.css";
import { ButtonEl } from "../Ui/button/button";

export function ProfileData() {
  return (
    <>
      <div className={css.mainmisdatos}>
        <h1 className={css.misdatostittle}>Datos Personales</h1>

        <form className={css.formulariomisdatos}>
          <label className={css.labeltext}>Nombre</label>
          <input className={css.inputingresar} type="text" name="name" />
          <label className={css.labeltext}>Localidad</label>
          <input
            className={css.inputingresar}
            type="localidad"
            name="localidad"
          />
          <ButtonEl>Guardar</ButtonEl>
        </form>
      </div>
    </>
  );
}
