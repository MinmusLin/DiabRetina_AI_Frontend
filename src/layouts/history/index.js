import {useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "components/DashboardLayout";
import DashboardNavbar from "components/DashboardNavbar";
import DataTable from "components/DataTable";
import MDAvatar from "components/MDAvatar";
import avatar from "assets/images/icon.png";

function History() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://110.42.214.164:8005/history");
        const data = await response.json();
        if (data.history) {
          const formattedRows = data.history.map((record) => ({
            patient: (
              <MDBox display="flex" alignItems="center" lineHeight={1}>
                <MDAvatar src={avatar} name={record.name} size="sm"/>
                <MDBox ml={2} lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {record.name}
                  </MDTypography>
                  <MDTypography variant="caption">{record.gender}</MDTypography>
                </MDBox>
              </MDBox>
            ),
            age: (
              <MDTypography variant="caption" fontWeight="medium">
                {record.age}
              </MDTypography>
            ),
            occupation: (
              <MDTypography variant="caption" fontWeight="medium">
                {record.occupation}
              </MDTypography>
            ),
            contact: (
              <MDBox lineHeight={1}>
                <MDTypography display="block" variant="caption" fontWeight="medium">
                  {record.contact}
                </MDTypography>
                <MDTypography variant="caption">{record.address}</MDTypography>
              </MDBox>
            ),
            time: (
              <MDTypography variant="caption" fontWeight="medium">
                {record.time}
              </MDTypography>
            ),
            report: (
              <MDTypography
                component="a"
                href={`http://110.42.214.164:8005/diagnostic-report/${record.uuid}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                查看报告
              </MDTypography>
            )
          }));
          setRows(formattedRows);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const columns = [
    {Header: "患者姓名 / 性别", accessor: "patient", width: "15%", align: "left"},
    {Header: "年龄", accessor: "age", width: "10%", align: "center"},
    {Header: "职业", accessor: "occupation", width: "10%", align: "center"},
    {Header: "联系方式 / 家庭住址", accessor: "contact", align: "left"},
    {Header: "报告生成时间", accessor: "time", width: "15%", align: "center"},
    {Header: "诊断分析报告", accessor: "report", width: "15%", align: "center"}
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  病变诊断分析历史记录
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <MDBox p={3} textAlign="center">
                    <MDTypography variant="body2">病变诊断分析历史记录加载中...</MDTypography>
                  </MDBox>
                ) : (
                  <DataTable
                    table={{columns, rows}}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default History;