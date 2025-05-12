import mapslogo from "../../assets/mapslogo.svg";
import menu from "../../assets/menu.svg";
import cruz from "../../assets/close.svg";
import css from "./index.module.css";
import { useState } from "react";
import { useAuthState } from "../../atoms/State";
import { useNavigate } from "react-router";

export function Header() {
  const { token, email, logOut } = useAuthState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleBurgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleClickReport = () => {
    if (token) {
      navigate("/reportpet");
      setIsMenuOpen(false);
    } else {
      navigate("/login");
      setIsMenuOpen(false);
    }
  };
  const handleClickMisDatos = () => {
    if (token) {
      navigate("/myprofile");
      setIsMenuOpen(false);
    } else {
      navigate("/login");
      setIsMenuOpen(false);
    }
  };

  const handleClickMisMascotas = () => {
    if (token) {
      navigate("/reportedPets");
      setIsMenuOpen(false);
    } else {
      navigate("/login");
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={css.headerEl}>
      <img className={css.logoimagen} src={mapslogo} />
      <img
        className={css.burgermenuimg}
        src={menu}
        onClick={handleBurgerMenu}
      />
      <div className={isMenuOpen ? css.burgerdivopen : css.burgerdivclose}>
        <img
          className={css.burgerclose}
          src={cruz}
          onClick={handleBurgerMenu}
        />
        <a className={css.burgertext} onClick={handleClickMisDatos}>
          {" "}
          Mis datos
        </a>
        <a className={css.burgertext} onClick={handleClickMisMascotas}>
          {" "}
          Mis mascotas reportadas
        </a>
        <a className={css.burgertext} onClick={handleClickReport}>
          {" "}
          Reportar mascota
        </a>
        {/* <a className={css.burgertext} href="misdatos">
          {" "}
          Mis datos
        </a>
        <a className={css.burgertext} href="mismascotas">
          {" "}
          Mis mascotas reportadas
        </a>
        <a className={css.burgertext} href="/reportpets">
          {" "}
          Reportar mascota
        </a> */}
        {token == null ? null : (
          <div>
            <h2 className={css.burgertext}>{email}</h2>
            <a
              className={css.cerrarsesion}
              onClick={() => {
                logOut();
                navigate("/");
              }}
            >
              CERRAR SESIÓN
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
