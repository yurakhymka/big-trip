import { DESTINATIONS } from './../const/destination';
import { getRandomInt } from './../utils';
import { createRandomDescription } from './description';


const picture = {
  'src': 'http://picsum.photos/248/152?r',
  'description': createRandomDescription(1)
};

const pictures = Array(getRandomInt(1, 5));

for (let index = 0; index < pictures.length; index++) {
  pictures[index] = picture;
}

export const generateDestination = () => ({
  'description': createRandomDescription(),
  'name': DESTINATIONS[getRandomInt(0, DESTINATIONS.length -1)],
  'pictures': pictures
});
