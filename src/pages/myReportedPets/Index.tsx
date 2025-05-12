import css from "./index.module.css";
import { useNavigate } from "react-router";
import { CardEl } from "../../Ui/cardEl/CardEl";
import { usePets } from "../../atoms/State";
import { useEffect } from "react";
import { useSelectedPets } from "../../atoms/selectedPet";

export function ReportedPets() {
  const { myPets, showMyPetsCreated } = usePets();
  const { setSelectedPet, getSelectedPet } = useSelectedPets();
  const navigate = useNavigate();

  useEffect(() => {
    showMyPetsCreated(); // Llama
    //  a la función para cargar las mascotas creadas
  }, []);

  const handleEditPet = (pet: any) => {
    console.log(getSelectedPet());
    setSelectedPet(pet);
    console.log(getSelectedPet());
    navigate("/editpet");
  };

  return (
    <>
      <div className={css.mainmismascotas}>
        <h1 className={css.titlemismascotas}>Mis mascotas reportadas</h1>

        {myPets.length === 0 ? (
          <h1>No tenes mascotas reportadas</h1>
        ) : (
          myPets.map((pet) => (
            <CardEl
              key={pet.id}
              pet={pet}
              photoURL={pet.photoURL}
              name={pet.name}
              lastLocation={pet.lastLocation}
              handleClick={() => handleEditPet(pet)}
              buttonColor={"#00BFFF"}
              children={"Editar"}
            />
          ))
        )}
      </div>
    </>
  );
}
