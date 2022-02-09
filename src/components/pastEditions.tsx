import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  List,
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

const useStyles = makeStyles(() => ({
  card: {
    background: "#ffffff",
    "&:hover": {
      background: "#004266",
    },
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
    border: "1px solid #d5d5d534",
    boxShadow: "0px 0px 5px #00000033",
  },
  cardContent: {
    background: "#ffffff",
    "&:hover": {
      background: "#004266",
      color: "#ffffff"
    },
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "none",
  },
}));

const PastEditions: React.FC<PastEditionsProps> = ({ elements }) => {

  const classes = useStyles();
  const sectionTitle = "Edições anteriores";

  function actualEdition(element) {
    return (element.atual == "false")
  }
  elements = elements.filter(actualEdition)

  return (
    <div className={styles.content}>
      <SectionTitle title={sectionTitle} />
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className={styles.listContainer}>
          {elements.map((element) => (
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
                    height='170'
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
      </List>
    </div>
  );
};

export default PastEditions;