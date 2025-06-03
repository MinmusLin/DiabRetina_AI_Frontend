import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "components/DashboardLayout";
import DashboardNavbar from "components/DashboardNavbar";
import DefaultCard from "components/DefaultCard";

function Diagnosis() {
  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MDBox mb={1.5}>
              <DefaultCard icon="center_focus_strong" title="眼底原始图像"/>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MDBox mb={1.5}>
              <DefaultCard icon="center_focus_strong" title="眼底检测图像"/>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Diagnosis;
