import css from "./index.module.css";
import { usePets } from "../../atoms/State";
import { CardEl } from "../../Ui/cardEl/CardEl";
import { useState } from "react";
import { ButtonEl } from "../../Ui/button/button";
import cruz from "../../assets/close.svg";
import { sendPetInfo } from "../../Helpers/sendMail";

export function HomeMascotas() {
  const { pets } = usePets();
  const [openForm, setOpenForm] = useState(false);
  const handleReportButton = () => {
    setOpenForm(!openForm);
  };
  const handleSubmit = (e: any, id: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      text: formData.get("text"),
      id: id,
    };
    console.log(data, "esta es la data que se envia");
    sendPetInfo(data);
    setOpenForm(false);
  };
  return (
    <div className={css.mainmascotas}>
      <h1 className={css.titlemascotas}>Mascotas perdidas cerca</h1>
      {pets.length === 0 ? (
        <h2>no hay mascotas cerca</h2>
      ) : (
        pets.map((pet) => (
          <div key={pet.id}>
            <CardEl
              key={pet.id}
              pet={pet}
              photoURL={pet.photoURL}
              name={pet.name}
              lastLocation={pet.lastLocation}
              children={"Reportar"}
              buttonColor={"#EB6372"}
              handleClick={() => {
                handleReportButton();
              }}
            />
            <div className={openForm ? css.divOpenForm : css.divCloseForm}>
              <img
                className={css.crucecita}
                src={cruz}
                onClick={handleReportButton}
              />
              <form
                className={css.formReport}
                onSubmit={(e) => {
                  handleSubmit(e, pet.id);
                }}
              >
                <label className={css.formLabel}>NOMBRE</label>
                <input className={css.input} type="text" name="name"></input>
                <label className={css.formLabel}>TELÉFONO</label>
                <input className={css.input} type="text" name="phone"></input>
                <label className={css.formLabel}>¿DÓNDE LO VISTE?</label>
                <textarea
                  className={css.textareaForm}
                  name="text"
                  rows={4}
                  cols={50}
                ></textarea>
                <ButtonEl buttonColor="#00A884">Enviar</ButtonEl>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
