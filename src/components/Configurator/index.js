import {useState, useEffect} from "react";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDButton from "../MDButton";
import ConfiguratorRoot from "./ConfiguratorRoot";
import {
  useMaterialUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setWhiteSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "../../context";

function Configurator() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    openConfigurator,
    fixedNavbar,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [disabled, setDisabled] = useState(false);
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  useEffect(() => {
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    window.addEventListener("resize", handleDisabled);
    handleDisabled();
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => {
    setTransparentSidenav(dispatch, true);
    setWhiteSidenav(dispatch, false);
  };
  const handleWhiteSidenav = () => {
    setWhiteSidenav(dispatch, true);
    setTransparentSidenav(dispatch, false);
  };
  const handleDarkSidenav = () => {
    setWhiteSidenav(dispatch, false);
    setTransparentSidenav(dispatch, false);
  };
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);
  const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

  const sidenavTypeButtonsStyles = ({
                                      functions: {pxToRem},
                                      palette: {white, dark, background},
                                      borders: {borderWidth},
                                    }) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  });

  const sidenavTypeActiveButtonStyles = ({
                                           functions: {pxToRem, linearGradient},
                                           palette: {white, gradients, background},
                                         }) => ({
    height: pxToRem(39),
    background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
    color: darkMode ? background.sidenav : white.main,
    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
      color: darkMode ? background.sidenav : white.main,
    },
  });

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{openConfigurator}}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">个性化设置</MDTypography>
          <MDTypography variant="body2" color="text">
            您可以自定义页面外观和布局
          </MDTypography>
        </MDBox>
        <Icon
          sx={({typography: {size}, palette: {dark, white}}) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>
      <Divider/>
      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox>
          <MDTypography variant="h6">侧边栏颜色</MDTypography>
          <MDTypography variant="button" color="text">
            选择不同的侧边栏颜色
          </MDTypography>
          <MDBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({
                       borders: {borderWidth},
                       palette: {white, dark, background},
                       transitions,
                     }) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${darkMode ? background.sidenav : white.main}`,
                  borderColor: () => {
                    let borderColorValue = sidenavColor === color && dark.main;
                    if (darkMode && sidenavColor === color) {
                      borderColorValue = white.main;
                    }
                    return borderColorValue;
                  },
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({functions: {linearGradient}, palette: {gradients}}) =>
                    linearGradient(gradients[color].main, gradients[color].state),
                  "&:not(:last-child)": {
                    mr: 1,
                  },
                  "&:hover, &:focus, &:active": {
                    borderColor: darkMode ? white.main : dark.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </MDBox>
        </MDBox>
        <MDBox mt={3} lineHeight={1}>
          <MDTypography variant="h6">侧边栏样式</MDTypography>
          <MDTypography variant="button" color="text">
            选择不同的侧边栏样式
          </MDTypography>
          <MDBox
            sx={{
              display: "flex",
              mt: 2,
              gap: 1,
              width: "100%",
            }}
          >
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleDarkSidenav}
              disabled={disabled}
              sx={[
                {flex: 1},
                !transparentSidenav && !whiteSidenav
                  ? sidenavTypeActiveButtonStyles
                  : sidenavTypeButtonsStyles,
              ]}
            >
              深色
            </MDButton>
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleTransparentSidenav}
              disabled={disabled}
              sx={[
                {flex: 1},
                transparentSidenav && !whiteSidenav
                  ? sidenavTypeActiveButtonStyles
                  : sidenavTypeButtonsStyles,
              ]}
            >
              透明
            </MDButton>
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleWhiteSidenav}
              disabled={disabled}
              sx={[
                {flex: 1},
                whiteSidenav && !transparentSidenav
                  ? sidenavTypeActiveButtonStyles
                  : sidenavTypeButtonsStyles,
              ]}
            >
              浅色
            </MDButton>
          </MDBox>
        </MDBox>
        <Divider/>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          lineHeight={1}
        >
          <MDTypography variant="h6">固定导航栏</MDTypography>
          <Switch checked={fixedNavbar} onChange={handleFixedNavbar}/>
        </MDBox>
        <Divider/>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <MDTypography variant="h6">夜间模式</MDTypography>
          <Switch checked={darkMode} onChange={handleDarkMode}/>
        </MDBox>
        <Divider/>
      </MDBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
