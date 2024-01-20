import React from "react";
import {
  Box,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  Heading,
  Center,
  Flex,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Spinner,
  Avatar,
} from "@chakra-ui/react";

import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useState, useRef } from "react";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import axios from "axios";



const validationSchema = Yup.object().shape({
  client_id: Yup.string().required("client_id is required"),
  client_secret: Yup.string().required("client_secret is required"),
  scope: Yup.string().required("scope is required"),
  grant_type: Yup.string().required("grant_type is required"),
});

const RegisterPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      scope: "",
      client_id: "",
      client_secret: "",
      grant_type: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      try {
        const res = await axios.post("/api/login", values);

        console.log(res.data.token, "RESSSS");

        localStorage.setItem("token", res.data.token);

        toast.success("You Welcome");
        resetForm();
        router.push("/");
      } catch (err) {
        console.log(err);
        toast.error(err?.message);
      }

      
    },
  });

 

  return (
    <>


      <Flex align={"center"} justify={"center"} bg={"white"}>
        <Stack
          spacing={8}
          mx={"auto"}
          // maxW={"500px"}
          width={"45%"}
          py={12}
          px={6}
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Login
            </Heading>
        
          </Stack>
          <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={4}>
                <Box h={"full"}>
                  <FormControl
                    py={"2"}
                    isInvalid={
                      formik.touched.client_id && formik.errors.client_id
                        ? true
                        : false
                    }
                    id="client_id"
                    // isRequired
                  >
                    <FormLabel>
                      client_id
                      {/* {profile?.displayName} */}
                    </FormLabel>
                    <Input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.client_id}
                      //  onChange={e => setFirstName(e.target.value)}
                      //  value={firstName}

                      type="text"
                    />

                    <FormErrorMessage>
                      {formik.errors.client_id}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box h={"full"}>
                  <FormControl
              
                    isInvalid={
                      formik.touched.client_secret &&
                      formik.errors.client_secret
                        ? true
                        : false
                    }
                    id="client_secret"
                  >
                    <FormLabel>client_secret</FormLabel>
                    <Input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.client_secret}
                

                      type="text"
                    />

                    <FormErrorMessage>
                      {formik.errors.client_secret}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box h={"full"}>
                  <FormControl
                    py={"2"}
                    isInvalid={
                      formik.touched.scope && formik.errors.scope ? true : false
                    }
                    id="scope"
                  >
                    <FormLabel>Scope</FormLabel>
                    <Input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.scope}
                   

                      type="text"
                    />

                    <FormErrorMessage>{formik.errors.scope}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Box h={"full"}>
                  <FormControl
                    py={"2"}
                    isInvalid={
                      formik.touched.grant_type && formik.errors.grant_type
                        ? true
                        : false
                    }
                    id="grant_type"
                    // isRequired
                  >
                    <FormLabel>
                      Grant Type
                     
                    </FormLabel>
                    <Input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.grant_type}
                   

                      type="text"
                    />

                    <FormErrorMessage>
                      {formik.errors.grant_type}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400 !important"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500 !important",
                    }}
                  >
                    Login
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
      {/* } */}
    </>
  );
};

export default RegisterPage;

