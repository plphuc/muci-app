import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBullseye, faFile } from '@fortawesome/free-solid-svg-icons';

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: 'header',
      data: {
        text: 'This is my awesome editor!',
        level: 1,
      },
    },
  ],
};

const productDropdownMenu = [
  {
    name: 'Wikis',
    des: 'Centralize your knowledge',
    icon: <FontAwesomeIcon icon={faBook} />,
  },
  {
    name: 'Projects',
    des: 'For every team or size',
    icon: <FontAwesomeIcon icon={faBullseye} />,
  },
  {
    name: 'Docs',
    des: 'Simple & powerful',
    icon: <FontAwesomeIcon icon={faFile} />,
  },
  {
    name: 'Docs',
    des: 'Simple & powerful',
    icon: <FontAwesomeIcon icon={faFile} />,
  }
];

const instructDropdownMenu = [
  { name: 'Template gallery', des: 'Setups to get you started' },
  { name: 'Customer stories', des: 'See how teams use Notion' },
  { name: 'Connections', des: 'Connect your tools to Notion' },
]

const downloadOptions = [
  'iOS & Andriod',
  'Mac & Windows',
  'Web Clipper'
]
export { DEFAULT_INITIAL_DATA, productDropdownMenu, instructDropdownMenu, downloadOptions };
