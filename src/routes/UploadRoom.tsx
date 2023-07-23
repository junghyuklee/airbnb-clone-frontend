import ProtectedPage from "../components/ProtectedPage";
import HostOnlyPage from "../components/HostOnlyPage";

export default function UploadRoom() {
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <h1>uploadRoom</h1>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
