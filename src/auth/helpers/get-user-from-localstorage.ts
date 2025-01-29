export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("❌ Error al parsear el usuario desde localStorage", error);
    return null;
  }
};
