import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
  IconButtonProps
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)'
      }
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)'
      }
    }
  ]
}));

interface PropertyCardProps {
  address: string;
  createdAt: string;
  rent: number;
  tenant?: {
    id: number;
    name: string;
  };
}

const PropertyCard = ({
  address,
  createdAt,
  rent,
  tenant
}: PropertyCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<HomeWorkIcon sx={{ color: 'black' }} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={address}
        subheader={createdAt}
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
