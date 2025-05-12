import css from "./index.module.css";
import homephoto from "../../assets/homephoto.svg";
import { ButtonEl } from "../../Ui/button/button";
import { useNavigate } from "react-router";
import { usePets } from "../../atoms/State";
import { useAuthState } from "../../atoms/State";

export function Home() {
  const { token } = useAuthState();
  const navigate = useNavigate();
  const petsNear = usePets();
  const handleButtonLocalitation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        petsNear.fetchPetsNear(latitude, longitude).then(() => {
          navigate("/home-mascotas");
        });
      });
    }
  };
  const handleButtonLogIn = () => {
    navigate("/login");
  };
  return (
    <div className={css.mainhome}>
      <img className={css.imagen} src={homephoto} alt="" />
      <h1 className={css.title}>Pet Finder App</h1>
      <h2 className={css.text}>
        Encontra y reportá
        <br /> mascotas perdidas
        <br /> cerca de tu ubicación
      </h2>
      <ButtonEl handleClick={handleButtonLocalitation}>
        Dar mi ubicación actual
      </ButtonEl>
      {token == null ? (
        <ButtonEl handleClick={handleButtonLogIn} buttonColor={"#00A884"}>
          Iniciar sesión
        </ButtonEl>
      ) : null}
    </div>
  );
}
