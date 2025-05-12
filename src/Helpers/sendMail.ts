export async function sendPetInfo(petData: any) {
  const API_BASE_URL = "http://localhost:3000";
  console.log(petData);
  return fetch(API_BASE_URL + "/sendmail", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      petId: petData.id,
      name: petData.name,
      phone: petData.phone,
      textarea: petData.text,
    }),
  });
}
