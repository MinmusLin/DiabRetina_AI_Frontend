import {Link} from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import CoverLayout from "../../components/CoverLayout";
import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            注册账号
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            输入您的用户名、邮箱和密码进行注册
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="用户名" variant="standard" fullWidth/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="邮箱" variant="standard" fullWidth/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="密码" variant="standard" fullWidth/>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox/>
              <MDTypography variant="button" fontWeight="regular" color="text" sx={{uml: -1}}>
                &nbsp;&nbsp;我已阅读并同意&nbsp;
              </MDTypography>
              <MDTypography variant="button" fontWeight="bold" color="info" textGradient>
                《用户协议》
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={() => (window.location.href = "/")}
              >
                注册
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                已有账号？{" "}
                <MDTypography
                  component={Link}
                  to="/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  立即登录
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
