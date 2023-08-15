import React, { useState } from "react";
import ResponsiveDrawer from "../../../components/Drawer/Drawer";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CustomRefreshAnimation from "../../../components/CustomRefreshAnimation/CustomRefreshAnimation";

const AllProducts = () => {
  const [enable, setEnable] = useState(false);
  const { isFetching, isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return await axios.get("http://localhost:3001/getProducts", {
        withCredentials: true,
      });
    },
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      setEnable(false);
    },
    enabled: enable,
  });

  return (
    <ResponsiveDrawer Products={1}>
      {isLoading && <CustomRefreshAnimation />}
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
          setEnable(true);
        }}
      >
        Fetch
      </div>
    </ResponsiveDrawer>
  );
};

export default AllProducts;
