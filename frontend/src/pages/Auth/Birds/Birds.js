import React, { useState } from "react";
import ResponsiveDrawer from "../../../components/Drawer/Drawer";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CustomRefreshAnimation from "../../../components/RefreshAnimation/RefreshAnimation";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const AllProducts = () => {
  const [settled, setSettled] = useState(false);
  const { isFetching, isLoading, data } = useQuery({
    queryKey: ["birds"],
    queryFn: async () => {
      const url = process.env.REACT_APP_BASE_URL + "/getBirds";
      return await axios.get(url, {
        withCredentials: true,
      });
    },
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log(data.data.data[0].createdAt);
      // const inputDateStr = data.data.data[0].createdAt;

      // // Month abbreviations
      // const monthAbbreviations = [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sep",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      // ];

      // // Create a Date object from the input string
      // const inputDate = new Date(inputDateStr);

      // // Extract day, month, and year components
      // const day = inputDate.getUTCDate();
      // const monthAbbrev = monthAbbreviations[inputDate.getUTCMonth()]; // Get month abbreviation
      // const year = inputDate.getUTCFullYear() % 100; // Get last two digits of the year

      // // Format components as dd-Mon-yy
      // const formattedDate = `${day
      //   .toString()
      //   .padStart(2, "0")}-${monthAbbrev}-${year.toString().padStart(2, "0")}`;

      // console.log(formattedDate);
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
    onSettled: () => {
      setSettled(false);
    },
    enabled: settled,
  });

  const [parent] = useAutoAnimate({ duration: 250 });

  return (
    <ResponsiveDrawer Birds={1}>
      <div ref={parent}>
        {isFetching ? <CustomRefreshAnimation /> : null}
        <div className="container-fluid">
          <ProductCard
            image="327167969"
            rating={3.8}
            name="Cotton"
            city="Lahore"
            description="Best cotton you can find in market"
            price={1200}
            ratingsCount={109}
          />
        </div>
        <div
          className="btn btn-primary"
          onClick={() => {
            setSettled(true);
          }}
        >
          Fetch
        </div>
      </div>
    </ResponsiveDrawer>
  );
};

export default AllProducts;
