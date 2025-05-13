import { create } from "zustand";

const apiBaseUrl = "https://petfinder2-0.onrender.com";
export interface Pet {
  id: string;
  name: string;
  lastLocation: string;
  lat: number;
  lng: number;
  photoURL: any;
}
interface Pets {
  pets: Pet[];
  myPets: Pet[];
  // selectedPet: Pet | null; // Propiedad para almacenar la mascota seleccionada
  loading: boolean;
  error: string | null;
  // setSelectedPet: (pet: Pet) => void; // Acción para seleccionar una mascota
  fetchPetsNear: (last_lat: any, last_lng: any) => Promise<void>;
  fetchReportPet: (
    name: string,
    lat: number,
    lng: number,
    lastLocation: string,
    photoURL: any
  ) => Promise<void>;
  showMyPetsCreated: () => Promise<void>;

  // setPetEdit: (id: string, photoURL: any) => void;
}
export const usePets = create<Pets>((set) => ({
  myPets: [],
  pets: [],
  // selectedPet: null,
  loading: false,
  error: null,

  // // setSelectedPet: (pet: Pet) => set({ selectedPet: pet }),

  fetchPetsNear: async (last_lat, last_lng) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        apiBaseUrl +
          "/pets-cerca-de?" +
          "lat=" +
          last_lat +
          "&" +
          "lng=" +
          last_lng,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();

      set({ pets: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchReportPet: async (name, lat, lng, lastLocation, photoURL) => {
    try {
      const token = useAuthState.getState().token;
      if (!token) {
        console.error("Token no disponible");
        return;
      }
      await fetch(apiBaseUrl + "/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          lastLocation,
          lat,
          lng,
          photoURL,
        }),
      }).then((res) => {
        return res.json();
      });
    } catch (error) {}
  },
  showMyPetsCreated: async () => {
    try {
      const response = await fetch(apiBaseUrl + "/petscreated", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener mascotas");
      }

      const data = await response.json();
      console.log("Mascotas creadas:", data);
      set({ myPets: data });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));

interface AuthState {
  token: string | null;
  error: string | null;
  email: string | null;
  isLoading: boolean;
  logIn: (email: string, password: string) => Promise<void>;
  setEmail: (email: string) => void;
  logOut: () => void;
}
interface AuthState {
  token: string | null;
  error: string | null;
  email: string | null;
  isLoading: boolean;
  logIn: (email: string, password: string) => Promise<void>;
  setEmail: (email: string) => void;
  logOut: () => void;
}

export const useAuthState = create<AuthState>((set) => {
  const storedToken = localStorage.getItem("token");
  const storedEmail = localStorage.getItem("email");

  return {
    token: storedToken || null,
    error: null,
    email: storedEmail || null,
    isLoading: false,

    logIn: async (email, password) => {
      try {
        const response = await fetch(`${apiBaseUrl}/auth/token`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al iniciar sesión");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);

        set({ token: data.token, error: null, email, isLoading: false });
      } catch (error: any) {
        set({ token: null, error: error.message, isLoading: false });
      }
    },

    setEmail: (email) => {
      localStorage.setItem("email", email);
      set({ email });
    },

    logOut: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      set({ token: null, email: null, error: null });
    },
  };
});

interface User {
  id: string | null;
  name: string | null;
  location: string | null;
  error: string | null;
  pets: Pet[];
  userSignUp: (email: string, password: string, name: string) => Promise<void>;
}

export const useUserState = create<User>((set) => ({
  id: null,
  name: null,
  location: null,
  error: null,
  pets: [],
  userSignUp: async (email, name, password) => {
    try {
      const response = await fetch(apiBaseUrl + "/auth", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar usuario");
      }

      const data = await response.json();
      set({ id: data.id, name, location: data.location });
    } catch (error: any) {
      set({ id: null, error: error.message });
    }
  },
}));
