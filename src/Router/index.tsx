import { Routes, Route } from "react-router";
import { Layout } from "../components/Layout";
import { Home } from "../pages/home/Index";
import { Login } from "../pages/login/Index";
import { HomeMascotas } from "../pages/homemascotas/Index";
import { ReportPet } from "../pages/reportPet/Index";
import { ReportedPets } from "../pages/myReportedPets/Index";
import { MisDatos } from "../pages/myProfile/Index";
import { SignUp } from "../pages/signUp/Index";
import { EditPet } from "../pages/editPets/";
import { ProfileData } from "../profileData";
import { ModifyPassword } from "../modifyPassword";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home-mascotas" element={<HomeMascotas />} />
        <Route path="/reportpet" element={<ReportPet />} />
        <Route path="/reportedPets" element={<ReportedPets />} />
        <Route path="/myprofile" element={<MisDatos />} />
        <Route path="/profiledata" element={<ProfileData />} />
        <Route path="/editpassword" element={<ModifyPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/editPet" element={<EditPet />} />
      </Route>
    </Routes>
  );
}
