import { useEffect, useState } from "react";
import { MENU_API } from "./constant";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, [resId]);

  const fetchData = async () => {
    try {
      const data = await fetch(MENU_API + resId);
      if (!data.ok) {
        throw new Error(`Menu API failed with ${data.status}`);
      }
      const json = await data.json();
      setResInfo(json?.data);
    } catch (error) {
      console.warn("Error fetching restaurant menu:", error);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
