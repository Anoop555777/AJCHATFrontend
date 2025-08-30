import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import useSentVerification from "./useSentVerification";

export default function ResendVerificationForm() {
  const { sentVerification, isPending } = useSentVerification();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // React Query mutation to call backend

  const forgetPasswordHandler = ({ email }) => {
    sentVerification(email, { onSuccess: () => reset() });
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <form onSubmit={handleSubmit(forgetPasswordHandler)}>
        <VStack
          spacing={5}
          p={6}
          bg="white"
          rounded="xl"
          shadow="md"
          width="sm"
        >
          <Text fontSize="2xl" fontWeight="bold">
            Resend Verification Code
          </Text>
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="blue"
            width="full"
            isLoading={isPending}
            type="submit"
          >
            Resend Code
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
