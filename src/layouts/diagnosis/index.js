import {useState, useRef} from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "components/DashboardLayout";
import DashboardNavbar from "components/DashboardNavbar";
import DefaultCard from "components/DefaultCard";
import MDTypography from "components/MDTypography";
import MDInput from "../../components/MDInput";
import MDButton from "components/MDButton";
import CircularProgress from "@mui/material/CircularProgress";
import {CardMedia, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const LESION_COLORS = {
  "EX": "#FF0060",
  "MA": "#00DFA2",
  "HE": "#0079FF",
  "SE": "#F6FA70"
};

function Diagnosis() {
  const [fileUuid, setFileUuid] = useState(null);
  const [preprocessedImage, setPreprocessedImage] = useState(null);
  const [predictedImage, setPredictedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);
  const [lesionCounts, setLesionCounts] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const [isGeneratingDiagnosis, setIsGeneratingDiagnosis] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [lesionSeverity, setLesionSeverity] = useState({
    MA: "",
    HE: "",
    EX: "",
    SE: ""
  });

  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const ageRef = useRef(null);
  const occupationRef = useRef(null);
  const contactRef = useRef(null);
  const addressRef = useRef(null);
  const chiefComplaintRef = useRef(null);
  const presentIllnessRef = useRef(null);
  const pastHistoryRef = useRef(null);
  const clinicalDiagnosisRef = useRef(null);
  const treatmentPlanRef = useRef(null);

  const handleSeverityChange = (type) => (event) => {
    setLesionSeverity({
      ...lesionSeverity,
      [type]: event.target.value
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setIsLoading(true);
    setFileName(file.name);
    setPredictedImage(null);
    setLesionCounts(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://110.42.214.164:8005/predict", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        console.error("Network response was not ok");
      }
      const data = await response.json();
      setPreprocessedImage(`data:image/jpeg;base64,${data.preprocessed_image}`);
      setPredictedImage(`data:image/jpeg;base64,${data.predicted_image}`);
      setLesionCounts(data.lesion_counts);
      setFileUuid(data.uuid);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    if (!isLoading) {
      fileInputRef.current.click();
    }
  };

  const handleGenerateDiagnosis = async () => {
    setIsGeneratingDiagnosis(true);
    setAiResponse(null);
    const formData = {
      name: nameRef.current.value,
      gender: genderRef.current.value,
      age: ageRef.current.value,
      occupation: occupationRef.current.value,
      contact: contactRef.current.value,
      address: addressRef.current.value,
      chief_complaint: chiefComplaintRef.current.value,
      present_illness: presentIllnessRef.current.value,
      past_history: pastHistoryRef.current.value,
      ma_count: lesionCounts?.MA || 0,
      he_count: lesionCounts?.HE || 0,
      ex_count: lesionCounts?.EX || 0,
      se_count: lesionCounts?.SE || 0,
      ma_severity: lesionSeverity.MA,
      he_severity: lesionSeverity.HE,
      ex_severity: lesionSeverity.EX,
      se_severity: lesionSeverity.SE,
      clinical_diagnosis: clinicalDiagnosisRef.current.value,
      treatment_plan: treatmentPlanRef.current.value
    };
    try {
      const response = await fetch("http://110.42.214.164:8005/generate_diagnosis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.error("Network response was not ok");
      }
      const data = await response.json();
      setAiResponse(data.ai_response);
    } catch (error) {
      console.error("Error generating diagnosis:", error);
      setAiResponse("AI 辅助诊断意见生成失败。");
    } finally {
      setIsGeneratingDiagnosis(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!fileUuid) {
      console.error("No file UUID available");
      return;
    }
    setIsGeneratingReport(true);
    try {
      const formData = {
        uuid: fileUuid,
        name: nameRef.current.value,
        gender: genderRef.current.value,
        age: ageRef.current.value,
        occupation: occupationRef.current.value,
        contact: contactRef.current.value,
        address: addressRef.current.value,
        chief_complaint: chiefComplaintRef.current.value,
        present_illness: presentIllnessRef.current.value,
        past_history: pastHistoryRef.current.value,
        ma_count: lesionCounts?.MA || 0,
        he_count: lesionCounts?.HE || 0,
        ex_count: lesionCounts?.EX || 0,
        se_count: lesionCounts?.SE || 0,
        ma_severity: lesionSeverity.MA,
        he_severity: lesionSeverity.HE,
        ex_severity: lesionSeverity.EX,
        se_severity: lesionSeverity.SE,
        clinical_diagnosis: clinicalDiagnosisRef.current.value,
        treatment_plan: treatmentPlanRef.current.value,
        ai_diagnosis: aiResponse
      };
      const response = await fetch("http://110.42.214.164:8005/generate_report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.error("Network response was not ok");
      }
      const data = await response.json();
      setReportGenerated(true);
      window.open(data.report_path, "_blank");
      window.location.href = "/";
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6}>
            <MDBox mb={1.5} height="100%">
              <DefaultCard icon="visibility" title="眼底原始图像">
                <MDBox
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="400px"
                  mb="16px"
                >
                  {preprocessedImage ? (
                    <CardMedia
                      component="img"
                      image={preprocessedImage}
                      alt="眼底原始图像"
                      sx={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        style={{display: "none"}}
                        disabled={isLoading}
                      />
                      <MDButton
                        variant="gradient"
                        color="info"
                        onClick={triggerFileInput}
                        sx={{mb: 2}}
                        disabled={isLoading}
                      >
                        上传眼底图像
                      </MDButton>
                      <MDTypography variant="body2" color="text">
                        {isLoading ? `已上传眼底图像：${fileName}` : "请上传眼底图像进行检测"}
                      </MDTypography>
                    </>
                  )}
                </MDBox>
              </DefaultCard>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MDBox mb={1.5} height="100%">
              <DefaultCard icon="center_focus_strong" title="眼底检测图像">
                <MDBox
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="400px"
                  mb="16px"
                >
                  {isLoading ? (
                    <>
                      <CircularProgress color="info"/>
                      <MDTypography variant="body2" color="text" mt={2}>
                        眼底图像检测进行中
                      </MDTypography>
                    </>
                  ) : predictedImage ? (
                    <CardMedia
                      component="img"
                      image={predictedImage}
                      alt="眼底检测图像"
                      sx={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <MDTypography variant="body2" color="text">
                      眼底图像检测未开始
                    </MDTypography>
                  )}
                </MDBox>
              </DefaultCard>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12}>
            <MDBox mb={1.5}>
              <DefaultCard icon="dns" title="病灶类型与分级标准">
                <MDBox fontSize="16px">
                  糖尿病性视网膜病变涉及四种病灶：
                  <br/>
                  <MDBox display="flex" alignItems="flex-start">
                    <MDBox
                      width={32}
                      height={20}
                      borderRadius="2px"
                      mr={1}
                      mt="2px"
                      sx={{
                        border: "1px solid",
                        borderColor: "text.main",
                        backgroundColor: LESION_COLORS.MA
                      }}
                    />
                    微动脉瘤（Microaneurysm，MA）：视网膜毛细血管壁局部膨出形成的微小瘤状结构，是糖尿病视网膜病变最早的病理特征。
                  </MDBox>
                  <MDBox display="flex" alignItems="flex-start">
                    <MDBox
                      width={32}
                      height={20}
                      borderRadius="2px"
                      mr={1}
                      mt="2px"
                      sx={{
                        border: "1px solid",
                        borderColor: "text.main",
                        backgroundColor: LESION_COLORS.HE
                      }}
                    />
                    出血点（Hemorrhage，HE）：视网膜深层毛细血管破裂导致的点状或片状出血，位于内核层或外丛状层。
                  </MDBox>
                  <MDBox display="flex" alignItems="flex-start">
                    <MDBox
                      width={32}
                      height={20}
                      borderRadius="2px"
                      mr={1}
                      mt="2px"
                      sx={{
                        border: "1px solid",
                        borderColor: "text.main",
                        backgroundColor: LESION_COLORS.EX
                      }}
                    />
                    硬性渗出（Hard Exudates，EX）：脂质和蛋白质渗漏沉积于外丛状层，呈蜡黄色点片状，边界清晰，提示慢性视网膜水肿。
                  </MDBox>
                  <MDBox display="flex" alignItems="flex-start">
                    <MDBox
                      width={32}
                      height={20}
                      borderRadius="2px"
                      mr={1}
                      mt="2px"
                      mb="16px"
                      sx={{
                        border: "1px solid",
                        borderColor: "text.main",
                        backgroundColor: LESION_COLORS.SE
                      }}
                    />
                    软性渗出（Soft Exudates，SE）：神经纤维层微梗死导致的轴浆蓄积，呈白色絮状、边界模糊，阻碍下方血管观察。
                  </MDBox>
                  根据国际临床 DR 严重程度量表，DR 共分为 5 级：健康、轻度非增殖性 DR（Mild non-proliferative
                  DR，Mild-NPDR）、中度非增殖性 DR（Moderate non-proliferative DR，Moderate-NPDR）、重度非增殖性 DR（Severe
                  non-proliferative DR，Severe-NPDR）和增殖性 DR（Proliferative DR，PDR）。
                </MDBox>
              </DefaultCard>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDBox mb={1.5}>
              <DefaultCard icon="assignment" title="临床诊断与治疗计划">
                <MDBox>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                      患者基本信息
                    </MDTypography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <MDInput label="姓名" fullWidth inputRef={nameRef}/>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <MDInput label="性别" fullWidth inputRef={genderRef}/>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <MDInput label="年龄" fullWidth inputRef={ageRef}/>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <MDInput label="职业" fullWidth inputRef={occupationRef}/>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} mt={0.5}>
                      <Grid item xs={12} md={6}>
                        <MDInput label="联系方式" fullWidth inputRef={contactRef}/>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <MDInput label="家庭住址" fullWidth inputRef={addressRef}/>
                      </Grid>
                    </Grid>
                  </MDBox>
                  <MDBox mb={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                          主诉
                        </MDTypography>
                        <MDInput
                          multiline
                          rows={6}
                          fullWidth
                          placeholder="患者就诊时最主要的症状或体征，包括部位、性质、持续时间等。"
                          inputRef={chiefComplaintRef}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                          现病史
                        </MDTypography>
                        <MDInput
                          multiline
                          rows={6}
                          fullWidth
                          placeholder="围绕主诉展开详细描述，包括起病情况、症状特点、伴随症状、诊疗经过、一般情况变化等。"
                          inputRef={presentIllnessRef}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                          既往史
                        </MDTypography>
                        <MDInput
                          multiline
                          rows={6}
                          fullWidth
                          placeholder="患者过去的疾病史、手术史、外伤史、输血史、传染病史、过敏史等。"
                          inputRef={pastHistoryRef}
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                      病灶严重程度分级
                    </MDTypography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3} md={3}>
                        <MDBox display="flex" alignItems="flex-start" fontSize="16px" mb={1}>
                          <MDBox
                            width={32}
                            height={20}
                            borderRadius="2px"
                            mr={1}
                            mt="2px"
                            sx={{
                              border: "1px solid",
                              borderColor: "text.main",
                              backgroundColor: LESION_COLORS.MA
                            }}
                          />
                          <MDBox>
                            微动脉瘤（MA）
                          </MDBox>
                          {lesionCounts && (
                            <MDBox ml="auto">
                              {lesionCounts.MA} 处
                            </MDBox>
                          )}
                        </MDBox>
                        <FormControl fullWidth>
                          <InputLabel id="dr-severity-label">
                            微动脉瘤（MA）严重程度分级
                          </InputLabel>
                          <Select
                            labelId="dr-severity-label"
                            value={lesionSeverity.MA}
                            onChange={handleSeverityChange("MA")}
                            label="微动脉瘤（MA）严重程度分级"
                            sx={{
                              height: 44
                            }}
                          >
                            <MenuItem value="">
                              <em>请选择微动脉瘤（MA）严重程度分级</em>
                            </MenuItem>
                            <MenuItem value="0">健康（无微动脉瘤）</MenuItem>
                            <MenuItem value="1">轻度非增殖性 DR（Mild-NPDR）</MenuItem>
                            <MenuItem value="2">中度非增殖性 DR（Moderate-NPDR）</MenuItem>
                            <MenuItem value="3">重度非增殖性 DR（Severe-NPDR）</MenuItem>
                            <MenuItem value="4">增殖性 DR（PDR）</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={3} md={3}>
                        <MDBox display="flex" alignItems="flex-start" fontSize="16px" mb={1}>
                          <MDBox
                            width={32}
                            height={20}
                            borderRadius="2px"
                            mr={1}
                            mt="2px"
                            sx={{
                              border: "1px solid",
                              borderColor: "text.main",
                              backgroundColor: LESION_COLORS.HE
                            }}
                          />
                          <MDBox>
                            出血点（HE）
                          </MDBox>
                          {lesionCounts && (
                            <MDBox ml="auto">
                              {lesionCounts.HE} 处
                            </MDBox>
                          )}
                        </MDBox>
                        <FormControl fullWidth>
                          <InputLabel id="dr-severity-label">
                            出血点（HE）严重程度分级
                          </InputLabel>
                          <Select
                            labelId="dr-severity-label"
                            value={lesionSeverity.HE}
                            onChange={handleSeverityChange("HE")}
                            label="出血点（HE）严重程度分级"
                            sx={{
                              height: 44
                            }}
                          >
                            <MenuItem value="">
                              <em>请选择出血点（HE）严重程度分级</em>
                            </MenuItem>
                            <MenuItem value="0">健康（无出血点）</MenuItem>
                            <MenuItem value="1">轻度非增殖性 DR（Mild-NPDR）</MenuItem>
                            <MenuItem value="2">中度非增殖性 DR（Moderate-NPDR）</MenuItem>
                            <MenuItem value="3">重度非增殖性 DR（Severe-NPDR）</MenuItem>
                            <MenuItem value="4">增殖性 DR（PDR）</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={3} md={3}>
                        <MDBox display="flex" alignItems="flex-start" fontSize="16px" mb={1}>
                          <MDBox
                            width={32}
                            height={20}
                            borderRadius="2px"
                            mr={1}
                            mt="2px"
                            sx={{
                              border: "1px solid",
                              borderColor: "text.main",
                              backgroundColor: LESION_COLORS.EX
                            }}
                          />
                          <MDBox>
                            硬性渗出（EX）
                          </MDBox>
                          {lesionCounts && (
                            <MDBox ml="auto">
                              {lesionCounts.EX} 处
                            </MDBox>
                          )}
                        </MDBox>
                        <FormControl fullWidth>
                          <InputLabel id="dr-severity-label">
                            硬性渗出（EX）严重程度分级
                          </InputLabel>
                          <Select
                            labelId="dr-severity-label"
                            value={lesionSeverity.EX}
                            onChange={handleSeverityChange("EX")}
                            label="硬性渗出（EX）严重程度分级"
                            sx={{
                              height: 44
                            }}
                          >
                            <MenuItem value="">
                              <em>请选择硬性渗出（EX）严重程度分级</em>
                            </MenuItem>
                            <MenuItem value="0">健康（无硬性渗出）</MenuItem>
                            <MenuItem value="1">轻度非增殖性 DR（Mild-NPDR）</MenuItem>
                            <MenuItem value="2">中度非增殖性 DR（Moderate-NPDR）</MenuItem>
                            <MenuItem value="3">重度非增殖性 DR（Severe-NPDR）</MenuItem>
                            <MenuItem value="4">增殖性 DR（PDR）</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={3} md={3}>
                        <MDBox display="flex" alignItems="flex-start" fontSize="16px" mb={1}>
                          <MDBox
                            width={32}
                            height={20}
                            borderRadius="2px"
                            mr={1}
                            mt="2px"
                            sx={{
                              border: "1px solid",
                              borderColor: "text.main",
                              backgroundColor: LESION_COLORS.SE
                            }}
                          />
                          <MDBox>
                            软性渗出（SE）
                          </MDBox>
                          {lesionCounts && (
                            <MDBox ml="auto">
                              {lesionCounts.SE} 处
                            </MDBox>
                          )}
                        </MDBox>
                        <FormControl fullWidth>
                          <InputLabel id="dr-severity-label">
                            软性渗出（SE）严重程度分级
                          </InputLabel>
                          <Select
                            labelId="dr-severity-label"
                            value={lesionSeverity.SE}
                            onChange={handleSeverityChange("SE")}
                            label="软性渗出（SE）严重程度分级"
                            sx={{
                              height: 44
                            }}
                          >
                            <MenuItem value="">
                              <em>请选择软性渗出（SE）严重程度分级</em>
                            </MenuItem>
                            <MenuItem value="0">健康（无软性渗出）</MenuItem>
                            <MenuItem value="1">轻度非增殖性 DR（Mild-NPDR）</MenuItem>
                            <MenuItem value="2">中度非增殖性 DR（Moderate-NPDR）</MenuItem>
                            <MenuItem value="3">重度非增殖性 DR（Severe-NPDR）</MenuItem>
                            <MenuItem value="4">增殖性 DR（PDR）</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </MDBox>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                      临床诊断意见
                    </MDTypography>
                    <MDInput
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="请填写患者的主要临床表现、体征、辅助检查结果及诊断意见。"
                      inputRef={clinicalDiagnosisRef}
                    />
                  </MDBox>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                      治疗方案
                    </MDTypography>
                    <MDInput
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="请详细描述治疗方案，包括药物名称及用法用量、治疗计划、随访周期等。"
                      inputRef={treatmentPlanRef}
                    />
                  </MDBox>
                  <MDBox>
                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                      AI 辅助诊断意见
                    </MDTypography>
                    {!isGeneratingDiagnosis && !aiResponse && (
                      <MDButton
                        variant="gradient"
                        color="info"
                        onClick={handleGenerateDiagnosis}
                        disabled={!lesionCounts}
                      >
                        生成 AI 辅助诊断意见
                      </MDButton>
                    )}
                    {isGeneratingDiagnosis && (
                      <MDBox display="flex" alignItems="center">
                        <CircularProgress size={24} color="info" />
                        <MDTypography variant="body2" color="text" ml={2}>
                          AI 辅助诊断意见生成中
                        </MDTypography>
                      </MDBox>
                    )}
                    {aiResponse && (
                      <MDBox
                        pl={2}
                        pr={2}
                        pt={1.4}
                        pb={1.4}
                        borderRadius="lg"
                        sx={{
                          backgroundColor: "background.default",
                          whiteSpace: "pre-wrap"
                        }}
                      >
                        {aiResponse.split("\n").map((paragraph, index) => (
                          <MDBox key={index} fontSize="16px" mt={0.6} mb={0.6}>
                            {paragraph}
                          </MDBox>
                        ))}
                      </MDBox>
                    )}
                  </MDBox>
                </MDBox>
              </DefaultCard>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox display="flex" justifyContent="center" mb={1}>
        {!isGeneratingReport && !reportGenerated && (
          <MDButton
            variant="gradient"
            color="info"
            onClick={handleGenerateReport}
            disabled={!aiResponse || !fileUuid}
          >
            生成 DR 诊断分析报告
          </MDButton>
        )}
        {isGeneratingReport && (
          <MDBox display="flex" alignItems="center">
            <CircularProgress size={24} color="info" />
            <MDTypography variant="body2" color="text" ml={2}>
              DR 诊断分析报告生成中
            </MDTypography>
          </MDBox>
        )}
      </MDBox>
    </DashboardLayout>
  );
}

export default Diagnosis;