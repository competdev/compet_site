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

interface PastEditionsProps extends Omit<ListProps, "onChange"> {
  elements: any[];
}

const PastEditions: React.FC<PastEditionsProps> = ({
  elements,
  ...otherProps
}) => {
  return (
    <List
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        backgroundColor: "background.paper",
      }}
    >
      {elements.map((element, index) => (
        <ListItem key={element._id}>
          <Card>
            <CardActionArea
              onClick={() => {
                if (element && element.link)
                  window.open(element.link, "_blank")?.focus();
              }}
            >
              <CardMedia
                component='img'
                alt={element.titulo}
                height='200'
                image={element.img}
              />
              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography gutterBottom variant='h5' component='div'>
                  {element.titulo} -{" "}
                  {new Date(element.data).toLocaleString("pt-BR").split(" ")[0]}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default PastEditions;
