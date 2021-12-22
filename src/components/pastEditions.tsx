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
import { useEffect, useState } from "react";
import SectionTitle from "../components/sectionTitle";
import styles from "../styles/PastEditions.module.css";

interface PastEditionsProps extends Omit<ListProps, "onChange"> {
  elements: any[];
}

const useStyles = makeStyles(() => ({
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
    boxShadow: "0px 0px 5px #00000033",
  },
  cardContent: {
    background: "#19DD39 ",
    "&:hover": {
      background: "#004266 ",
    },
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "none",
  },
}));

const PastEditions: React.FC<PastEditionsProps> = ({ elements }) => {
  const [width, setWidth] = useState(500);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = (e) => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const classes = useStyles();
  const sectionTitle = "Edições anteriores";

  return (
    <div className={styles.content}>
      <SectionTitle title={sectionTitle} />
      <List
        style={{
          display: "flex",
          flexDirection: width < 700 ? "column" : "row",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
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
      </List>
    </div>
  );
};

export default PastEditions;
