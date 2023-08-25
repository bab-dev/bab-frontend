import React from "react";
import PropTypes from "prop-types";

import ReactHTMLTableToExcel from "react-html-table-to-excel";

import { makeStyles } from "@mui/styles";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Box, Grid } from "@mui/material";

import theme from "theme";

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: theme.palette.common.main,
    color: theme.palette.primary.main,
    minWidth: "80px",
    display: "block",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    borderRadius: 50,
    border: `solid 1px ${theme.palette.primary.main}`,
    boxShadow: `0 1px 3px 0 ${theme.palette.common.black}`,
    transitionDuration: "0.4s",
    "&:hover": {
      boxShadow: `0 1px 6px 1px ${theme.palette.common.black}`,
    },
  },
  exportButton: {
    backgroundColor: theme.palette.common.main,
    border: "none",
    color: theme.palette.primary.main,
    fontSize: "0.875rem",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    textAlign: "center",
    letterSpacing: "0.02857em",
    textTransform: "uppercase",
  },
}));

const CustomExportButton = ({ id, table, filename, sheet, buttonText }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Grid container display={"flex"} justifyContent={"space-between"}>
        <Grid item p={2} pr={0} pb={1}>
          <FileDownloadIcon />
        </Grid>
        <Grid item p={1}>
          <ReactHTMLTableToExcel
            id={id}
            className={classes.exportButton}
            table={table}
            filename={filename}
            sheet={sheet}
            buttonText={buttonText}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

CustomExportButton.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
  table: PropTypes.string,
  filename: PropTypes.string,
  sheet: PropTypes.string,
  buttonText: PropTypes.string,
};

export default CustomExportButton;
