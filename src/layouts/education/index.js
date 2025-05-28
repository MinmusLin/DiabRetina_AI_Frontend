import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "components/DashboardLayout";
import DashboardNavbar from "components/DashboardNavbar";

function Education() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ mb: 5 }}>
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
                  教育科普 1 ｜ 什么是糖尿病性视网膜病变
                </MDTypography>
              </MDBox>
              <MDBox pt={3} fontSize="16px" ml={3} mr={3} mb={3}>
                糖尿病性视网膜病变（DR）是糖尿病最常见的眼部并发症，也是成年人致盲的主要原因之一。它是由长期高血糖损害视网膜微小血管所导致的慢性进行性疾病。在早期阶段，高血糖会削弱血管壁，导致微血管瘤形成和微小出血点。随着病情发展，血管可能发生渗漏，引起视网膜水肿，甚至阻塞，造成局部缺血。在更严重的阶段，视网膜因缺血而刺激异常新生血管生长，这些新生血管脆弱易破，可能导致玻璃体出血、纤维增生，最终引发牵引性视网膜脱离，造成不可逆的视力损害。
                <br />
                <br />
                值得注意的是，糖尿病性视网膜病变在早期通常没有明显症状，这使得定期眼底检查变得尤为重要。许多患者直到出现明显视力下降时才就医，此时病情往往已进入中晚期。该病变通常是双眼发病，但严重程度可能不对称。除了典型的视网膜病变外，约三分之一的患者还会合并糖尿病性黄斑水肿（DME），这是导致中心视力下降的最常见原因。虽然糖尿病性视网膜病变可能最终导致失明，但通过早期发现、规范治疗和良好的血糖控制，绝大多数患者可以保留有用视力。
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ mb: 5 }}>
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
                  教育科普 2 ｜ 糖尿病性视网膜病变的分期与症状
                </MDTypography>
              </MDBox>
              <MDBox pt={3} fontSize="16px" ml={3} mr={3} mb={3}>
                糖尿病性视网膜病变的临床分期主要分为非增殖期（NPDR）和增殖期（PDR）。非增殖期是疾病的早期阶段，其特征是视网膜微血管的损伤和渗漏，包括微血管瘤、视网膜内出血、硬性渗出和静脉串珠样改变等。在这个阶段，患者可能没有任何症状，或者仅表现为轻微的视物模糊或阅读困难。随着病情进展，视网膜缺血加重，可能出现棉絮斑（软性渗出），这标志着中度至重度非增殖期的转变。
                <br />
                <br />
                当病变进入增殖期，意味着视网膜已经出现大面积缺血，刺激产生异常的新生血管。这些新生血管不仅容易破裂导致玻璃体出血，还会引起纤维组织增生，最终可能导致牵引性视网膜脱离。患者在这个阶段通常会突然出现飞蚊症、视野缺损或急剧的视力下降。特别值得警惕的是，有些患者在视力尚好的情况下，眼底病变可能已经相当严重，这就是为什么糖尿病患者必须定期进行专业的眼底检查，而不能仅凭自我感觉来判断病情。
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ mb: 5 }}>
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
                  教育科普 3 ｜ 高危人群与筛查建议
                </MDTypography>
              </MDBox>
              <MDBox pt={3} fontSize="16px" ml={3} mr={3} mb={3}>
                所有类型的糖尿病患者都有发生视网膜病变的风险，但风险程度与糖尿病病程、血糖控制情况密切相关。1型糖尿病患者通常在确诊5年后开始出现视网膜病变，而2型糖尿病患者可能在确诊时就已经存在视网膜病变。其他高危因素包括长期血糖控制不佳、高血压、高血脂、妊娠、肾病以及吸烟等。特别值得注意的是，青春期和妊娠期由于激素变化，可能加速视网膜病变的进展。
                <br />
                <br />
                对于筛查建议，1型糖尿病患者应在确诊5年后开始每年进行散瞳眼底检查，而2型糖尿病患者应在确诊时就进行首次眼底检查。对于已经出现视网膜病变的患者，随访间隔需要根据病变程度调整，可能缩短至3-6个月。妊娠期糖尿病患者应在妊娠前或妊娠早期进行眼底检查，之后每3个月复查一次。除了传统的散瞳眼底检查外，现在越来越多的医疗机构采用免散瞳眼底照相作为筛查工具，配合人工智能分析技术，大大提高了筛查效率和准确性。
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ mb: 5 }}>
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
                  教育科普 4 ｜ 医学治疗手段与进展
                </MDTypography>
              </MDBox>
              <MDBox pt={3} fontSize="16px" ml={3} mr={3} mb={3}>
                糖尿病性视网膜病变的治疗是一个多学科协作的过程，需要根据病变的不同阶段采取个体化治疗方案。在早期阶段，严格控制血糖、血压和血脂是最基础也是最重要的治疗措施。研究表明，将糖化血红蛋白（HbA1c）控制在7%以下，可以显著延缓视网膜病变的进展。对于已经出现临床有意义黄斑水肿（CSME）的患者，抗VEGF药物玻璃体腔注射（如雷珠单抗、阿柏西普）已成为一线治疗方案，通常需要每月注射一次，连续3-6次。
                <br />
                <br />
                对于更严重的增殖期病变，全视网膜激光光凝（PRP）仍然是标准治疗方法，虽然可能造成一定的周边视野损失，但能有效控制新生血管的生长。当出现玻璃体出血或牵引性视网膜脱离时，就需要进行玻璃体切割手术。近年来，医学界在糖尿病性视网膜病变的治疗方面取得了显著进展，包括更长效的抗VEGF药物、靶向性更强的基因治疗、以及可生物降解的药物缓释系统等。同时，人工智能辅助诊断系统的应用使得早期筛查更加普及和精准。
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ mb: 5 }}>
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
                  教育科普 5 ｜ 日常管理与生活方式干预
                </MDTypography>
              </MDBox>
              <MDBox pt={3} fontSize="16px" ml={3} mr={3} mb={3}>
                糖尿病性视网膜病变的日常管理需要患者、家属和医疗团队的共同努力。血糖控制是重中之重，建议通过规律监测血糖、合理用药和饮食控制，将糖化血红蛋白（HbA1c）维持在7%以下。血压管理同样重要，目标值通常设定在130/80mmHg以下。血脂异常也会影响视网膜病变的进展，因此需要定期检测并控制血脂水平。在饮食方面，建议采用地中海饮食模式，多摄入富含ω-3脂肪酸的鱼类、深色蔬菜和全谷物，限制精制碳水化合物和饱和脂肪的摄入。
                <br />
                <br />
                运动对改善胰岛素敏感性有显著帮助，但需要注意运动方式的选择。中等强度的有氧运动如快走、游泳和骑自行车都是不错的选择，每周建议进行至少150分钟。然而，对于已经出现增殖期病变的患者，应避免剧烈运动、重体力劳动和可能引起血压急剧升高的活动，如举重、潜水等，以防诱发玻璃体出血。戒烟是另一个关键措施，因为吸烟会显著加速微血管病变的进展。此外，保持良好的睡眠习惯和压力管理也对疾病控制有积极影响。
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ mb: -3 }}>
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
                  教育科普 6 ｜ 患者自我监测与心理支持
                </MDTypography>
              </MDBox>
              <MDBox pt={3} fontSize="16px" ml={3} mr={3} mb={3}>
                糖尿病患者应该养成定期自我监测的习惯，不仅要关注血糖水平，还要留意视力变化。建议每天用双眼交替看固定的物体（如门框或窗框），比较两眼的清晰度是否一致。使用阿姆斯勒方格表可以早期发现黄斑病变，方法是在30厘米距离处遮盖一眼，用另一眼注视方格中心的黑点，如果发现直线扭曲或缺失，应立即就医。记录每天的视力变化和症状，如飞蚊症增多、闪光感或视野缺损等，这些信息对医生判断病情进展非常重要。
                <br />
                <br />
                心理支持在糖尿病性视网膜病变的管理中常常被忽视，但实际上非常重要。约30%的患者会出现焦虑或抑郁症状，特别是在视力开始下降时。加入病友支持小组、接受心理咨询或参加正念减压课程都可能有所帮助。家属的理解和支持也至关重要，他们可以帮助患者坚持治疗计划、提醒定期复查，并在必要时协助日常生活。建议患者随身携带糖尿病急救卡，注明病情和用药情况，以备不时之需。记住，虽然糖尿病性视网膜病变是一种严重的并发症，但通过科学管理和积极治疗，大多数患者都能保持良好的生活质量。
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Education;
