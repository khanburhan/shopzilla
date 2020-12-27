import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

export default makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: "100%",
  },
  cardBackground: {
    backgroundColor: fade("#d1c4e9", 0.5),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  cartAddButton: {
    color: "#9575cd",
  },
  productDescription: {
    color: fade("#000000", 0.6),
  },
}));
