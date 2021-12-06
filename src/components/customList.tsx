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

interface CustomListProps extends Omit<ListProps, "onChange"> {
  elements: any[];
}

const CustomList: React.FC<CustomListProps> = ({ elements, ...otherProps }) => {
  return (
    <List
      style={{
        width: "100%",
        maxWidth: 360,
        backgroundColor: "background.paper",
      }}
    >
      {elements.map((element, index) => {
        !element.atual ?? (
          <ListItem key={element._id}>
            <Card style={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  alt={element.titulo}
                  height='140'
                  image={element.img}
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {element.data}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </ListItem>
        );
      })}
    </List>
  );
};

export default CustomList;
