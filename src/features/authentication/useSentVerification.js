import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resentVerification } from "../../services/apiUsers";

const useSentVerification = () => {
  const navigate = useNavigate();
  const { mutate: sentVerification, isPending } = useMutation({
    mutationFn: resentVerification,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  return { sentVerification, isPending };
};

export default useSentVerification;
