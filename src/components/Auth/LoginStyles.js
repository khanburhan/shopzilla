import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginTop: 50,
  },
  loginButton: {
    color: "#ede7f6",
    backgroundColor: "#673ab7",
  },
}));
