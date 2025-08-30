import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verify as verifyAasApi } from "../../services/apiAuth";

const useVerify = () => {
  const queryClient = useQueryClient();

  const {
    mutate: verify,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: verifyAasApi,
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.setQueryData(["user"], response.data.user);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
  return { verify, isPending, isError, isSuccess };
};

export default useVerify;
