import { useEffect } from "react";
import useUser from "../lib/useUser";
import { useNavigate } from "react-router-dom";

export default function UseHostOnlyPage() {
  const { user, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!user?.is_host) {
        navigate("/");
      }
    }
  }, [user, userLoading, navigate]);
  return;
}
