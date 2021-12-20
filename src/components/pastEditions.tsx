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
import { useEffect, useState } from "react";

interface PastEditionsProps extends Omit<ListProps, "onChange"> {
  elements: any[];
}

const useStyles = makeStyles((theme) => ({
  card: {
    background: "#19DD39",
    "&:hover": {
      background: "#004266 ",
    },
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  },
  cardContent: {
    background: "#19DD39",
    "&:hover": {
      background: "#004266 ",
    },
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const PastEditions: React.FC<PastEditionsProps> = ({
  elements = [
    {
      _id: "61aa8c4e46b5e6b496fb33a2",
      titulo: "Caderno de resumos InterPET 2021",
      data: "2021-07-28T00:00:00.000Z",
      link: "https://drive.google.com/file/d/1vpXOKvDW6rvOI0db8ll8t7W07u19NAgQ/view?usp=sharing",
      interpet: "true",
      atual: "true",
      img: "https://i.ibb.co/qx4vj4k/Inter-Pet-2021.png",
      resumo:
        "O evento tem como objetivo principal a troca de experiências, por meio de reflexões e discussões acerca do desenvolvimento do Programa, bem como da importância da articulação no âmbito da tríade ensino, pesquisa e extensão. Esta ultima edição conta com trabalhos dos mais variados temas, desde reciclagem, estratégias de planejamento em grupo, até curso de calculo e química e o impacto da monitoria para os monitores e estudantes.",
    },
    {
      _id: "61aa8ca546b5e6b496fb3fe4",
      titulo: "Caderno de resumos InterPET 2020",
      data: "2019-12-31T00:00:00.000Z",
      link: "https://drive.google.com/file/d/1rfD_QZGJjwJ0VkW5yyY_-mHAJKXa3F29/view?usp=sharing",
      interpet: "true",
      atual: "false",
      img: "https://i.ibb.co/Ns5qxvQ/Inter-Pet-2020.png",
      resumo: "",
    },
    {
      _id: "61aa8c0946b5e6b496fb29aa",
      titulo: "Caderno de resumos InterPET 2019",
      data: "2019-08-29T00:00:00.000Z",
      link: "https://drive.google.com/file/d/1EAmmOZ13XmR8qGgDcq-O87nFBuGQyV6D/view?usp=sharing",
      interpet: "true",
      atual: "false",
      img: "https://i.ibb.co/fDY6cNf/Inter-Pet-2019.png",
      resumo: "",
    },
    {
      _id: "61aa8c0946b5e6b496fb29a9",
      titulo: "Caderno de resumos InterPET 2018",
      data: "2018-08-16T00:00:00.000Z",
      link: "https://drive.google.com/file/d/1rNaUCzJuv6jlL-ItRBLNC009Q1XusCoF/view?usp=sharing",
      interpet: "true",
      atual: "false",
      img: "https://i.ibb.co/6ZWHx3W/Inter-Pet-2018.png",
      resumo: "",
    },
  ],
}) => {
  const classes = useStyles();
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = (e) => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sectionTitle = "Edições anteriores";

  return (
    <div className={styles.content}>
      <SectionTitle title={sectionTitle} />
      <List
        style={{
          display: "flex",
          flexDirection: width > 500 ? "row" : "column",
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#f5f5f5;",
        }}
      >
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
                    borderBottom: "1px solid rgba(0, 0, 0, 0.822)",
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
