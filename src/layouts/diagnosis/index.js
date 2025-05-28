import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "components/DashboardLayout";
import DashboardNavbar from "components/DashboardNavbar";
import DefaultCard from "components/DefaultCard";
import { useState, useRef } from "react";
import { Box, styled } from "@mui/material";

const UploadContainer = styled(Box)({
  position: "relative",
  width: "100%",
  paddingBottom: "75%",
  border: "2px dashed #ccc",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  overflow: "hidden",
  backgroundColor: "#f5f5f5",
  "&:hover": {
    borderColor: "#999",
    backgroundColor: "#eee",
  },
});

const UploadInput = styled("input")({
  display: "none",
});

const UploadLabel = styled("label")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  cursor: "pointer",
});

const PreviewImage = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  backgroundColor: "white",
});

function Diagnosis() {
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    // Convert image to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;

      try {
        // Call your API endpoint
        const response = await fetch("/api/detection", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64String }),
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        setImageUrl(data.url);
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle error (maybe show a notification)
      } finally {
        setIsUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleContainerClick = () => {
    if (!imageUrl && !isUploading) {
      fileInputRef.current.click();
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MDBox mb={1.5}>
              <DefaultCard icon="add_a_photo" title="上传眼底图像">
                <UploadContainer onClick={handleContainerClick}>
                  <UploadInput
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {imageUrl ? (
                    <PreviewImage src={imageUrl} alt="Uploaded preview" />
                  ) : isUploading ? (
                    <UploadLabel>上传中...</UploadLabel>
                  ) : (
                    <UploadLabel>
                      <span>点击上传图像</span>
                      <span>或拖拽图像到此处</span>
                    </UploadLabel>
                  )}
                </UploadContainer>
              </DefaultCard>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MDBox mb={1.5}>
              <DefaultCard icon="center_focus_strong" title="Today's Users" />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Diagnosis;
