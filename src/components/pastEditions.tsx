import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListProps,
  Typography,
} from "@material-ui/core";
import SectionTitle from '../components/sectionTitle';
import styles from '../styles/PastEditions.module.css';
import Link from 'next/link';

interface PastEditionsProps extends Omit<ListProps, "onChange"> {
  elements: any[];
}

const PastEditions: React.FC<PastEditionsProps> = ({
  elements,
  ...otherProps
}) => {
  const sectionTitle = "Edições anteriores"

  return (
    <div className={styles.content}>
      <SectionTitle title={sectionTitle} />
      <List
        style={{
          display: "flex",
          flexDirection: "row",
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#f5f5f5;",
        }}
      >
        {elements.map((element, index) => (
          <ListItem key={element._id}>
            <Card style={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              border: "1px solid #d5d5d575"
            }}>
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
                    border: "1px solid rgba(0, 0, 0, 0.199)"
                  }}

                />
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography gutterBottom variant='h5' component='div'
                    style={{
                      fontFamily: "Codec Pro Light",
                      fontWeight: "bolder",
                      marginTop: "5px",
                      fontSize: "27px",
                    }}>
                    {element.titulo}
                    <Typography
                      style={{
                        fontFamily: "Codec Pro Light",
                        fontSize: "17px",
                      }}>
                      {new Date(element.data).toLocaleString("pt-BR").split(" ")[0]}
                    </Typography>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </ListItem>
        ))}
      </List>
    </div >
  );
};

export default PastEditions;
