export const canUseSanity = true;
const apiBaseUrl = import.meta.env.DEV
  ? ""
  : (import.meta.env.VITE_API_URL || "")
      .trim()
      .replace(/\/+$/, "")
      .replace(/\/api$/, "");

export const fetchPortfolioFromSanity = async () => {
  const response = await fetch(`${apiBaseUrl}/api/portfolio`);

  console.log("apiBaseUrl:", apiBaseUrl);
  console.log("response>>:", response);
  console.log(
    "`${apiBaseUrl}/api/portfolio`>>:",
    `${apiBaseUrl}/api/portfolio`,
  );
  if (!response.ok) {
    throw new Error("Unable to load portfolio content.");
  }

  return response.json();
};
