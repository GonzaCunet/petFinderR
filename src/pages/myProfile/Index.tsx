import css from "./index.module.css";
import { ButtonEl } from "../../Ui/button/button";
import { useNavigate } from "react-router";
export function MisDatos() {
  const navigate = useNavigate();
  const handleClickMisDatos = (e: any) => {
    e.preventDefault();
    navigate("/profiledata");
  };
  const handleClickPassword = (e: any) => {
    e.preventDefault();
    navigate("/editpassword");
  };

  return (
    <>
      <div className={css.mainIngresar}>
        <div className={css.misdatostextcontainer}>
          <h1 className={css.misDatosTittle}>Datos Personales</h1>
        </div>
        <ButtonEl className={css.misDatos} handleClick={handleClickMisDatos}>
          Mis datos personales
        </ButtonEl>
        <ButtonEl className={css.password} handleClick={handleClickPassword}>
          Modificar contraseña
        </ButtonEl>
      </div>
    </>
  );
}
