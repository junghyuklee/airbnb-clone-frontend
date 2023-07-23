import ProtectedPage from "../components/ProtectedPage";
import UseHostOnlyPage from "../components/UseHostOnlyPage";

export default function UploadRoom() {
  UseHostOnlyPage();
  return (
    <ProtectedPage>
      <h1>uploadRoom</h1>
    </ProtectedPage>
  );
}
