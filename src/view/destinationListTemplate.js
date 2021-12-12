import { DESTINATIONS } from './../const/destination';

const renderDestionationTemplate = (destination) => (
  `<option value="${destination}"></option>`
);

export const renderDestionationsTemplate = () => {
  let destionationsTemplate = '';
  DESTINATIONS.forEach((item) => {
    destionationsTemplate += renderDestionationTemplate(item);
  });
  return destionationsTemplate;
};
