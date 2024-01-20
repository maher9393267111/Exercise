import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function index() {
  const [data, setData] = useState(null);

  const router =useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("token is not null");
      const getData = async () => {
        try {
          const res = await axios.get(
            `https://api.interparking.com/v1/quotas/BE`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        

          if (res?.data) {
            setData(res?.data[0]);
          }
        } catch (err) {
          console.log(err);
          router.push('/login')
        }
      };

      getData();
    }
  }, []);

  const calculatepercentage =
    data && (data?.currentValue / data?.maximumValue) * 100;
  const currentColor =
    calculatepercentage <= 19
      ? "red"
      : calculatepercentage <= 49
      ? "yellow"
      : calculatepercentage <= 100 && "green";

  return (
    <div>
      {data ? (
        <div>
          <Box
            width={"300px"}
            mt={"40px"}
            height={"300px"}
            bgColor={currentColor}
            mx={"auto"}
            borderRadius={"22px"}
          >
            <Stack
              color={`${currentColor !== "yellow" && "white"}`}
              fontSize={"large"}
              fontWeight={"bold"}
              textAlign={"center"}
              position={"relative"}
              top={"30px"}
            >
              <p>Name: {data?.name}</p>
              <p>CurrentValue: {data?.currentValue}</p>

              <p>MaximumValue: {data?.maximumValue}</p>

              <p>Completed: {calculatepercentage.toFixed(2)} %</p>
            </Stack>
          </Box>
        </div>
      ) : (
        <Box
          textAlign={"center"}
          fontSize={"2xl"}
          mt={"150px"}
          fontWeight={"semibold"}
        >
          ...Loading
        </Box>
      )}
    </div>
  );
}
