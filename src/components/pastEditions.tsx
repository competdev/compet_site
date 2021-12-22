import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  ListItem,
  ListProps,
  makeStyles,
  Typography,
} from "@material-ui/core";
import SectionTitle from "../components/sectionTitle";
import styles from "../styles/PastEditions.module.css";

interface PastEditionsProps extends Omit<ListProps, "onChange"> {
  elements: any[];
}

const useStyles = makeStyles((theme) => ({
  card: {
    background: "#ffffff",
    "&:hover": {
      background: "#e4e4e4 ",
    },
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    border: "1px solid #d5d5d575",
    boxShadow: "0px 0px 5px #00000046",
  },
  cardContent: {
    background: "#ffffff",
    "&:hover": {
      background: "#e4e4e4 ",
    },
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "none",

  },
}));

const PastEditions: React.FC<PastEditionsProps> = ({ elements }) => {

  elements = elements.filter(currRemove)

  function currRemove(element) {
    return element.atual == "false"
  }

  const classes = useStyles();
  const sectionTitle = "Edições anteriores";

  return (
    <div className={styles.content}>
      <SectionTitle title={sectionTitle} />
      <div className={styles.listContainer}>
        {elements.map((element, index) => (
          <ListItem key={element._id}>
            <Card className={classes.card}>
              <CardActionArea
                onClick={() => {
                  if (element && element.link)
                    window.open(element.link, "_blank")?.focus();
                }}
              >
                <CardMedia
                  component='img'
                  alt={element.titulo}
                  height='150'
                  image={element.img}
                  style={{
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.13)",
                  }}
                />
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='div'
                    style={{
                      fontFamily: "Codec Pro Light",
                      fontWeight: "bolder",
                      marginTop: "5px",
                      fontSize: "27px",
                    }}
                  >
                    {element.titulo}
                    <Typography
                      style={{
                        fontFamily: "Codec Pro Light",
                        fontSize: "17px",
                      }}
                    >
                      {
                        new Date(element.data)
                          .toLocaleString("pt-BR")
                          .split(" ")[0]
                      }
                    </Typography>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default PastEditions;
