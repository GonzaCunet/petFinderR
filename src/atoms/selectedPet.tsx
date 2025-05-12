import { create } from "zustand";
import { Pet } from "./State";
import { usePets } from "./State";
interface EditData {
  petId: string;
  name: string;
  lat: number;
  lng: number;
  lastLocation: string;
  photoURL: any;
}
interface SelectedPetState {
  selectedPet: Pet | null; // Propiedad para almacenar la mascota seleccionada
  fetchEditPet: (data: EditData) => Promise<void>;
  setSelectedPet: (pet: Pet) => void;
  getSelectedPet: () => Pet | null;
  fetchDeletePet: (photoURL: any, petId: string) => Promise<void>;
}

const apiBaseUrl = "http://localhost:3000";
export const useSelectedPets = create<SelectedPetState>((set, get) => ({
  selectedPet: null,
  setSelectedPet: (pet: Pet) =>
    set({
      selectedPet: { ...pet, lat: Number(pet.lat), lng: Number(pet.lng) },
    }),
  getSelectedPet: () => {
    return get().selectedPet;
  },
  fetchEditPet: async (editData) => {
    try {
      const response = await fetch(`${apiBaseUrl}/pet`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...editData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al editar mascota");
      }

      const updatedPet = await response.json();
      usePets.setState((state) => ({
        myPets: state.myPets.map((pet) =>
          pet.id === editData.petId ? updatedPet : pet
        ),
      }));
    } catch (error: any) {
      usePets.setState({ error: error.message });
    }
  },
  fetchDeletePet: async (photoURL, petId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/pet`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          photoURL,
          id: petId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar mascota");
      }

      // usePets.setState((state) => ({
      //   myPets: state.myPets.filter((pet) => pet.id !== editData.petId),
      // }));
    } catch (error: any) {
      usePets.setState({ error: error.message });
    }
  },
}));
